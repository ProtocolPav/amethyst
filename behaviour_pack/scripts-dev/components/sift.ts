import {
    Block,
    BlockComponentPlayerInteractEvent,
    BlockComponentTickEvent,
    BlockComponentTypes,
    BlockPermutation, Dimension,
    EntityComponentTypes,
    EquipmentSlot,
    system
} from "@minecraft/server";
import {MinecraftBlockTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";

export default function load_sift_component() {
    const ACCEPTED_BLOCKS: MinecraftBlockTypes[] = [
        MinecraftBlockTypes.Sand,
        MinecraftBlockTypes.Dirt,
        MinecraftBlockTypes.CoarseDirt,
        MinecraftBlockTypes.Gravel,
        MinecraftBlockTypes.RedSand,
        MinecraftBlockTypes.Mud,
    ]

    const LOOT_TABLE = {
        "minecraft:dirt": [
            {item: MinecraftItemTypes.Sand, amount: 1, }
        ]
    }

    function sift(dimension: Dimension, sifter: Block, item_id: string) {
        system.runTimeout(() => {
        }, 10)
    }

    function on_interact(event : BlockComponentPlayerInteractEvent) {
        // @ts-ignore
        const active = block.permutation.getState('amethyst:sifting')
        const mainhand = event.player?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        if (event.block.isValid && !active && mainhand && mainhand.typeId in ACCEPTED_BLOCKS) {
            event.block.setPermutation(BlockPermutation.resolve('amethyst:sifter', {'amethyst:sifting': true}))
            mainhand.amount -= 1
            event.player?.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, mainhand)
            sift(event.block, mainhand?.typeId)
        }
    }

    function on_tick(event : BlockComponentTickEvent) {
        // @ts-ignore
        const active = block.permutation.getState('amethyst:sifting')

        if (event.block.isValid && !active) {
            event.block.setPermutation(BlockPermutation.resolve('amethyst:sifter', {'amethyst:sifting': true}))
            const block_above = event.dimension.getBlockAbove(event.block.location)
            if (block_above?.typeId === MinecraftBlockTypes.Hopper) {
                block_above.getComponent(BlockComponentTypes.Inventory)
            }
        }
    }

    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:whoop',
            {
                onTick(event) {
                    on_tick(event)
                },
                onPlayerInteract(event) {
                    on_interact(event)
                }
            }
        )
    })
}