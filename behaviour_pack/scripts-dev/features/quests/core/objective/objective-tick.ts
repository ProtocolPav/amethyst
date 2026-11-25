import {Player} from "@minecraft/server";
import {ObjectiveOut, ObjectiveProgressOut} from "../../../../api/nexuscore/model";
import {ACTIVE_PLUGINS} from "./objective-lifecycle";
import {SlotRef, slotKey} from "../../types/slot";

/**
 * Iterates onTick() across all active plugins of a quest slot and returns the
 * first non-void signal.
 *
 * Returns:
 *   'fail' — at least one watcher wants the objective to fail
 *   'skip' — at least one watcher wants the objective to be skipped/passed
 *   void — no plugin signalled anything
 */
export function tickPlugins(
    player: Player,
    ref: SlotRef,
    objective: ObjectiveOut,
    progress: ObjectiveProgressOut
): 'fail' | 'skip' | void {
    const plugins = ACTIVE_PLUGINS.get(slotKey(ref)) ?? []
    for (const plugin of plugins) {
        const signal = plugin.onTick?.(player, objective, progress)
        if (signal) return signal
    }
}