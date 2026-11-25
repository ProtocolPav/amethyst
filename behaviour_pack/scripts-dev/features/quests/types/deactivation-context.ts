import { Player } from "@minecraft/server";
import { SlotRef } from "./slot";

export interface DeactivationContext extends SlotRef {
    playerName: string;
    player?: Player;
    isLeaving: boolean;
}
