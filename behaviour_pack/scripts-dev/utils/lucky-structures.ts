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
    }
]