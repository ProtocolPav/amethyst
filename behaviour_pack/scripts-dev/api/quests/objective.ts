import {ICustomizations, IObjective, ITarget, ObjectiveTypes} from "../../types/objective";
import {Reward} from "./reward";
import utils from "../../utils";
import Interaction from "../interaction";
import {http} from "@minecraft/server-net";
import ThornyUser from "../user";

export class Objective implements IObjective {
    quest_id!: number
    objective_id!: number
    description!: string
    display?: string
    order_index!: number
    objective_type!: ObjectiveTypes
    logic!: 'and' | 'or' | 'sequential'
    target_count?: number
    targets!: ITarget[]
    customizations!: ICustomizations
    rewards: Reward[]

    constructor(data: IObjective) {
        Object.assign(this, data)
        this.rewards = data.rewards.map(r => new Reward(r))
    }

    public get_rewards_string() {
        let rewards = []

        for (let reward of this.rewards) {
            if (reward.display_name) {
                rewards.push(`§7${reward.display_name}§r`)
            } else if (reward.item) {
                rewards.push(`${reward.count} §7${utils.clean_id(reward.item)}§r`)
            } else if (reward.balance) {
                rewards.push(`§p${reward.balance}${utils.emojis.NUGS}§r`)
            }
        }

        return rewards.join(', ')
    }

    public get_requirements_string() {
        let requirements = []

        if (this.customizations.natural_block && this.objective_type === 'mine') {
            requirements.push(`- The blocks must be naturally generated`)
        }

        if (this.customizations.mainhand) {
            requirements.push(`- Using ${utils.clean_id(this.customizations.mainhand.item)}`)
        }

        if (this.customizations.location) {
            requirements.push(`- Around ${this.customizations.location.coordinates} (Radius ${this.customizations.location.horizontal_radius})`)
        }

        if (this.customizations.timer) {
            requirements.push(`- Within ${utils.convert_seconds_to_hms(this.customizations.timer.seconds)}`)
        }

        if (this.customizations.maximum_deaths) {
            requirements.push(`- Die no more than ${this.customizations.maximum_deaths.deaths} times`)
        }

        if (this.fail_quest_on_objective_fail()) {
            requirements.push(`- Failing this objective will fail the entire quest`)
        }

        return requirements.join('\n')
    }

    public get_task_string(): string {
        let task: string

        if (this.display) {
            task = `§b${this.display}§r\n`
        } else {
            const task_type = this.objective_type.replace(/\b\w/g, (char) => char.toUpperCase());

            const targets: string[] = []

            this.targets.forEach(target => {
                let target_id: string

                switch (target.target_type) {
                    case "kill":
                        target_id = target.entity
                        break;
                    case "mine":
                        target_id = target.block
                        break;
                    default:
                        target_id = "UNKNOWN"
                }

                if (this.logic === 'or' && this.target_count) {
                    targets.push(`§l${utils.clean_id(target_id)}§r`);
                } else {
                    targets.push(`§l${target.count} ${utils.clean_id(target_id)}§r`);
                }
            })

            let target_string: string

            if (this.logic === 'or') {
                const sliced = targets.slice(0, targets.length-1)
                target_string = `any of: ${sliced.join(', ')}${sliced.length !== targets.length ? `, or ${targets[targets.length-1]}` : ''}`
            } else if (this.logic === 'and') {
                const sliced = targets.slice(0, targets.length-1)
                target_string = `${sliced.join(', ')}${sliced.length !== targets.length ? `, and ${targets[targets.length-1]}` : ''}`
            } else {
                const sliced = targets.slice(0, targets.length-1)
                target_string = `in order: ${sliced.join(', ')}${sliced.length !== targets.length ? `, and ${targets[targets.length-1]}` : ''}`
            }

            task = `§b${task_type} ${target_string}\n`
        }

        return task
    }

    public generate_objective_string(objective_index: number, total_objectives: number, quest_title: string) {
        const title = `§a+=+=+=+=+ ${quest_title} +=+=+=+=+§r\nQuest Progress: ${objective_index}/${total_objectives}\n`
        const description = `§7${this.description}§r\n\n`

        const full_task = `Your Task: ${this.get_task_string()}`

        const rewards = `Rewards: ${this.get_rewards_string()}\n`
        let requirements = ''
        if (this.get_requirements_string()) {requirements = `§u+=+=+=+=+ Requirements +=+=+=+=+§r\n${this.get_requirements_string()}\n`}
        const final_line = `§a+=+=+=+=+=+=+=+=+=+=+=+=+=+=+§r`

        return `${title}${description}${full_task}${rewards}${requirements}${final_line}`
    }

    public async check_if_natural(coordinates: [number, number, number]): Promise<Boolean> {
        const x = coordinates[0]
        const y = coordinates[1]
        const z = coordinates[2]

        const response = await http.get(`http://nexuscore:8000/api/v0.2/events/interaction?x=${x}&y=${y}&z=${z}`)

        if (response.status !== 200) {
            return false
        }

        return JSON.parse(response.body).length > 1
    }

    public async give_rewards(interation: Interaction, thorny_user: ThornyUser) {
        for (let reward of this.rewards) {
            await reward.give_reward(interation, thorny_user)
        }
    }

    public get_total_count(): number {
        if (this.target_count && this.logic === 'or') {
            return this.target_count;
        } else {
            return this.targets.reduce(
                (previousValue, currentValue) => previousValue + currentValue.count,
                0);
        }
    }

    public get_target(interaction: Interaction): ITarget[] {
        const interaction_map: Partial<Record<Interaction['type'], ObjectiveTypes>> = {
            mine: 'mine',
            kill: 'kill',
            scriptevent: 'scriptevent',
        }

        const targetType = interaction_map[interaction.type]
        if (!targetType) return []

        return this.targets.filter(t => {
            if (t.target_type !== targetType) return false

            switch (t.target_type) {
                case 'mine':
                    return t.block === interaction.reference
                case 'kill':
                    return t.entity === interaction.reference
                case 'scriptevent':
                    return t.script_id === interaction.reference
            }
        })
    }

    public fail_quest_on_objective_fail() {
        return this.customizations.timer?.fail || this.customizations.maximum_deaths?.fail
    }

}