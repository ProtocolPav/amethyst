import {Player, system, world} from "@minecraft/server";
import {AnyTarget} from "../types/target-processor";
import utils from "../../../utils";
import {generateObjectiveDisplayString} from "./objective/objective-display";
import {ObjectiveOut} from "../../../api/nexuscore/model";
import api from "../../../api";
import {QuestSlot} from "../types/slot";

/**
 * How players open the daily quest in-game. Bedrock lets a custom command be
 * run without its namespace when no other command has the same name.
 */
export const DAILY_COMMAND = "/daily"

export function showProgressTick(player: Player, target: AnyTarget | undefined, current: number, goal: number) {
    let label = "Progress"

    switch (target?.target_type) {
        case 'mine':
            label = utils.clean_id(target.block)
            break;
        case 'kill':
            label = utils.clean_id(target.entity)
            break;
    }

    player.playSound(
        'quest.objective.progress',
        {volume: 100, location: player.location}
    )

    player.onScreenDisplay.setActionBar(`§l§s${label}:§r §7${current}§r/${goal}`)
}

export function notifyOfQuestUpdate(player: Player, message: string) {
    player.playSound(
        'quest.notify',
        {volume: 100, location: player.location}
    )

    player.sendMessage(message)
}

export function notifyQuestProgress(player: Player, objective: ObjectiveOut, objectiveIndex: number, totalObjectives: number, questTitle: string) {
    player.playSound(
        'quest.objective.complete',
        {volume: 100, location: player.location}
    )

    player.sendMessage(generateObjectiveDisplayString(objective, objectiveIndex, totalObjectives, questTitle))
}

export function notifyQuestComplete(player: Player, questTitle: string, slot: QuestSlot = 'regular') {
    if (slot === 'daily') {
        notifyDailyQuestComplete(player, questTitle)
        return
    }

    world.sendMessage(
        `§l§a[ §l§eQ§du§se§as§tt §uC§io§mm§pp§9l§ee§nt§be§f!§a ]§r\n` +
        `${player.name} has just completed §l§n${questTitle}§r!\n` +
        `Run §5/quests view§r on Discord to start it!`
    )

    api.Relay.event(
        "Quest Complete!",
        `${player.name} has just completed **${questTitle}**!\nRun \`/quests view\` to try your luck with it!`,
        'other'
    )

    player.onScreenDisplay.setTitle(`§l§eQ§du§se§as§tt §uC§io§mm§pp§9l§ee§nt§be!`)

    player.dimension.playSound(
        'quest.complete',
        player.location,
        {volume: 10000}
    )

    for (let i = 0; i < 5; i++) {
        system.runTimeout(() => {player.runCommand(`particle minecraft:totem_particle ~ ~2 ~`)}, 10)
    }
}

/**
 * Daily quest completion: announced like a regular quest, but worded for
 * dailies, since everyone gets the same daily automatically.
 */
function notifyDailyQuestComplete(player: Player, questTitle: string) {
    world.sendMessage(
        `§l§a[ §eDaily Quest Complete! §a]§r\n` +
        `${player.name} has just completed the daily quest §l§n${questTitle}§r!\n` +
        `Run §5${DAILY_COMMAND}§r to see yours!`
    )

    api.Relay.event(
        "Daily Quest Complete!",
        `${player.name} has just completed the daily quest **${questTitle}**!\nRun \`/quests daily\` to see yours!`,
        'other'
    )

    player.onScreenDisplay.setTitle(`§l§eDaily Quest Complete!`)

    player.dimension.playSound(
        'quest.complete',
        player.location,
        {volume: 10000}
    )

    for (let i = 0; i < 5; i++) {
        system.runTimeout(() => {player.runCommand(`particle minecraft:totem_particle ~ ~2 ~`)}, 10)
    }
}

export function notifyQuestFailure(player: Player, questTitle: string, slot: QuestSlot = 'regular') {
    if (slot === 'daily') {
        notifyDailyQuestFailure(player, questTitle)
        return
    }

    world.sendMessage(
        `§l§c[ Quest Failed :( ]§r\n` +
        `${player.name} has failed §l§n${questTitle}§r.\n` +
        `Think you can do better? Run §5/quests view§r on Discord to try your luck with it.`
    )

    api.Relay.event(
        "Quest Failed :(",
        `${player.name} has failed **${questTitle}**.\nThink you can do better? Run \`/quests view\` to try your luck with it.`,
        'other'
    )

    player.onScreenDisplay.setTitle(`§l§cQuest Failed :(`)

    player.dimension.playSound(
        'quest.fail',
        player.location,
        {volume: 10000}
    )
}

/**
 * Daily quest failure: shown to the player only, never broadcast or relayed.
 */
function notifyDailyQuestFailure(player: Player, questTitle: string) {
    player.sendMessage(
        `§l§c[ Daily Quest Failed ]§r\n` +
        `You have failed the daily quest §l§n${questTitle}§r.`
    )

    player.onScreenDisplay.setTitle(`§l§cDaily Quest Failed`)

    player.playSound(
        'quest.fail',
        {volume: 100, location: player.location}
    )
}

export function showTimer(player: Player, remaining_seconds: number) {
    const minutes = Math.floor(remaining_seconds / 60)
    const seconds = Math.floor(remaining_seconds % 60)
    const formatted = minutes > 0
        ? `${minutes}m ${seconds.toString().padStart(2, '0')}s`
        : `${seconds}s`

    const color = remaining_seconds <= 10 ? '§c' : remaining_seconds <= 30 ? '§e' : '§a'

    player.playSound(
        'note.hat',
        { volume: 100, location: player.location }
    )

    player.onScreenDisplay.setActionBar(`${color}${formatted}`)
}