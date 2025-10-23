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
import {get_structure} from "../utils/lucky-structures";


export default function load_lucky_component() {
    function lucky_block_break(event : BlockComponentPlayerBreakEvent) {
        const mainhand = event.player?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)
        const lucky_block_type = event.block.typeId.replace('amethyst:', '')

        if (!mainhand?.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment(MinecraftEnchantmentTypes.SilkTouch)) {
            const loot_table = world.getLootTableManager().getLootTable(lucky_block_type)!

            const item_drop = world.getLootTableManager().generateLootFromTable(loot_table)

            if (Math.random() < Math.random()) {
                item_drop?.forEach((item) => {
                    event.dimension.spawnItem(item, event.block.location)
                })
            } else {
                const structure_function = get_structure(lucky_block_type)

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