import {
    BlockComponentPlayerInteractEvent,
    BlockPermutation,
    EntityComponentTypes,
    EquipmentSlot, Player,
    system
} from "@minecraft/server";
import utils from "../../utils";

export default function loadMonolithicReactorComponent() {
    const GLITCHES = [
        utils.commands.noise_glitch,
        utils.commands.vision_block_glitch,
        utils.commands.vision_entity_glitch,
        utils.commands.effect_glitch,
        utils.commands.noise_glitch,
        utils.commands.noise_glitch,
        utils.commands.noise_glitch,
    ]

    function on_interact(event: BlockComponentPlayerInteractEvent) {
        const mainhand = event.player?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)
        if (mainhand?.typeId == 'amethyst:glitch_core') {
            // @ts-ignore
            const active: boolean = event.block.permutation.getState('amethyst:reactor_active_state')

            if (event.block.isValid && !active) {
                event.block.setPermutation(BlockPermutation.resolve('amethyst:reactor', {'amethyst:reactor_active_state': true}))
                event.player?.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand)
                event.dimension.playSound('beacon.activate', event.block.center())

                event.block.dimension.getPlayers()
                    .forEach((player: Player) => {
                        GLITCHES.forEach((glitch) => {
                            glitch(player)
                        })
                    })
            }
        }
    }

    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:reactor_activate',
            {
                onPlayerInteract(event) {
                    on_interact(event)
                }
            }
        )
    })
}