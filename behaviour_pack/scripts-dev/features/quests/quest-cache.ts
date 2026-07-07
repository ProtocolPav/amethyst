import {system, TicksPerSecond} from "@minecraft/server";
import {listQuestsV1GuildsMeQuestsGet} from "../../api/nexuscore/quests/quests";
import {QuestOut} from "../../api/nexuscore/model";

export const QUEST_CACHE = new Map<number, QuestOut>()

async function reload_quest_cache() {
    const quests_list = await listQuestsV1GuildsMeQuestsGet({active: true})

    QUEST_CACHE.clear()
    quests_list.forEach(quest => QUEST_CACHE.set(quest.quest_id, quest))
}

export default function loadQuestCache() {
    system.run(async () => { await reload_quest_cache() })

    system.runInterval(async () => {
        await reload_quest_cache()
    }, TicksPerSecond * 60 * 5)
}