import { Player, system, TicksPerSecond, world } from "@minecraft/server";
import { getQuest } from "./quest-cache";
import ThornyUser from "../../api/user";
import { get_quest_progress } from "./core/fetch";
import { QuestProgressOut, QuestProgressOutStatus } from "../../api/nexuscore/model";
import { QuestProcessor } from "./processors/quest-processor";
import { notifyOfQuestUpdate } from "./core/notify";
import { activateObjective, deactivateObjective } from "./core/objective/objective-lifecycle";
import { tickPlugins } from "./core/objective/objective-tick";
import { getActiveObjective } from "./core/objective/objective-lookup";
import { generateObjectiveDisplayString } from "./core/objective/objective-display";
import { CachedQuestProgress, deleteCachedProgress, getCachedProgress, setCachedProgress } from "./progress-store";
import { QUEST_SLOTS, SlotRef, slotKey } from "./types/slot";
import { isFinished } from "./core/status";

const questProcessor = new QuestProcessor()

/** Slots with a sync in flight, so slow requests can't overlap and double-load a slot. */
const SYNCING = new Set<string>()

/**
 * Runs a slot sync unless one is already running for that slot.
 */
export async function syncOnce(ref: SlotRef, sync: () => Promise<void>): Promise<void> {
    const key = slotKey(ref)
    if (SYNCING.has(key)) return

    SYNCING.add(key)
    try {
        await sync()
    } finally {
        SYNCING.delete(key)
    }
}

/**
 * Caches progress in a slot together with its quest, and activates its
 * current objective if the quest is active. Returns undefined, caching
 * nothing, if the player left while the quest was being fetched.
 */
export async function loadSlot(player: Player, ref: SlotRef, progress: QuestProgressOut): Promise<CachedQuestProgress | undefined> {
    const quest = await getQuest(progress.quest_id)
    if (!player.isValid) return undefined

    const cached: CachedQuestProgress = { ref, quest, progress }
    setCachedProgress(cached)

    if (progress.status === QuestProgressOutStatus.active) {
        const active = getActiveObjective(quest, progress)
        if (active) {
            activateObjective({ ...ref, player }, active.obj_def, active.obj_progress)
        }
    }

    return cached
}

/**
 * Deactivates a slot's active objective, if any, and evicts it from the cache.
 * Returns the evicted entry.
 */
export function unloadSlot(ref: SlotRef, playerName: string, player: Player | undefined, isLeaving: boolean): CachedQuestProgress | undefined {
    const cached = getCachedProgress(ref)
    if (!cached) return undefined

    const active = getActiveObjective(cached.quest, cached.progress)
    if (active) {
        deactivateObjective({ ...ref, playerName, player, isLeaving }, active.obj_def, active.obj_progress)
    }

    deleteCachedProgress(ref)
    return cached
}

export default function loadQuestProgressCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number[]>()

    function showActiveObjective(player: Player, cached: CachedQuestProgress) {
        const active = getActiveObjective(cached.quest, cached.progress)
        if (!active) return

        system.runTimeout(() => {
            if (!player.isValid) return
            notifyOfQuestUpdate(
                player,
                generateObjectiveDisplayString(
                    active.obj_def,
                    cached.quest.objectives.indexOf(active.obj_def) + 1,
                    cached.quest.objectives.length,
                    cached.quest.title
                )
            )
        }, TicksPerSecond * 10)
    }

    async function new_active_quest(questProgress: QuestProgressOut, ref: SlotRef, player: Player) {
        unloadSlot(ref, player.name, player, false)
        const cached = await loadSlot(player, ref, questProgress)
        if (cached) showActiveObjective(player, cached)
    }

    function dropped_quest(ref: SlotRef, player: Player) {
        const cached = unloadSlot(ref, player.name, player, false)
        if (!cached) return

        if (!isFinished(cached.progress.status)) {
            notifyOfQuestUpdate(player, `You have dropped your quest: ${cached.quest.title}`)
        }
    }

    /**
     * Syncs the regular quest slot with the player's active quest in Nexuscore.
     */
    async function syncRegularSlot(player: Player, thornyUser: ThornyUser) {
        const ref: SlotRef = { thornyId: thornyUser.thorny_id, slot: 'regular' }

        await syncOnce(ref, async () => {
            const questProgress = await get_quest_progress(thornyUser.thorny_id)
            if (!player.isValid) return

            const cached = getCachedProgress(ref)

            // User has accepted a new quest
            if (questProgress && cached?.progress.progress_id !== questProgress.progress_id) {
                await new_active_quest(questProgress, ref, player)
            }

            // User has dropped a quest
            else if (!questProgress && cached) {
                dropped_quest(ref, player)
            }
        })
    }

    function tickSlot(player: Player, ref: SlotRef) {
        const cached = getCachedProgress(ref)
        if (!cached) return

        const active = getActiveObjective(cached.quest, cached.progress)
        if (!active) return

        const signal = tickPlugins(player, ref, active.obj_def, active.obj_progress)
        if (signal === 'fail') {
            questProcessor.fail(player, cached)
        } else if (signal === 'skip') {
            questProcessor.skipObjective(player, cached)
        }
    }

    async function runPlayerInit(player: Player, playerName: string) {
        const cacheRunId = system.runInterval(async () => {
            if (!player.isValid) {
                system.clearRun(cacheRunId)
                return
            }

            const thornyUser = ThornyUser.fetch_user(playerName)
            if (!thornyUser) return

            await syncRegularSlot(player, thornyUser)
        }, TicksPerSecond * 2)

        const tickRunId = system.runInterval(() => {
            if (!player.isValid) {
                system.clearRun(tickRunId)
                return
            }

            const thornyUser = ThornyUser.fetch_user(playerName)
            if (!thornyUser) return

            for (const slot of QUEST_SLOTS) {
                tickSlot(player, { thornyId: thornyUser.thorny_id, slot })
            }
        }, TicksPerSecond)

        PLAYER_LOOP_RUN_IDS.set(playerName, [cacheRunId, tickRunId])

        const thornyUser = ThornyUser.fetch_user(playerName)
        if (thornyUser) {
            await syncRegularSlot(player, thornyUser)
        }
    }

    world.afterEvents.playerSpawn.subscribe((spawn_event) => {
        if (!spawn_event.initialSpawn) return

        const player = spawn_event.player
        const playerName = player.name
        let attempts = 0
        const MAX_ATTEMPTS = 100 // ~5 seconds at 20 ticks/sec, tune as needed

        const readyCheckId = system.runInterval(() => {
            attempts++

            if (!player.isValid) {
                // Player left before finishing load, or never became valid — bail out
                if (attempts >= MAX_ATTEMPTS) system.clearRun(readyCheckId)
                return
            }

            // Player is valid — stop polling and run the real init logic once
            system.clearRun(readyCheckId)

            runPlayerInit(player, playerName).then()
        }, 1) // check every tick
    })

    world.afterEvents.playerLeave.subscribe((leave_event) => {
        const playerName = leave_event.playerName

        const runIds = PLAYER_LOOP_RUN_IDS.get(playerName)
        if (runIds !== undefined) {
            runIds.map(i => system.clearRun(i))
            PLAYER_LOOP_RUN_IDS.delete(playerName)
        }

        const thorny_user = ThornyUser.fetch_user(playerName)
        if (!thorny_user) return

        // Deactivate each slot's active objective before evicting it
        for (const slot of QUEST_SLOTS) {
            unloadSlot({ thornyId: thorny_user.thorny_id, slot }, playerName, undefined, true)
        }
    })
}
