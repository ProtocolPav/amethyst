import { Player, system, TicksPerSecond, world } from "@minecraft/server";
import { getQuest } from "./quest-cache";
import ThornyUser from "../../api/user";
import { accept_daily_quest, get_quest_progress } from "./core/fetch";
import { ObjectiveProgressOutStatus, QuestProgressOut, QuestProgressOutStatus } from "../../api/nexuscore/model";
import { QuestProcessor } from "./processors/quest-processor";
import { notifyOfQuestUpdate } from "./core/notify";
import { activateObjective, deactivateObjective } from "./core/objective/objective-lifecycle";
import { tickPlugins } from "./core/objective/objective-tick";
import { getActiveObjective } from "./core/objective/objective-lookup";
import { generateObjectiveDisplayString } from "./core/objective/objective-display";
import { generateDailyDisplayString } from "./core/daily-display";
import { CachedQuestProgress, deleteCachedProgress, findCachedProgressById, getCachedProgress, setCachedProgress } from "./progress-store";
import { flushProgress, setFinishedProgressHandler } from "./write-back";
import { QUEST_SLOTS, SlotRef, slotKey } from "./types/slot";
import { isFinished } from "./core/status";

const questProcessor = new QuestProcessor()

/** How often each player's daily quest slot is synced with Nexuscore. */
const DAILY_POLL_SECONDS = 30

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

function findPlayer(thornyId: number): Player | undefined {
    return world.getPlayers().find(p => ThornyUser.fetch_user(p.name)?.thorny_id === thornyId)
}

/**
 * Tells the player their quest has ended without them finishing it.
 */
export function notifyQuestEnded(player: Player, cached: CachedQuestProgress) {
    const what = cached.ref.slot === 'daily' ? 'daily quest' : 'quest'
    notifyOfQuestUpdate(player, `Your ${what} has ended: ${cached.quest.title}`)
}

/**
 * Ends a slot's quest because Nexuscore finished it (usually because it
 * expired): deactivates its objective and takes on the server's status,
 * without saving anything. The slot keeps the finished progress; the
 * regular slot's poll then evicts it quietly, and the daily slot's
 * follow-up asks for the next daily.
 */
function adoptServerFinish(cached: CachedQuestProgress, player: Player, status: QuestProgressOutStatus, serverProgress?: QuestProgressOut) {
    const active = getActiveObjective(cached.quest, cached.progress)
    if (active) {
        deactivateObjective({ ...cached.ref, playerName: player.name, player, isLeaving: false }, active.obj_def, active.obj_progress)
    }

    if (serverProgress) {
        cached.progress = serverProgress
    } else {
        cached.progress.status = status
        cached.progress.end_time = new Date().toISOString()
        if (active) active.obj_progress.status = status as ObjectiveProgressOutStatus
    }
}

/**
 * Handles Nexuscore rejecting a save because it already finished the
 * progress: ends it in its slot and tells the player their quest has ended.
 */
function handleProgressFinishedByServer(progress: QuestProgressOut, serverStatus: string | undefined) {
    const cached = findCachedProgressById(progress.progress_id)
    if (!cached || isFinished(cached.progress.status)) return  // Slot has moved on, or already ended

    const player = findPlayer(cached.ref.thornyId)
    if (!player) {
        unloadSlot(cached.ref, '', undefined, true)
        return
    }

    const status = isFinished(serverStatus ?? '') ? serverStatus as QuestProgressOutStatus : QuestProgressOutStatus.abandoned
    adoptServerFinish(cached, player, status)
    notifyQuestEnded(player, cached)
}

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

/**
 * Shows the player the daily quest summary.
 */
function showDailySummary(player: Player, cached: CachedQuestProgress, delayTicks: number) {
    system.runTimeout(() => {
        if (!player.isValid) return
        notifyOfQuestUpdate(player, generateDailyDisplayString(cached.quest, cached.progress, true))
    }, delayTicks)
}

