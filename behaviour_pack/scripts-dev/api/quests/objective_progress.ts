import ThornyUser from "../user";
import {ICustomizationProgress, IObjectiveProgress, ITargetProgress} from "../../types/objective_progress";
import {Objective} from "./objective";
import Quest from "./quest";
import Interaction from "../interaction";
import utils from "../../utils";
import QuestProgress from "./quest_progress";
import {ITarget} from "../../types/objective";
import {http, HttpHeader, HttpRequest, HttpRequestMethod} from "@minecraft/server-net";

interface RequirementCheck {
    increment_progress: boolean;
    end_objective: boolean;
    fail_objective: boolean;
}

export class ObjectiveProgress {
    progress_id!: number
    objective_id!: number
    start_time?: Date | null
    end_time?: Date | null
    status!: 'active' | 'pending' | 'completed' | 'failed'
    target_progress!: ITargetProgress[]
    customization_progress!: ICustomizationProgress

    thorny_user: ThornyUser
    objective: Objective

    constructor(data: IObjectiveProgress, thorny_user: ThornyUser, quest: Quest) {
        Object.assign(this, data)

        this.thorny_user = thorny_user

        this.start_time = data.start_time ? new Date(data.start_time) : null
        this.end_time = data.end_time ? new Date(data.end_time) : null

        this.objective = quest.objectives.find(o => o.objective_id == this.objective_id)!
    }

    public async update_user_objective() {
        const request = new HttpRequest(`http://nexuscore:8000/api/v0.2/quests/progress/${this.progress_id}/${this.objective_id}`);
        request.method = HttpRequestMethod.Put;
        request.body = JSON.stringify({
            "start_time": this.start_time ? this.start_time.toISOString() : null,
            "end_time": this.end_time ? this.end_time.toISOString() : null,
            "status": this.status,
            "target_progress": this.target_progress,
            "customization_progress": this.customization_progress
        })
        request.headers = [
            new HttpHeader("Content-Type", "application/json"),
            new HttpHeader("auth", "my-auth-token"),
        ];

        await http.request(request);
    }

    public get_total_progress() {
        return this.target_progress.reduce(
            (previousValue, currentValue) => previousValue + currentValue.count,
            0);
    }

    private get_progress_string(targets_data: ITarget[]) {
        return targets_data.map(t => {
            const progress = this.target_progress.find(p => p.target_uuid === t.target_uuid)
            const current = progress?.count ?? 0
            const total = t.count

            let label: string

            switch (t.target_type) {
                case 'mine':
                    label = utils.clean_id(t.block)
                    break;
                case 'kill':
                    label = utils.clean_id(t.entity)
                    break;
                default:
                    label = "Progress"
            }

            return `§l§s${label}:§r §7${current}§r/${total}`
        })
    }

    private async check_requirements(interaction: Interaction): Promise<RequirementCheck> {
        const objective = this.objective

        // Check Deaths
        if (
            this.customization_progress.maximum_deaths && objective.customizations.maximum_deaths &&
            this.customization_progress.maximum_deaths.deaths >= objective.customizations.maximum_deaths?.deaths
        ) {
            return {increment_progress: false, end_objective: true, fail_objective: objective.customizations.maximum_deaths.fail};
        }

        // Check if the type is correct
        if (interaction.type !== objective.objective_type) {
            return {increment_progress: false, end_objective: false, fail_objective: false};
        }

        // Check Mainhand
        if (objective.customizations.mainhand && objective.customizations.mainhand.item !== interaction.mainhand) {
            return {increment_progress: false, end_objective: false, fail_objective: false};
        }

        // Check location
        if (
            objective.customizations.location &&
            !utils.checks.distance_check(
                interaction.coordinates as [number, number, number],
                objective.customizations.location.coordinates,
                objective.customizations.location.horizontal_radius,
                objective.customizations.location.vertical_radius
            )
        ) {
            return {increment_progress: false, end_objective: false, fail_objective: false};
        }

        // Check timer
        if (
            objective.customizations.timer &&
            !utils.checks.timer_check(interaction.time, this.start_time!, objective.customizations.timer.seconds)
        ) {
            return {increment_progress: false, end_objective: true, fail_objective: objective.customizations.timer.fail};
        }

        // Check natural block
        if (objective.objective_type == 'mine' && objective.customizations.natural_block) {
            return {
                increment_progress: !(await objective.check_if_natural(interaction.coordinates as [number, number, number])),
                end_objective: false,
                fail_objective: false
            }
        }

        return {increment_progress: true, end_objective: false, fail_objective: false};
    }

