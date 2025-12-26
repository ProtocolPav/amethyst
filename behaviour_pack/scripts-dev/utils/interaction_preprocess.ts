import Interaction from "../api/interaction";
import QuestProgress from "../api/quests/quest_progress";

/**
 * @returns a boolean representing if this interaction is valid for further quest checking
 */
export function interaction_preprocess(
    interaction: Interaction,
    quest: QuestProgress | null,
): boolean {
    if (!quest) return false

    const objectiveProgress = quest.get_active_objective()
    if (!objectiveProgress) return false

    const { objective } = objectiveProgress

    const matchingTargets = objective.get_target(interaction)

    return matchingTargets.length > 0
}
