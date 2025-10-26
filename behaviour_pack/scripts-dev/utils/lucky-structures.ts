import {BlockComponentPlayerBreakEvent, EntityComponentTypes, Structure, Vector3, world} from "@minecraft/server";
import {MinecraftBlockTypes, MinecraftEntityTypes} from "@minecraft/vanilla-data";


function place_centered_on_player(event : BlockComponentPlayerBreakEvent, structure_name: string, y_offset: number = -1) {
    const structure = world.structureManager.get(structure_name)

    if (event.player?.location && structure) {
        const spawn_location = {
            x: Math.round(event.player.location.x - (structure?.size.x / 2)),
            y: event.player.location.y + y_offset,
            z: Math.round(event.player.location.z - (structure?.size.z / 2))
        }
        world.structureManager.place(structure, event.dimension, spawn_location)
    }
}

function place_centered_on_block(event : BlockComponentPlayerBreakEvent, structure_name: string, y_offset: number = -1) {
    const structure = world.structureManager.get(structure_name)

    if (event.block?.location && structure) {
        const spawn_location = {
            x: Math.round(event.block.location.x - (structure?.size.x / 2)),
            y: event.block.location.y + y_offset,
            z: Math.round(event.block.location.z - (structure?.size.z / 2))
        }

        world.structureManager.place(structure, event.dimension, spawn_location)
    }
}

function weightedRandom<T>(items: T[], weights: number[]): T {
    if (items.length !== weights.length) {
        throw new Error("Items and weights must have the same length.");
    }

    const cumulativeWeights = [...weights];
    for (let i = 1; i < cumulativeWeights.length; i++) {
        cumulativeWeights[i] += cumulativeWeights[i - 1];
    }

    const random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];

    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random < cumulativeWeights[i]) {
            return items[i];
        }
    }

    return items[items.length - 1];
}


export function get_structure(lucky_block_type: string) {
    const lucky_structures = weightedRandom(
        [VeryLuckyStructures, LuckyStructures, NeutralStructures, UnluckyStructures, VeryUnluckyStructures],
        [0.06, 0.3, 0.28, 0.3, 0.06]
    )

    const super_lucky_structures = weightedRandom(
        [VeryLuckyStructures, LuckyStructures, NeutralStructures, UnluckyStructures, VeryUnluckyStructures],
        [0.2, 0.27, 0.06, 0.27, 0.2]
    )

    const kinda_lucky_structures = weightedRandom(
        [LuckyStructures, NeutralStructures, UnluckyStructures],
        [0.35, 0.3, 0.35]
    )

    const unlucky_structures = weightedRandom(
        [NeutralStructures, UnluckyStructures, VeryUnluckyStructures],
        [0.02, 0.49, 0.49]
    )

    const structures: {[key: string]: Function[]} = {
        "lucky_block": lucky_structures,
        "unlucky_block": unlucky_structures,
        "super_lucky_block": super_lucky_structures,
        "kinda_lucky_block": kinda_lucky_structures
    }

    const selected_weights = structures[lucky_block_type]

    return selected_weights[Math.floor(Math.random() * selected_weights.length)];
}

export let VeryLuckyStructures = [
    function statue_of_liberty(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/liberty_statue')
    },
    function balloon(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/balloon')
    },
]

export let LuckyStructures = [

]

export let NeutralStructures = [
    function fish(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/fish')
    },
    function maze(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/maze')
    },
    function sand(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/sand', 10)
    },
    function fart_tower(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/fart_tower', -7)
    },
    function lucky_choice(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/lucky_choice')
    },
    function nothing_button(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/nothing_button')
    },
]

export let UnluckyStructures = [
    function anvil_cage(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/trap_cage')
        place_centered_on_player(event, 'player_centered/anvil', 30)
    },

    function tnt_trap(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/tnt_trap', -2)
    },

    function trap_chest(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/trap_chest', -3)
    },

    function creeper_house(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/house')
    },

    function obsidian_box(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/obsidian_box', -5)
    },

    function death_button(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/death_button', -1)
    },

    function tp_plate(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/tp_plate', -1)
    }
]

export let VeryUnluckyStructures = [
    function skeleton_pit(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/skeleton_pit', -13)
    },

    function unlucky_pyramid(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_block(event, 'block_centered/unlucky_pyramid', -1)
    },

    function chests_room(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/chests_room')
    },

    function lava_cage(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/lava_cage', -1)
        place_centered_on_player(event, 'player_centered/lava', 5)
    },

    function creeper_house(event : BlockComponentPlayerBreakEvent) {
        place_centered_on_player(event, 'player_centered/tnt_house', -1)
    },

    function insta_kill(event : BlockComponentPlayerBreakEvent) {
        event.player?.kill()
    },

    function spawn_tnt(event: BlockComponentPlayerBreakEvent) {
        const player = event.player;
        if (!player) return;

        const dimension = player.dimension;
        const playerPos = player.location;

        for (let i = 0; i < 20; i++) {
            const offset: Vector3 = {
                x: playerPos.x + (Math.random() - 0.5) * 10,
                y: playerPos.y,
                z: playerPos.z + (Math.random() - 0.5) * 10
            };

            const tnt = dimension.spawnEntity(MinecraftEntityTypes.Tnt, offset);
        }
    },

    function inventory_clear(event: BlockComponentPlayerBreakEvent) {
        const player = event.player!

        const inventory = player.getComponent(EntityComponentTypes.Inventory)!

        const container = inventory.container;
        const size = container.size;

        const protectedItemIds = [
            "minecraft:shulker_box",
            "minecraft:white_shulker_box",
            "minecraft:orange_shulker_box",
            "minecraft:magenta_shulker_box",
            "minecraft:light_blue_shulker_box",
            "minecraft:yellow_shulker_box",
            "minecraft:lime_shulker_box",
            "minecraft:pink_shulker_box",
            "minecraft:gray_shulker_box",
            "minecraft:light_gray_shulker_box",
            "minecraft:cyan_shulker_box",
            "minecraft:purple_shulker_box",
            "minecraft:blue_shulker_box",
            "minecraft:brown_shulker_box",
            "minecraft:green_shulker_box",
            "minecraft:red_shulker_box",
            "minecraft:black_shulker_box",
            "amethyst:lucky_block",
            "amethyst:kinda_lucky_block",
            "amethyst:super_lucky_block",
        ];

        // Collect all slot indices that can be cleared
        const clearableSlots: number[] = [];
        for (let i = 0; i < size; i++) {
            const item = container.getItem(i);
            if (!item) continue;
            if (protectedItemIds.includes(item.typeId)) continue;
            clearableSlots.push(i);
        }

        // Shuffle the list to make it random
        for (let i = clearableSlots.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clearableSlots[i], clearableSlots[j]] = [clearableSlots[j], clearableSlots[i]];
        }

        // Determine number of slots to clear (50%)
        const toClear = Math.floor(clearableSlots.length / 2);

        // Clear the first half
        for (let i = 0; i < toClear; i++) {
            container.setItem(clearableSlots[i], undefined);
        }
    }
]