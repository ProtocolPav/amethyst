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
    entity_type_id: string
    /**
     * The runtime entity ID of the killed entity.
     * Inert for standard kill objectives, but required for the
     * Boss objective where a specific spawned entity must be killed.
     */
    entity_id: string
}

export type GameAction = MineAction | KillAction
