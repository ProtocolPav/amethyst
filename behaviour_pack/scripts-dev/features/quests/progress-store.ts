import { QuestOut, QuestProgressOut } from "../../api/nexuscore/model";

/**
 * A player's cached quest progress, together with the quest it belongs to.
 *
 * The quest is kept alongside the progress so that action processing and
 * ticking never depend on QUEST_CACHE, which only holds currently active
 * quests and is cleared on every reload.
 */
export interface CachedQuestProgress {
    quest: QuestOut
    progress: QuestProgressOut
}

export const QUEST_PROGRESS_CACHE = new Map<number, CachedQuestProgress>()
