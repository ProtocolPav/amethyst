import { ItemStack } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";

/** Sets the item's display name. */
export class NameMetadata implements RewardMetadata {
    readonly metadata_type = 'name'

    applyToItem(item: ItemStack, data: { item_name: string }): ItemStack {
        item.nameTag = data.item_name
        return item
    }
}
