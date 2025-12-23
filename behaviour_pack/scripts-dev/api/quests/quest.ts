import {http} from "@minecraft/server-net";
import {Objective} from "./objective";
import {IQuest} from "../../types/quest";

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
            const quest_response = await http.get(`http://nexuscore:8000/api/v0.2/quests/${quest_id}`);
            const quest_data = JSON.parse(quest_response.body) as IQuest;

            return new Quest(quest_data);

        } catch (error) {
            console.error("Error fetching quest:", error);
            throw error;
        }
    }
}