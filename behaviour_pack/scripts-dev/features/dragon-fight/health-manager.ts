import {EntityComponentTypes, EntityDieAfterEvent, EntityHurtAfterEvent, world} from "@minecraft/server";
import {MinecraftEntityTypes} from "@minecraft/vanilla-data";
import utils from "../../utils";

export default function loadHealthManager() {
    let first_stage = false
    let second_stage = false

    function react_to_dragon_damage(event: EntityHurtAfterEvent) {
        const health_component = event.hurtEntity.getComponent(EntityComponentTypes.Health)

        if (health_component && !first_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.75) {
            first_stage = true

            const message = utils.DragonHeartMessage.health_stage_message(1)
            utils.commands.send_message(
                event.hurtEntity.dimension.id,
                '@a',
                message
            );

            utils.DragonHeartMessage.summon_minions()

        } else if (health_component && !second_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.25) {
            second_stage = true

            const message = utils.DragonHeartMessage.health_stage_message(2)
            utils.commands.send_message(
                event.hurtEntity.dimension.id,
                '@a',
                message
            );

            utils.DragonHeartMessage.summon_minions()
        }
    }

    function reset_health_stage(event: EntityDieAfterEvent) {
        first_stage = false
        second_stage = false
    }

    world.afterEvents.entityHurt.subscribe(
        react_to_dragon_damage,
        {entityTypes: [MinecraftEntityTypes.EnderDragon]}
    )

    world.afterEvents.entityDie.subscribe(
        reset_health_stage,
        {entityTypes: [MinecraftEntityTypes.EnderDragon]}
    )
}