import {IQuestProgress} from "../../types/quest_progress";
import ThornyUser from "../user";
import Quest from "./quest";
import utils from "../../utils";
import {IQuest} from "../../types/quest";
import {ObjectiveProgress} from "./objective_progress";
import Interaction from "../interaction";
import {
    failActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveDelete,
    getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet, getQuestV1GuildsMeQuestsQuestIdGet,
    partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPatch
} from "../nexuscore/quests/quests";
import {NotFoundError} from "../http-errors";
import {QuestProgressOut} from "../nexuscore/model";

export default class QuestProgress {
    progress_id!: number
    thorny_id!: number
    quest_id!: number
    accept_time!: Date
    start_time?: Date | null
    end_time?: Date | null
    status!: 'active' | 'pending' | 'completed' | 'failed'
    objectives!: ObjectiveProgress[]

    thorny_user: ThornyUser

    private constructor(data: IQuestProgress, thorny_user: ThornyUser) {
        Object.assign(this, data)

        this.thorny_user = thorny_user

        this.accept_time = new Date(data.accept_time)
        this.start_time = data.start_time ? new Date(data.start_time) : null
        this.end_time = data.end_time ? new Date(data.end_time) : null

        this.objectives = data.objectives.map( o => new ObjectiveProgress(o, thorny_user) )
    }

    /**
     * Updates the user's Quest and Objective Progress
     */
    public async update_user_quest() {
        await partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPatch(this.progress_id, {
            "start_time": this.start_time ? this.start_time.toISOString() : null,
            "end_time": this.end_time ? this.end_time.toISOString() : null,
            "status": this.status
        })

        for (let objective of this.objectives) {
            await objective.update_user_objective()
        }
    }

    /** Fails the QuestProgress **/
    public async fail_quest(thorny_id: number): Promise<void> {
        this.status = 'failed'

        await failActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveDelete(thorny_id)
    }

    /** Fetches QuestProgress **/
    public static async get_quest_progress(thorny_user: ThornyUser): Promise<QuestProgress | null> {
        let quest_progress_response: QuestProgressOut
        const thorny_id = thorny_user.thorny_id

        try {
            quest_progress_response = await getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet(thorny_id)
        } catch (error) {
            if (error instanceof NotFoundError) {
                return null; // No active quest, that's fine
            }

            throw error; // Rethrow anything unexpected
        }
            if (quest_progress_response.status === 200) {
                const quest_progress_data: IQuestProgress = JSON.parse(quest_progress_response.body)

                return new QuestProgress(quest_progress_data, thorny_user)
            } else {
                return null
            }

        } catch (error) {
            console.error("Error fetching quest:", error);
            throw error;
        }
        // Otherwise, create the QuestProgress object and cache it
        const quest_response = await getQuestV1GuildsMeQuestsQuestIdGet(quest_id)

        const quest = new Quest( quest_response as unknown as IQuest )

        const quest_progress = new QuestProgress(
            quest_progress_data,
            thorny_user,
            quest
        )

        this.quest_cache[thorny_user.thorny_id] = quest_progress

        return quest_progress
    }

    /**
     * Returns the currently active objective, or null if there are none left.
     *
     * If there are no `active` objectives, but there are `pending` ones,
     * it promotes the next objective in the order to `active`
     */
    public get_active_objective(): ObjectiveProgress | null {
        const active = this.objectives.find(o => o.status === 'active')
        if (active) return active

        const nextPending = this.objectives.find(o => o.status === 'pending')
        if (!nextPending) return null

        nextPending.status = 'active'
        nextPending.start_time = new Date()
        return nextPending
    }

    /**
     * Increments the active objective.
     * Updates quest's and objectives start and end times.
     */
    public async increment_active_objective(interaction: Interaction): Promise<boolean>  {
        const active_objective = this.get_active_objective()

        if (active_objective) {
            if (active_objective.get_total_progress() === 0 && this.objectives.indexOf(active_objective) === 0) {
                this.start_time = new Date()
                active_objective.start_time = new Date()
            }

            const incremented = await active_objective.increment_completion(interaction, this)

            if (active_objective.status === 'completed') {
                const next_objective = this.get_active_objective()

                if (!next_objective) {
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
                        `${this.thorny_user.gamertag} has just completed §l§n${this.quest.title}§r!\n` +
                        `Run §5/quests view§r on Discord to start it!`
                    )
                }
            }

            else if (active_objective.status === 'failed' && active_objective.objective.fail_quest_on_objective_fail()) {
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
                    `${this.thorny_user.gamertag} has failed §l§n${this.quest.title}§r!\n` +
                    `Think you can do better? Run §5/quests view§r on Discord to start it!`
                )
            }

            return incremented
        }

        return false
    }
}