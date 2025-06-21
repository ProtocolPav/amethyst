import {system, world} from "@minecraft/server"
import utils from "../utils"
import { EntityComponentTypes, EquipmentSlot, Player } from "@minecraft/server"
import {MinecraftBlockTypes, MinecraftEntityTypes} from "@minecraft/vanilla-data"

export default function load_entity_event_handler() {
    let first_stage = false
    let second_stage = false

    // Handle Dragon Health
    world.afterEvents.entityHurt.subscribe((event) => {
        if (event.hurtEntity.typeId === MinecraftEntityTypes.EnderDragon) {
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
    })
}