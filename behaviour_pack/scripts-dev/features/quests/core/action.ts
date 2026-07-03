import { Vector3 } from "@minecraft/server";

// The discriminated union tag — mirrors ObjectiveOutObjectiveType from the API
export type ActionType = 'mine' | 'kill'

interface BaseAction {
    type: ActionType
    time: Date
    player_thorny_id: number
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
