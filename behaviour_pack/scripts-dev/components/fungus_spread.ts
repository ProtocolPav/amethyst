import {BlockComponentPlayerBreakEvent, BlockComponentRandomTickEvent, system, TicksPerSecond, world} from "@minecraft/server";
import {MinecraftBlockTypes, MinecraftEffectTypes, MinecraftEntityTypes} from "@minecraft/vanilla-data";


export default function load_fungus_spreading_component() {
    function fungus_spread(event : BlockComponentRandomTickEvent) {
        if (Math.random() < 0.5) {
            const adjacent_blocks = [event.block.above(), event.block.below(), event.block.south(), event.block.west(), event.block.north(), event.block.east()]

            const random_index = Math.floor(Math.random() * adjacent_blocks.length)
            const random_adjacent_block = adjacent_blocks[random_index]
    
            if (random_adjacent_block?.typeId == MinecraftBlockTypes.Air) {
                random_adjacent_block.setType("amethyst:fungus_block")
            }
        }
    }

    function fungus_destroy(event : BlockComponentPlayerBreakEvent) {
        const random_choice = Math.random()
        const mobs = [
            MinecraftEntityTypes.CaveSpider,
            MinecraftEntityTypes.Spider,
            MinecraftEntityTypes.Zombie,
            MinecraftEntityTypes.Stray,
            MinecraftEntityTypes.Witch,
            MinecraftEntityTypes.Blaze,
            MinecraftEntityTypes.Frog,
            MinecraftEntityTypes.Strider,
            MinecraftEntityTypes.GlowSquid,
            MinecraftEntityTypes.Goat
        ]
        const effects = [
            MinecraftEffectTypes.Hunger,
            MinecraftEffectTypes.Blindness,
            MinecraftEffectTypes.Weakness,
            MinecraftEffectTypes.Poison,
            MinecraftEffectTypes.Haste,
            MinecraftEffectTypes.Invisibility,
            MinecraftEffectTypes.MiningFatigue,
            MinecraftEffectTypes.Regeneration
        ]

        // Summon Mob
        if (random_choice < 0.5) {
            const entity = event.dimension.spawnEntity(
                mobs[Math.floor(Math.random() * mobs.length)],
                event.block.location
            )

            system.runTimeout(() => {
                if (entity.isValid) {
                    entity.kill()
                }
            }, TicksPerSecond * 120)
        }
        // Effect Player
        else if (random_choice > 0.5) {
            event.player?.addEffect(
                effects[Math.floor(Math.random() * effects.length)],
                TicksPerSecond * 30
                )
        }
    }
    
    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:fungus_spread', 
            {
                onRandomTick(event) {
                    fungus_spread(event)
                },
                onPlayerBreak(event) {
                    fungus_destroy(event)
                }
            }
        )
    })
}