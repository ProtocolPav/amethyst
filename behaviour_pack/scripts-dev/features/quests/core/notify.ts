import {Player, system, world} from "@minecraft/server";
import {AnyTarget} from "../types/target-processor";
import utils from "../../../utils";
import {generateObjectiveDisplayString} from "./objective/objective-display";
import {ObjectiveOut} from "../../../api/nexuscore/model";
import api from "../../../api";

export function showProgressTick(player: Player, target: AnyTarget | undefined, current: number, goal: number) {
    let label = "Progress"

    switch (target?.target_type) {
        case 'mine':
            label = utils.clean_id((target as any).block)
            break;
        case 'kill':
            label = utils.clean_id((target as any).entity)
            break;
        case 'deliver': {
            const t = target as any;
            const id = t.item ?? t.entity ?? 'unknown';
            label = utils.clean_id(id);
            break;
        }
        case 'visit':
            label = utils.clean_id((target as any).helper_text ?? 'visit')
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

export function notifyQuestComplete(player: Player, questTitle: string) {
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

export function notifyQuestFailure(player: Player, questTitle: string) {
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