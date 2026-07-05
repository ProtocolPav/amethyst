import { Player } from "@minecraft/server";
import { RewardOut, ObjectiveProgressOut } from "../../../../../api/nexuscore/model";
import { RewardMetadata } from "../../../core/reward-metadata";

/**
 * Gater — suppresses the reward if `max_recipients` players have already
 * completed this objective.
 *
 * Requires two things not yet in place:
 *   1. A new IMetadata variant: { metadata_type: 'first', max_recipients: number }
 *   2. An API endpoint (or server-side counter) to query how many players
 *      have already completed a given objective.
 *
 * Until both exist, shouldGrant() always returns true and logs a warning.
 */
export class FirstMetadata implements RewardMetadata {
    readonly metadata_type = 'first'

    async shouldGrant(
        _player: Player,
        _thorny_id: number,
        reward: RewardOut,
        _objectiveProgress: ObjectiveProgressOut,
    ): Promise<boolean> {
        // TODO: query completion count from API when endpoint is available
        console.warn(
            `[FirstMetadata] Completion count check not yet implemented for reward_id ${reward.reward_id}`
        )
        return true
    }
}
