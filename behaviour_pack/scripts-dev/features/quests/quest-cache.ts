import Quest from "../../api/quests/quest";
import {system, TicksPerSecond} from "@minecraft/server";
import api from "../../api";

export const QUEST_CACHE = new Map<number, Quest>()

export default function loadQuestCache() {
    system.runInterval(async () => {
        const quests = await api.Quest.get_active_quests()

        QUEST_CACHE.clear()
        quests.forEach(quest => QUEST_CACHE.set(quest.quest_id, quest))
    }, TicksPerSecond * 30)
}