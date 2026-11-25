import {ObjectiveOut, KillTargetModel, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {GameAction, KillAction, ScripteventAction} from "../types/action";
import { AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import {EquipmentSlot, Player, ScriptEventCommandMessageAfterEvent, system} from "@minecraft/server";
import {processGameAction} from "../core/action-dispatch";
import { DeactivationContext } from "../types/deactivation-context";
import { ActivationContext, SlotRef, slotKey } from "../types/slot";

export class ScripteventTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<string, () => void>()  // slotKey → unsubscribe

    onActivate(ctx: ActivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const player = ctx.player
        const ref: SlotRef = { thornyId: ctx.thornyId, slot: ctx.slot }

        const handler = (event: ScriptEventCommandMessageAfterEvent) => {
            if (event.message !== player.name) return

            const mainhand = player
                .getComponent('minecraft:equippable')
                ?.getEquipment(EquipmentSlot.Mainhand)
                ?.typeId ?? null

            const action: ScripteventAction = {
                type: 'scriptevent',
                time: new Date(),
                player,
                coordinates: player.location,
                dimension: player.dimension.id,
                mainhand,
                script_id: event.id,
            }

            processGameAction(player, action, ref)
        }

        system.afterEvents.scriptEventReceive.subscribe(handler)
        this.subscriptions.set(slotKey(ctx), () => system.afterEvents.scriptEventReceive.unsubscribe(handler))
    }

    onDeactivate(ctx: DeactivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        this.subscriptions.get(slotKey(ctx))?.()
        this.subscriptions.delete(slotKey(ctx))
    }

    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number {
        if (action.type !== 'scriptevent') return 0
        if (targetProgress.target_type !== 'scriptevent') return 0

        const scriptevent = action as ScripteventAction
        const target = objective.targets.find(
            t => t.target_type === 'scriptevent' && t.target_uuid === targetProgress.target_uuid
        ) as ScripteventAction | undefined

        if (!target) return 0
        if (!this.matchesEntity(scriptevent.script_id, target.script_id)) return 0

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
