import {BlockComponentPlayerBreakEvent, Structure, world} from "@minecraft/server";
import {MinecraftBlockTypes} from "@minecraft/vanilla-data";


function place_centered_on_player(event : BlockComponentPlayerBreakEvent, structure: Structure, y_offset: number = 1) {
    if (event.player?.location) {
        const spawn_location = {
            x: Math.round(event.player.location.x - (structure?.size.x / 2)),
            y: event.player.location.y - y_offset,
            z: Math.round(event.player.location.z - (structure?.size.z / 2))
        }
        world.structureManager.place(structure, event.dimension, spawn_location)
    }
}

function place_centered_on_block(event : BlockComponentPlayerBreakEvent, structure: Structure, y_offset: number = 1) {
    if (event.block?.location) {
        const spawn_location = {
            x: Math.round(event.block.location.x - (structure?.size.x / 2)),
            y: event.block.location.y - y_offset,
            z: Math.round(event.block.location.z - (structure?.size.z / 2))
        }

        world.structureManager.place(structure, event.dimension, spawn_location)
    }
}

export let Structures = [
    function anvil_cage(event : BlockComponentPlayerBreakEvent) {
        const cage = world.structureManager.get('player_centered/trap_cage')

        if (cage) {
            place_centered_on_player(event, cage)

            // Make separate structure file for anvil
            const anvil_location = {
                x: event.player?.location.x,
                y: event.player?.location.y + 30,
                z: event.player?.location.z
            }
            event.dimension.setBlockType(anvil_location, MinecraftBlockTypes.Anvil)
        }
    },

    function tnt_trap(event : BlockComponentPlayerBreakEvent) {
        const structure = world.structureManager.get('player_centered/tnt_trap')

        if (structure) {
            place_centered_on_player(event, structure)
        }
    }
]