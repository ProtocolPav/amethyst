import { system, TicksPerSecond } from "@minecraft/server";
import { QuestProgressOut, QuestProgressUpdate } from "../../api/nexuscore/model";
import {
    partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut
} from "../../api/nexuscore/quests/quests";

// Dirty set — quest progress that needs flushing, keyed by progress_id.
// Keyed by progress rather than player so that a player moving on to new
// progress (e.g. a new daily quest) can't overwrite an unflushed old one.
// `mark` increases on every markDirty, so a flush can tell whether the
// progress changed again while its request was in flight.
const DIRTY = new Map<number, { progress: QuestProgressOut, mark: number }>()  // progress_id → entry
let markCounter = 0

/**
 * Mark quest progress as dirty.
 * Call this after any mutation to cached quest progress.
 */
export function markDirty(progress: QuestProgressOut): void {
    DIRTY.set(progress.progress_id, { progress, mark: ++markCounter })
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

    for (const [progress_id, { progress, mark }] of DIRTY) {
        try {
            await partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut(
                progress.progress_id,
                buildUpdate(progress)
            )
            // Only remove on success, and only if it wasn't marked again mid-flush
            if (DIRTY.get(progress_id)?.mark === mark) DIRTY.delete(progress_id)
        } catch (error) {
            // Leave in DIRTY — retries next interval with the same snapshot
            console.error(`[write-back] Failed to flush progress ${progress_id} (thorny_id ${progress.thorny_id}):`, error)
        }
    }
}

export default function loadWriteBackLoop(): void {
    system.runInterval(async () => {
        await flush()
    }, TicksPerSecond * 5)  // flush every 5 seconds
}