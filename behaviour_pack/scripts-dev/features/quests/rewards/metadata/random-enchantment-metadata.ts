import { ItemStack, ItemComponentTypes, EnchantmentTypes, EnchantmentType } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward/reward-metadata";
import { RandomEnchantmentModel } from "../../../../api/nexuscore/model";
import { MinecraftEnchantmentTypes } from "@minecraft/vanilla-data";

// ─── Enchantability per item type ─────────────────────────────────────────────
const ENCHANTABILITY: Record<string, number> = {
    'minecraft:leather_helmet': 15,       'minecraft:leather_chestplate': 15,
    'minecraft:leather_leggings': 15,     'minecraft:leather_boots': 15,
    'minecraft:chainmail_helmet': 12,     'minecraft:chainmail_chestplate': 12,
    'minecraft:chainmail_leggings': 12,   'minecraft:chainmail_boots': 12,
    'minecraft:iron_helmet': 9,           'minecraft:iron_chestplate': 9,
    'minecraft:iron_leggings': 9,         'minecraft:iron_boots': 9,
    'minecraft:diamond_helmet': 10,       'minecraft:diamond_chestplate': 10,
    'minecraft:diamond_leggings': 10,     'minecraft:diamond_boots': 10,
    'minecraft:golden_helmet': 25,        'minecraft:golden_chestplate': 25,
    'minecraft:golden_leggings': 25,      'minecraft:golden_boots': 25,
    'minecraft:netherite_helmet': 15,     'minecraft:netherite_chestplate': 15,
    'minecraft:netherite_leggings': 15,   'minecraft:netherite_boots': 15,
    'minecraft:wooden_sword': 15,   'minecraft:wooden_pickaxe': 15,
    'minecraft:wooden_axe': 15,     'minecraft:wooden_shovel': 15,
    'minecraft:wooden_hoe': 15,
    'minecraft:stone_sword': 5,     'minecraft:stone_pickaxe': 5,
    'minecraft:stone_axe': 5,       'minecraft:stone_shovel': 5,
    'minecraft:stone_hoe': 5,
    'minecraft:iron_sword': 9,      'minecraft:iron_pickaxe': 9,
    'minecraft:iron_axe': 9,        'minecraft:iron_shovel': 9,
    'minecraft:iron_hoe': 9,
    'minecraft:diamond_sword': 10,  'minecraft:diamond_pickaxe': 10,
    'minecraft:diamond_axe': 10,    'minecraft:diamond_shovel': 10,
    'minecraft:diamond_hoe': 10,
    'minecraft:golden_sword': 25,   'minecraft:golden_pickaxe': 25,
    'minecraft:golden_axe': 25,     'minecraft:golden_shovel': 25,
    'minecraft:golden_hoe': 25,
    'minecraft:netherite_sword': 15,'minecraft:netherite_pickaxe': 15,
    'minecraft:netherite_axe': 15,  'minecraft:netherite_shovel': 15,
    'minecraft:netherite_hoe': 15,
    'minecraft:bow': 1,
    'minecraft:book': 1,
    'minecraft:crossbow': 1,
    'minecraft:trident': 9,
    'minecraft:fishing_rod': 1,
}
const DEFAULT_ENCHANTABILITY = 1

// ─── Treasure enchantments ────────────────────────────────────────────────────
const TREASURE_ENCHANTS = new Set<string>([
    MinecraftEnchantmentTypes.Mending,
    MinecraftEnchantmentTypes.FrostWalker,
    MinecraftEnchantmentTypes.SoulSpeed,
    MinecraftEnchantmentTypes.SwiftSneak,
    MinecraftEnchantmentTypes.WindBurst,
    MinecraftEnchantmentTypes.Density,
    MinecraftEnchantmentTypes.Breach,
    MinecraftEnchantmentTypes.Binding,
    MinecraftEnchantmentTypes.Vanishing,
])

// Returns random int in [0, max] with triangle distribution
function triangleRand(max: number): number {
    return Math.floor(Math.random() * (Math.floor(max / 2) + 1))
        + Math.floor(Math.random() * (Math.floor(max / 2) + 1))
}

/**
 * Adds enchantments to an item using the vanilla enchanting table algorithm.
 * `data.level_min` / `data.level_max` are XP levels (like the green number
 * on the enchanting table button). Higher levels = more and stronger enchants.
 */
export class RandomEnchantmentMetadata implements RewardMetadata {
    readonly metadata_type = 'enchantment_random'

    applyToItem(item: ItemStack, data: RandomEnchantmentModel): ItemStack {
        const enchants = item.getComponent(ItemComponentTypes.Enchantable)
        if (!enchants) return item

        const xpLevel = data.level_min + Math.floor(Math.random() * (data.level_max - data.level_min + 1))

        // ── Step 1: Modified enchantment level ─────────────────────────────
        const enchantability = ENCHANTABILITY[item.typeId] ?? DEFAULT_ENCHANTABILITY
        const modifiedLevel  = Math.round(
            (xpLevel + triangleRand(enchantability) + 1) * (0.85 + Math.random() * 0.3)
        )

        // ── Step 2: Build candidate pool ───────────────────────────────────
        const pool = EnchantmentTypes.getAll().filter(e =>
            (data.treasure || !TREASURE_ENCHANTS.has(e.id)) &&
            enchants.canAddEnchantment({ type: e, level: 1 })
        )

        // Fisher-Yates shuffle
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]]
        }

        // ── Step 3: Pick enchantments ───────────────────────────────────────
        let currentLevel = modifiedLevel

        do {
            const pick  = pool.shift()
            if (!pick) break

            const power = Math.min(Math.max(1, Math.round(currentLevel / 10)), pick.maxLevel)

            if (enchants.canAddEnchantment({ type: pick, level: power })) {
                enchants.addEnchantment({ type: pick, level: power })
            }

            currentLevel = Math.floor(currentLevel / 2)
        } while (Math.random() < (currentLevel + 1) / 50)

        return item
    }
}