/**
 * Syncs the daily quest slot with the player's current daily in Nexuscore.
 *
 * Uses the accept-daily endpoint, which is safe to call repeatedly: it returns
 * the player's unfinished daily while it's running, otherwise accepts today's
 * (or returns today's existing progress, whatever its status). So this both
 * notices a daily that expired server-side and picks up the next one.
 *
 * Whenever a different daily is loaded, the player is shown its summary:
 * on join just after the regular quest's message, otherwise straight away.
 */
export async function syncDailySlot(player: Player, thornyId: number, isJoin: boolean = false): Promise<void> {
    const ref: SlotRef = { thornyId, slot: 'daily' }

    await syncOnce(ref, async () => {
        let progress: QuestProgressOut | null
        try {
            progress = await accept_daily_quest(thornyId)
        } catch (error) {
            // e.g. 400 if the next daily hasn't quite started yet; retried on the next poll
            console.warn(`[daily] Couldn't sync the daily quest for thorny_id ${thornyId}, retrying later:`, error)
            return
        }
        if (!player.isValid) return

        const cached = getCachedProgress(ref)

        // Still the same daily
        if (cached && progress && cached.progress.progress_id === progress.progress_id) {
            // Local progress is ahead of the server until it's saved, so a status from
            // the server never overrides it, except when the server finished a daily
            // that's unfinished here, i.e. it expired.
            if (isFinished(progress.status) && !isFinished(cached.progress.status)) {
                // This is already the server's answer, so there's no newer daily to ask for
                adoptServerFinish(cached, player, progress.status, progress)
                cached.finishHandled = true
                notifyQuestEnded(player, cached)
            }
            return
        }

        // The cached daily is gone: it was replaced by the next one, or none is available
        if (cached) {
            unloadSlot(ref, player.name, player, false)
            if (!isFinished(cached.progress.status)) notifyQuestEnded(player, cached)
        }

        if (!progress) return

        const loaded = await loadSlot(player, ref, progress)
        if (!loaded) return

        // Nexuscore returned finished progress, so there's no newer daily yet
        if (isFinished(progress.status)) loaded.finishHandled = true

        showDailySummary(player, loaded, isJoin ? TicksPerSecond * 11 : TicksPerSecond)
    })
}

/**
 * Once the player finishes their daily (completed or failed), saves it and
 * asks Nexuscore for the next one, e.g. today's after finishing yesterday's
 * while they overlap. Saving first matters: until the save lands, Nexuscore
 * would still return the finished daily as active.
 */
function followUpFinishedDaily(player: Player, thornyId: number) {
    const cached = getCachedProgress({ thornyId, slot: 'daily' })
    if (!cached || cached.finishHandled || !isFinished(cached.progress.status)) return

    cached.finishHandled = true

    flushProgress(cached.progress.progress_id)
        .then(saved => {
            // If the save failed, the regular daily poll catches up later
            if (saved && player.isValid) return syncDailySlot(player, thornyId)
        })
        .catch(e => console.error('[daily] Failed to follow up a finished daily:', e))
}

export default function loadQuestProgressCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number[]>()

    setFinishedProgressHandler(handleProgressFinishedByServer)

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
            followUpFinishedDaily(player, thornyUser.thorny_id)
        }, TicksPerSecond)

        const dailyRunId = system.runInterval(async () => {
            if (!player.isValid) {
                system.clearRun(dailyRunId)
                return
            }

            const thornyUser = ThornyUser.fetch_user(playerName)
            if (!thornyUser) return

            await syncDailySlot(player, thornyUser.thorny_id)
        }, TicksPerSecond * DAILY_POLL_SECONDS)

        PLAYER_LOOP_RUN_IDS.set(playerName, [cacheRunId, tickRunId, dailyRunId])

        // On first join the user may not be cached yet; wait for it so the
        // daily quest loads now rather than on the next daily poll
        const thornyUser = ThornyUser.fetch_user(playerName)
            ?? await ThornyUser.get_user_from_api(playerName).catch(() => undefined)
        if (thornyUser && player.isValid) {
            await Promise.all([
                syncRegularSlot(player, thornyUser),
                syncDailySlot(player, thornyUser.thorny_id, true),
            ])
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
