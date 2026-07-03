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

export type GameAction = MineAction | KillAction
