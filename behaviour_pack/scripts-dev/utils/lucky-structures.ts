import {BlockComponentPlayerBreakEvent, Structure, world} from "@minecraft/server";
import {MinecraftBlockTypes} from "@minecraft/vanilla-data";


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


export function get_lucky_block_structure() {
    const structures = weightedRandom(
        [VeryLuckyStructures, LuckyStructures, NeutralStructures, UnluckyStructures, VeryUnluckyStructures],
        [0.06, 0.3, 0.28, 0.3, 0.06]
    )

    return structures[Math.floor(Math.random() * structures.length)];
}

export let VeryLuckyStructures = [

]

export let LuckyStructures = [

]

export let NeutralStructures = [

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
        place_centered_on_player(event, 'player_centered/skeleton_pit', -15)
    },
]