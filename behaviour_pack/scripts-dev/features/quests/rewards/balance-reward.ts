import { Player } from "@minecraft/server";
import { RewardOut } from "../../../api/nexuscore/model";
import { RewardGranter } from "../core/reward-granter";
import { partialUpdateUserV1GuildsMeUsersThornyIdPatch } from "../../../api/nexuscore/users/users";
import utils from "../../../utils";

/**
 * Grants a balance reward by PATCHing the player's balance via the API.
 *
 * By the time grant() is called, reward.balance is already the absolute
 * value (currentBalance + delta), resolved by grant-rewards.ts.
 */
export class BalanceReward implements RewardGranter {
    canHandle(reward: RewardOut): boolean {
        return reward.balance !== null
    }

    async grant(player: Player, thorny_id: number, reward: RewardOut): Promise<void> {
        await partialUpdateUserV1GuildsMeUsersThornyIdPatch(thorny_id, {
            balance: reward.balance,
        })

        utils.commands.send_message(
            player.dimension.id,
            player.name,
            `§l[§aQuests§f]§r You received §6${reward.balance}${utils.emojis.NUGS}§r!`
        )
    }
}
