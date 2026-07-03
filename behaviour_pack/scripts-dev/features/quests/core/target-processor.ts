import { KillTargetProgressModel, MineTargetProgressModel, ObjectiveOut, ScriptEventTargetProgressModel } from "../../../api/nexuscore/model";
import { GameAction } from "./action";

export type AnyTargetProgress = MineTargetProgressModel | KillTargetProgressModel | ScriptEventTargetProgressModel

export interface TargetProcessor {
    /**
     * Returns true if this processor can handle the given action type.
     * Used by the registry to route actions to the correct processor.
     */
    handles(action: GameAction): boolean

    /**
     * Evaluates whether the action progresses a specific target within the objective.
     *
     * Called once per target by ObjectiveProcessor, which owns the and/or/sequential logic.
     *
     * @param action         The game action that occurred.
     * @param objective      The full objective definition (targets, customizations, logic).
     * @param targetProgress The current progress state for this specific target.
     *                       Carries the current count, and for complex objectives like Boss,
     *                       will carry the registered runtime entity ID to match against.
     * @returns The amount to increment this target's count by (0 = no progress).
     */
    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number
}
