import { system, TicksPerSecond } from "@minecraft/server";
import { QuestProgressOut, QuestProgressUpdate } from "../../api/nexuscore/model";
import {
    partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut
} from "../../api/nexuscore/quests/quests";
import { QUEST_PROGRESS_CACHE } from "./progress-cache";

// Dirty set — thorny_ids of players whose progress needs flushing
const DIRTY = new Map<number, QuestProgressOut>()  // thorny_id → snapshot

/**
 * Mark a player's progress as dirty.
 * Call this after any mutation to QUEST_PROGRESS_CACHE.
 */

export function markDirty(thorny_id: number): void {
    const progress = QUEST_PROGRESS_CACHE.get(thorny_id)
    if (progress) DIRTY.set(thorny_id, progress)  // snapshot at mark time
}

/**
 * Converts the full QuestProgressOut from the cache into the minimal
 * QuestProgressUpdate payload the API expects.
 */
function buildUpdate(progress: QuestProgressOut): QuestProgressUpdate {
    return {
        status: progress.status,
        start_time: progress.start_time,
        end_time: progress.end_time,
        objectives: progress.objectives.map(obj => ({
            progress_id: obj.progress_id,
            objective_id: obj.objective_id,
            status: obj.status,
            start_time: obj.start_time,
            end_time: obj.end_time,
            target_progress: obj.target_progress,
            customization_progress: obj.customization_progress,
        }))
    }
}

/**
 * Flushes all dirty progress entries to the API.
 * Failures are logged but do not throw — a missed flush will retry next tick.
 */
async function flush(): Promise<void> {
    if (DIRTY.size === 0) return

    for (const [thorny_id, progress] of DIRTY) {
        try {
            console.log(`[write-back] Flushing progress for thorny_id ${thorny_id}`)

            await partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut(
                progress.progress_id,
                buildUpdate(progress)
            )
            DIRTY.delete(thorny_id)  // only remove on success
        } catch (error) {
            // Leave in DIRTY — retries next interval with the same snapshot
            console.error(`[write-back] Failed to flush progress for thorny_id ${thorny_id}:`, error)
        }
    }
}

export default function loadWriteBackLoop(): void {
    system.runInterval(async () => {
        await flush()
    }, TicksPerSecond * 5)  // flush every 5 seconds
}