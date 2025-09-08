import {
    BlockComponentPlayerBreakEvent,
    EntityComponentTypes,
    EquipmentSlot, ItemComponentTypes, LootTable, LootTableManager, Structure,
    system,
    TicksPerSecond,
    world
} from "@minecraft/server";
import {
    MinecraftBlockTypes,
    MinecraftEffectTypes,
    MinecraftEnchantmentTypes,
    MinecraftEntityTypes
} from "@minecraft/vanilla-data";


export default function load_lucky_component() {
    function lucky_block_break(event : BlockComponentPlayerBreakEvent) {
        const mainhand = event.player?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)
        if (!mainhand?.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment(MinecraftEnchantmentTypes.SilkTouch)) {
            spawn_cage(event)
        }
    }

    function spawn_cage(event : BlockComponentPlayerBreakEvent) {
        const scarecrow = world.structureManager.get('trap_cage')
        const spawn_location = {
            x: Math.round(event.player?.location.x - (scarecrow?.size.x / 2)),
            y: event.player?.location.y - 1,
            z: Math.round(event.player?.location.z - (scarecrow?.size.z / 2))
        }
        world.structureManager.place(scarecrow, event.dimension, spawn_location)

        const anvil_location = {
            x: event.player?.location.x,
            y: event.player?.location.y + 30,
            z: event.player?.location.z
        }
        event.dimension.setBlockType(anvil_location, MinecraftBlockTypes.Anvil)
    }
    
    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:lucky',
            {
                onPlayerBreak(event) {
                    lucky_block_break(event)
                }
            }
        )
    })
}