import {
    ObjectiveOut,
    ObjectiveOutLogic,
    ObjectiveProgressOut,
    ObjectiveProgressOutStatus,
    QuestOut,
    QuestProgressOut,
} from "../../../api/nexuscore/model";
import { AnyTarget, AnyTargetProgress } from "../types/target-processor";
import { DIVIDER, SECTION, requirementLines, rewardsLine, targetId, taskLine } from "./objective/objective-display";
import { DAILY_COMMAND } from "./notify";
import utils from "../../../utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** "5h 12m", or "12m" under an hour. */
function formatDuration(ms: number): string {
    const totalMinutes = Math.max(0, Math.ceil(ms / 60000))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

/** Daily quests start at 00:00 UTC. */
function nextUtcMidnight(now: Date): Date {
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
}

/**
 * The objective to show: the active one, otherwise the last one the player
 * reached, otherwise the first.
 */
function displayedObjective(quest: QuestOut, progress: QuestProgressOut | undefined): { def: ObjectiveOut, progress?: ObjectiveProgressOut } | undefined {
    const byOrder = (a: ObjectiveOut, b: ObjectiveOut) => a.order_index - b.order_index
    const objectives = [...quest.objectives].sort(byOrder)
    if (objectives.length === 0) return undefined

    const progressFor = (def: ObjectiveOut) => progress?.objectives.find(o => o.objective_id === def.objective_id)

    const active = objectives.find(def => progressFor(def)?.status === ObjectiveProgressOutStatus.active)
    if (active) return { def: active, progress: progressFor(active) }

    const reached = objectives.filter(def => {
        const status = progressFor(def)?.status
        return status !== undefined && status !== ObjectiveProgressOutStatus.pending
    })
    const last = reached[reached.length - 1] ?? objectives[0]
    return { def: last, progress: progressFor(last) }
}

function progressLine(objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut | undefined): string {
    const targetProgress = (objectiveProgress?.target_progress ?? []) as AnyTargetProgress[]
    const countFor = (target: AnyTarget) => targetProgress.find(tp => tp.target_uuid === target.target_uuid)?.count ?? 0
    const targets = objective.targets as AnyTarget[]

    // Shared pool: one total across all targets
    if (objective.logic === ObjectiveOutLogic.or && objective.target_count !== null && objective.target_count !== undefined) {
        const total = Math.min(targets.reduce((sum, t) => sum + countFor(t), 0), objective.target_count)
        return `§f${total}§7/${objective.target_count}§r`
    }

    return targets.map(target => {
        const name = utils.clean_id(targetId(target))
        const goal = target.count ?? 1
        const count = Math.min(countFor(target), goal)

        if (target.target_type === 'visit') {
            return count >= goal ? `§f${name} §a(visited)§r` : `§f${name} §7(not yet)§r`
        }
        return `§f${name} §7${count}/${goal}§r`
    }).join('§7, §r')
}

function statusLine(progress: QuestProgressOut | undefined, quest: QuestOut, now: Date): string {
    const endsIn = formatDuration(new Date(quest.end_time).getTime() - now.getTime())
    const nextIn = formatDuration(nextUtcMidnight(now).getTime() - now.getTime())

    switch (progress?.status) {
        case 'completed':
            return `§aCompleted!§r §7Next daily quest in §f${nextIn}§r`
        case 'failed':
            return `§cFailed§r §7Next daily quest in §f${nextIn}§r`
        case 'abandoned':
            return `§7Ended. Next daily quest in §f${nextIn}§r`
        case 'active':
        case 'pending':
            return `§eIn progress§r §7Ends in §f${endsIn}§r`
        default:
            return `§7Not started.§r §7Ends in §f${endsIn}§r`
    }
}

// ─── Full Display Message ──────────────────────────────────────────────────────

/**
 * Generates the daily quest summary: title, the current objective with the
 * player's progress, its rewards and requirements, and the quest's status.
 *
 * Handles dailies that admins edited to have several objectives, by showing
 * the current one with its position.
 *
 * @param quest        The daily quest
 * @param progress     The player's progress on it, if any
 * @param withCommand  Whether to end with a hint to run the daily command
 */
export function generateDailyDisplayString(
    quest: QuestOut,
    progress: QuestProgressOut | undefined,
    withCommand: boolean,
    now: Date = new Date(),
): string {
    const parts = [
        SECTION,
        `§e§l[ Daily Quest ]§r §f§l${quest.title}§r`,
        DIVIDER,
    ]

    const shown = displayedObjective(quest, progress)
    if (shown) {
        const { def, progress: objectiveProgress } = shown

        if (quest.objectives.length > 1) {
            const index = [...quest.objectives].sort((a, b) => a.order_index - b.order_index).indexOf(def) + 1
            parts.push(`§7Objective ${index} of ${quest.objectives.length}§r`)
        }
        if (def.description) parts.push(`§7${def.description}§r`)

        parts.push(`§aTask:§r ${taskLine(def)}`)
        parts.push(`§bProgress:§r ${progressLine(def, objectiveProgress)}`)
        parts.push(`§6Rewards:§r ${rewardsLine(def.rewards)}`)

        const requirements = requirementLines(def)
        if (requirements.length > 0) {
            parts.push(DIVIDER, `§eRequirements:§r`, ...requirements)
        }
    }

    parts.push(DIVIDER, `§7Status:§r ${statusLine(progress, quest, now)}`)
    if (withCommand) parts.push(`§7Run §5${DAILY_COMMAND}§7 to see this again§r`)
    parts.push(SECTION)

    return parts.join('\n')
}
