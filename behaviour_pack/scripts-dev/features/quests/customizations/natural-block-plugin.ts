import { CustomizationPlugin } from "../core/customization-plugin";
import { GameAction } from "../core/action";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";

/**
 * Passer — gates mine actions to naturally generated blocks only.
 *
 * Reads `objective.customizations.natural_block`. For non-mine actions this
 * is always a pass, since natural_block only makes sense for mine objectives.
 * For mine actions, it delegates to action.naturally_mined which is set by
 * the block-break handler.
 */
export class NaturalBlockPlugin implements CustomizationPlugin {
    passes(action: GameAction, objective: ObjectiveOut, _progress: ObjectiveProgressOut): boolean {
        const c = objective.customizations.natural_block
        if (!c) return true

        // natural_block only applies to mine actions; other action types pass through
        return action.type === 'mine' && action.naturally_mined
    }
}
