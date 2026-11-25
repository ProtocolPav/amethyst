import {ObjectiveOut, MineTargetModel, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import { GameAction, MineAction } from "../types/action";
import { AnyTargetProgress, TargetProcessor } from "../types/target-processor";
import {EquipmentSlot, PlayerBreakBlockAfterEvent, system, world} from "@minecraft/server";
import {processGameAction} from "../core/action-dispatch";
import { DeactivationContext } from "../types/deactivation-context";
import { ActivationContext, SlotRef, slotKey } from "../types/slot";
import {listInteractionsV1GuildsMeInteractionsGet} from "../../../api/nexuscore/guilds/guilds";

/**
 * Natural-block lookups in flight, keyed by block and tick. When both of a
 * player's quest slots have a mine objective, each slot's handler receives
 * the same block break; this lets them share one Nexuscore request.
 */
const NATURAL_LOOKUPS = new Map<string, Promise<boolean>>()

/** Whether the broken block was naturally generated (never placed or mined before). */
function isNaturallyMined(event: PlayerBreakBlockAfterEvent): Promise<boolean> {
    const { x, y, z } = event.block
    const key = `${event.dimension.id}:${x},${y},${z}@${system.currentTick}`

    let lookup = NATURAL_LOOKUPS.get(key)
    if (!lookup) {
        lookup = listInteractionsV1GuildsMeInteractionsGet({
            coordinates: [x, y, z],
            interaction_types: ['mine', 'place'],
        }).then(interactions => interactions.length <= 1)

        NATURAL_LOOKUPS.set(key, lookup)
        const forget = () => { NATURAL_LOOKUPS.delete(key) }
        lookup.then(forget, forget)
    }
    return lookup
}

export class MineTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<string, () => void>()  // slotKey → unsubscribe

    onActivate(ctx: ActivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const player = ctx.player
        const ref: SlotRef = { thornyId: ctx.thornyId, slot: ctx.slot }

        const blockTypes = _objective.targets
            .filter((t): t is MineTargetModel => t.target_type === 'mine')
            .map(t => t.block)

        const handler = async (event: PlayerBreakBlockAfterEvent) => {
            if (event.player.id !== player.id) return

            const mainhand = event.player
                .getComponent('minecraft:equippable')
                ?.getEquipment(EquipmentSlot.Mainhand)
                ?.typeId ?? null

            const naturally_mined = await isNaturallyMined(event)

            const action: MineAction = {
                type: 'mine',
                time: new Date(),
                player: event.player,
                coordinates: event.block.location,
                dimension: event.dimension.id,
                mainhand,
                block_id: event.brokenBlockPermutation.type.id,
                naturally_mined,
            }

            processGameAction(event.player, action, ref)
        }

        world.afterEvents.playerBreakBlock.subscribe(handler, {blockTypes})

        this.subscriptions.set(slotKey(ctx), () => world.afterEvents.playerBreakBlock.unsubscribe(handler))
    }

    onDeactivate(ctx: DeactivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        this.subscriptions.get(slotKey(ctx))?.()
        this.subscriptions.delete(slotKey(ctx))
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
