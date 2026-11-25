import {
    QuestProgressOut,
    QuestProgressOutStatus,
    ObjectiveProgressOutStatus,
    ObjectiveOut,
} from "../../../api/nexuscore/model";
import { Player } from "@minecraft/server";
import { GameAction } from "../types/action";
import { ObjectiveProcessor } from "./objective-processor";
import { markDirty } from "../write-back";
import ThornyUser from "../../../api/user";
import { activateObjective, deactivateObjective } from "../core/objective/objective-lifecycle";
import {getActiveObjective} from "../core/objective/objective-lookup";
import {notifyQuestComplete, notifyQuestFailure, notifyQuestProgress} from "../core/notify";
import {grantRewards} from "../rewards/grant-rewards";
import {CachedQuestProgress} from "../progress-store";
import {DeactivationContext} from "../types/deactivation-context";
import {isFinished} from "../core/status";

const objectiveProcessor = new ObjectiveProcessor()

// TODO: Quest does not set quest start_time, nor does it override the first objective start_time

function deactivationContext(player: Player, cached: CachedQuestProgress): DeactivationContext {
    return { ...cached.ref, playerName: player.name, player, isLeaving: false }
}

/**
 * Drives a single quest slot's progress. Every method takes the slot's
 * cached entry, so the regular and daily quests are processed independently.
 */
export class QuestProcessor {
    process(action: GameAction, player: Player, cached: CachedQuestProgress): boolean {
        const { quest, progress: questProgress } = cached
        if (isFinished(questProgress.status)) return false

        const active = getActiveObjective(quest, questProgress)
        if (!active) return false

        const completed = objectiveProcessor.process(action, player, cached.ref, active.obj_def, active.obj_progress)

        markDirty(questProgress)

        if (!completed) return false

        return this.completeObjective(player, cached, active.obj_def, active.obj_progress)
    }

    /**
     * Called by the tick loop when a watcher plugin signals 'advance'
     * (e.g. a non-failing timer that has expired).
     * Skips the active objective — deactivates it and transitions onward,
     * but grants NO objective rewards, unlike a normal completion.
     */
    skipObjective(player: Player, cached: CachedQuestProgress): void {
        const { quest, progress: questProgress } = cached
        if (isFinished(questProgress.status)) return

        const active = getActiveObjective(quest, questProgress)
        if (!active) return

        active.obj_progress.status = ObjectiveProgressOutStatus.failed
        active.obj_progress.end_time = new Date().toISOString()

        deactivateObjective(deactivationContext(player, cached), active.obj_def, active.obj_progress)

        this.advanceQuest(player, cached)
    }

    /**
     * Called when an objective is genuinely completed via process().
     * Deactivates it, grants its rewards, then transitions onward.
     */
    private completeObjective(
        player: Player,
        cached: CachedQuestProgress,
        objectiveDef: ObjectiveOut,
        objectiveProgress: QuestProgressOut['objectives'][number]
    ): boolean {
        deactivateObjective(deactivationContext(player, cached), objectiveDef, objectiveProgress)

        const thorny_id = cached.ref.thornyId
        const thorny_user = ThornyUser.fetch_user_by_id(thorny_id)
        grantRewards(player, thorny_id, thorny_user.balance, objectiveDef.rewards, objectiveProgress).then()

        return this.advanceQuest(player, cached)
    }

    /**
     * Shared transition logic used by both completion and skip paths.
     * Activates the next pending objective if one exists, otherwise
     * completes the quest. Grants no rewards itself — reward-granting
     * is the caller's responsibility.
     */
    private advanceQuest(player: Player, cached: CachedQuestProgress): boolean {
        const { quest, progress: questProgress } = cached
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
                activateObjective({ ...cached.ref, player }, nextObjectiveDef, nextObjectiveProgress)
            }

            markDirty(questProgress)

            notifyQuestProgress(
                player,
                nextObjectiveDef!,
                quest.objectives.indexOf(nextObjectiveDef!) + 1,
                quest.objectives.length,
                quest.title
            )

            return false
        }

        return this.onQuestComplete(player, cached)
    }

    private onQuestComplete(player: Player, cached: CachedQuestProgress): true {
        const questProgress = cached.progress
        questProgress.status = QuestProgressOutStatus.completed
        questProgress.end_time = new Date().toISOString()
        markDirty(questProgress)

        notifyQuestComplete(player, cached.quest.title)
        return true
    }

    fail(player: Player, cached: CachedQuestProgress): void {
        const { quest, progress: questProgress } = cached
        if (isFinished(questProgress.status)) return

        const active = getActiveObjective(quest, questProgress)
        if (active) {
            deactivateObjective(deactivationContext(player, cached), active.obj_def, active.obj_progress)
        }

        questProgress.status = QuestProgressOutStatus.failed
        questProgress.end_time = new Date().toISOString()

        for (const obj of questProgress.objectives) {
            if (obj.status !== ObjectiveProgressOutStatus.completed) {
                obj.status = ObjectiveProgressOutStatus.failed
                obj.end_time = new Date().toISOString()
            }
        }

        markDirty(questProgress)

        notifyQuestFailure(player, quest.title)
    }
}
