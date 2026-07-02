import QuestProgress from "../../api/quests/quest_progress";
import {system, TicksPerSecond, world} from "@minecraft/server";
import api from "../../api";
import {QUEST_CACHE} from "./quest-cache";

export const QUEST_PROGRESS_CACHE = new Map<number, QuestProgress>()

export default function loadQuestProgressCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number>()

    async function update_player_quest(player_name: string) {
        const player = world.getPlayers().find((p) => p.name == player_name)
        if (!player) return;

        const thorny_user = api.ThornyUser.fetch_user(player_name)!
        const questProgress = await api.QuestProgress.get_quest_progress(thorny_user)
        const cachedQuestProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)

        if (questProgress && cachedQuestProgress?.progress_id !== questProgress.progress_id) {
            const quest = QUEST_CACHE.get(questProgress.quest_id)!

            QUEST_PROGRESS_CACHE.set(thorny_user.thorny_id, questProgress)

            console.log(`Quest Fetched ${quest}`)

            player.sendMessage(`You have a quest active: ${quest.title}`)
        } else if (!questProgress && cachedQuestProgress) {
            const cached_quest = QUEST_CACHE.get(cachedQuestProgress.quest_id)!

            QUEST_PROGRESS_CACHE.delete(thorny_user.thorny_id)

            player.sendMessage(`You have dropped: ${cached_quest.title}`)
        } else if (questProgress && cachedQuestProgress?.progress_id === questProgress.progress_id) {
            await questProgress.update_user_quest()
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

        const thorny_user = api.ThornyUser.fetch_user(leave_event.playerName)!

        if (thorny_user) {
            QUEST_PROGRESS_CACHE.delete(thorny_user.thorny_id)
        }
    })
}