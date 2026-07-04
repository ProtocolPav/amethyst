import { Player, system, TicksPerSecond, world } from "@minecraft/server";
import { QUEST_CACHE } from "./quest-cache";
import ThornyUser from "../../api/user";
import { get_quest_progress } from "./core/fetch";
import { ObjectiveOut, ObjectiveProgressOut, ObjectiveProgressOutStatus, QuestProgressOut, QuestProgressOutStatus } from "../../api/nexuscore/model";
import { activateObjective, deactivateObjective, tickPlugins } from "./processors/objective-processor";
import { QuestProcessor } from "./processors/quest-processor";
import utils from "../../utils";
import {notifyOfQuestUpdate} from "./core/notify";

export const QUEST_PROGRESS_CACHE = new Map<number, QuestProgressOut>()

const questProcessor = new QuestProcessor()

/**
 * Returns the active ObjectiveProgressOut for a quest progress, or undefined if none.
 */
function getActiveObjectiveProgress(questProgress: QuestProgressOut): ObjectiveProgressOut | undefined {
    return questProgress.objectives.find(o => o.status === ObjectiveProgressOutStatus.active)
}

/**
 * Resolves the ObjectiveOut definition for a given ObjectiveProgressOut,
 * looking up the quest definition from QUEST_CACHE.
 *
 * Casts via unknown since QUEST_CACHE stores the legacy Objective class,
 * which is structurally compatible with ObjectiveOut for processor purposes.
 */
function getObjectiveDef(questProgress: QuestProgressOut, objectiveProgress: ObjectiveProgressOut): ObjectiveOut | undefined {
    const quest = QUEST_CACHE.get(questProgress.quest_id)
    if (!quest) return undefined
    return quest.objectives.find(o => o.objective_id === objectiveProgress.objective_id) as unknown as ObjectiveOut
}

export default function loadQuestProgressCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number>()

    async function new_active_quest(questProgress: QuestProgressOut, thornyUser: ThornyUser, player: Player) {
        const quest = QUEST_CACHE.get(questProgress.quest_id)!

        QUEST_PROGRESS_CACHE.set(thornyUser.thorny_id, questProgress)

        // Activate the current objective if the quest is active
        if (questProgress.status === QuestProgressOutStatus.active) {
            const activeObjectiveProgress = getActiveObjectiveProgress(questProgress)
            if (activeObjectiveProgress) {
                const activeObjectiveDef = getObjectiveDef(questProgress, activeObjectiveProgress)
                if (activeObjectiveDef) {
                    activateObjective(player, thornyUser.thorny_id, activeObjectiveDef, activeObjectiveProgress)
                }
            }
        }

        system.runTimeout(() => {
            notifyOfQuestUpdate(player, `You have a quest active: ${quest.title}`)
        }, TicksPerSecond * 10)
    }

    async function dropped_quest(questProgress: QuestProgressOut, thornyUser: ThornyUser, player: Player) {
        const cached_quest = QUEST_CACHE.get(questProgress.quest_id)!

        // Deactivate the active objective before evicting
        const activeObjectiveProgress = getActiveObjectiveProgress(questProgress)
        if (activeObjectiveProgress) {
            const activeObjectiveDef = getObjectiveDef(questProgress, activeObjectiveProgress)
            if (activeObjectiveDef) {
                deactivateObjective(player, thornyUser.thorny_id, activeObjectiveDef, activeObjectiveProgress)
            }
        }

        QUEST_PROGRESS_CACHE.delete(thornyUser.thorny_id)

        notifyOfQuestUpdate(player, `You have dropped your quest: ${cached_quest.title}`)
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

        // Tick watcher plugins (timer, death) for the player's active objective.
        // This runs on every interval so watchers fire even with no game action.
        else if (cachedQuestProgress) {
            const activeObjectiveProgress = getActiveObjectiveProgress(cachedQuestProgress)
            if (activeObjectiveProgress) {
                const activeObjectiveDef = getObjectiveDef(cachedQuestProgress, activeObjectiveProgress)
                if (activeObjectiveDef && player) {
                    const quest = QUEST_CACHE.get(cachedQuestProgress.quest_id)
                    if (quest) {
                        const signal = tickPlugins(player, thorny_user.thorny_id, activeObjectiveDef, activeObjectiveProgress)
                        if (signal === 'fail') {
                            questProcessor.fail(player, quest as any, cachedQuestProgress)
                        } else if (signal === 'advance') {
                            questProcessor.advance(player, quest as any, cachedQuestProgress)
                        }
                    }
                }
            }
        }
    }

    world.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
        if (spawn_event.initialSpawn) {
            // Load quest progress into cache on initial join
            const thorny_user = ThornyUser.fetch_user(spawn_event.player.name)!
            if (thorny_user) {
                const questProgress = await get_quest_progress(thorny_user.thorny_id)
                if (questProgress) {
                    await new_active_quest(questProgress, thorny_user, spawn_event.player)
                }
            }

            const runId = system.runInterval(async () => {
                await update_player_quest(spawn_event.player.name)
            }, TicksPerSecond * 2)

            PLAYER_LOOP_RUN_IDS.set(spawn_event.player.name, runId)
        }
    })

    world.afterEvents.playerLeave.subscribe((leave_event) => {
        const runId = PLAYER_LOOP_RUN_IDS.get(leave_event.playerName)
        if (runId !== undefined) {
            system.clearRun(runId)
            PLAYER_LOOP_RUN_IDS.delete(leave_event.playerName)
        }

        const thorny_user = ThornyUser.fetch_user(leave_event.playerName)!

        if (thorny_user) {
            const questProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)

            // Deactivate the active objective before evicting the cache entry
            if (questProgress) {
                const activeObjectiveProgress = getActiveObjectiveProgress(questProgress)
                if (activeObjectiveProgress) {
                    const activeObjectiveDef = getObjectiveDef(questProgress, activeObjectiveProgress)
                    if (activeObjectiveDef) {
                        const player = world.getPlayers().find(p => p.name === leave_event.playerName)
                        if (player) {
                            deactivateObjective(player, thorny_user.thorny_id, activeObjectiveDef, activeObjectiveProgress)
                        }
                    }
                }
            }

            QUEST_PROGRESS_CACHE.delete(thorny_user.thorny_id)
        }
    })
}
