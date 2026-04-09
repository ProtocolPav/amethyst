import {world} from "@minecraft/server";
import {MineAction} from "../core/action";

export default function loadMineHandler() {
    world.afterEvents.playerBreakBlock.subscribe((event) => {
        const mining_action: MineAction = {
            time: new Date(),
            coordinates: event.block.location,
            dimension: event.player.dimension.id,
            block_id: event.block.typeId,
            mainhand: event.itemStackBeforeBreak?.typeId ?? null,
        }
    })
}