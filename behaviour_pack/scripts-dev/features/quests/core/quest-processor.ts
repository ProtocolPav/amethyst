import { QuestOut, QuestProgressOut } from "../../../api/nexuscore/model";
import { GameAction } from "./action";

export interface QuestProcessor {
    /**
     * Processes a game action against the player's active quest.
     *
     * Determines the current active objective, delegates to ObjectiveProcessor,
     * and advances to the next objective when the current one completes.
     * Marks the quest as complete when all objectives are done.
     *
     * Mutates `questProgress` in place.
     *
     * @param action        The game action that occurred.
     * @param quest         The full quest definition (objectives, rewards, metadata).
     * @param questProgress The player's current progress on this quest. Mutated in place.
     * @returns True if the quest itself transitioned to complete as a result of this action.
     */
    process(action: GameAction, quest: QuestOut, questProgress: QuestProgressOut): boolean
}
