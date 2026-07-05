import { Player } from "@minecraft/server";
import { RewardOut } from "../../../api/nexuscore/model";
import { RewardGranter } from "../core/reward-granter";
import utils from "../../../utils";

/**
 * Grants a potion effect directly to the player — no item involved.
 *
 * Reads from a dedicated `effect` field on RewardOut. This field does not
 * yet exist in the generated model and requires an API schema addition:
 *
 *   effect: {
 *     effect_id: MinecraftEffectTypes
 *     duration_ticks: number
 *     amplifier?: number (defaults to 0)
 *   } | null
 *
 * Until the API adds this field, canHandle() will always return false
 * and this granter is effectively dormant.
 */
export class EffectReward implements RewardGranter {
    canHandle(reward: RewardOut): boolean {
        return (reward as any).effect !== null && (reward as any).effect !== undefined
    }

    async grant(player: Player, _thorny_id: number, reward: RewardOut): Promise<void> {
        const e = (reward as any).effect
        player.addEffect(e.effect_id, e.duration_ticks, { amplifier: e.amplifier ?? 0 })

        const label = reward.display_name ?? utils.clean_id(e.effect_id)
        utils.commands.send_message(
            player.dimension.id,
            player.name,
            `§l[§aQuests§f]§r You received §d${label}§r!`
        )
    }
}
