import { ObjectiveOut, MineTargetModel, MineTargetProgressModel } from "../../../api/nexuscore/model";
import { GameAction, MineAction } from "../core/action";
import { AnyTargetProgress, TargetProcessor } from "../core/target-processor";

export class MineTargetProcessor implements TargetProcessor {
    handles(action: GameAction): boolean {
        return action.type === 'mine'
    }

    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number {
        if (action.type !== 'mine') return 0
        if (targetProgress.target_type !== 'mine') return 0

        const mine = action as MineAction
        const target = objective.targets.find(
            t => t.target_type === 'mine' && t.target_uuid === targetProgress.target_uuid
        ) as MineTargetModel | undefined

        if (!target) return 0
        if (!this.matchesBlock(mine.block_id, target.block)) return 0

        return 1
    }

    private matchesBlock(actual: string, pattern: string): boolean {
        if (pattern.endsWith(':*')) {
            const namespace = pattern.slice(0, -2)
            return actual.startsWith(namespace + ':')
        }
        return actual === pattern
    }
}
