import loadQuestProgressCache from "./progress-cache";
import loadQuestCache from "./quest-cache";
import loadMineHandler from "./handlers/mine";
import loadKillHandler from "./handlers/kill";
import loadWriteBackLoop from "./write-back";

export default function loadQuestsFeature() {
    loadQuestCache()
    loadQuestProgressCache()
    loadMineHandler()
    loadKillHandler()
    loadWriteBackLoop()
}
