import { ItemStack } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";
import {NameModel} from "../../../../api/nexuscore/model";

/** Sets the item's display name. */
export class NameMetadata implements RewardMetadata {
    readonly metadata_type = 'name'

    applyToItem(item: ItemStack, data: NameModel): ItemStack {
        item.nameTag = data.item_name
        return item
    }
}
