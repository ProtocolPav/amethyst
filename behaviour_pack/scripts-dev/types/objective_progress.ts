
export type ObjectiveTypes = 'kill' | 'mine' | 'scriptevent'

export interface IObjectiveProgress {
    progress_id: number
    objective_id: number
    start_time?: string
    end_time?: string
    status: 'active' | 'pending' | 'completed' | 'failed'
    target_progress: ITargetProgress[]
    customization_progress: ICustomizationProgress
}

interface TargetProgressBase {
    target_uuid: string
    target_type: ObjectiveTypes
    count: number
}

export interface MineProgressTarget extends TargetProgressBase {
    target_type: 'mine'
    count: number
}

export interface KillProgressTarget extends TargetProgressBase {
    target_type: 'kill'
    count: number
}

export interface ScriptEventProgressTarget extends TargetProgressBase {
    target_type: 'scriptevent'
    count: number
}

export type ITargetProgress = MineProgressTarget | KillProgressTarget | ScriptEventProgressTarget


export interface MaximumDeathsCustomization {
    deaths: number
}

export interface ICustomizationProgress {
    maximum_deaths?: MaximumDeathsCustomization | null
}


