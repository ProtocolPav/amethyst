import { ItemStack, ItemComponentTypes, EnchantmentTypes } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";

/**
 * Adds one random enchantment from the applicable pool.
 * The level is randomised in [level_min, level_max].
 * When `treasure` is false, treasure-only enchantments are excluded.
 */
export class RandomEnchantmentMetadata implements RewardMetadata {
    readonly metadata_type = 'enchantment_random'

    applyToItem(
        item: ItemStack,
        data: { level_min: number; level_max: number; treasure: boolean }
    ): ItemStack {
        const enchants = item.getComponent(ItemComponentTypes.Enchantable)
        if (!enchants) return item

        const level = data.level_min + Math.floor(Math.random() * (data.level_max - data.level_min + 1))
        const all   = EnchantmentTypes.getAll()
        const pool  = data.treasure ? all : all.filter(e => !e.isTreasure)

        for (const type of pool.sort(() => Math.random() - 0.5)) {
            if (enchants.canAddEnchantment({ type, level })) {
                enchants.addEnchantment({ type, level })
                break
            }
        }

        return item
    }
}
