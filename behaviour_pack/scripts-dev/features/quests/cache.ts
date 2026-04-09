import QuestProgress from "../../api/quests/quest_progress";
import {system, TicksPerSecond, world} from "@minecraft/server";
import api from "../../api";
import ThornyUser from "../../api/user";

export const QUEST_CACHE: Record<number, QuestProgress> = {}

export default function loadQuestCache() {
    const PLAYER_LOOP_RUN_IDS = new Map<string, number>()

    async function update_player_quest(player_name: string) {
        console.log(`Updating quest cache for ${player_name}`)
        const player = world.getPlayers().find((p) => p.name == player_name)
        if (!player) return;

        const thorny_user = api.ThornyUser.fetch_user(player_name)!
        const quest = await api.QuestProgress.get_quest_progress(thorny_user)

        if (quest && QUEST_CACHE[thorny_user.thorny_id]?.progress_id !== quest.progress_id) {
            QUEST_CACHE[thorny_user.thorny_id] = quest

            player.sendMessage(`You have a quest active: ${quest.quest.title}`)
        } else if (!quest && QUEST_CACHE[thorny_user.thorny_id]) {
            const previous_quest = QUEST_CACHE[thorny_user.thorny_id]
            delete QUEST_CACHE[thorny_user.thorny_id]

            player.sendMessage(`You have dropped: ${previous_quest.quest.title}`)
        }
    }

    world.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
        if (spawn_event.initialSpawn) {
            const runId = system.runInterval(async () => {await update_player_quest(spawn_event.player.name)}, TicksPerSecond * 2)

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
            delete QUEST_CACHE[thorny_user.thorny_id]
        }
    })
}