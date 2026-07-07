import loadQuestProgressCache from "./progress-cache";
import loadQuestCache from "./quest-cache";
import loadWriteBackLoop from "./write-back";

export default function loadQuestsFeature() {
    loadQuestCache()
    loadQuestProgressCache()
    loadWriteBackLoop()
}
