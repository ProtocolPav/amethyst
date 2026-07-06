import { ItemStack, Player } from "@minecraft/server";
import { RewardOut } from "../../../api/nexuscore/model";
import { RewardGranter } from "../core/reward/reward-granter";
import { REWARD_METADATA_REGISTRY } from "./metadata/registry";
import utils from "../../../utils";

/**
 * Grants an item reward by building an ItemStack with all registered
 * item-mutator metadata applied, then giving it to the player.
 */
export class ItemReward implements RewardGranter {
    canHandle(reward: RewardOut): boolean {
        return reward.item !== null && reward.count !== null
    }

    async grant(player: Player, _thorny_id: number, reward: RewardOut): Promise<void> {
        const item = this.buildItemStack(reward)
        utils.commands.give_item(player.name, reward.count!, item)

        const label = reward.display_name ?? `${reward.count}x ${utils.clean_id(reward.item!)}`
        utils.commands.send_message(
            player.dimension.id,
            player.name,
            `§l[§aQuests§f]§r You received §f${label}§r!`
        )
    }

    private buildItemStack(reward: RewardOut): ItemStack {
        let item = new ItemStack(reward.item!, 1)

        for (const m of reward.item_metadata) {
            const handler = REWARD_METADATA_REGISTRY.get(m.metadata_type)
            if (handler?.applyToItem) {
                item = handler.applyToItem(item, m)
            }
        }

        return item
    }
}
