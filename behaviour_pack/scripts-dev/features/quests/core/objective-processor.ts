import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";
import { GameAction } from "./action";

export interface ObjectiveProcessor {
    /**
     * Processes a game action against a single objective.
     *
     * Iterates the objective's targets, delegates to the appropriate TargetProcessor
     * for each, and applies the and/or/sequential logic to determine whether the
     * objective as a whole is now complete.
     *
     * Mutates `objectiveProgress` in place (target counts, status).
     *
     * @param action            The game action that occurred.
     * @param objective         The objective definition (targets, logic, customizations).
     * @param objectiveProgress The current progress state for this objective. Mutated in place.
     * @returns True if the objective transitioned to complete as a result of this action.
     */
    process(action: GameAction, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): boolean
}
