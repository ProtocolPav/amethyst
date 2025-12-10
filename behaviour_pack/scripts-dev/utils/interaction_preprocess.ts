import Interaction from "../api/interaction";
import QuestWithProgress from "../api/quest_with_progress";

/**
 * @returns a Boolean representing if this interaction is valid for further quest checking
 */
export function interaction_preprocess(interaction: Interaction, quest: QuestWithProgress | null) {
    if (!quest) return false;

    const objective = quest.get_active_objective()

    const type_check = interaction.type == objective?.objective_type
    const reference_check = interaction.reference == objective?.objective

    return type_check && reference_check;
}