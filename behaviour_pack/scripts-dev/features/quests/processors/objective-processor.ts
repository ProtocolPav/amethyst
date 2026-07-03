import {
    ObjectiveOut,
    ObjectiveProgressOut,
    ObjectiveProgressOutStatus,
    ObjectiveOutLogic,
    MineTargetModel,
    KillTargetModel,
} from "../../../api/nexuscore/model";
import { GameAction } from "../core/action";
import { AnyTargetProgress, TargetProcessor } from "../core/target-processor";
import { MineTargetProcessor } from "./mine-target-processor";
import { KillTargetProcessor } from "./kill-target-processor";

const TARGET_PROCESSORS: TargetProcessor[] = [
    new MineTargetProcessor(),
    new KillTargetProcessor(),
]

function targetCount(target: MineTargetModel | KillTargetModel): number {
    return target.count ?? 1
}

export class ObjectiveProcessor {
    process(action: GameAction, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): boolean {
        if (objectiveProgress.status === ObjectiveProgressOutStatus.completed) return false

        if (!this.passesCustomizations(action, objective, objectiveProgress)) return false

        const processor = TARGET_PROCESSORS.find(p => p.handles(action))
        if (!processor) return false

        switch (objective.logic) {
            case ObjectiveOutLogic.or:         return this.processOr(action, objective, objectiveProgress, processor)
            case ObjectiveOutLogic.and:        return this.processAnd(action, objective, objectiveProgress, processor)
            case ObjectiveOutLogic.sequential: return this.processSequential(action, objective, objectiveProgress, processor)
        }
    }

    private complete(progress: ObjectiveProgressOut): true {
        progress.status = ObjectiveProgressOutStatus.completed
        progress.end_time = new Date().toISOString()
        return true
    }

    private processOr(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor): boolean {
        const required = objective.target_count ?? 1

        for (const targetProgress of progress.target_progress as AnyTargetProgress[]) {
            const increment = processor.evaluate(action, objective, targetProgress)
            if (increment === 0) continue

            targetProgress.count = (targetProgress.count ?? 0) + increment

            if (targetProgress.count >= required) return this.complete(progress)
        }

        return false
    }

    private processAnd(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor): boolean {
        for (const targetProgress of progress.target_progress as AnyTargetProgress[]) {
            const def = objective.targets.find(t => t.target_uuid === targetProgress.target_uuid) as MineTargetModel | KillTargetModel | undefined
            if (!def) continue
            if ((targetProgress.count ?? 0) >= targetCount(def)) continue  // already complete

            const increment = processor.evaluate(action, objective, targetProgress)
            if (increment > 0) targetProgress.count = (targetProgress.count ?? 0) + increment
        }

        const allDone = (progress.target_progress as AnyTargetProgress[]).every(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as MineTargetModel | KillTargetModel | undefined
            return def ? (tp.count ?? 0) >= targetCount(def) : false
        })

        return allDone ? this.complete(progress) : false
    }

    private processSequential(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor): boolean {
        const currentTarget = (progress.target_progress as AnyTargetProgress[]).find(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as MineTargetModel | KillTargetModel | undefined
            return def ? (tp.count ?? 0) < targetCount(def) : false
        })

        if (!currentTarget) return this.complete(progress)  // all targets already done

        const increment = processor.evaluate(action, objective, currentTarget)
        if (increment === 0) return false

        currentTarget.count = (currentTarget.count ?? 0) + increment

        const allDone = (progress.target_progress as AnyTargetProgress[]).every(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as MineTargetModel | KillTargetModel | undefined
            return def ? (tp.count ?? 0) >= targetCount(def) : false
        })

        return allDone ? this.complete(progress) : false
    }

    private passesCustomizations(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut): boolean {
        const c = objective.customizations

        if (c.mainhand && action.mainhand !== c.mainhand.item) return false

        if (c.location) {
            const loc = c.location
            const dx = Math.abs(action.coordinates.x - loc.coordinates[0])
            const dy = Math.abs(action.coordinates.y - loc.coordinates[1])
            const dz = Math.abs(action.coordinates.z - loc.coordinates[2])
            if (dx > loc.horizontal_radius || dz > loc.horizontal_radius || dy > loc.vertical_radius) return false
        }

        if (c.natural_block && action.type === 'mine' && !action.naturally_mined) return false

        if (c.timer && progress.start_time) {
            const elapsed = (Date.now() - new Date(progress.start_time).getTime()) / 1000
            if (elapsed > c.timer.seconds) return false
        }

        return true
    }
}
