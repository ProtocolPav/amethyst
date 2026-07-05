// core/objective-lookup.ts
import { QuestOut, QuestProgressOut, ObjectiveOut, ObjectiveProgressOut, ObjectiveProgressOutStatus } from "../../../api/nexuscore/model";

export interface ActiveObjective {
    quest_def: ObjectiveOut
    quest_progress: ObjectiveProgressOut
}

/**
 * Finds the active objective's progress entry, if any.
 */
export function findActiveObjectiveProgress(questProgress: QuestProgressOut): ObjectiveProgressOut | undefined {
    return questProgress.objectives.find(o => o.status === ObjectiveProgressOutStatus.active)
}

/**
 * Resolves the active objective for a quest, pairing the progress entry
 * with its definition. Returns undefined if there's no active objective
 * or its definition can't be found (data inconsistency).
 */
export function getActiveObjective(quest: QuestOut, questProgress: QuestProgressOut): ActiveObjective | undefined {
    const quest_progress = findActiveObjectiveProgress(questProgress)
    if (!quest_progress) return undefined

    const quest_def = quest.objectives.find(o => o.objective_id === quest_progress.objective_id)
    if (!quest_def) return undefined

    return { quest_def, quest_progress }
}