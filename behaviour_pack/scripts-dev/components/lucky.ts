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
import {get_lucky_block_structure, UnluckyStructures} from "../utils/lucky-structures";


export default function load_lucky_component() {
    function lucky_block_break(event : BlockComponentPlayerBreakEvent) {
        const mainhand = event.player?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        if (!mainhand?.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment(MinecraftEnchantmentTypes.SilkTouch)) {
            const loot_table = world.getLootTableManager().getLootTable('lucky_block')

            const lucky_drop = world.getLootTableManager().generateLootFromTable(loot_table)

            if (Math.random() < Math.random()) {
                lucky_drop?.forEach((item) => {
                    event.dimension.spawnItem(item, event.block.location)
                })
            } else {
                const structure_function = get_lucky_block_structure()

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