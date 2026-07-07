import {ObjectiveOut, MineTargetModel, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import { GameAction, MineAction } from "../types/action";
import { AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import {EquipmentSlot, Player, PlayerBreakBlockAfterEvent, world} from "@minecraft/server";
import ThornyUser from "../../../api/user";
import {processGameAction} from "../core/action-dispatch";
import {listInteractionsV1GuildsMeInteractionsGet} from "../../../api/nexuscore/guilds/guilds";

export class MineTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<number, () => void>()

    onActivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const blockTypes = _objective.targets
            .filter((t): t is MineTargetModel => t.target_type === 'mine')
            .map(t => t.block)

        const handler = async (event: PlayerBreakBlockAfterEvent) => {
            if (event.player.id !== player.id) return

            const mainhand = event.player
                .getComponent('minecraft:equippable')
                ?.getEquipment(EquipmentSlot.Mainhand)
                ?.typeId ?? null

            const interactions = await listInteractionsV1GuildsMeInteractionsGet({
                coordinates: [event.block.x, event.block.y, event.block.z]
            })

            const action: MineAction = {
                type: 'mine',
                time: new Date(),
                player: event.player,
                coordinates: event.block.location,
                dimension: event.dimension.id,
                mainhand,
                block_id: event.brokenBlockPermutation.type.id,
                naturally_mined: interactions.length <= 1,
            }

            processGameAction(event.player, action)
        }

        world.afterEvents.playerBreakBlock.subscribe(handler, {blockTypes})

        this.subscriptions.set(thorny_id, () => world.afterEvents.playerBreakBlock.unsubscribe(handler))
    }

    onDeactivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id
        this.subscriptions.get(thorny_id)?.()
        this.subscriptions.delete(thorny_id)
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
