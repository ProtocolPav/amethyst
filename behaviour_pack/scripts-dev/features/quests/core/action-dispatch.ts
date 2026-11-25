// core/action-dispatch.ts
import { Player } from "@minecraft/server";
import { GameAction } from "../types/action";
import { getCachedProgress } from "../progress-store";
import { QuestProcessor } from "../processors/quest-processor";
import { SlotRef } from "../types/slot";

let questProcessor: QuestProcessor

/**
 * Resolves a slot's cached quest + progress and hands the action to
 * QuestProcessor.process(). process() already no-ops safely if there's
 * no active objective, so no need to pre-check that here.
 *
 * Each slot's target processor subscription dispatches to its own slot only.
 * When both of a player's quests want the same action (e.g. both want sheep
 * kills), each slot has its own subscription, so the action counts once
 * towards each quest.
 */
export function processGameAction(player: Player, action: GameAction, ref: SlotRef): void {
    questProcessor ??= new QuestProcessor()

    const cached = getCachedProgress(ref)
    if (!cached) return

    questProcessor.process(action, player, cached)
}
