import { ObjectiveOut, ObjectiveOutLogic, RewardOut, MineTargetModel, KillTargetModel } from "../../../api/nexuscore/model";
import { AnyTarget } from "./target-processor";
import utils from "../../../utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SECTION = "§8§m                              §r"
const DIVIDER  = "§8- - - - - - - - - - - - - - - -§r"

function targetId(target: AnyTarget): string {
    switch (target.target_type) {
        case 'mine': return (target as MineTargetModel).block
        case 'kill': return (target as KillTargetModel).entity
        default:     return 'unknown'
    }
}

function logicVerb(type: string): string {
    switch (type) {
        case 'mine': return 'Mine'
        case 'kill': return 'Kill'
        default:     return 'Complete'
    }
}

// ─── Rewards ─────────────────────────────────────────────────────────────────

function rewardsLine(rewards: RewardOut[]): string {
    if (rewards.length === 0) return '§7None§r'

    const parts = rewards.map(r => {
        if (r.display_name)
            return `§e${r.display_name}§r`

        if (r.item !== null && r.count !== null)
            return `§f${r.count}x §e${utils.clean_id(r.item)}§r`

        if (r.balance !== null)
            return `§6${r.balance}${utils.emojis.NUGS}§r`

        return '§7???§r'
    })

    // Comma-separated if multiple
    return parts.join('§7, §r')
}

// ─── Task line ────────────────────────────────────────────────────────────────

function taskLine(objective: ObjectiveOut): string {
    // Author-supplied display string takes priority
    if (objective.display) return `§b${objective.display}§r`

    const verb = logicVerb(objective.objective_type)
    const targets = objective.targets as AnyTarget[]

    if (targets.length === 0) return `§b${verb}…§r`

    // Shared pool (OR with a single cap overriding individual counts)
    if (objective.logic === ObjectiveOutLogic.or && objective.target_count !== null && objective.target_count !== undefined) {
        const names = targets.map(t => `§f${utils.clean_id(targetId(t))}§r`).join('§7/§r')
        return `§b${verb}§r §7any combination of§r ${names} §7(total: §f${objective.target_count}§7)§r`
    }

    const targetParts = targets.map(t => {
        const name = utils.clean_id(targetId(t))
        return `§f${t.count}x ${name}§r`
    })

    switch (objective.logic) {
        case ObjectiveOutLogic.and:
            return buildSentence(verb, targetParts, 'and')

        case ObjectiveOutLogic.sequential:
            return buildSentence(verb, targetParts, 'then') + ' §7(in order)§r'

        case ObjectiveOutLogic.or:
        default:
            return buildSentence(verb, targetParts, 'or')
    }
}

/** Joins ["a", "b", "c"] → "Verb a, b, and/or/then c" */
function buildSentence(verb: string, parts: string[], conjunction: string): string {
    if (parts.length === 1) return `§b${verb}§r ${parts[0]}`

    const init = parts.slice(0, -1).join('§7, §r')
    const last = parts[parts.length - 1]
    return `§b${verb}§r ${init} §7${conjunction}§r ${last}`
}

// ─── Requirements ─────────────────────────────────────────────────────────────

function requirementLines(objective: ObjectiveOut): string[] {
    const c = objective.customizations
    const lines: string[] = []
    const failables: string[] = []

    // utils.emojis.PICKAXE
    if (c.natural_block && objective.objective_type === 'mine')
        lines.push(`§7- §fNatural blocks only§r`)

    // utils.emojis.SWORD
    if (c.mainhand)
        lines.push(`§7- Using §f${utils.clean_id(c.mainhand.item)}§r`)

    // utils.emojis.PIN
    if (c.location) {
        const [x, y, z] = c.location.coordinates
        lines.push(`§7- Around §f${x}, ${y}, ${z}`)
        lines.push(`§7- Radius: §f${c.location.horizontal_radius}h §7/ §f${c.location.vertical_radius}v§r`)
    }

    // utils.emojis.TIMER
    if (c.timer) {
        const skull = c.timer.fail ? ` ${utils.emojis.KNIGHT}` : ''
        lines.push(`§7-${skull} Time limit: §f${utils.convert_seconds_to_hms(c.timer.seconds)}§r`)
        if (c.timer.fail) failables.push('Time Limit')
    }

    // utils.emojis.SKULL
    if (c.maximum_deaths) {
        const skull = c.maximum_deaths.fail ? ` ${utils.emojis.KNIGHT}` : ''
        lines.push(`§7-${skull} Die no more than §f${c.maximum_deaths.deaths}§r times`)
        if (c.maximum_deaths.fail) failables.push('Exceed Death Limit')
    }

    if (failables.length > 0)
        lines.push(`§c- Failing these will fail the entire quest: §f${failables.join('§c, §f')}§r`)

    return lines
}

// ─── Full Display Message ──────────────────────────────────────────────────────

/**
 * Generates the full objective display message sent to the player
 * when they advance to a new objective.
 *
 * Derives from the old api/quests/objective.ts generate_objective_string(),
 * but operates on plain ObjectiveOut / RewardOut DTOs and follows the
 * stateless exported-function pattern of core/.
 *
 * @param objective       The objective definition (ObjectiveOut)
 * @param objectiveIndex  1-based position of this objective in the quest
 * @param totalObjectives Total number of objectives in the quest
 * @param questTitle      The quest's display title
 */
export function generateObjectiveDisplayString(
    objective: ObjectiveOut,
    objectiveIndex: number,
    totalObjectives: number,
    questTitle: string,
): string {
    const header = `§a§l[ ${questTitle} ]§r\n§7Objective ${objectiveIndex} of ${totalObjectives}§r`
    const description = objective.description
        ? `§7${objective.description}§r`
        : null
    const task = `§aTask:§r ${taskLine(objective)}`
    const rewards = `§6Rewards:§r ${rewardsLine(objective.rewards)}`

    const reqLines= requirementLines(objective)
    const requirements= reqLines.length > 0
        ? `${DIVIDER}\n§eRequirements:§r\n${reqLines.join('\n')}`
        : null

    const parts = [
        SECTION,
        header,
        DIVIDER,
        ...(description ? [description] : []),
        task,
        rewards,
        ...(requirements ? [requirements] : []),
        SECTION,
    ]

    return parts.join('\n')
}