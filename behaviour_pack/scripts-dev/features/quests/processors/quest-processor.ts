import {
    QuestOut,
    QuestProgressOut,
    QuestProgressOutStatus,
    ObjectiveProgressOutStatus,
} from "../../../api/nexuscore/model";
import { Player } from "@minecraft/server";
import { GameAction } from "../core/action";
import { ObjectiveProcessor, activateObjective, deactivateObjective, tickPlugins } from "./objective-processor";
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

        // Resolve thorny_id once and reuse throughout
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        // Process the action against the active objective
        const completed = objectiveProcessor.process(action, thorny_id, activeObjectiveDef, activeObjectiveProgress)

        // Tick all watcher plugins — checks timer expiry, death counts, etc.
        // This runs regardless of whether the action made progress.
        const signal = tickPlugins(player, thorny_id, activeObjectiveDef, activeObjectiveProgress)
        if (signal === 'fail') {
            this.fail(player, quest, questProgress)
            return false
        }
        if (signal === 'advance') {
            return this.onObjectiveComplete(player, thorny_id, quest, questProgress)
        }

        markDirty(thorny_id)

        if (!completed) return false

        return this.onObjectiveComplete(player, thorny_id, quest, questProgress)
    }

    /**
     * Called by the tick loop when a watcher plugin signals 'advance'
     * (e.g. a non-failing timer that has expired).
     * Marks the active objective completed and transitions to the next one.
     */
    advance(player: Player, quest: QuestOut, questProgress: QuestProgressOut): void {
        if (questProgress.status === QuestProgressOutStatus.completed) return
        if (questProgress.status === QuestProgressOutStatus.failed) return

        const activeObjectiveProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.active
        )
        if (!activeObjectiveProgress) return

        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        // Mark the current objective completed so onObjectiveComplete
        // picks up the correct justCompleted entry
        activeObjectiveProgress.status = ObjectiveProgressOutStatus.completed
        activeObjectiveProgress.end_time = new Date().toISOString()

        this.onObjectiveComplete(player, thorny_id, quest, questProgress)
    }

    private onObjectiveComplete(player: Player, thorny_id: number, quest: QuestOut, questProgress: QuestProgressOut): boolean {
        const justCompletedProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.completed
        )
        const justCompletedDef = justCompletedProgress
            ? quest.objectives.find(o => o.objective_id === justCompletedProgress.objective_id)
            : undefined

        if (justCompletedDef && justCompletedProgress) {
            deactivateObjective(player, thorny_id, justCompletedDef, justCompletedProgress)
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
                activateObjective(player, thorny_id, nextObjectiveDef, nextObjectiveProgress)
            }

            markDirty(thorny_id)
            // TODO: notify player of next objective
            return false
        }

        return this.onQuestComplete(player, thorny_id, questProgress)
    }

    private onQuestComplete(player: Player, thorny_id: number, questProgress: QuestProgressOut): true {
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
            deactivateObjective(player, thorny_id, activeObjectiveDef, activeObjectiveProgress)
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
