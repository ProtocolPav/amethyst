import { CustomizationPlugin } from "../types/customization-plugin";
import { GameAction } from "../types/action";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";

/**
 * Passer — gates any action to a specific held item.
 *
 * Reads `objective.customizations.mainhand` and compares the action's
 * mainhand field (set by the event handler at action construction time)
 * against the required item type ID. Returns false if they don't match.
 */
export class MainhandPlugin implements CustomizationPlugin {
    passes(action: GameAction, objective: ObjectiveOut, _progress: ObjectiveProgressOut): boolean {
        const c = objective.customizations.mainhand
        if (!c) return true

        return action.mainhand === c.item
    }
}
