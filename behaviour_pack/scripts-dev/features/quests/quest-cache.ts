import {system, TicksPerSecond} from "@minecraft/server";
import {getQuestV1GuildsMeQuestsQuestIdGet, listQuestsV1GuildsMeQuestsGet} from "../../api/nexuscore/quests/quests";
import {QuestOut} from "../../api/nexuscore/model";
import {QUEST_PROGRESS_CACHE} from "./progress-store";

export const QUEST_CACHE = new Map<number, QuestOut>()

async function reload_quest_cache() {
    const quests_list = await listQuestsV1GuildsMeQuestsGet({active: true})

    QUEST_CACHE.clear()
    quests_list.forEach(quest => QUEST_CACHE.set(quest.quest_id, quest))

    // Pick up edits to quests players are currently on
    for (const cached of QUEST_PROGRESS_CACHE.values()) {
        const fresh = QUEST_CACHE.get(cached.quest.quest_id)
        if (fresh) cached.quest = fresh
    }
}

/**
 * Returns a quest from the cache, fetching it from Nexuscore if it isn't cached.
 * The cache only reloads every few minutes, so a newly started quest (such as
 * a new daily quest) may not be in it yet.
 */
export async function getQuest(quest_id: number): Promise<QuestOut> {
    const cached = QUEST_CACHE.get(quest_id)
    if (cached) return cached

    const quest = await getQuestV1GuildsMeQuestsQuestIdGet(quest_id)
    QUEST_CACHE.set(quest.quest_id, quest)
    return quest
}
export default function loadQuestCache() {
    system.run(async () => { await reload_quest_cache() })

    system.runInterval(async () => {
        await reload_quest_cache()
    }, TicksPerSecond * 60 * 5)
}