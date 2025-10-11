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
import {UnluckyStructures} from "../utils/lucky-structures";


export default function load_lucky_component() {
    function lucky_block_break(event : BlockComponentPlayerBreakEvent) {
        const mainhand = event.player?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        if (!mainhand?.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment(MinecraftEnchantmentTypes.SilkTouch)) {
            const loot_table = world.getLootTableManager().getLootTable('lucky_block')

            const lucky_drop = world.getLootTableManager().generateLootFromTable(loot_table)

            if (Math.random() < Math.random()) {
                world.sendMessage('TEST. Item Drop')

                lucky_drop?.forEach((item) => {
                    event.dimension.spawnItem(item, event.block.location)
                })
            } else {
                world.sendMessage('TEST. Structure Drop')

                const structure_function = UnluckyStructures[Math.floor(Math.random() * UnluckyStructures.length)];

                structure_function(event)
            }
        }
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