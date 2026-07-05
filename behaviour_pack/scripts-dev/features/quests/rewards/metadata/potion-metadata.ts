import {ItemStack, ItemComponentTypes, SetPotionFunction, Potions} from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";
import {PotionModel} from "../../../../api/nexuscore/model";

/** Sets the potion effect type and delivery method on a potion item. */
export class PotionMetadata implements RewardMetadata {
    readonly metadata_type = 'potion'

    applyToItem(item: ItemStack, data: PotionModel): ItemStack {
        return Potions.resolve(
            data.potion_effect,
            data.potion_delivery
        )
    }
}
