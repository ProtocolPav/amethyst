import {
    CommandPermissionLevel,
    CustomCommand,
    CustomCommandStatus,
    Player,
    system
} from "@minecraft/server";
import api from "../../api";
import { getCachedProgress } from "../quests/progress-store";
import { accept_daily_quest } from "../quests/core/fetch";
import { getQuest } from "../quests/quest-cache";
import { generateDailyDisplayString } from "../quests/core/daily-display";

/**
 * Shows the player their daily quest and progress.
 *
 * Prefers the cached daily slot, which is ahead of Nexuscore until the next
 * save, and falls back to the accept-daily endpoint (e.g. right after joining).
 */
async function showDaily(player: Player) {
    const thornyUser = api.ThornyUser.fetch_user(player.name)
        ?? await api.ThornyUser.get_user_from_api(player.name)

    const cached = getCachedProgress({ thornyId: thornyUser.thorny_id, slot: 'daily' })
    if (cached) {
        player.sendMessage(generateDailyDisplayString(cached.quest, cached.progress, false))
        return
    }

    const progress = await accept_daily_quest(thornyUser.thorny_id)
    if (!progress) {
        player.sendMessage(`§7There is no daily quest today. Check back tomorrow!§r`)
        return
    }

    const quest = await getQuest(progress.quest_id)
    player.sendMessage(generateDailyDisplayString(quest, progress, false))
}

export default function dailyCommand() {
    system.beforeEvents.startup.subscribe(initEvent => {
        const command: CustomCommand = {
            name: "amethyst:daily",
            description: "Show your daily quest and progress",
            permissionLevel: CommandPermissionLevel.Any,
        };

        initEvent.customCommandRegistry.registerCommand(
            command,
            (origin) => {
                const player = origin.sourceEntity
                if (!(player instanceof Player)) {
                    return {
                        status: CustomCommandStatus.Failure,
                        message: "Only players can see their daily quest"
                    }
                }

                // Commands run in a restricted context, so do the work afterwards
                system.run(() => {
                    showDaily(player).catch(e => {
                        console.error('[daily] Failed to show the daily quest:', e)
                        if (player.isValid) player.sendMessage(`§cCouldn't load your daily quest. Try again in a moment.§r`)
                    })
                })

                return {
                    status: CustomCommandStatus.Success
                }
            }
        )
    })
}
