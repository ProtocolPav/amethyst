import {IReward} from "./reward";
import {MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";


export type ObjectiveTypes = 'kill' | 'mine' | 'scriptevent'

export interface IObjective {
    quest_id: number
    objective_id: number
    description: string
    display?: string
    order_index: number
    objective_type: ObjectiveTypes
    logic: 'and' | 'or' | 'sequential'
    target_count?: number
    targets: ITarget[]
    customizations: ICustomizations
    rewards: IReward[]
}

interface TargetBase {
    target_uuid: string
    target_type: ObjectiveTypes
    count: number
}

export interface MineTarget extends TargetBase {
    target_type: 'mine'
    block: MinecraftBlockTypes | string
    count: number
}

export interface KillTarget extends TargetBase {
    target_type: 'kill'
    entity: MinecraftEntityTypes | string
    count: number
}

export interface ScriptEventTarget extends TargetBase {
    target_type: 'scriptevent'
    script_id: string
    count: number
}

export type ITarget = MineTarget | KillTarget | ScriptEventTarget

export interface MainhandCustomization {
    item: MinecraftItemTypes | string
}

export interface LocationCustomization {
    coordinates: [number, number, number]
    horizontal_radius: number
    vertical_radius: number
}

export interface TimerCustomization {
    seconds: number
    fail: boolean
}

export interface MaximumDeathsCustomization {
    deaths: number
    fail: boolean
}

export interface NaturalBlockCustomization {
}

export interface ICustomizations {
    mainhand?: MainhandCustomization | null
    location?: LocationCustomization | null
    timer?: TimerCustomization | null
    maximum_deaths?: MaximumDeathsCustomization | null
    natural_block?: NaturalBlockCustomization | null
}


