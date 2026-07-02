import Quest from "../../api/quests/quest";
import {system, TicksPerSecond} from "@minecraft/server";
import api from "../../api";

export const QUEST_CACHE = new Map<number, Quest>()

async function reload_quest_cache() {
    const quests = await api.Quest.get_active_quests()

    QUEST_CACHE.clear()
    quests.forEach(quest => QUEST_CACHE.set(quest.quest_id, quest))
}

export default function loadQuestCache() {
    system.run(async () => { await reload_quest_cache() })

    system.runInterval(async () => {
        await reload_quest_cache()
    }, TicksPerSecond * 60 * 5)
}