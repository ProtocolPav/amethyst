import {ObjectiveOut, KillTargetModel, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {GameAction, KillAction, ScripteventAction} from "../types/action";
import { AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import {EntityDieAfterEvent, EquipmentSlot, Player, ScriptEventCommandMessageAfterEvent, system, world} from "@minecraft/server";
import ThornyUser from "../../../api/user";
import {processGameAction} from "../core/action-dispatch";

export class ScripteventTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<number, () => void>()

    onActivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

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

            processGameAction(player, action)
        }

        system.afterEvents.scriptEventReceive.subscribe(handler)
        this.subscriptions.set(thorny_id, () => system.afterEvents.scriptEventReceive.unsubscribe(handler))
    }

    onDeactivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id
        this.subscriptions.get(thorny_id)?.()
        this.subscriptions.delete(thorny_id)
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
