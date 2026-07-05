import { world } from "@minecraft/server";
import { MineAction } from "../core/action";
import { listInteractionsV1GuildsMeInteractionsGet } from "../../../api/nexuscore/guilds/guilds";
import api from "../../../api";
import { QUEST_PROGRESS_CACHE } from "../progress-cache";
import { QUEST_CACHE } from "../quest-cache";
import { QuestProcessor } from "../processors/quest-processor";
import ThornyUser from "../../../api/user";

const questProcessor = new QuestProcessor()

export default function loadMineHandler() {
    world.afterEvents.playerBreakBlock.subscribe(async (event) => {
        const thorny_user = ThornyUser.fetch_user(event.player.name)
        if (!thorny_user) return

        const quest_progress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)
        if (!quest_progress) return

        const quest = QUEST_CACHE.get(quest_progress.quest_id)
        if (!quest) return

        const interactions = await listInteractionsV1GuildsMeInteractionsGet({
            coordinates: [event.block.x, event.block.y, event.block.z]
        })

        const mining_action: MineAction = {
            type: 'mine',
            time: new Date(),
            coordinates: event.block.location,
            dimension: event.player.dimension.id,
            block_id: event.brokenBlockPermutation.type.id,
            mainhand: event.itemStackBeforeBreak?.typeId ?? null,
            naturally_mined: interactions.length <= 1,
            player: event.player,
        }

        questProcessor.process(mining_action, event.player, quest as any, quest_progress)
    })
}
