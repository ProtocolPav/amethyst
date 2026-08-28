import {DeliverTargetModel, DeliverTargetProgressModel, ObjectiveOut, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {DeliverAction, GameAction} from "../types/action";
import {AnyTargetProgress, TargetProcessor} from "../types/target-processor";
import {DeactivationContext} from "../types/deactivation-context";
import {QUEST_PROGRESS_CACHE} from "../progress-cache";
import ThornyUser from "../../../api/user";
import {processGameAction} from "../core/action-dispatch";
import {Entity, EntityComponentTypes, EquipmentSlot, ItemStack, Player, system, TicksPerSecond} from "@minecraft/server";

const TICK = TicksPerSecond;
const R = 4; // player must be within this radius of the dropped entity/item to claim ownership (enforced by handler radius)

// Entities are never removed — once claimed by anyone they are blocked globally via bounded registry.
// Items are fungible and consumed by amount, never added here.
class ClaimedRegistry {
    private set = new Set<string>();
    private order: string[] = [];
    constructor(private cap = 1000) {}
    has(id: string) { return this.set.has(id); }
    add(id: string) {
        if (this.set.has(id)) return;
        this.set.add(id);
        this.order.push(id);
        if (this.set.size > this.cap) {
            const n = Math.floor(this.cap / 2);
            for (let i = 0; i < n; i++) this.set.delete(this.order[i]);
            this.order.splice(0, n);
        }
    }
}

const CLAIMED = new ClaimedRegistry(1000); // persistent global block for entities (prunes oldest half at cap)
const SEEN_TICK = new Set<string>(); // per-tick dedupe: same entity emitted by multiple players in same tick

function markSeen(id: string) {
    SEEN_TICK.add(id);
    system.runTimeout(() => SEEN_TICK.delete(id), 1);
}

function matches(actual: string, pattern: string): boolean {
    return pattern.endsWith(':*') ? actual.startsWith(pattern.slice(0, -2) + ':') : actual === pattern;
}

function neededFor(objective: ObjectiveOut, target: DeliverTargetModel, progress: DeliverTargetProgressModel, playerName: string): number {
    const cur = progress.count ?? 0;
    const pool = objective.target_count ?? null;
    if (pool === null) return target.count - cur;

    const tid = ThornyUser.fetch_user(playerName)?.thorny_id;
    let total = 0;
    if (tid != null) {
        const qp = QUEST_PROGRESS_CACHE.get(tid);
        const op = qp?.objectives.find(o => o.objective_id === objective.objective_id);
        if (op) total = op.target_progress.reduce((s, t) => s + (t.count ?? 0), 0);
    }
    if (total === 0 && cur > 0) total = cur;
    return pool - total;
}

export class DeliverTargetProcessor implements TargetProcessor {
    private subs = new Map<number, () => void>();

    // Dumb handler: emits one DeliverAction per nearby entity/item, no target checks.
    // All filtering (location, pattern, claimed) happens in evaluate().
    onActivate(player: Player, _obj: ObjectiveOut, _prog: ObjectiveProgressOut): void {
        const thornyId = ThornyUser.fetch_user(player.name)!.thorny_id;

        const handler = () => {
            if (!player.isValid) return;

            const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)?.typeId ?? null;

            let entities: Entity[];
            try {
                entities = player.dimension.getEntities({location: player.location, maxDistance: R});
            } catch { return; }

            for (const e of entities) {
                if (!e.isValid) continue;

                let itemId: string | null = null;
                let itemCount = 1;

                if (e.typeId === 'minecraft:item') {
                    const stack = e.getComponent(EntityComponentTypes.Item)?.itemStack;
                    if (!stack) continue;
                    itemId = stack.typeId;
                    itemCount = stack.amount ?? 1;
                    if (itemCount <= 0) continue;
                }

                processGameAction(player, {
                    type: 'deliver',
                    time: new Date(),
                    player,
                    coordinates: e.location,
                    dimension: player.dimension.id,
                    mainhand,
                    entity_id: e.typeId,
                    item_id: itemId,
                    item_count: itemCount,
                    deliveredEntities: [e],
                } satisfies DeliverAction);
            }
        };

        const id = system.runInterval(handler, TICK);
        this.subs.set(thornyId, () => system.clearRun(id));
    }

    onDeactivate(ctx: DeactivationContext): void {
        this.subs.get(ctx.thornyId)?.();
        this.subs.delete(ctx.thornyId);
    }

    evaluate(action: GameAction, objective: ObjectiveOut, targetProgress: AnyTargetProgress): number {
        if (action.type !== 'deliver' || targetProgress.target_type !== 'deliver') return 0;

        const a = action as DeliverAction;
        const target = objective.targets.find(t => t.target_type === 'deliver' && t.target_uuid === targetProgress.target_uuid) as DeliverTargetModel | undefined;
        if (!target) return 0;

        const e = a.deliveredEntities[0];
        if (!e?.isValid || SEEN_TICK.has(e.id)) return 0; // already handled this tick (multi-player race)
        if (e.id === a.player.id) return 0; // self-delivery guard: player cannot deliver themselves

        const need = neededFor(objective, target, targetProgress as DeliverTargetProgressModel, a.player.name);
        if (need <= 0) return 0;

        // Branch on target type: items are consumed, entities are claimed.
        if (target.item) return this.deliverItem(a, e, target.item, need);
        if (target.entity) return this.deliverEntity(a, e, target.entity);

        return 0;
    }

    // Items: fungible — consume by amount, never globally claimed.
    // e.g. need 2, stack 20 -> consume 2, re-spawn remainder 18. Cannot mutate itemStack
    // via component (readonly), so remove and re-spawn as new item entity if partially needed.
    private deliverItem(a: DeliverAction, e: Entity, pattern: string, need: number): number {
        if (a.entity_id !== 'minecraft:item') return 0;
        if (!a.item_id || !matches(a.item_id, pattern)) return 0;

        const consume = Math.min(a.item_count, need);
        if (consume <= 0) return 0;

        markSeen(e.id);

        const loc = e.location;
        const dim = e.dimension;

        e.remove();

        const remaining = a.item_count - consume;
        if (remaining > 0) {
            // Preserve stack identity by cloning amount; use ItemStack with same type.
            // If original had extra components, they are lost with simple construction —
            // acceptable for deliver quests which use vanilla items.
            dim.spawnItem(new ItemStack(a.item_id!, remaining), loc);
        }

        return consume;
    }

    // Entities: non-fungible — never removed, globally claimed once via CLAIMED (bounded).
    // Per-tick SEEN prevents same-tick double-count from concurrent handlers.
    private deliverEntity(a: DeliverAction, e: Entity, pattern: string): number {
        if (!matches(a.entity_id, pattern) || a.item_id) return 0;
        if (CLAIMED.has(e.id)) return 0; // already claimed by any player

        markSeen(e.id);
        CLAIMED.add(e.id);
        return 1;
    }
}
