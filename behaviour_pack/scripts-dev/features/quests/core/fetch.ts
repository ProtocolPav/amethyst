import {
    acceptDailyQuestV1GuildsMeQuestsProgressUserThornyIdDailyPost,
    getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet
} from "../../../api/nexuscore/quests/quests";
import {NotFoundError} from "../../../api/http-errors";
import {QuestProgressOut} from "../../../api/nexuscore/model";

/**
 * The player's active regular (non-daily) quest progress, or null if none.
 */
export async function get_quest_progress(thorny_id: number): Promise<QuestProgressOut | null> {
    let quest_progress_response: QuestProgressOut

    try {
        quest_progress_response = await getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet(thorny_id)
    } catch (error) {
        if (error instanceof NotFoundError) {
            return null; // No active quest, that's fine
        }

        throw error; // Rethrow anything unexpected
    }

    return quest_progress_response;
}

/**
 * The player's current daily quest progress, accepting today's daily if needed.
 *
 * Safe to call repeatedly. Returns their unfinished daily if it's still running
 * (dailies overlap, so this may be yesterday's), otherwise today's progress,
 * whatever its status. Returns null if the guild has no daily quest available.
 */
export async function accept_daily_quest(thorny_id: number): Promise<QuestProgressOut | null> {
    try {
        return await acceptDailyQuestV1GuildsMeQuestsProgressUserThornyIdDailyPost(thorny_id)
    } catch (error) {
        if (error instanceof NotFoundError) {
            return null; // No daily quest today
        }

        throw error;
    }
}
