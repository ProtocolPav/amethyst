import { RewardMetadata } from "../../core/reward-metadata";
import { EnchantmentMetadata }       from "./enchantment-metadata";
import { RandomEnchantmentMetadata } from "./random-enchantment-metadata";
import { PotionMetadata }            from "./potion-metadata";
import { NameMetadata }              from "./name-metadata";
import { LoreMetadata }              from "./lore-metadata";
import { DamageMetadata }            from "./damage-metadata";
import { RandomCountMetadata }       from "./random-count-metadata";
import { TimedMetadata }             from "./timed-metadata";
import { FirstMetadata }             from "./first-metadata";

/**
 * All registered RewardMetadata handlers, keyed by metadata_type.
 *
 * Lookup is O(1). To add a new metadata type:
 *   1. Create its class in rewards/metadata/
 *   2. Add it here — no other files need to change.
 */
export const REWARD_METADATA_REGISTRY = new Map<string, RewardMetadata>([
    ['enchantment',        new EnchantmentMetadata()],
    ['enchantment_random', new RandomEnchantmentMetadata()],
    ['potion',             new PotionMetadata()],
    ['name',               new NameMetadata()],
    ['lore',               new LoreMetadata()],
    ['damage',             new DamageMetadata()],
    ['random_count',       new RandomCountMetadata()],
    ['timed',              new TimedMetadata()],
    ['first',              new FirstMetadata()],
])
