import {ICustomizations, IObjective, ITarget, ObjectiveTypes} from "../../types/objective";
import {Reward} from "./reward";
import utils from "../../utils";
import Interaction from "../interaction";
import {http} from "@minecraft/server-net";
import ThornyUser from "../user";

interface RequirementCheck {
    increment_progress: boolean;
    end_objective: boolean;
    fail_objective: boolean;
}

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

    protected get_rewards_string() {
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

    protected get_requirements_string() {
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

        if (this.customizations.timer?.fail || this.customizations.maximum_deaths?.fail) {
            requirements.push(`- Failing this objective will fail the entire quest`)
        }

        return requirements.join('\n')
    }

    protected get_task_string(): string {
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

    protected generate_objective_string(objective_index: number, total_objectives: number, quest_title: string) {
        const title = `§a+=+=+=+=+ ${quest_title} +=+=+=+=+§r\nQuest Progress: ${objective_index}/${total_objectives}\n`
        const description = `§7${this.description}§r\n\n`

        const full_task = `Your Task: ${this.get_task_string()}`

        const rewards = `Rewards: ${this.get_rewards_string()}\n`
        let requirements = ''
        if (this.get_requirements_string()) {requirements = `§u+=+=+=+=+ Requirements +=+=+=+=+§r\n${this.get_requirements_string()}\n`}
        const final_line = `§a+=+=+=+=+=+=+=+=+=+=+=+=+=+=+§r`

        return `${title}${description}${full_task}${rewards}${requirements}${final_line}`
    }

    protected async check_if_natural(coordinates: [number, number, number]): Promise<Boolean> {
        const x = coordinates[0]
        const y = coordinates[1]
        const z = coordinates[2]

        const response = await http.get(`http://nexuscore:8000/api/v0.2/events/interaction?x=${x}&y=${y}&z=${z}`)

        if (response.status !== 200) {
            return false
        }

        return JSON.parse(response.body).length > 1
    }

    protected async check_requirements(interaction: Interaction, start_time: Date): Promise<RequirementCheck> {

        // Check if the type is correct
        if (interaction.type !== this.objective_type) {
            return {increment_progress: false, end_objective: false, fail_objective: false};
        }

        // Check Mainhand
        if (this.customizations.mainhand && this.customizations.mainhand.item !== interaction.mainhand) {
            return {increment_progress: false, end_objective: false, fail_objective: false};
        }

        // Check location
        if (
            this.customizations.location &&
            !utils.checks.distance_check(
                interaction.coordinates as [number, number, number],
                this.customizations.location.coordinates,
                this.customizations.location.horizontal_radius,
                this.customizations.location.vertical_radius
            )
        ) {
            return {increment_progress: false, end_objective: false, fail_objective: false};
        }

        // Check timer
        if (
            this.customizations.timer &&
            !utils.checks.timer_check(interaction.time, start_time, this.customizations.timer.seconds)
        ) {
            return {increment_progress: false, end_objective: true, fail_objective: this.customizations.timer.fail};
        }

        // Check natural block
        if (this.objective_type == 'mine' && this.customizations.natural_block) {
            return {
                increment_progress: !(await this.check_if_natural(interaction.coordinates as [number, number, number])),
                end_objective: false,
                fail_objective: false
            }
        }

        return {increment_progress: true, end_objective: false, fail_objective: false};
    }

    protected async give_rewards(interation: Interaction, thorny_user: ThornyUser) {
        for (let reward of this.rewards) {
            await reward.give_reward(interation, thorny_user)
        }
    }

}