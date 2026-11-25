import { system, TicksPerSecond } from "@minecraft/server";
import { QuestProgressOut, QuestProgressUpdate } from "../../api/nexuscore/model";
import {
    partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut
} from "../../api/nexuscore/quests/quests";
import { ConflictError } from "../../api/http-errors";

// Dirty set — quest progress that needs flushing, keyed by progress_id.
// Keyed by progress rather than player so that a player moving on to new
// progress (e.g. a new daily quest) can't overwrite an unflushed old one.
// `mark` increases on every markDirty, so a flush can tell whether the
// progress changed again while its request was in flight.
const DIRTY = new Map<number, { progress: QuestProgressOut, mark: number }>()  // progress_id → entry
let markCounter = 0
let flushing = false

/**
 * Called when Nexuscore rejects a save because it has already finished the
 * progress (409 progress_finished), usually because the quest expired.
 * Registered by progress-cache.ts, which evicts the progress from its slot.
 */
type FinishedProgressHandler = (progress: QuestProgressOut, serverStatus: string | undefined) => void
let onProgressFinished: FinishedProgressHandler | undefined

export function setFinishedProgressHandler(handler: FinishedProgressHandler): void {
    onProgressFinished = handler
}

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
 * Failures are logged but do not throw — a missed flush will retry next tick,
 * except for progress Nexuscore has already finished, which is never retried.
 */
async function flush(): Promise<void> {
    if (DIRTY.size === 0 || flushing) return
    flushing = true
    try {
        await flushAll()
    } finally {
        flushing = false
    }
}

async function flushAll(): Promise<void> {
    for (const [progress_id, { progress, mark }] of DIRTY) {
        try {
            await partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut(
                progress.progress_id,
                buildUpdate(progress)
            )
            // Only remove on success, and only if it wasn't marked again mid-flush
            if (DIRTY.get(progress_id)?.mark === mark) DIRTY.delete(progress_id)
        } catch (error) {
            if (error instanceof ConflictError && error.detail?.error === 'progress_finished') {
                // The server finished this progress (e.g. the quest expired).
                // Finished progress is final, so retrying can never succeed.
                DIRTY.delete(progress_id)
                console.warn(`[write-back] Progress ${progress_id} was already ${error.detail.status} on the server, dropping it`)
                try {
                    onProgressFinished?.(progress, error.detail.status)
                } catch (handlerError) {
                    console.error(`[write-back] Failed to handle finished progress ${progress_id}:`, handlerError)
                }
                continue
            }

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