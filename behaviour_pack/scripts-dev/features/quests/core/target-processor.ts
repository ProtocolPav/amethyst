import { Player } from "@minecraft/server";
import { KillTargetModel, KillTargetProgressModel, MineTargetModel, MineTargetProgressModel, ObjectiveOut, ObjectiveProgressOut, ScriptEventTargetProgressModel } from "../../../api/nexuscore/model";
import { GameAction } from "./action";

export type AnyTargetProgress = MineTargetProgressModel | KillTargetProgressModel | ScriptEventTargetProgressModel
export type AnyTarget = MineTargetModel | KillTargetModel

export interface TargetProcessor {
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

    /**
     * Called when the objective this processor owns becomes active for a player.
     * Use to register event listeners, spawn entities, start timers, etc.
     *
     * Optional — processors that need no setup can omit this.
     */
    onActivate?(player: Player, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): void

    /**
     * Called when the objective this processor owns is deactivated for a player.
     * Fires on completion, failure, quest abandonment, or player leave.
     * Use to clean up any listeners or runtime state registered in onActivate.
     *
     * Optional — processors that need no teardown can omit this.
     */
    onDeactivate?(player: Player, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): void
}
