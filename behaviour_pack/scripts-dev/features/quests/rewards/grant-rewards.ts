import { Player } from "@minecraft/server";
import { RewardOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";
import { RewardGranter } from "../core/reward-granter";
import { REWARD_METADATA_REGISTRY } from "./metadata/registry";
import { BalanceReward } from "./balance-reward";
import { ItemReward }    from "./item-reward";
import { EffectReward }  from "./effect-reward";

/**
 * Ordered granter list — first canHandle() match wins.
 * Add new reward types here and nowhere else.
 */
const GRANTERS: RewardGranter[] = [
    new BalanceReward(),
    new ItemReward(),
    new EffectReward(),
]

/**
 * Grants all rewards on a completed objective (or quest) to the player.
 *
 * Pipeline per reward:
 *   1. Resolve granter
 *   2. Gate   — resolve metadata handlers; any shouldGrant() returning false
 *               skips the reward entirely
 *   3. Transform — metadata transform() calls mutate a copy of RewardOut
 *   4. Balance delta → absolute value (currentBalance + delta)
 *   5. Grant
 *
 * @param player              The receiving player.
 * @param thorny_id           Their NexusCore thorny_id.
 * @param currentBalance      Their current balance — balance granter writes
 *                            an absolute value, so the delta is resolved here.
 * @param rewards             RewardOut list from ObjectiveOut or QuestOut.
 * @param objectiveProgress   Progress snapshot needed by gater metadata
 *                            (Timed, First).
 */
export async function grantRewards(
    player: Player,
    thorny_id: number,
    currentBalance: number,
    rewards: RewardOut[],
    objectiveProgress: ObjectiveProgressOut,
): Promise<void> {
    for (const reward of rewards) {
        // ── 1. Resolve granter ───────────────────────────────────────────────
        const granter = GRANTERS.find(g => g.canHandle(reward))
        if (!granter) {
            console.warn(`[grantRewards] No granter registered for reward_id ${reward.reward_id}`)
            continue
        }

        // ── 2. Resolve metadata handlers ─────────────────────────────────────
        const handlers = reward.item_metadata
            .map(m => ({ data: m, handler: REWARD_METADATA_REGISTRY.get(m.metadata_type) }))
            .filter((e): e is { data: any; handler: NonNullable<typeof e.handler> } => !!e.handler)

        // ── 3. Gate ───────────────────────────────────────────────────────────
        let allow = true
        for (const { handler } of handlers) {
            if (!handler.shouldGrant) continue
            const permitted = await handler.shouldGrant(player, thorny_id, reward, objectiveProgress)
            if (!permitted) { allow = false; break }
        }
        if (!allow) continue

        // ── 4. Transform ──────────────────────────────────────────────────────
        let effectiveReward: RewardOut = reward
        for (const { handler } of handlers) {
            if (handler.transform) effectiveReward = handler.transform(effectiveReward)
        }

        // ── 5. Balance delta → absolute ───────────────────────────────────────
        if (effectiveReward.balance !== null) {
            effectiveReward = { ...effectiveReward, balance: currentBalance + effectiveReward.balance! }
        }

        // ── 6. Grant ──────────────────────────────────────────────────────────
        try {
            await granter.grant(player, thorny_id, effectiveReward)
        } catch (err) {
            console.error(`[grantRewards] Failed to grant reward_id ${reward.reward_id}:`, err)
        }
    }
}
