import { ItemStack, ItemComponentTypes } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward/reward-metadata";
import {DamageModel} from "../../../../api/nexuscore/model";

/** Pre-damages the item by a percentage of its maximum durability. */
export class DamageMetadata implements RewardMetadata {
    readonly metadata_type = 'damage'

    applyToItem(item: ItemStack, data: DamageModel): ItemStack {
        const durability = item.getComponent(ItemComponentTypes.Durability)
        if (durability) {
            durability.damage = Math.floor(durability.maxDurability * data.damage_percentage / 100)
        }
        return item
    }
}
