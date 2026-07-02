import {Objective} from "./objective";
import {IQuest} from "../../types/quest";
import {getQuestV1GuildsMeQuestsQuestIdGet, listQuestsV1GuildsMeQuestsGet} from "../nexuscore/quests/quests";

export default class Quest {
    quest_id!: number
    start_time!: Date
    end_time!: Date
    title!: string
    description!: string
    created_by!: number
    tags!: string[]
    quest_type!: string
    objectives: Objective[]

    constructor(data: IQuest) {
        Object.assign(this, data)

        this.start_time = new Date(data.start_time)
        this.end_time = new Date(data.end_time)
        this.objectives = data.objectives.map(o => new Objective(o))
    }

    public static async get_quest(quest_id: number): Promise<Quest> {
        try {
            // Fetch the quest
            const quest_response = await getQuestV1GuildsMeQuestsQuestIdGet(quest_id)
            const quest_data = quest_response as unknown as IQuest;

            return new Quest(quest_data);

        } catch (error) {
            throw error;
        }
    }

    public static async get_active_quests(): Promise<Quest[]> {
        try {
            const quests_list = await listQuestsV1GuildsMeQuestsGet({active: true})

            console.log(`Got ${quests_list.length} active quests`)

            return quests_list.map(quest => new Quest(quest as unknown as IQuest));

        } catch (error) {
            throw error;
        }
    }
}