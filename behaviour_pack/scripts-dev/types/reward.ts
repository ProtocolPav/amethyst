import {MinecraftEnchantmentTypes, MinecraftPotionDeliveryTypes, MinecraftPotionEffectTypes} from "@minecraft/vanilla-data";

interface Enchantment {
    metadata_type: 'enchantment'
    enchantment_id: MinecraftEnchantmentTypes
    enchantment_level: number
}

interface RandomEnchantment {
    metadata_type: 'enchantment_random'
    level_min: number
    level_max: number
    treasure: boolean
}

interface Potion {
    metadata_type: 'potion'
    potion_effect: MinecraftPotionEffectTypes
    potion_delivery: MinecraftPotionDeliveryTypes
}

interface Name {
    metadata_type: 'name'
    item_name: string
}

interface Lore {
    metadata_type: 'lore'
    item_lore: string[]
}

interface Damage {
    metadata_type: 'damage'
    damage_percentage: number
}

export type IMetadata = Enchantment | RandomEnchantment | Potion | Name | Damage | Lore

export interface IReward {
    display_name?: string
    balance?: number
    item?: string
    count?: number
    item_metadata: IMetadata[]
}