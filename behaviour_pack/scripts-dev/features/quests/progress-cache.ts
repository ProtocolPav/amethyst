import {Player, system, TicksPerSecond, world} from "@minecraft/server";
import {QUEST_CACHE} from "./quest-cache";
import ThornyUser from "../../api/user";
import {get_quest_progress} from "./core/fetch";
import {QuestProgressOut} from "../../api/nexuscore/model";

export const QUEST_PROGRESS_CACHE = new Map<number, QuestProgressOut>()

export default function loadQuestProgressCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number>()

    async function new_active_quest(questProgress: QuestProgressOut, thornyUser: ThornyUser, player: Player) {
        const quest = QUEST_CACHE.get(questProgress.quest_id)!

        QUEST_PROGRESS_CACHE.set(thornyUser.thorny_id, questProgress)

        player.sendMessage(`You have a quest active: ${quest.title}`)
    }

    async function dropped_quest(questProgress: QuestProgressOut, thornyUser: ThornyUser, player: Player) {
        const cached_quest = QUEST_CACHE.get(questProgress.quest_id)!

        QUEST_PROGRESS_CACHE.delete(thornyUser.thorny_id)

        player.sendMessage(`You have dropped: ${cached_quest.title}`)
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

    world.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
        if (spawn_event.initialSpawn) {
            const runId = system.runInterval(async () => {
                await update_player_quest(spawn_event.player.name)
            }, TicksPerSecond * 2)

            PLAYER_LOOP_RUN_IDS.set(spawn_event.player.name, runId)
        } else {
            // They are respawning, so count their death down.
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
            QUEST_PROGRESS_CACHE.delete(thorny_user.thorny_id)
        }
    })
}