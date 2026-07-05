import {Player} from "@minecraft/server";
import {ObjectiveOut, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {ACTIVE_PLUGINS} from "./objective-lifecycle";

/**
 * Iterates onTick() across all active plugins for a player and returns the
 * first non-void signal.
 *
 * Returns:
 *   'fail' — at least one watcher wants the objective to fail
 *   'skip' — at least one watcher wants the objective to be skipped/passed
 *   void — no plugin signalled anything
 */
export function tickPlugins(
    player: Player,
    thorny_id: number,
    objective: ObjectiveOut,
    progress: ObjectiveProgressOut
): 'fail' | 'skip' | void {
    const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? []
    for (const plugin of plugins) {
        const signal = plugin.onTick?.(player, objective, progress)
        if (signal) return signal
    }
}