import { ObjectiveOut } from "../../../api/nexuscore/model";
import { GameAction } from "./action";

export interface ObjectiveProcessor {
    /**
     * Returns true if this processor can handle the given action type.
     * Used by the registry to route actions to the correct processor.
     */
    handles(action: GameAction): boolean

    /**
     * Evaluates whether the action progresses the given objective target.
     *
     * @param action      The game action that occurred.
     * @param objective   The full objective definition from the API (contains targets, customizations, logic).
     * @param currentCount The player's current progress count on this objective.
     * @returns The amount to increment progress by (0 = no progress).
     */
    evaluate(action: GameAction, objective: ObjectiveOut, currentCount: number): number
}
