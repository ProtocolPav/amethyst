import loadQuestProgressCache from "./progress-cache";
import loadQuestCache from "./quest-cache";
import loadMineHandler from "./handlers/mine";
import loadKillHandler from "./handlers/kill";
import loadWriteBackLoop from "./write-back";

export default function loadQuestsFeature() {
    // Quest definitions must be loaded before progress, since progress-cache
    // reads from QUEST_CACHE when activating objectives on playerSpawn.
    loadQuestCache()
    loadQuestProgressCache()
    loadMineHandler()
    loadKillHandler()
    loadWriteBackLoop()
}
