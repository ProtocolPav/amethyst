import {ObjectiveOut, ObjectiveProgressOut, VisitTargetModel, VisitTargetProgressModel} from "../../../api/nexuscore/model";
import {GameAction, ScripteventAction, VisitAction} from "../types/action";
import { AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import {EquipmentSlot, Player, ScriptEventCommandMessageAfterEvent, system, TicksPerSecond, world} from "@minecraft/server";
import ThornyUser from "../../../api/user";
import {processGameAction} from "../core/action-dispatch";

export class VisitTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<number, () => void>()

    checkCoordinates(action: VisitAction, target: VisitTargetModel): boolean {
        const dx = Math.abs(action.coordinates.x - target.coordinates[0])
        const dy = Math.abs(action.coordinates.y - target.coordinates[1])
        const dz = Math.abs(action.coordinates.z - target.coordinates[2])

        const horizontalOk = dx <= target.horizontal_radius && dz <= target.horizontal_radius
        const verticalOk = target.vertical_radius <= 0 || dy <= target.vertical_radius

        return horizontalOk && verticalOk
    }

    onActivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const handler = () => {
            const mainhand = player
                .getComponent('minecraft:equippable')
                ?.getEquipment(EquipmentSlot.Mainhand)
                ?.typeId ?? null

            const action: VisitAction = {
                type: 'visit',
                time: new Date(),
                player,
                coordinates: player.location,
                dimension: player.dimension.id,
                mainhand,
            }

            processGameAction(player, action)
        }

        const runId = system.runInterval(handler, TicksPerSecond)
        this.subscriptions.set(thorny_id, () => system.clearRun(runId))
    }

    onDeactivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id
        this.subscriptions.get(thorny_id)?.()
        this.subscriptions.delete(thorny_id)
    }

    evaluate(action: VisitAction, objective: ObjectiveOut, targetProgress: VisitTargetProgressModel): number {
        if (action.type !== 'visit') return 0
        if (targetProgress.target_type !== 'visit') return 0

        const target = objective.targets.find(
            t => t.target_type === 'visit' && t.target_uuid === targetProgress.target_uuid
        ) as VisitTargetModel | undefined

        if (!target) return 0
        if (!this.checkCoordinates(action, target)) return 0

        targetProgress.seconds = (targetProgress.seconds ?? 0) + 1

        if (targetProgress.seconds < (target.seconds ?? 1)) return 0

        return 1
    }
}
