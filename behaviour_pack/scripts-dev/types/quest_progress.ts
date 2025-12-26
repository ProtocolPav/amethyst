import {IObjectiveProgress} from "./objective_progress";

export interface IQuestProgress {
    progress_id: number
    thorny_id: number
    quest_id: number
    accept_time: number
    start_time?: string
    end_time?: string
    status: 'active' | 'pending' | 'completed' | 'failed'
    objectives: IObjectiveProgress[]
}