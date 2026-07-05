import { Player } from "@minecraft/server";
import { RewardOut } from "../../../api/nexuscore/model";

/**
 * Delivers one reward to a player.
 * Implementations live in rewards/.
 *
 * The separation between RewardGranter and RewardMetadata is intentional:
 * granters handle the outer reward shape (balance vs. item vs. effect),
 * while metadata handlers operate within that shape — gating, transforming,
 * or mutating the ItemStack after it is constructed.
 */
export interface RewardGranter {
    /** Returns true if this granter handles the given reward's type. */
    canHandle(reward: RewardOut): boolean

    /**
     * Delivers the reward to the player.
     * @param player      The receiving player.
     * @param thorny_id   Their NexusCore thorny_id (needed for API calls).
     * @param reward      The reward definition, already transformed by metadata.
     */
    grant(player: Player, thorny_id: number, reward: RewardOut): Promise<void>
}
