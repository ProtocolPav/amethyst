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