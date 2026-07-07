import {getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet} from "../../../api/nexuscore/quests/quests";
import {NotFoundError} from "../../../api/http-errors";
import {QuestProgressOut} from "../../../api/nexuscore/model";

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