import { Player, system, TicksPerSecond, world } from "@minecraft/server";
import { QUEST_CACHE } from "./quest-cache";
import ThornyUser from "../../api/user";
import { get_quest_progress } from "./core/fetch";
import { QuestProgressOut, QuestProgressOutStatus } from "../../api/nexuscore/model";
import { QuestProcessor } from "./processors/quest-processor";
import { notifyOfQuestUpdate } from "./core/notify";
import { activateObjective, deactivateObjective } from "./core/objective/objective-lifecycle";
import { tickPlugins } from "./core/objective/objective-tick";
import { getActiveObjective } from "./core/objective/objective-lookup";
import {generateObjectiveDisplayString} from "./core/objective/objective-display";

export const QUEST_PROGRESS_CACHE = new Map<number, QuestProgressOut>()

const questProcessor = new QuestProcessor()

export default function loadQuestProgressCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number[]>()

    async function new_active_quest(questProgress: QuestProgressOut, thornyUser: ThornyUser, player: Player) {
        const quest = QUEST_CACHE.get(questProgress.quest_id)!

        QUEST_PROGRESS_CACHE.set(thornyUser.thorny_id, questProgress)
        const active = getActiveObjective(quest, questProgress)

        // Activate the current objective if the quest is active
        if (questProgress.status === QuestProgressOutStatus.active) {
            if (active) {
                activateObjective(player, thornyUser.thorny_id, active.obj_def, active.obj_progress)
            }
        }

        system.runTimeout(() => {
            notifyOfQuestUpdate(
                player,
                generateObjectiveDisplayString(
                    active?.obj_def!,
                    quest.objectives.indexOf(active?.obj_def!) + 1,
                    quest.objectives.length,
                    quest.title
                )
            )
        }, TicksPerSecond * 10)
    }

    async function dropped_quest(questProgress: QuestProgressOut, thornyUser: ThornyUser, player: Player) {
        const cached_quest = QUEST_CACHE.get(questProgress.quest_id)!
        const cached_quest_progress = QUEST_PROGRESS_CACHE.get(thornyUser.thorny_id)!

        // Deactivate the active objective before evicting
        const active = getActiveObjective(cached_quest as any, questProgress)
        if (active) {
            deactivateObjective(player, thornyUser.thorny_id, active.obj_def, active.obj_progress)
        }

        QUEST_PROGRESS_CACHE.delete(thornyUser.thorny_id)

        if (cached_quest_progress.status !== "completed" && cached_quest_progress.status !== "failed") {
            notifyOfQuestUpdate(player, `You have dropped your quest: ${cached_quest.title}`)
        }
    }

    async function update_player_quest(player_name: string) {
        const player = world.getPlayers().find((p) => p.name == player_name)
        if (!player) return;

        const thorny_user = ThornyUser.fetch_user(player_name)!
        const questProgress = await get_quest_progress(thorny_user.thorny_id)
        const cachedQuestProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)

        // User has accepted a new quest
        if (questProgress && cachedQuestProgress?.progress_id !== questProgress.progress_id) {
            await new_active_quest(questProgress, thorny_user, player)
        }

        // User has dropped a quest
        else if (!questProgress && cachedQuestProgress) {
            await dropped_quest(cachedQuestProgress, thorny_user, player)
        }
    }

    async function tickQuest(player_name: string) {
        const player = world.getPlayers().find((p) => p.name == player_name)
        if (!player) return;

        const thorny_user = ThornyUser.fetch_user(player_name)!
        const cachedQuestProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)
        if (!cachedQuestProgress) return

        const quest = QUEST_CACHE.get(cachedQuestProgress.quest_id)
        if (!quest) return

        const active = getActiveObjective(quest as any, cachedQuestProgress)
        if (!active) return

        const signal = tickPlugins(player, thorny_user.thorny_id, active.obj_def, active.obj_progress)
        if (signal === 'fail') {
            questProcessor.fail(player, quest as any, cachedQuestProgress)
        } else if (signal === 'skip') {
            questProcessor.skipObjective(player, quest as any, cachedQuestProgress)
        }
    }

    async function runPlayerInit(player: Player, playerName: string) {
        const thorny_user = ThornyUser.fetch_user(playerName)!
        if (thorny_user) {
            const questProgress = await get_quest_progress(thorny_user.thorny_id)
            if (questProgress) {
                await new_active_quest(questProgress, thorny_user, player)
            }
        }

        const cacheRunId = system.runInterval(async () => {
            if (!player.isValid) {
                system.clearRun(cacheRunId)
                return
            }
            await update_player_quest(playerName)
        }, TicksPerSecond * 2)

        const tickRunId = system.runInterval(async () => {
            if (!player.isValid) {
                system.clearRun(tickRunId)
                return
            }
            await tickQuest(playerName)
        }, TicksPerSecond)

        PLAYER_LOOP_RUN_IDS.set(playerName, [cacheRunId, tickRunId])
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

    world.beforeEvents.playerLeave.subscribe((leave_event) => {
        const runIds = PLAYER_LOOP_RUN_IDS.get(leave_event.player.name)
        if (runIds !== undefined) {
            runIds.map(i => system.clearRun(i))
            PLAYER_LOOP_RUN_IDS.delete(leave_event.player.name)
        }

        const thorny_user = ThornyUser.fetch_user(leave_event.player.name)!

        if (thorny_user) {
            const questProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)

            // Deactivate the active objective before evicting the cache entry
            if (questProgress) {
                const quest = QUEST_CACHE.get(questProgress.quest_id)
                const active = quest ? getActiveObjective(quest as any, questProgress) : undefined
                if (active) {
                    deactivateObjective(leave_event.player, thorny_user.thorny_id, active.obj_def, active.obj_progress)
                }
            }

            QUEST_PROGRESS_CACHE.delete(thorny_user.thorny_id)
        }
    })
}