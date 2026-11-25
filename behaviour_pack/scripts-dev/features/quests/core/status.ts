import { QuestProgressOutStatus } from "../../../api/nexuscore/model";

const FINISHED_STATUSES: readonly string[] = [
    QuestProgressOutStatus.completed,
    QuestProgressOutStatus.failed,
    QuestProgressOutStatus.abandoned,
]

/**
 * Whether quest progress is finished: completed, failed (the player genuinely
 * failed) or abandoned (the player dropped it, or it expired unfinished).
 * Nexuscore rejects updates to finished progress.
 */
export function isFinished(status: string): boolean {
    return FINISHED_STATUSES.includes(status)
}
