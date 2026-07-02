import loadQuestProgressCache from "./progress-cache";
import load_quest_loop from "./quests-old";
import loadQuestCache from "./quest-cache";

export default function loadQuestsFeature() {
    loadQuestProgressCache()
    loadQuestCache()
    //load_quest_loop()
}