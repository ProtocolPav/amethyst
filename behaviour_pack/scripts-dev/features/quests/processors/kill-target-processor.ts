import { ObjectiveOut, KillTargetModel } from "../../../api/nexuscore/model";
import { GameAction, KillAction } from "../core/action";
import { AnyTargetProgress, TargetProcessor } from "../core/target-processor";

export class KillTargetProcessor implements TargetProcessor {
    handles(action: GameAction): boolean {
        return action.type === 'kill'
    }

    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number {
        if (action.type !== 'kill') return 0
        if (targetProgress.target_type !== 'kill') return 0

        const kill = action as KillAction
        const target = objective.targets.find(
            t => t.target_type === 'kill' && t.target_uuid === targetProgress.target_uuid
        ) as KillTargetModel | undefined

        if (!target) return 0
        if (!this.matchesEntity(kill.entity_type_id, target.entity)) return 0

        return 1
    }

    private matchesEntity(actual: string, pattern: string): boolean {
        if (pattern.endsWith(':*')) {
            const namespace = pattern.slice(0, -2)
            return actual.startsWith(namespace + ':')
        }
        return actual === pattern
    }
}
