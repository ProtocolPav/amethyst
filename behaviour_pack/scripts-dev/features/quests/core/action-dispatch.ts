// core/action-dispatch.ts
import { Player } from "@minecraft/server";
import { GameAction } from "./action";
import { QUEST_PROGRESS_CACHE } from "../progress-cache";
import { QUEST_CACHE } from "../quest-cache";
import { QuestProcessor } from "../processors/quest-processor";
import ThornyUser from "../../../api/user";

const questProcessor = new QuestProcessor()

/**
 * Resolves the player's cached quest + progress and hands the action to
 * QuestProcessor.process(). process() already no-ops safely if there's
 * no active objective, so no need to pre-check that here — only the
 * lookups process() actually requires as arguments are done.
 */
export function processGameAction(player: Player, action: GameAction): void {
    const thorny_user = ThornyUser.fetch_user(player.name)
    if (!thorny_user) return

    const questProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id)
    if (!questProgress) return

    const quest = QUEST_CACHE.get(questProgress.quest_id)
    if (!quest) return

    questProcessor.process(action, player, quest, questProgress)
}