import {ObjectiveOut, ObjectiveProgressOut, DeliverTargetModel, DeliverTargetProgressModel} from "../../../api/nexuscore/model";
import {GameAction, DeliverAction} from "../types/action";
import {AnyTargetProgress, TargetProcessor} from "../types/target-processor";
import {Entity, EquipmentSlot, Player, system, TicksPerSecond, Vector3} from "@minecraft/server";
import ThornyUser from "../../../api/user";
import {processGameAction} from "../core/action-dispatch";
import {DeactivationContext} from "../types/deactivation-context";
import {QUEST_PROGRESS_CACHE} from "../progress-cache";

const PLAYER_PROXIMITY_RADIUS = 4;
const PLAYER_PROXIMITY_RADIUS_SQ = PLAYER_PROXIMITY_RADIUS * PLAYER_PROXIMITY_RADIUS;
const DELIVER_TICK = TicksPerSecond;

// Bounded registry for entity IDs that have already been claimed.
// Keeps insertion order; when bound exceeded, prunes oldest half.
class ClaimedEntityRegistry {
    private set = new Set<string>();
    private order: string[] = [];
    constructor(private bound = 1000) {}

    has(id: string): boolean {
        return this.set.has(id);
    }

    add(id: string): void {
        if (this.set.has(id)) return;
        this.set.add(id);
        this.order.push(id);
        if (this.set.size > this.bound) {
            const pruneCount = Math.floor(this.bound / 2);
            for (let i = 0; i < pruneCount; i++) {
                this.set.delete(this.order[i]);
            }
            this.order.splice(0, pruneCount);
        }
    }

    clear(): void {
        this.set.clear();
        this.order.length = 0;
    }
}

// Global across all players - if an entity has been claimed at all, it cannot be claimed again by anyone.
// Separate from per-tick dedupe; this persists (bounded).
const CLAIMED_ENTITIES = new ClaimedEntityRegistry(1000);

// Per-tick dedupe to prevent same entity being dispatched twice in same tick across concurrent player handlers.
const CLAIMED_THIS_TICK = new Set<string>();

export class DeliverTargetProcessor implements TargetProcessor {
    private subscriptions = new Map<number, () => void>();

    private distanceSq(a: Vector3, b: Vector3): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }

    private matchesPattern(actual: string, pattern: string): boolean {
        if (pattern.endsWith(':*')) {
            const namespace = pattern.slice(0, -2);
            return actual.startsWith(namespace + ':');
        }
        return actual === pattern;
    }

    onActivate(player: Player, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id;

        const handler = () => {
            if (!player.isValid) return;

            const mainhand = player
                .getComponent('minecraft:equippable')
                ?.getEquipment(EquipmentSlot.Mainhand)
                ?.typeId ?? null;

            let entities: Entity[];
            try {
                entities = player.dimension.getEntities({
                    location: player.location,
                    maxDistance: PLAYER_PROXIMITY_RADIUS,
                });
            } catch {
                return;
            }

            for (const entity of entities) {
                if (!entity.isValid) continue;

                let item_id: string | null = null;
                let item_count = 1;
                if (entity.typeId === 'minecraft:item') {
                    const itemComp = entity.getComponent('minecraft:item' as any) as any;
                    const stack = itemComp?.itemStack;
                    if (!stack) continue;
                    item_id = stack.typeId;
                    item_count = stack.amount ?? 1;
                    if (item_count <= 0) continue;
                }

                const action: DeliverAction = {
                    type: 'deliver',
                    time: new Date(),
                    player,
                    coordinates: entity.location,
                    dimension: player.dimension.id,
                    mainhand,
                    entity_id: entity.typeId,
                    item_id,
                    item_count,
                    deliveredEntities: [entity],
                };
                processGameAction(player, action);
            }
        };

        const runId = system.runInterval(handler, DELIVER_TICK);
        this.subscriptions.set(thorny_id, () => system.clearRun(runId));
    }

    onDeactivate(ctx: DeactivationContext, _objective: ObjectiveOut, _objectiveProgress: ObjectiveProgressOut): void {
        this.subscriptions.get(ctx.thornyId)?.();
        this.subscriptions.delete(ctx.thornyId);
    }

    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number {
        if (action.type !== 'deliver') return 0;
        if (targetProgress.target_type !== 'deliver') return 0;

        const deliverAction = action as DeliverAction;
        const target = objective.targets.find(
            t => t.target_type === 'deliver' && t.target_uuid === targetProgress.target_uuid
        ) as DeliverTargetModel | undefined;
        if (!target) return 0;

        const entity = deliverAction.deliveredEntities[0];
        if (!entity || !entity.isValid) return 0;

        // Per-tick dedupe: same entity dispatched by concurrent player handlers in same tick
        if (CLAIMED_THIS_TICK.has(entity.id)) return 0;

        // Player proximity check (entity must be near the player who triggered the action)
        if (this.distanceSq(deliverAction.player.location, deliverAction.coordinates) > PLAYER_PROXIMITY_RADIUS_SQ) return 0;

        const currentCount = (targetProgress as DeliverTargetProgressModel).count ?? 0;
        const sharedPool = objective.target_count ?? null;

        let neededForThisTarget: number;
        if (sharedPool !== null) {
            const thornyId = ThornyUser.fetch_user(deliverAction.player.name)?.thorny_id;
            let total = 0;
            if (thornyId != null) {
                const qp = QUEST_PROGRESS_CACHE.get(thornyId);
                const objProg = qp?.objectives.find(o => o.objective_id === objective.objective_id);
                if (objProg) {
                    total = objProg.target_progress.reduce((s, tp) => s + (tp.count ?? 0), 0);
                }
            }
            if (total === 0 && currentCount > 0) total = currentCount;
            neededForThisTarget = sharedPool - total;
        } else {
            neededForThisTarget = target.count - currentCount;
        }
        if (neededForThisTarget <= 0) return 0;

        if (target.item) {
            if (deliverAction.entity_id !== 'minecraft:item') return 0;
            const itemId = deliverAction.item_id;
            if (!itemId || !this.matchesPattern(itemId, target.item)) return 0;

            const consume = Math.min(deliverAction.item_count, neededForThisTarget);
            if (consume <= 0) return 0;

            // Dedupe this entity for this tick before mutating
            CLAIMED_THIS_TICK.add(entity.id);
            system.runTimeout(() => CLAIMED_THIS_TICK.delete(entity.id), 1);

            if (consume >= deliverAction.item_count) {
                entity.remove();
            } else {
                const comp = entity.getComponent('minecraft:item' as any) as any;
                const stack = comp?.itemStack;
                if (stack) {
                    stack.amount -= consume;
                    comp.itemStack = stack;
                } else {
                    entity.remove();
                }
            }

            return consume;
        } else if (target.entity) {
            if (!this.matchesPattern(deliverAction.entity_id, target.entity)) return 0;
            if (deliverAction.item_id) return 0;

            if (CLAIMED_ENTITIES.has(entity.id)) return 0;

            // Mark claimed for this tick and persistently
            CLAIMED_THIS_TICK.add(entity.id);
            system.runTimeout(() => CLAIMED_THIS_TICK.delete(entity.id), 1);
            CLAIMED_ENTITIES.add(entity.id);
            return 1;
        }

        return 0;
    }
}
