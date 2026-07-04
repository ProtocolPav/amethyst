import {Player} from "@minecraft/server";
import {AnyTarget} from "./target-processor";
import utils from "../../../utils";

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