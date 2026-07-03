import {
    QuestOut,
    QuestProgressOut,
    QuestProgressOutStatus,
    ObjectiveProgressOutStatus,
} from "../../../api/nexuscore/model";
import { GameAction } from "../core/action";
import { ObjectiveProcessor } from "./objective-processor";
import { markDirty } from "../write-back";

const objectiveProcessor = new ObjectiveProcessor()

export class QuestProcessor {
    process(action: GameAction, quest: QuestOut, questProgress: QuestProgressOut): boolean {
        if (questProgress.status === QuestProgressOutStatus.completed) return false
        if (questProgress.status === QuestProgressOutStatus.failed) return false

        const activeObjectiveProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.active
        )
        if (!activeObjectiveProgress) return false

        const activeObjectiveDef = quest.objectives.find(
            o => o.objective_id === activeObjectiveProgress.objective_id
        )
        if (!activeObjectiveDef) return false

        const completed = objectiveProcessor.process(action, activeObjectiveDef, activeObjectiveProgress)

        markDirty(questProgress.thorny_id) // Update the API

        if (!completed) return false

        return this.onObjectiveComplete(quest, questProgress)
    }

    private onObjectiveComplete(quest: QuestOut, questProgress: QuestProgressOut): boolean {
        const nextObjectiveProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.pending
        )

        if (nextObjectiveProgress) {
            nextObjectiveProgress.status = ObjectiveProgressOutStatus.active
            nextObjectiveProgress.start_time = new Date().toISOString()
            markDirty(questProgress.thorny_id)
            // TODO: notify player of next objective
            return false
        }

        return this.onQuestComplete(questProgress)
    }

    private onQuestComplete(questProgress: QuestProgressOut): true {
        questProgress.status = QuestProgressOutStatus.completed
        questProgress.end_time = new Date().toISOString()
        markDirty(questProgress.thorny_id)
        // TODO: notify player, deliver rewards
        return true
    }

    fail(questProgress: QuestProgressOut): void {
        questProgress.status = QuestProgressOutStatus.failed
        questProgress.end_time = new Date().toISOString()

        for (const obj of questProgress.objectives) {
            if (obj.status !== ObjectiveProgressOutStatus.completed) {
                obj.status = ObjectiveProgressOutStatus.failed
                obj.end_time = new Date().toISOString()
            }
        }

        markDirty(questProgress.thorny_id)
        // TODO: notify player of failure
    }
}