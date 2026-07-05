import { ItemStack } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";

/** Sets the item's lore lines. */
export class LoreMetadata implements RewardMetadata {
    readonly metadata_type = 'lore'

    applyToItem(item: ItemStack, data: { item_lore: string[] }): ItemStack {
        item.setLore(data.item_lore)
        return item
    }
}
