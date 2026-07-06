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
import {getActiveObjective} from "../core/objective-lookup";
import {notifyQuestComplete, notifyQuestProgress} from "../core/notify";
import {grantRewards} from "../rewards/grant-rewards";

const objectiveProcessor = new ObjectiveProcessor()

// TODO: Quest does not set quest start_time, nor does it override the first objective start_time

export class QuestProcessor {
    process(action: GameAction, player: Player, quest: QuestOut, questProgress: QuestProgressOut): boolean {
        if (questProgress.status === QuestProgressOutStatus.completed) return false
        if (questProgress.status === QuestProgressOutStatus.failed) return false

        const active = getActiveObjective(quest, questProgress)
        if (!active) return false

        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const completed = objectiveProcessor.process(action, player, thorny_id, active.obj_def, active.obj_progress)

        markDirty(thorny_id)

        if (!completed) return false

        return this.completeObjective(player, thorny_id, quest, questProgress, active.obj_def, active.obj_progress)
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

        const active = getActiveObjective(quest, questProgress)
        if (!active) return

        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        active.obj_progress.status = ObjectiveProgressOutStatus.failed
        active.obj_progress.end_time = new Date().toISOString()

        deactivateObjective(player, thorny_id, active.obj_def, active.obj_progress)

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

        const thorny_user = ThornyUser.fetch_user_by_id(thorny_id)
        grantRewards(player, thorny_id, thorny_user.balance, objectiveDef.rewards, objectiveProgress).then()

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

            notifyQuestProgress(
                player,
                nextObjectiveDef!,
                quest.objectives.indexOf(nextObjectiveDef!) + 1,
                quest.objectives.length,
                quest.title
            )

            return false
        }

        return this.onQuestComplete(player, thorny_id, quest, questProgress)
    }

    private onQuestComplete(player: Player, thorny_id: number, questOut: QuestOut, questProgress: QuestProgressOut): true {
        questProgress.status = QuestProgressOutStatus.completed
        questProgress.end_time = new Date().toISOString()
        markDirty(thorny_id)

        notifyQuestComplete(player, questOut.title)
        return true
    }

    fail(player: Player, quest: QuestOut, questProgress: QuestProgressOut): void {
        const thorny_id = ThornyUser.fetch_user(player.name)!.thorny_id

        const active = getActiveObjective(quest, questProgress)
        if (active) {
            deactivateObjective(player, thorny_id, active.obj_def, active.obj_progress)
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