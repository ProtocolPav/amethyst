import {world} from "@minecraft/server";
import {MineAction} from "../core/action";
import {listInteractionsV1GuildsMeInteractionsGet} from "../../../api/nexuscore/guilds/guilds";
import api from "../../../api";
import {QUEST_PROGRESS_CACHE} from "../progress-cache";

export default function loadMineHandler() {
    world.afterEvents.playerBreakBlock.subscribe(async (event) => {
        const interactions = await listInteractionsV1GuildsMeInteractionsGet({
            coordinates: [event.block.x, event.block.y, event.block.z]
        })

        const thorny_user = api.ThornyUser.fetch_user(event.player.name)!
        const quest_progress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)

        const mining_action: MineAction = {
            time: new Date(),
            coordinates: event.block.location,
            dimension: event.player.dimension.id,
            block_id: event.block.typeId,
            mainhand: event.itemStackBeforeBreak?.typeId ?? null,
            naturally_mined: interactions.length > 1 // Breaking a block for the first time adds one interaction, so check for >1
        }
    })
}