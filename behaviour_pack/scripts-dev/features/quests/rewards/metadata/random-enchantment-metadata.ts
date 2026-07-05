import { ItemStack, ItemComponentTypes, EnchantmentTypes, EnchantmentType } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";
import { RandomEnchantmentModel } from "../../../../api/nexuscore/model";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

const TREASURE_ENCHANTS = new Set<string>([
    MinecraftEnchantmentTypes.Mending,
    MinecraftEnchantmentTypes.FrostWalker,
    MinecraftEnchantmentTypes.SoulSpeed,
    MinecraftEnchantmentTypes.SwiftSneak,
    MinecraftEnchantmentTypes.WindBurst,
    MinecraftEnchantmentTypes.Density,
    MinecraftEnchantmentTypes.Breach,
])

/**
 * Adds one random enchantment from the applicable pool.
 * The level is randomised in [level_min, level_max].
 * When `treasure` is false, treasure-only enchantments are excluded.
 */
export class RandomEnchantmentMetadata implements RewardMetadata {
    readonly metadata_type = 'enchantment_random'

    applyToItem(item: ItemStack, data: RandomEnchantmentModel): ItemStack {
        const enchants = item.getComponent(ItemComponentTypes.Enchantable)
        if (!enchants) return item

        const level = data.level_min + Math.floor(Math.random() * (data.level_max - data.level_min + 1))
        const pool  = EnchantmentTypes.getAll().filter(e =>
            data.treasure || !TREASURE_ENCHANTS.has(e.id)
        )

        // Fisher-Yates shuffle
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]]
        }

        for (const type of pool) {
            if (enchants.canAddEnchantment({ type, level })) {
                enchants.addEnchantment({ type, level })
                break
            }
        }

        return item
    }
}