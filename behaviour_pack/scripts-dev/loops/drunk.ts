import {EntityComponentTypes, EquipmentSlot, Player, system, TicksPerSecond, world} from "@minecraft/server";
import {MinecraftEffectTypes} from '@minecraft/vanilla-data';
import api from "../api";
import utils from "../utils";


interface DrunkPlayer {
    type: "amethyst:beer" | "amethyst:wine" | "amethyst:glow_wine"
    drinks: number
    fov_level?: number
}

function sober_up(drunk_data: DrunkPlayer): DrunkPlayer {
    // 8% chance per second to lose 1 drink level
    const sober_chance = 0.08

    if (Math.random() < sober_chance) {
        drunk_data.drinks -= 1
    }

    return drunk_data
}

function cumulative_drunk_effects(player: Player, drunk_data: DrunkPlayer) {
    player.addEffect(MinecraftEffectTypes.Oozing, TicksPerSecond * 2)

    if (drunk_data.drinks > 4) {
        player.addEffect(MinecraftEffectTypes.Hunger, TicksPerSecond * drunk_data.drinks)
    }

    if (drunk_data.drinks > 18) {
        player.addEffect(MinecraftEffectTypes.Slowness, TicksPerSecond * 2, {amplifier: 3})
    }

    if (drunk_data.drinks > 20) {
        player.addEffect(MinecraftEffectTypes.FatalPoison, TicksPerSecond * 2)
    }
}

function drunk(player: Player): void {
    const drunk_data_string = player.getDynamicProperty('amethyst:drunk_data') as string | undefined
    if (drunk_data_string) {
        let drunk_data = JSON.parse(drunk_data_string) as DrunkPlayer
        let effect_choices: {item: string, weight: number}[] = []

        cumulative_drunk_effects(player, drunk_data)

        if (drunk_data.type === 'amethyst:beer') {
            effect_choices = [
                { item: 'fart', weight: 2 },
                { item: 'blink', weight: 3 },
                { item: 'nausea', weight: 2 },
                { item: 'burp', weight: 4 },
                { item: 'slowness', weight: 1 },
                { item: 'none', weight: 3 },
            ]
        } else if (drunk_data.type === 'amethyst:wine') {
            effect_choices = [
                { item: 'blink', weight: 3 },
                { item: 'nausea', weight: 1 },
                { item: 'slowness', weight: 2 },
                { item: 'laugh', weight: 4 },
            ]
        } else if (drunk_data.type === 'amethyst:glow_wine') {
            effect_choices = [
                { item: 'blink', weight: 3 },
                { item: 'nausea', weight: 1 },
                { item: 'burp', weight: 1 },
                { item: 'laugh', weight: 5 },
                { item: 'night_vision', weight: 4 },
                { item: 'speed', weight: 2 },
            ]
        }

        drunk_data = drunk_effects(player, drunk_data, effect_choices)
        drunk_data = sober_up(drunk_data)

        if (drunk_data.drinks <= 0) {
            player.camera.setFov({easeOptions: {easeTime: 2.5}})
            player.setDynamicProperty('amethyst:drunk_data', undefined)
        } else {
            player.setDynamicProperty('amethyst:drunk_data', JSON.stringify(drunk_data))
        }
    }
}

function drunk_effects(
    player: Player,
    drunk_data: DrunkPlayer,
    effect_choices: {item: string, weight: number}[]
): DrunkPlayer {
    const dimension = player.dimension
    const location = player.location

    const target_fov_level = Math.max(45, 73 - drunk_data.drinks * 2)

    if (drunk_data.fov_level !== target_fov_level) {
        drunk_data.fov_level = target_fov_level

        player.camera.setFov({fov: drunk_data.fov_level, easeOptions: {easeTime: 4}})
    }

    // Base chance of 11% per second, increases by 4% per drink
    const effect_chance = 0.11 + (drunk_data.drinks * 0.04)

    if (Math.random() < effect_chance) {
        // Pick a random effect
        const chosen_effect = utils.getWeightedChoice(effect_choices)

        if (chosen_effect === 'fart') {
            dimension.playSound('fart', location, {volume: 1, pitch: Math.max(0.45, Math.random() * 1.5)})

            const particle_location = {...location}
            particle_location.y += 1
            dimension.spawnParticle('minecraft:explosion_particle', particle_location)
        }
        else if (chosen_effect === 'burp') {
            dimension.playSound('burp', location, {volume: 1, pitch: Math.max(0.7, Math.random() * 1.5)})

            const particle_location = {...location}
            particle_location.y += 2
            dimension.spawnParticle('minecraft:explosion_particle', particle_location)
        }
        else if (chosen_effect === 'laugh') {
            dimension.playSound('laugh', location, {volume: 1, pitch: Math.max(0.83, Math.random() * 1.7)})
        }
        else if (chosen_effect === 'blink') {
            player.camera.fade({fadeTime: {fadeInTime: 0.5, holdTime: 0.1, fadeOutTime: 0.25}})
        }
        else if (chosen_effect === 'nausea') {
            player.addEffect(MinecraftEffectTypes.Nausea, 5 + TicksPerSecond * drunk_data.drinks)
        }
        else if (chosen_effect === 'slowness') {
            player.addEffect(MinecraftEffectTypes.Slowness, TicksPerSecond * drunk_data.drinks)
        }
        else if (chosen_effect === 'night_vision') {
            player.addEffect(MinecraftEffectTypes.NightVision, TicksPerSecond * drunk_data.drinks)
        }
        else if (chosen_effect === 'speed') {
            player.addEffect(MinecraftEffectTypes.Speed, TicksPerSecond * drunk_data.drinks)
        }
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
