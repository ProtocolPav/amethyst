import { Player } from "@minecraft/server";

/**
 * Players can have one quest per slot at a time: their regular quest
 * (story/side/minor/weekly) and their daily quest. Each slot is tracked
 * independently: its own progress, plugins, timers and event subscriptions.
 */
export type QuestSlot = 'regular' | 'daily'

export const QUEST_SLOTS: readonly QuestSlot[] = ['regular', 'daily']

/** Identifies one quest slot of one player. */
export interface SlotRef {
    thornyId: number
    slot: QuestSlot
}

/** Passed to processors and plugins when a slot's objective is activated. */
export interface ActivationContext extends SlotRef {
    player: Player
}

/** String key for maps keyed by slot. */
export function slotKey(ref: SlotRef): string {
    return `${ref.thornyId}:${ref.slot}`
}
