import { ObjectiveOut, ObjectiveOutLogic, RewardOut } from "../../../api/nexuscore/model";
import utils from "../../../utils";

// ─── Rewards ────────────────────────────────────────────────────────────────

function getRewardsString(rewards: RewardOut[]): string {
    const parts: string[] = []

    for (const reward of rewards) {
        if (reward.display_name) {
            parts.push(`§7${reward.display_name}§r`)
        } else if (reward.item) {
            parts.push(`${reward.count} §7${utils.clean_id(reward.item)}§r`)
        } else if (reward.balance) {
            parts.push(`§p${reward.balance}${utils.emojis.NUGS}§r`)
        }
    }

    return parts.join(', ')
}

// ─── Requirements ───────────────────────────────────────────────────────────

function getRequirementsString(objective: ObjectiveOut): string {
    const lines: string[] = []

    if (objective.customizations?.natural_block && objective.objective_type === 'mine') {
        lines.push(`- The blocks must be naturally generated`)
    }

    if (objective.customizations?.mainhand) {
        lines.push(`- Using ${utils.clean_id(objective.customizations.mainhand.item)}`)
    }

    if (objective.customizations?.location) {
        lines.push(
            `- Around ${objective.customizations.location.coordinates} ` +
            `(Radius ${objective.customizations.location.horizontal_radius})`
        )
    }

    if (objective.customizations?.timer) {
        lines.push(`- Within ${utils.convert_seconds_to_hms(objective.customizations.timer.seconds)}`)
    }

    if (objective.customizations?.maximum_deaths) {
        lines.push(`- Die no more than ${objective.customizations.maximum_deaths.deaths} times`)
    }

    const failsQuest =
        objective.customizations?.timer?.fail ||
        objective.customizations?.maximum_deaths?.fail

    if (failsQuest) {
        lines.push(`- Failing this objective will fail the entire quest`)
    }

    return lines.join('\n')
}

// ─── Task ────────────────────────────────────────────────────────────────────

function getTaskString(objective: ObjectiveOut): string {
    if (objective.display) {
        return `§b${objective.display}§r\n`
    }

    const task_type = objective.objective_type.replace(/\b\w/g, (char) => char.toUpperCase())

    const targetLabels: string[] = []

    for (const target of objective.targets) {
        let target_id: string

        switch (target.target_type) {
            case 'kill':
                target_id = (target as any).entity
                break
            case 'mine':
                target_id = (target as any).block
                break
            default:
                target_id = 'UNKNOWN'
        }

        if (objective.logic === ObjectiveOutLogic.or && objective.target_count) {
            targetLabels.push(`§l${utils.clean_id(target_id)}§r`)
        } else {
            targetLabels.push(`§l${target.count} ${utils.clean_id(target_id)}§r`)
        }
    }

    let targetString: string
    const init = targetLabels.slice(0, targetLabels.length - 1)
    const last = targetLabels[targetLabels.length - 1]
    const tail = init.length !== targetLabels.length ? `, ${last}` : ''

    switch (objective.logic) {
        case ObjectiveOutLogic.or:
            targetString = `any of: ${init.join(', ')}${init.length !== targetLabels.length ? `, or ${last}` : last}`
            break
        case ObjectiveOutLogic.sequential:
            targetString = `in order: ${init.join(', ')}${tail}`
            break
        case ObjectiveOutLogic.and:
        default:
            targetString = `${init.join(', ')}${init.length !== targetLabels.length ? `, and ${last}` : last}`
            break
    }

    return `§b${task_type} ${targetString}\n`
}

// ─── Full Display String ─────────────────────────────────────────────────────

/**
 * Generates the full objective display message sent to the player
 * when they advance to a new objective.
 *
 * Mirrors the old Objective.generate_objective_string() from api/quests/objective.ts,
 * but operates on plain ObjectiveOut DTOs for use in the quest-processor.
 *
 * @param objective     - The objective definition (QuestOut['objectives'][number])
 * @param objectiveIndex - 1-based index of this objective within the quest
 * @param totalObjectives - Total number of objectives in the quest
 * @param questTitle    - The quest's display title
 */
export function generateObjectiveDisplayString(
    objective: ObjectiveOut,
    objectiveIndex: number,
    totalObjectives: number,
    questTitle: string
): string {
    const title = `§a+=+=+=+=+ ${questTitle} +=+=+=+=+§r\nQuest Progress: ${objectiveIndex}/${totalObjectives}\n`
    const description = `§7${objective.description}§r\n\n`
    const task = `Your Task: ${getTaskString(objective)}`
    const rewards = `Rewards: ${getRewardsString(objective.rewards ?? [])}\n`

    const requirementsBody = getRequirementsString(objective)
    const requirements = requirementsBody
        ? `§u+=+=+=+=+ Requirements +=+=+=+=+§r\n${requirementsBody}\n`
        : ''

    const footer = `§a+=+=+=+=+=+=+=+=+=+=+=+=+=+=+§r`

    return `${title}${description}${task}${rewards}${requirements}${footer}`
}