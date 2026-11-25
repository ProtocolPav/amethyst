import { QuestOut, QuestProgressOut } from "../../api/nexuscore/model";
import { SlotRef, slotKey } from "./types/slot";

/**
 * A quest slot's cached progress, together with the quest it belongs to.
 *
 * The quest is kept alongside the progress so that action processing and
 * ticking never depend on QUEST_CACHE, which only holds currently active
 * quests and is cleared on every reload.
 */
export interface CachedQuestProgress {
    ref: SlotRef
    quest: QuestOut
    progress: QuestProgressOut
    /** Daily slot only: set once the slot has asked Nexuscore for the next daily after this one finished. */
    finishHandled?: boolean
}

/** Cached progress per player per slot, keyed by slotKey(). */
export const QUEST_PROGRESS_CACHE = new Map<string, CachedQuestProgress>()

export function getCachedProgress(ref: SlotRef): CachedQuestProgress | undefined {
    return QUEST_PROGRESS_CACHE.get(slotKey(ref))
}

export function setCachedProgress(entry: CachedQuestProgress): void {
    QUEST_PROGRESS_CACHE.set(slotKey(entry.ref), entry)
}

export function deleteCachedProgress(ref: SlotRef): void {
    QUEST_PROGRESS_CACHE.delete(slotKey(ref))
}

/** Finds the slot currently holding the given progress, if any. */
export function findCachedProgressById(progress_id: number): CachedQuestProgress | undefined {
    for (const entry of QUEST_PROGRESS_CACHE.values()) {
        if (entry.progress.progress_id === progress_id) return entry
    }
    return undefined
}
