import { ItemStack, ItemComponentTypes } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";
import {EnchantmentModel} from "../../../../api/nexuscore/model";

/** Adds a specific enchantment at a specific level to the item. */
export class EnchantmentMetadata implements RewardMetadata {
    readonly metadata_type = 'enchantment'

    applyToItem(item: ItemStack, data: EnchantmentModel): ItemStack {
        const enchants = item.getComponent(ItemComponentTypes.Enchantable)
        enchants?.addEnchantment({ type: { id: data.enchantment_id } as any, level: data.enchantment_level })
        return item
    }
}
