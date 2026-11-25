import {ObjectiveOut, ObjectiveProgressOut, VisitTargetModel, VisitTargetProgressModel} from "../../../api/nexuscore/model";
import {GameAction, ScripteventAction, VisitAction} from "../types/action";
import { AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import {EquipmentSlot, Player, system, TicksPerSecond} from "@minecraft/server";
import {processGameAction} from "../core/action-dispatch";
import { DeactivationContext } from "../types/deactivation-context";
import { ActivationContext, SlotRef, slotKey } from "../types/slot";

export class VisitTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<string, () => void>()  // slotKey → unsubscribe

    checkCoordinates(action: VisitAction, target: VisitTargetModel): boolean {
        const dx = Math.abs(action.coordinates.x - target.coordinates[0])
        const dy = Math.abs(action.coordinates.y - target.coordinates[1])
        const dz = Math.abs(action.coordinates.z - target.coordinates[2])

        const horizontalOk = dx <= target.horizontal_radius && dz <= target.horizontal_radius
        const verticalOk = target.vertical_radius == null || target.vertical_radius <= 0 || dy <= target.vertical_radius

        return horizontalOk && verticalOk
    }

    onActivate(ctx: ActivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const player = ctx.player
        const ref: SlotRef = { thornyId: ctx.thornyId, slot: ctx.slot }

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

            processGameAction(player, action, ref)
        }

        const runId = system.runInterval(handler, TicksPerSecond)
        this.subscriptions.set(slotKey(ctx), () => system.clearRun(runId))
    }

    onDeactivate(ctx: DeactivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        this.subscriptions.get(slotKey(ctx))?.()
        this.subscriptions.delete(slotKey(ctx))
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
