import { http, HttpHeader, HttpRequest, HttpRequestMethod } from "@minecraft/server-net"
import { Objective, IQuest, IObjective, Reward, IReward } from "./quest"
import Quest from "./quest"
import Interaction from "./interaction"
import utils from "../utils"
import ThornyUser from "./user"
import { parse, format } from "date-fns"

interface IObjectiveWithProgress extends IObjective {
    start: string | null
    end: string | null
    completion: number
    status: 'in_progress' | 'completed' | 'failed'
}

interface IQuestWithProgress extends IQuest {
    accepted_on: string
    started_on: string | null
    status: 'in_progress' | 'completed' | 'failed'
    objectives: IObjectiveWithProgress[]
}

class ObjectiveWithProgress extends Objective {
    thorny_user: ThornyUser
    start: Date | null
    end: Date | null
    completion: number
    deaths: number
    status: 'in_progress' | 'completed' | 'failed'

    constructor(data: IObjectiveWithProgress, thorny_user: ThornyUser) {
        super(data)
        this.thorny_user = thorny_user
        this.start = data.start ? new Date(data.start) : null
        this.end = data.end ? new Date(data.end) : null
        this.completion = data.completion
        this.status = data.status
        this.deaths = 0
    }

    private async complete_objective(interaction: Interaction, quest: QuestWithProgress, failed: boolean) {
        const index = quest.objectives.indexOf(this)

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

    public async update_user_objective(quest: QuestWithProgress) {
        const request = new HttpRequest(`http://nexuscore:8000/api/v0.2/users/${this.thorny_user.thorny_id}/quest/${quest.quest_id}/${this.objective_id}`);
        request.method = HttpRequestMethod.Put;
        request.body = JSON.stringify({
            "start": this.start ? this.start.toISOString() : null,
            "end": this.end ? this.end.toISOString() : null,
            "completion": this.completion,
            "status": this.status
        })
        request.headers = [
            new HttpHeader("Content-Type", "application/json"),
            new HttpHeader("auth", "my-auth-token"),
        ];
    
        await http.request(request);
    }

    /**
     * @returns a Boolean representing if completion was incremented
     */
    public async increment_completion(interaction: Interaction, quest: QuestWithProgress): Promise<Boolean> {
        const requirement_check = await this.check_requirements(interaction, this.start ?? new Date())
        if (requirement_check.check) {
            this.completion++

            utils.commands.play_quest_progress_sound(this.thorny_user.gamertag)

            utils.commands.send_title(
                interaction.dimension, 
                this.thorny_user.gamertag,
                'actionbar',
                `§l§s${utils.clean_id(this.objective)}:§r §7${this.completion}§r/${this.objective_count}`
            )
            
            if (this.completion === this.objective_count) {
                this.status = 'completed'
                this.end = new Date()

                const index = quest.objectives.indexOf(this)

                if (index < quest.objectives.length-1) {
                    await this.complete_objective(interaction, quest, false)
                }

                await this.give_rewards(interaction, this.thorny_user)
            }

            return true;
        }
        else if (requirement_check.fail_objective) {
            this.status = 'failed'
            this.end = new Date()
        }
        else if (interaction.type === 'die' && this.required_deaths) {
            this.deaths += 1

            utils.commands.send_message(
                interaction.dimension,
                this.thorny_user.gamertag,
                `§l[§aQuests§f]§r You have died. ${this.required_deaths - this.deaths} Remaining...`
            )

            if (this.deaths > this.required_deaths) {
                this.status = 'failed'
                this.end = new Date()
            }
        }

        if (this.status === 'failed' && this.continue_on_fail) {
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

export default class QuestWithProgress extends Quest {
    public static quest_cache: {[thorny_id: number]: QuestWithProgress} = {}

    thorny_user: ThornyUser
    accepted_on: Date
    started_on: Date | null
    status: 'in_progress' | 'completed' | 'failed'
    objectives: ObjectiveWithProgress[]

    constructor(data: IQuestWithProgress, thorny_user: ThornyUser) {
        super(data)
        this.thorny_user = thorny_user
        this.accepted_on = new Date(data.accepted_on)
        this.started_on = data.started_on ? new Date(data.started_on) : null
        this.status = data.status

        this.objectives = []
        for (let objective of data.objectives) {
            this.objectives.push(new ObjectiveWithProgress(objective, thorny_user))
        }
    }

    public static clear_cache(thorny_user: ThornyUser) {
        delete this.quest_cache[thorny_user.thorny_id]
    }

    public static async get_active_quest(thorny_user: ThornyUser): Promise<QuestWithProgress | null> {
        try {
            const active_quest = await http.get(`http://nexuscore:8000/api/v0.2/users/${thorny_user.thorny_id}/quest/active`);

            if (active_quest.status === 200) {
                const active_quest_data = JSON.parse(active_quest.body)
                const quest_id = active_quest_data['quest_id']

                // Check if the quest exists in the cache and return
                if (this.quest_cache[thorny_user.thorny_id] && this.quest_cache[thorny_user.thorny_id].quest_id === quest_id) {
                    return this.quest_cache[thorny_user.thorny_id]
                }

                // Merge active quest data
                const quest_response = await http.get(`http://nexuscore:8000/api/v0.2/quests/${quest_id}`);
                const quest_json = JSON.parse(quest_response.body)
                const quest_data = {
                    ...quest_json,
                    ...active_quest_data,
                    objectives: utils.combine(quest_json.objectives, active_quest_data['objectives'], 'objective_id')
                } as IQuestWithProgress;

                const quest_object = new QuestWithProgress(quest_data, thorny_user)
                this.quest_cache[thorny_user.thorny_id] = quest_object
                return quest_object
            } else {
                return null
            }
 
        } catch (error) {
            console.error("Error fetching quest:", error);
            throw error;
        }
    }

    public get_active_objective(): ObjectiveWithProgress | null {
        return this.objectives.find(objective => objective.status === 'in_progress') ?? null
    }

    public async update_user_quest() {
        const request = new HttpRequest(`http://nexuscore:8000/api/v0.2/users/${this.thorny_user.thorny_id}/quest/${this.quest_id}`);
        request.method = HttpRequestMethod.Put;
        request.body = JSON.stringify({
            "accepted_on": null,
            "started_on": this.started_on ? this.started_on.toISOString() : null,
            "status": this.status == 'completed' ? this.status : null
        })
        request.headers = [
            new HttpHeader("Content-Type", "application/json"),
            new HttpHeader("auth", "my-auth-token"),
        ];
    
        await http.request(request);

        for (let objective of this.objectives) {
            await objective.update_user_objective(this)
        }
    }

    public async fail_quest(thorny_id: number): Promise<void> {
        this.status = 'failed'

        const request = new HttpRequest(`http://nexuscore:8000/api/v0.2/users/${thorny_id}/quest/active`);
        request.method = HttpRequestMethod.Delete;
        request.body = JSON.stringify({})
        request.headers = [
            new HttpHeader("Content-Type", "application/json"),
            new HttpHeader("auth", "my-auth-token"),
        ];

        await http.request(request)
    }

    public get_progress(): number {
        return this.objectives.filter(objective => objective.status === 'completed').length
    }

    /**
     * Increments the active objective if it exists.
     * Updates the quest and objective's start times, as well as the next objective's start time if needed.
     * @returns
     * A boolean representing if the objective has been incremented or not
     */
    public async increment_active_objective(interaction: Interaction): Promise<Boolean> {
        const active_objective = this.get_active_objective()

        if (active_objective) {
            if (active_objective.completion == 0 && this.objectives.indexOf(active_objective) == 0) {
                this.started_on = new Date()
                active_objective.start = new Date()
            }

            const incremented = await active_objective.increment_completion(interaction, this)

            const next_objective = this.get_active_objective()

            if (!next_objective && active_objective.status === 'completed') {
                this.status = 'completed'
                this.end_time = new Date()

                utils.commands.play_quest_complete_sound(this.thorny_user.gamertag)

                utils.commands.send_title(
                    interaction.dimension,
                    this.thorny_user.gamertag,
                    'title',
                    `§l§eQ§du§se§as§tt §uC§io§mm§pp§9l§ee§nt§be!`
                )

                utils.commands.send_message(
                    interaction.dimension,
                    '@a',
                    `§a+=+=+=+=+=+=+ Quest Completed! +=+=+=+=+=+=+§r\n` +
                    `${this.thorny_user.gamertag} has just completed §l§n${this.title}§r!\n` +
                    `Run §5/quests view§r on Discord to start it!`
                )
            }
            else if (next_objective && next_objective.objective_id !== active_objective.objective_id) {
                next_objective.start = new Date()
            }
            else if (active_objective.status === 'failed' && !active_objective.continue_on_fail) {
                this.status = 'failed'
                this.end_time = new Date()

                utils.commands.play_quest_fail_sound(this.thorny_user.gamertag)

                utils.commands.send_title(
                    interaction.dimension,
                    this.thorny_user.gamertag,
                    'title',
                    `§lQuest Failed :(`
                )

                utils.commands.send_message(
                    interaction.dimension,
                    '@a',
                    `§c+=+=+=+=+=+=+ Quest Failed :( +=+=+=+=+=+=+§r\n` +
                    `${this.thorny_user.gamertag} has failed §l§n${this.title}§r!\n` +
                    `Think you can do better? Run §5/quests view§r on Discord to start it!`
                )
            }

            return incremented;
        }
        
        return false;
    }
}