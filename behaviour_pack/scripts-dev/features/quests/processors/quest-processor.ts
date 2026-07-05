import {
    QuestOut,
    QuestProgressOut,
    QuestProgressOutStatus,
    ObjectiveProgressOutStatus,
    ObjectiveOut,
} from "../../../api/nexuscore/model";
import { Player } from "@minecraft/server";
import { GameAction } from "../core/action";
import { ObjectiveProcessor } from "./objective-processor";
import { markDirty } from "../write-back";
import ThornyUser from "../../../api/user";
import { activateObjective, deactivateObjective } from "./objective-lifecycle";

const objectiveProcessor = new ObjectiveProcessor()

// TODO: Quest does not set quest start_time, nor does it override the first objective start_time

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

        const completed = objectiveProcessor.process(action, player, thorny_id, activeObjectiveDef, activeObjectiveProgress)

        markDirty(thorny_id)

        if (!completed) return false

        return this.completeObjective(player, thorny_id, quest, questProgress, activeObjectiveDef, activeObjectiveProgress)
    }

    /**
     * Called by the tick loop when a watcher plugin signals 'advance'
     * (e.g. a non-failing timer that has expired).
     * Skips the active objective — deactivates it and transitions onward,
     * but grants NO objective rewards, unlike a normal completion.
     */
    skipObjective(player: Player, quest: QuestOut, questProgress: QuestProgressOut): void {
        if (questProgress.status === QuestProgressOutStatus.completed) return
        if (questProgress.status === QuestProgressOutStatus.failed) return

        const activeObjectiveProgress = questProgress.objectives.find(
            o => o.status === ObjectiveProgressOutStatus.active
        )
        if (!activeObjectiveProgress) return

        const activeObjectiveDef = quest.objectives.find(
            o => o.objective_id === activeObjectiveProgress.objective_id
        )
        if (!activeObjectiveDef) return

        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        activeObjectiveProgress.status = ObjectiveProgressOutStatus.failed
        activeObjectiveProgress.end_time = new Date().toISOString()

        deactivateObjective(player, thorny_id, activeObjectiveDef, activeObjectiveProgress)

        this.advanceQuest(player, thorny_id, quest, questProgress)
    }

    /**
     * Called when an objective is genuinely completed via process().
     * Deactivates it, grants its rewards, then transitions onward.
     */
    private completeObjective(
        player: Player,
        thorny_id: number,
        quest: QuestOut,
        questProgress: QuestProgressOut,
        objectiveDef: ObjectiveOut,
        objectiveProgress: QuestProgressOut['objectives'][number]
    ): boolean {
        deactivateObjective(player, thorny_id, objectiveDef, objectiveProgress)

        this.grantObjectiveRewards(player, objectiveDef)

        return this.advanceQuest(player, thorny_id, quest, questProgress)
    }

    /**
     * Shared transition logic used by both completion and skip paths.
     * Activates the next pending objective if one exists, otherwise
     * completes the quest. Grants no rewards itself — reward-granting
     * is the caller's responsibility.
     */
    private advanceQuest(player: Player, thorny_id: number, quest: QuestOut, questProgress: QuestProgressOut): boolean {
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

    /**
     * Grants rewards tied to a single objective's completion.
     * Not called for skipped objectives, and not called for quest completion
     * — objective rewards and quest completion are separate concerns.
     */
    private grantObjectiveRewards(player: Player, objectiveDef: ObjectiveOut): void {
        // TODO: deliver objective-level rewards
    }

    private onQuestComplete(player: Player, thorny_id: number, questProgress: QuestProgressOut): true {
        questProgress.status = QuestProgressOutStatus.completed
        questProgress.end_time = new Date().toISOString()
        markDirty(thorny_id)
        // TODO: notify player quest is complete
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