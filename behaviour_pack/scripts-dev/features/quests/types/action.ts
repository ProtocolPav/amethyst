import {Player, Vector3} from "@minecraft/server";
import {ObjectiveOutObjectiveType} from "../../../api/nexuscore/model";

interface BaseAction {
    type: ObjectiveOutObjectiveType
    time: Date
    player: Player
    coordinates: Vector3
    dimension: string
    mainhand: string | null
}

export interface MineAction extends BaseAction {
    type: 'mine'
    block_id: string
    naturally_mined: boolean
}

export interface KillAction extends BaseAction {
    type: 'kill'
    entity_id: string
}

export interface ScripteventAction extends BaseAction {
    type: 'scriptevent'
    script_id: string
}

export interface VisitAction extends BaseAction {
    type: 'visit'
}

export interface DeliverAction extends BaseAction {
    type: 'deliver'
    entity_id: string
    item_id?: string | null
    item_count: number
    deliveredEntities: import("@minecraft/server").Entity[]
}

export type GameAction = MineAction | KillAction | ScripteventAction | VisitAction | DeliverAction
