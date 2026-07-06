import {ObjectiveOut, KillTargetModel, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {GameAction, KillAction} from "../core/action";
import { AnyTargetProgress, TargetProcessor } from "../core/target-processor";
import {EntityDieAfterEvent, EquipmentSlot, Player, world} from "@minecraft/server";
import ThornyUser from "../../../api/user";
import {processGameAction} from "../core/action-dispatch";

export class KillTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<number, () => void>()

    onActivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const entityTypes = _objective.targets
            .filter((t): t is KillTargetModel => t.target_type === 'kill')
            .map(t => t.entity)

        const handler = (event: EntityDieAfterEvent) => {
            const killer = event.damageSource.damagingEntity
            if (!killer || killer.id !== player.id) return

            const mainhand = player
                .getComponent('minecraft:equippable')
                ?.getEquipment(EquipmentSlot.Mainhand)
                ?.typeId ?? null

            const action: KillAction = {
                type: 'kill',
                time: new Date(),
                player,
                coordinates: event.deadEntity.location,
                dimension: event.deadEntity.dimension.id,
                mainhand,
                entity_id: event.deadEntity.typeId,
            }

            processGameAction(player, action)
        }

        world.afterEvents.entityDie.subscribe(handler, {entityTypes})
        this.subscriptions.set(thorny_id, () => world.afterEvents.entityDie.unsubscribe(handler))
    }

    onDeactivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id
        this.subscriptions.get(thorny_id)?.()
        this.subscriptions.delete(thorny_id)
    }

    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number {
        if (action.type !== 'kill') return 0
        if (targetProgress.target_type !== 'kill') return 0

        const kill = action as KillAction
        const target = objective.targets.find(
            t => t.target_type === 'kill' && t.target_uuid === targetProgress.target_uuid
        ) as KillTargetModel | undefined

        if (!target) return 0
        if (!this.matchesEntity(kill.entity_id, target.entity)) return 0

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
