import { ItemStack, ItemComponentTypes } from "@minecraft/server";
import { RewardMetadata } from "../../core/reward-metadata";

/** Sets the potion effect type and delivery method on a potion item. */
export class PotionMetadata implements RewardMetadata {
    readonly metadata_type = 'potion'

    applyToItem(
        item: ItemStack,
        data: { potion_effect: string; potion_delivery: string }
    ): ItemStack {
        const potion = item.getComponent(ItemComponentTypes.Potion)
        if (potion) {
            potion.setPotionEffectType({ id: data.potion_effect } as any)
            potion.setPotionDeliveryType({ id: data.potion_delivery } as any)
        }
        return item
    }
}
