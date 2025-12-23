import {IObjective} from "./objective";

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