import { Player, world, system, EntityDamageCause } from '@minecraft/server';
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";
import {WorldCache} from "../api/sacrifice";

function borderCheck(player: Player, dimensionID: MinecraftDimensionTypes, border_size: number, warning_range: string[], outside: string[]) {
    const position = player.location
    const distance_2d = Math.sqrt(position.x ** 2 + position.z ** 2)

    if (border_size < distance_2d && outside.indexOf(player.name) == -1) {
        outside.push(player.name)
        console.log(`[Plugin] [Border] Player ${player.name} is outside of the ${dimensionID} border.`)
    } else if (border_size > distance_2d && outside.indexOf(player.name) != -1) {
        outside.splice(outside.indexOf(player.name), 1)
        console.log(`[Plugin] [Border] Player ${player.name} has re-entered the ${dimensionID} border.`)
    }

    if (border_size < distance_2d) {
        world.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar §o§iI shouldn't go any further. It's too dangerous here.`)
        world.getDimension(dimensionID).runCommand(`effect "${player.name}" blindness 4 2`)
        player.applyDamage(1.3, { cause: EntityDamageCause.void })
    } else if (border_size - 20 < distance_2d) {
        world.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar §o§iThe Monolith's protection is wearing off. I can feel it...`)
    }

    if (border_size - 100 < distance_2d && warning_range.indexOf(player.name) == -1) {
        warning_range.push(player.name)
        world.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar §o§iMaybe I should start heading back now...`)
    } else if (border_size - 100 > distance_2d && warning_range.indexOf(player.name) != -1) {
        warning_range.splice(warning_range.indexOf(player.name), 1)
    }
}

export default function loadWorldBorder() {
    let players_100_blocks_away  = {overworld: [], nether: [], end: []}
    let players_outside_border  = {overworld: [], nether: [], end: []}
    
    system.runInterval(() => {
        let players = {
            overworld: world.getDimension(MinecraftDimensionTypes.Overworld).getPlayers(),
            nether: world.getDimension(MinecraftDimensionTypes.Nether).getPlayers(),
            end: world.getDimension(MinecraftDimensionTypes.TheEnd).getPlayers()
        }
    
        players.overworld.forEach((player) => {
            borderCheck(player, MinecraftDimensionTypes.Overworld, WorldCache.world.overworld_border, players_100_blocks_away.overworld, players_outside_border.overworld)
        });
        
        players.nether.forEach((player) => {
            borderCheck(player, MinecraftDimensionTypes.Nether, WorldCache.world.nether_border, players_100_blocks_away.nether, players_outside_border.nether)
        });
        
        players.end.forEach((player) => {
            borderCheck(player, MinecraftDimensionTypes.TheEnd, WorldCache.world.end_border, players_100_blocks_away.end, players_outside_border.end)
        });
    }, 20)
}