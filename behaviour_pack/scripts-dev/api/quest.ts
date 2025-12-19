import { http } from "@minecraft/server-net"
import { parse } from "date-fns"
import utils from "../utils"
import ThornyUser from "./user"
import Interaction from "./interaction"

export interface IReward {
    display_name: string
    balance: number
    item: string
    count: number
}

export interface IObjective {
    objective_id: number
    objective: string
    order: number
    description: string
    display: string | null
    objective_count: number
    objective_type: 'kill' | 'mine' | 'encounter'
    natural_block: boolean
    objective_timer: number | null
    required_mainhand: string | null
    required_location: [number, number] | null
    location_radius: number
    required_deaths: number | null
    continue_on_fail: boolean
    rewards: IReward[]
}

export interface IQuest {
    quest_id: number
    start_time: string
    end_time: string
    title: string
    description: string
    created_by: number
    tags: string[]
    quest_type: string
    objectives: IObjective[]
}

interface RequirementCheck {
    check: boolean
    fail_objective: boolean
}

export class Reward {
    display_name: string
    balance: number
    item: string
    count: number

    constructor(data: IReward) {
        this.display_name = data.display_name
        this.balance = data.balance
        this.item = data.item
        this.count = data.count
    }

    public async give_reward(interaction: Interaction, thorny_user: ThornyUser) {
        if (this.balance) {
            thorny_user.balance += this.balance

            utils.commands.send_message(
                interaction.dimension,
                thorny_user.gamertag,
                `§l[§aQuests§f]§r You have received ${this.balance}${utils.emojis.NUGS}!`
            )
        } else if (this.item) {
            utils.commands.give_item(thorny_user.gamertag, this.item, this.count)

            utils.commands.send_message(
                interaction.dimension,
                thorny_user.gamertag,
                `§l[§aQuests§f]§r You have received ${this.count} ${utils.clean_id(this.item)}!`
            )
        }
    }
}

export class Objective implements IObjective {
    objective_id: number
    objective: string
    order: number
    description: string
    display: string | null
    objective_count: number
    objective_type: 'kill' | 'mine' | 'encounter'
    natural_block: boolean
    objective_timer: number | null
    required_mainhand: string | null
    required_location: [number, number] | null
    location_radius: number
    required_deaths: number | null
    continue_on_fail: boolean
    rewards: Reward[]

    constructor(data: IObjective) {
        this.objective_id = data.objective_id
        this.objective = data.objective
        this.order = data.order
        this.description = data.description
        this.display = data.display
        this.objective_count = data.objective_count
        this.objective_type = data.objective_type
        this.natural_block = data.natural_block
        this.objective_timer = data.objective_timer
        this.required_mainhand = data.required_mainhand
        this.required_location = data.required_location
        this.location_radius = data.location_radius
        this.required_deaths = data.required_deaths
        this.continue_on_fail = data.continue_on_fail

        this.rewards = []
        for (let reward of data.rewards) {
            this.rewards.push(new Reward(reward))
        }
    }

    protected get_clean_rewards() {
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

    protected get_clean_requirements() {
        let requirements = []

        if (this.natural_block && this.objective_type == 'mine') {
            requirements.push(`- ${utils.clean_id(this.objective)} must be naturally found`)
        }

        if (this.required_mainhand) {
            requirements.push(`- Using ${utils.clean_id(this.required_mainhand)}`)
        }

        if (this.required_location) {
            requirements.push(`- Around ${this.required_location} (Radius ${this.location_radius})`)
        }

        if (this.objective_timer) {
            requirements.push(`- Within ${utils.convert_seconds_to_hms(this.objective_timer)}`)
        }

        if (this.required_deaths) {
            requirements.push(`- No more than ${this.required_deaths} deaths`)
        }

        if (!this.continue_on_fail && (this.objective_timer || this.required_deaths)) {
            requirements.push(`- Failing this objective will fail the entire quest`)
        }

        return requirements.join('\n')
    }

    protected generate_objective_string(objective_index: number, total_objectives: number, quest_title: string) {
        const task_type = this.objective_type.replace(/\b\w/g, (char) => char.toUpperCase());

        const title = `§a+=+=+=+=+ ${quest_title} +=+=+=+=+§r\nQuest Progress: ${objective_index}/${total_objectives}\n`
        const description = `§7${this.description}§r\n\n`

        let full_task = `Your Task: §b${task_type} §l${this.objective_count} ${utils.clean_id(this.objective)}§r\n`

        if (this.display) {
            full_task = `Your Task: §b${this.display}§r\n`
        }
        const rewards = `Rewards: ${this.get_clean_rewards()}\n`
        let requirements = ''
        if (this.get_clean_requirements()) {requirements = `§u+=+=+=+=+ Requirements +=+=+=+=+§r\n${this.get_clean_requirements()}\n`}
        const final_line = `§a+=+=+=+=+=+=+=+=+=+=+=+=+=+=+§r`

        return `${title}${description}${full_task}${rewards}${requirements}${final_line}`
    }

    protected async check_requirements(interaction: Interaction, start_time: Date): Promise<RequirementCheck> {

        // Check if the block/mob/encounter is correct
        if (interaction.reference !== this.objective) {
            return {check: false, fail_objective: false};
        }

        // Check Mainhand
        if (this.required_mainhand && this.required_mainhand !== interaction.mainhand) {
            return {check: false, fail_objective: false};
        }

        const interaction_location: [number, number] = [interaction.coordinates[0], interaction.coordinates[2]]

        // Check location
        if (this.required_location && !utils.checks.distance_check(interaction_location, this.required_location, this.location_radius)) {
            return {check: false, fail_objective: false};
        }

        // Check timer
        if (this.objective_timer && !utils.checks.timer_check(interaction.time, start_time, this.objective_timer)) {
            return {check: false, fail_objective: true};
        }

        // Check natural block
        if (this.objective_type == 'mine' && this.natural_block) {
            return {
                check: !(await this.check_if_natural(interaction.coordinates[0], interaction.coordinates[1], interaction.coordinates[2])),
                fail_objective: false
            }
        }

        return {check: true, fail_objective: false};
    }

    protected async check_if_natural(x: number, y: number, z: number): Promise<Boolean> {
        const response = await http.get(`http://nexuscore:8000/api/v0.2/events/interaction?x=${x}&y=${y}&z=${z}`)

        if (response.status !== 200) {
            return false
        }

        return JSON.parse(response.body).length > 1
    }

    protected async give_rewards(interation: Interaction, thorny_user: ThornyUser) {
        for (let reward of this.rewards) {
            await reward.give_reward(interation, thorny_user)
        }
    }

}

export default class Quest {
    quest_id: number
    start_time: Date
    end_time: Date
    title: string
    description: string
    created_by: number
    tags: string[]
    quest_type: string
    objectives: Objective[]

    constructor(data: IQuest) {
        this.quest_id = data.quest_id
        this.start_time = new Date(data.start_time)
        this.end_time = new Date(data.end_time)
        this.title = data.title
        this.description = data.description
        this.created_by = data.created_by
        this.quest_type = data.quest_type
        this.tags = data.tags

        this.objectives = []
        for (let objective of data.objectives) {
            this.objectives.push(new Objective(objective))
        }
    }

    public static async get_quest(quest_id: number): Promise<Quest> {
        try {
            // Fetch the quest
            const quest_response = await http.get(`http://nexuscore:8000/api/v0.2/quests/${quest_id}`);
            const quest_data = JSON.parse(quest_response.body) as IQuest;

            return new Quest(quest_data);
 
        } catch (error) {
            console.error("Error fetching quest:", error);
            throw error;
        }
    }
}