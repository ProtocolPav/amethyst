import {Vector3} from "@minecraft/server";

interface Action {
    time: Date
    coordinates: Vector3
    dimension: string
    mainhand: string | null
}

export interface MineAction extends Action {
    block_id: string
    naturally_mined: boolean
}