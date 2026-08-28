import {
    ObjectiveOut,
    ObjectiveProgressOut,
    ObjectiveProgressOutStatus,
    ObjectiveOutLogic, ObjectiveOutObjectiveType,
} from "../../../api/nexuscore/model";
import { Player } from "@minecraft/server";
import { GameAction } from "../types/action";
import { AnyTarget, AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import { MineTargetProcessor } from "./mine-target-processor";
import { KillTargetProcessor } from "./kill-target-processor";
import {showProgressTick} from "../core/notify";
import {ACTIVE_PLUGINS} from "../core/objective/objective-lifecycle";
import {ScripteventTargetProcessor} from "./scriptevent-target-processor";
import {VisitTargetProcessor} from "./visit-target-processor";
import {DeliverTargetProcessor} from "./deliver-target-processor";

/**
 * Registry of target processors, keyed by objective_type.
 * Each processor owns evaluate() and optional lifecycle hooks for its type.
 */
export const TARGET_PROCESSORS: Record<ObjectiveOutObjectiveType, TargetProcessor> = {
    mine: new MineTargetProcessor(),
    kill: new KillTargetProcessor(),
    scriptevent: new ScripteventTargetProcessor(),
    visit: new VisitTargetProcessor(),
    deliver: new DeliverTargetProcessor(),
}

function targetCount(target: AnyTarget): number {
    return target.count ?? 1
}

export class ObjectiveProcessor {
    /**
     * Processes an objective against the given action.
     * @param action
     * @param player
     * @param thorny_id
     * @param objective
     * @param objectiveProgress
     * @returns true if the objective is complete, false otherwise
     */
    process(action: GameAction, player: Player, thorny_id: number, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): boolean {
        if (objectiveProgress.status === ObjectiveProgressOutStatus.completed) return false

        // Run all passer plugins — if any return false, block the action
        if (!this.passesCustomizations(action, thorny_id, objective, objectiveProgress)) return false

        const processor = TARGET_PROCESSORS[objective.objective_type]
        if (!processor) return false

        switch (objective.logic) {
            case ObjectiveOutLogic.or: return this.processOr(action, objective, objectiveProgress, processor, player)
            case ObjectiveOutLogic.and: return this.processAnd(action, objective, objectiveProgress, processor, player)
            case ObjectiveOutLogic.sequential: return this.processSequential(action, objective, objectiveProgress, processor, player)
        }
    }

    private complete(progress: ObjectiveProgressOut): true {
        progress.status = ObjectiveProgressOutStatus.completed
        progress.end_time = new Date().toISOString()
        return true
    }

    /**
     * Iterates the passes() hook of every active plugin for this player.
     * Returns false as soon as any plugin blocks the action.
     */
    private passesCustomizations(action: GameAction, thorny_id: number, objective: ObjectiveOut, progress: ObjectiveProgressOut): boolean {
        const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? []
        for (const plugin of plugins) {
            if (plugin.passes?.(action, objective, progress) === false) return false
        }
        return true
    }

    private processOr(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor, player: Player): boolean {
        const sharedPool = objective.target_count ?? null

        for (const targetProgress of progress.target_progress as AnyTargetProgress[]) {
            const increment = processor.evaluate(action, objective, targetProgress)
            if (increment === 0) continue

            targetProgress.count = (targetProgress.count ?? 0) + increment

            const targetDef = objective.targets.find(t => t.target_uuid === targetProgress.target_uuid) as AnyTarget | undefined

            if (sharedPool !== null) {
                // Shared pool — sum all targets together
                const total = (progress.target_progress as AnyTargetProgress[]).reduce((sum, tp) => sum + (tp.count ?? 0), 0)

                showProgressTick(player, targetDef, total, sharedPool)

                if (total >= sharedPool) return this.complete(progress)
            } else {
                // Individual — this specific target must reach its own count
                const required = targetDef ? targetCount(targetDef) : 1

                showProgressTick(player, targetDef, targetProgress.count, required)

                if (targetProgress.count >= required) return this.complete(progress)
            }
        }

        return false
    }

    private processAnd(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor, player: Player): boolean {
        for (const targetProgress of progress.target_progress as AnyTargetProgress[]) {
            const targetDef = objective.targets.find(t => t.target_uuid === targetProgress.target_uuid) as AnyTarget | undefined
            if (!targetDef) continue
            if ((targetProgress.count ?? 0) >= targetCount(targetDef)) continue  // already complete

            const increment = processor.evaluate(action, objective, targetProgress)
            if (increment > 0) {
                targetProgress.count = (targetProgress.count ?? 0) + increment

                showProgressTick(player, targetDef, targetProgress.count, targetCount(targetDef))
            }
        }

        const allDone = (progress.target_progress as AnyTargetProgress[]).every(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as AnyTarget | undefined
            return def ? (tp.count ?? 0) >= targetCount(def) : false
        })

        return allDone ? this.complete(progress) : false
    }

    private processSequential(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor, player: Player): boolean {
        const currentTarget = (progress.target_progress as AnyTargetProgress[]).find(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as AnyTarget | undefined
            return def ? (tp.count ?? 0) < targetCount(def) : false
        })

        if (!currentTarget) return this.complete(progress)  // all targets already done

        const increment = processor.evaluate(action, objective, currentTarget)
        if (increment === 0) return false

        currentTarget.count = (currentTarget.count ?? 0) + increment

        const def = objective.targets.find(t => t.target_uuid === currentTarget.target_uuid) as AnyTarget | undefined
        const required = def ? targetCount(def) : 1
        if (def) showProgressTick(player, def, currentTarget.count, required)

        const allDone = (progress.target_progress as AnyTargetProgress[]).every(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as AnyTarget | undefined
            return def ? (tp.count ?? 0) >= targetCount(def) : false
        })

        return allDone ? this.complete(progress) : false
    }
}
