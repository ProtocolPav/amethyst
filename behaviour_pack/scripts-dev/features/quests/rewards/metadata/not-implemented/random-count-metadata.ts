import { RewardOut } from "../../../../../api/nexuscore/model";
import { RewardMetadata } from "../../../core/reward-metadata";

/**
 * Transformer — overrides reward.count with a random value in [count_min, count_max].
 *
 * Applied before the granter runs, so ItemReward (and the notification message)
 * both see the final randomised count.
 *
 * Requires a new IMetadata variant from the API:
 *   { metadata_type: 'random_count', count_min: number, count_max: number }
 */
export class RandomCountMetadata implements RewardMetadata {
    readonly metadata_type = 'random_count'

    transform(reward: RewardOut): RewardOut {
        const meta = reward.item_metadata.find(m => m.metadata_type === 'random_count') as any
        if (!meta) return reward

        const count = meta.count_min + Math.floor(Math.random() * (meta.count_max - meta.count_min + 1))
        return { ...reward, count }
    }
}
