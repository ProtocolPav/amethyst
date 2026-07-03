import loadQuestProgressCache from "./progress-cache";
import load_quest_loop from "./quests-old";
import loadQuestCache from "./quest-cache";

export default function loadQuestsFeature() {
    // Quest definitions must be loaded before progress, since progress-cache
    // reads from QUEST_CACHE when activating objectives on playerSpawn.
    loadQuestCache()
    loadQuestProgressCache()
    //load_quest_loop()
}
