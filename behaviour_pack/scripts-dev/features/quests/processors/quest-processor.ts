import {
    QuestOut,
    QuestProgressOut,
    QuestProgressOutStatus,
    ObjectiveProgressOutStatus,
} from "../../../api/nexuscore/model";
import { Player } from "@minecraft/server";
import { GameAction } from "../core/action";
import { ObjectiveProcessor, activateObjective, deactivateObjective } from "./objective-processor";
import { markDirty } from "../write-back";
import ThornyUser from "../../../api/user";

const objectiveProcessor = new ObjectiveProcessor()

export class QuestProcessor {
    process(action: GameAction, player: Player, quest: QuestOut, questProgress: QuestProgressOut): boolean {
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

        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const completed = objectiveProcessor.process(action, activeObjectiveDef, activeObjectiveProgress)

        markDirty(thorny_id)

        if (!completed) return false

        return this.onObjectiveComplete(player, quest, questProgress)
    }

    private onObjectiveComplete(player: Player, quest: QuestOut, questProgress: QuestProgressOut): boolean {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const justCompletedProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.completed
        )
        const justCompletedDef = justCompletedProgress
            ? quest.objectives.find(o => o.objective_id === justCompletedProgress.objective_id)
            : undefined

        if (justCompletedDef && justCompletedProgress) {
            deactivateObjective(player, justCompletedDef, justCompletedProgress)
        }

        const nextObjectiveProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.pending
        )

        if (nextObjectiveProgress) {
            nextObjectiveProgress.status = ObjectiveProgressOutStatus.active
            nextObjectiveProgress.start_time = new Date().toISOString()

            const nextObjectiveDef = quest.objectives.find(
                o => o.objective_id === nextObjectiveProgress.objective_id
            )
            if (nextObjectiveDef) {
                activateObjective(player, nextObjectiveDef, nextObjectiveProgress)
            }

            markDirty(thorny_id)
            // TODO: notify player of next objective
            return false
        }

        return this.onQuestComplete(player, questProgress)
    }

    private onQuestComplete(player: Player, questProgress: QuestProgressOut): true {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id
        questProgress.status = QuestProgressOutStatus.completed
        questProgress.end_time = new Date().toISOString()
        markDirty(thorny_id)
        // TODO: notify player, deliver rewards
        return true
    }

    fail(player: Player, quest: QuestOut, questProgress: QuestProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const activeObjectiveProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.active
        )
        const activeObjectiveDef = activeObjectiveProgress
            ? quest.objectives.find(o => o.objective_id === activeObjectiveProgress.objective_id)
            : undefined

        if (activeObjectiveDef && activeObjectiveProgress) {
            deactivateObjective(player, activeObjectiveDef, activeObjectiveProgress)
        }

        questProgress.status = QuestProgressOutStatus.failed
        questProgress.end_time = new Date().toISOString()

        for (const obj of questProgress.objectives) {
            if (obj.status !== ObjectiveProgressOutStatus.completed) {
                obj.status = ObjectiveProgressOutStatus.failed
                obj.end_time = new Date().toISOString()
            }
        }

        markDirty(thorny_id)
        // TODO: notify player of failure
    }
}
