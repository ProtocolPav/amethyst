import {
    BlockComponentTickEvent,
    system,
    EntityComponentTypes, BlockComponentPlayerBreakEvent, VanillaEntityIdentifier
} from "@minecraft/server";
import {MinecraftEntityTypes} from "@minecraft/vanilla-data";
import utils from "../../utils";


export default function loadDraconicHeartComponents() {
    let mined_blocks = 0

    function heal_dragon(event : BlockComponentTickEvent) {
        if (event.block.isValid) {
            const dragon = event.block.dimension.getEntities({type: MinecraftEntityTypes.EnderDragon})[0]

            if (dragon && dragon.isValid) {
                dragon.getComponent(EntityComponentTypes.Health)?.resetToMaxValue()
            }

            event.dimension.playSound('mob.warden.heartbeat', event.block.location)
        }
    }

    function heart_destroy(event : BlockComponentPlayerBreakEvent) {
        mined_blocks++

        event.dimension.spawnEntity(
            'amethyst:the_breath' as VanillaEntityIdentifier,
            event.block.location
        )
        event.dimension.spawnEntity(
            'amethyst:the_breath' as VanillaEntityIdentifier,
            event.block.location
        )
        event.dimension.spawnEntity(
            'amethyst:the_breath' as VanillaEntityIdentifier,
            event.block.location
        )
        event.dimension.spawnEntity(
            'amethyst:endstone_golem' as VanillaEntityIdentifier,
            event.block.location
        )

        event.dimension.playSound('mob.enderdragon.growl', event.block.location)

        const message = utils.DragonHeartMessage.heart_mined(mined_blocks)
        utils.commands.send_message(
            event.dimension.id,
            '@a',
            message
        );
    }

    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:heal_dragon',
            {
                onTick(event) {
                    heal_dragon(event)
                },
                onPlayerBreak(event) {
                    heart_destroy(event)
                }
            }
        )
    })
}