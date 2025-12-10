import {EntityComponentTypes, EquipmentSlot, Player, system, TicksPerSecond, world} from "@minecraft/server";
import {MinecraftEffectTypes} from '@minecraft/vanilla-data';
import api from "../api";
import utils from "../utils";


interface DrunkPlayer {
    type: "beer" | "wine" | "glow"
    drinks: number
    fov_level?: number
}

const healthboost = MinecraftEffectTypes.HealthBoost;


function drunk(player: Player): void {
    const drunk_data_string = player.getDynamicProperty('amethyst:drunk_data') as string | undefined
    if (drunk_data_string) {
        let drunk_data = JSON.parse(drunk_data_string) as DrunkPlayer

        if (drunk_data.drinks <= 0) {
            // Clear FOV, and other effects
            player.setDynamicProperty('amethyst:drunk_data', undefined)
        } else if (drunk_data.type === 'beer') {
            drunk_data = beer_drunk(player, drunk_data)
        } else if (drunk_data.type === 'wine') {
            // Wine Drunk
        } else if (drunk_data.type === 'glow') {
            // GlowWine Drunk
        }

        player.setDynamicProperty('amethyst:drunk_data', JSON.stringify(drunk_data))
        player.onScreenDisplay.setActionBar(`${drunk_data.type} ${drunk_data.drinks} ${drunk_data.fov_level}`)
    }
}

function beer_drunk(player: Player, drunk_data: DrunkPlayer): DrunkPlayer {
    const dimension = player.dimension
    const location = player.location

    const target_fov_level = Math.max(45, 75 - drunk_data.drinks * 2)

    if (drunk_data.fov_level !== target_fov_level) {
        drunk_data.fov_level = target_fov_level

        player.camera.setFov({fov: drunk_data.fov_level, easeOptions: {easeTime: 4}})
    }


    const effect_choices = ['fart', 'blink', 'nausea', 'look_away']

    // Base chance of 15% per second, increases by 4% per drink
    const effect_chance = 0.15 + (drunk_data.drinks * 0.04)

    if (Math.random() < effect_chance) {
        // Pick a random effect
        const chosen_effect = effect_choices[Math.floor(Math.random() * effect_choices.length)]

        if (chosen_effect === 'fart') {
            dimension.playSound('fart', location, {volume: 1, pitch: Math.max(0.45, Math.random() * 1.5)})

            const particle_location = {...location}
            particle_location.y += 1
            dimension.spawnParticle('minecraft:explosion_particle', particle_location)
        }
        else if (chosen_effect === 'blink') {
            player.camera.fade({fadeTime: {fadeInTime: 0.5, holdTime: 0.1, fadeOutTime: 0.25}})
        }
        else if (chosen_effect === 'nausea') {
            player.addEffect(MinecraftEffectTypes.Nausea, TicksPerSecond * 5)
        }
        else if (chosen_effect === 'look_away') {
            const facing = player.getViewDirection()

            // Add random offset to make player look away slightly
            const offset_x = (Math.random() - 0.5) * 0.4  // Random offset between -0.2 and 0.2
            const offset_z = (Math.random() - 0.5) * 0.4

            const offset_facing = {
                x: facing.x + offset_x,
                y: facing.y,
                z: facing.z + offset_z
            }

            player.camera.setCamera("minecraft:first_person", {facingLocation: offset_facing})
        }
    }

    // Chance to decrease drinks level
    // 8% chance per second to lose 1 drink level
    const sober_chance = 0.08

    if (Math.random() < sober_chance) {
        drunk_data.drinks -= 1
        // Optional: notify player they're sobering up
    }

    return drunk_data
}

export default function load_drunk() {
    system.runInterval(() => {
        let playerlist = world.getPlayers();
    
        playerlist.forEach((player) => {
            drunk(player)
        });
    }, TicksPerSecond)

    // Clear Player Drunk values on spawn
    world.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
        let player = spawn_event.player

        if (player.getDynamicProperty('amethyst:drunk_data')) {
            player.setDynamicProperty('amethyst:drunk_data', undefined)
        }
    })

    console.log('[Loops] Loaded Drunk Loop')
}
