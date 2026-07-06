import { ItemStack } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward/reward-metadata";
import {LoreModel} from "../../../../api/nexuscore/model";

/** Sets the item's lore lines. */
export class LoreMetadata implements RewardMetadata {
    readonly metadata_type = 'lore'

    applyToItem(item: ItemStack, data: LoreModel): ItemStack {
        item.setLore(data.item_lore)
        return item
    }
}
