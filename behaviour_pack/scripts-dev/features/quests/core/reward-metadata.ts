import { Player } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";
import { RewardOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";

/**
 * A RewardMetadata is a modular participant in the reward delivery pipeline.
 *
 * Metadata entries live in RewardOut.item_metadata, discriminated by
 * `metadata_type`. Each entry can implement any combination of the three
 * hooks below — omitting a hook means this metadata has nothing to do at
 * that stage.
 *
 * There are three conceptual metadata types:
 *
 *   ItemMutators — implement only `applyToItem`. They modify the ItemStack
 *                    after it is constructed (Name, Lore, Enchantment, Damage,
 *                    Potion). Ignored entirely for non-item rewards.
 *
 *   Gaters — implement only `shouldGrant`. They can suppress the
 *                    reward entirely (Timed, First). If ANY gater returns
 *                    false, the reward is skipped.
 *
 *   Transformers — implement only `transform`. They mutate the RewardOut
 *                    before the granter sees it (RandomCount). Called only
 *                    after all gaters have passed.
 *
 * A single metadata entry may implement more than one hook if needed.
 */
export interface RewardMetadata {
    readonly metadata_type: string

    /**
     * Mutates the ItemStack being built for an item reward.
     * Called once per metadata entry, in order, by ItemReward.
     * Ignored entirely for non-item granters (Balance, Effect).
     */
    applyToItem?(item: ItemStack, data: any): ItemStack

    /**
     * Called before the granter runs.
     * Return false to suppress this reward — the player receives nothing.
     */
    shouldGrant?(
        player: Player,
        thorny_id: number,
        reward: RewardOut,
        objectiveProgress: ObjectiveProgressOut,
    ): Promise<boolean>

    /**
     * Called after all shouldGrant checks pass, before the granter runs.
     * Return a mutated copy of the reward (e.g. with a new randomised count).
     * Return the reward unchanged if no transformation is needed.
     */
    transform?(reward: RewardOut): RewardOut
}
