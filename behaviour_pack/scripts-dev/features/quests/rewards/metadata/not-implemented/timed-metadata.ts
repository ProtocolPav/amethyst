import { Player } from "@minecraft/server";
import { RewardOut, ObjectiveProgressOut } from "../../../../../api/nexuscore/model";
import { RewardMetadata } from "../../../core/reward/reward-metadata";

/**
 * Gater — suppresses the reward if the player took longer than `seconds`
 * to complete the objective.
 *
 * This is distinct from the timer customization (TimerPlugin), which fails
 * or skips the entire objective on timeout. TimedMetadata only affects
 * whether this specific reward is delivered — the objective completes
 * regardless.
 *
 * Requires a new IMetadata variant from the API:
 *   { metadata_type: 'timed', seconds: number }
 */
export class TimedMetadata implements RewardMetadata {
    readonly metadata_type = 'timed'

    async shouldGrant(
        _player: Player,
        _thorny_id: number,
        reward: RewardOut,
        objectiveProgress: ObjectiveProgressOut,
    ): Promise<boolean> {
        const meta = reward.item_metadata.find(m => m.metadata_type === 'timed') as any
        if (!meta) return true

        if (!objectiveProgress.start_time || !objectiveProgress.end_time) return false

        const elapsed = (
            new Date(objectiveProgress.end_time).getTime() -
            new Date(objectiveProgress.start_time).getTime()
        ) / 1000

        return elapsed <= meta.seconds
    }
}
