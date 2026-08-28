import { Player } from "@minecraft/server";

export interface DeactivationContext {
    thornyId: number;
    playerName: string;
    player?: Player;
    isLeaving: boolean;
}
