import { world, EntityDieAfterEvent } from "@minecraft/server";
import { KillAction } from "../core/action";
import { QUEST_PROGRESS_CACHE } from "../progress-cache";
import { QUEST_CACHE } from "../quest-cache";
import { QuestProcessor } from "../processors/quest-processor";
import ThornyUser from "../../../api/user";

const questProcessor = new QuestProcessor()

export default function loadKillHandler() {
    world.afterEvents.entityDie.subscribe((event: EntityDieAfterEvent) => {
        // Only care about kills caused by a player
        const attacker = event.damageSource.damagingEntity
        if (!attacker || attacker.typeId !== 'minecraft:player') return

        const player = attacker as import("@minecraft/server").Player

        const thorny_user = ThornyUser.fetch_user(player.name)
        if (!thorny_user) return

        const quest_progress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)
        if (!quest_progress) return

        const quest = QUEST_CACHE.get(quest_progress.quest_id)
        if (!quest) return

        const kill_action: KillAction = {
            type: 'kill',
            time: new Date(),
            coordinates: event.deadEntity.location,
            dimension: event.deadEntity.dimension.id,
            entity_id: event.deadEntity.typeId,
            mainhand: player.getComponent('equippable')?.getEquipment('Mainhand')?.typeId ?? null,
            player: player,
        }

        questProcessor.process(kill_action, player, quest as any, quest_progress)
    })
}
