import {IMetadata, IReward} from "../../types/reward";
import Interaction from "../interaction";
import ThornyUser from "../user";
import utils from "../../utils";
import {ItemComponentTypes, ItemStack} from "@minecraft/server";

export class Reward implements IReward {
    display_name?: string
    balance?: number
    item?: string
    count?: number
    item_metadata!: IMetadata[]

    constructor(data: IReward) {
        Object.assign(this, data)
    }

    public async give_reward(interaction: Interaction, thorny_user: ThornyUser) {
        if (this.balance) {
            thorny_user.balance += this.balance

            utils.commands.send_message(
                interaction.dimension,
                thorny_user.gamertag,
                `§l[§aQuests§f]§r You have received ${this.balance}${utils.emojis.NUGS}!`
            )
        } else if (this.item && this.count) {
            utils.commands.give_item(
                thorny_user.gamertag,
                this.count,
                this.get_item_stack(this.item, this.item_metadata)
            )

            utils.commands.send_message(
                interaction.dimension,
                thorny_user.gamertag,
                `§l[§aQuests§f]§r You have received ${this.count} ${utils.clean_id(this.item)}!`
            )
        }
    }

    public get_item_stack(item: string, metadata: IMetadata[]): ItemStack {
        const item_stack = new ItemStack(item, 1)

        metadata.forEach((data) => {
            switch (data.metadata_type) {
                case "name":
                    item_stack.nameTag = data.item_name
                    break;

                case "lore":
                    item_stack.setLore(data.item_lore)
                    break;

                case "damage":
                    const durability = item_stack.getComponent(ItemComponentTypes.Durability)
                    const max_damage = durability?.maxDurability ?? 0

                    if (durability) {
                        durability.damage = max_damage * data.damage_percentage
                    }
                    break;

                case "potion":
                    break;

                case "enchantment":
                    break;

                case "enchantment_random":
                    break;
            }
        })

        return item_stack
    }
}