    private increment_target(interaction: Interaction) {
        const targets = this.objective.get_target(interaction)

        for (const blueprint of targets) {
            const progress = this.target_progress.find(
                p => p.target_uuid === blueprint.target_uuid,
            )
            if (!progress) continue

            if (progress.count < blueprint.count || this.objective.target_count) {
                progress.count += 1
            }
        }

        return targets
    }

    private async complete_objective(interaction: Interaction, quest_progress: QuestProgress, failed: boolean) {
        const quest = quest_progress.quest
        const index = quest.objectives.indexOf(this.objective)

        if (failed) {
            utils.commands.play_quest_fail_sound(this.thorny_user.gamertag)
        } else {
            utils.commands.play_objective_complete_sound(this.thorny_user.gamertag)
        }

        utils.commands.send_title(
            interaction.dimension,
            this.thorny_user.gamertag,
            'actionbar',
            `§l§a${quest.title} Progress:§r §7${index+1}§r/${quest.objectives.length}`
        )

        utils.commands.send_message(
            interaction.dimension,
            this.thorny_user.gamertag,
            quest.objectives[index+1].generate_objective_string(index+1, quest.objectives.length, quest.title)
        )
    }

    public async increment_completion(interaction: Interaction, quest: QuestProgress): Promise<boolean> {
        const requirement_check = await this.check_requirements(interaction)

        if (requirement_check.increment_progress) {
            const targets_data = this.increment_target(interaction)

            utils.commands.play_quest_progress_sound(this.thorny_user.gamertag)

            utils.commands.send_title(
                interaction.dimension,
                this.thorny_user.gamertag,
                'actionbar',
                this.get_progress_string(targets_data).join('\n')
            )

            if (this.get_total_progress() === this.objective.get_total_count()) {
                this.status = 'completed'
                this.end_time = new Date()

                const index = quest.objectives.indexOf(this)

                if (index < quest.objectives.length-1) {
                    await this.complete_objective(interaction, quest, false)
                }

                await this.objective.give_rewards(interaction, this.thorny_user)
            }

            return true;
        }

        else if (requirement_check.fail_objective) {
            this.status = 'failed'
            this.end_time = new Date()
        }

        else if (interaction.type === 'die' && this.customization_progress.maximum_deaths) {
            this.customization_progress.maximum_deaths.deaths += 1

            const max_deaths = this.objective.customizations.maximum_deaths?.deaths ?? 0
            const deaths = this.customization_progress.maximum_deaths?.deaths ?? 0

            utils.commands.send_message(
                interaction.dimension,
                this.thorny_user.gamertag,
                `§l[§aQuests§f]§r You have died. ${max_deaths - deaths} deaths remaining...`
            )

            if (deaths > max_deaths) {
                this.status = 'failed'
                this.end_time = new Date()
            }
        }

        if ( this.status === 'failed' && !this.objective.fail_quest_on_objective_fail() ) {
            const index = quest.objectives.indexOf(this)

            if (index < quest.objectives.length-1) {
                await this.complete_objective(interaction, quest, true)
            }

            utils.commands.send_message(
                interaction.dimension,
                this.thorny_user.gamertag,
                `§l[§aQuests§f]§r §4You have failed the previous objective, but the quest continues... You did not receive rewards for the previous objective.`
            )
        }

        return false;
    }
}