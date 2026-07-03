import {
    ObjectiveOut,
    ObjectiveProgressOut,
    ObjectiveProgressOutStatus,
    ObjectiveOutLogic,
    MineTargetModel,
    KillTargetModel,
} from "../../../api/nexuscore/model";
import { Player } from "@minecraft/server";
import { GameAction } from "../core/action";
import { AnyTarget, AnyTargetProgress, TargetProcessor } from "../core/target-processor";
import { MineTargetProcessor } from "./mine-target-processor";
import { KillTargetProcessor } from "./kill-target-processor";
import { CustomizationPlugin } from "../core/customization-plugin";
import { LocationPlugin } from "../plugins/location-plugin";
import { MainhandPlugin } from "../plugins/mainhand-plugin";
import { NaturalBlockPlugin } from "../plugins/natural-block-plugin";
import { TimerPlugin } from "../plugins/timer-plugin";
import { DeathPlugin } from "../plugins/death-plugin";

/**
 * Registry of target processors, keyed by objective_type.
 * Each processor owns evaluate() and optional lifecycle hooks for its type.
 */
const TARGET_PROCESSORS: Record<string, TargetProcessor> = {
    mine: new MineTargetProcessor(),
    kill: new KillTargetProcessor(),
}

/**
 * Registry of customization plugin classes, keyed by the customization field
 * name as it appears in objective.customizations.
 *
 * When an objective is activated, every key present in objective.customizations
 * that has a matching entry here is instantiated and stored in ACTIVE_PLUGINS.
 * Add future plugins here — no other changes needed.
 */
const CUSTOMIZATION_PLUGINS: Record<string, new () => CustomizationPlugin> = {
    location:       LocationPlugin,
    mainhand:       MainhandPlugin,
    natural_block:  NaturalBlockPlugin,
    timer:          TimerPlugin,
    maximum_deaths: DeathPlugin,
}

/**
 * Live plugin instances for each currently active objective, keyed by thorny_id.
 * Populated by activateObjective, cleared by deactivateObjective.
 * One entry per player — a player can only have one active objective at a time.
 */
const ACTIVE_PLUGINS: Map<number, CustomizationPlugin[]> = new Map()

function targetCount(target: AnyTarget): number {
    return target.count ?? 1
}

/**
 * Activates the currently active objective for a player.
 * Calls onActivate on the matching target processor if defined,
 * then instantiates and activates all matching customization plugins.
 */
export function activateObjective(player: Player, thorny_id: number, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): void {
    // Activate the target processor lifecycle hook
    const processor = TARGET_PROCESSORS[objective.objective_type]
    processor?.onActivate?.(player, objective, objectiveProgress)

    // Instantiate a plugin for every customization key that has a registered class
    const plugins: CustomizationPlugin[] = []
    for (const key of Object.keys(objective.customizations)) {
        const PluginClass = CUSTOMIZATION_PLUGINS[key]
        if (!PluginClass) continue
        const plugin = new PluginClass()
        plugin.onActivate?.(player, objective, objectiveProgress)
        plugins.push(plugin)
    }
    ACTIVE_PLUGINS.set(thorny_id, plugins)
}

/**
 * Deactivates the currently active objective for a player.
 * Calls onDeactivate on the matching target processor if defined,
 * then deactivates and discards all active customization plugins.
 */
export function deactivateObjective(player: Player, thorny_id: number, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): void {
    // Deactivate the target processor lifecycle hook
    const processor = TARGET_PROCESSORS[objective.objective_type]
    processor?.onDeactivate?.(player, objective, objectiveProgress)

    // Deactivate all plugins and remove them from the map
    const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? []
    for (const plugin of plugins) {
        plugin.onDeactivate?.(player, objective, objectiveProgress)
    }
    ACTIVE_PLUGINS.delete(thorny_id)
}

/**
 * Iterates onTick() across all active plugins for a player and returns the
 * first non-void signal. Called by quest-processor after each process() cycle.
 *
 * Returns:
 *   'fail' — at least one watcher wants the objective to fail
 *   'advance' — at least one watcher wants the objective to be skipped/passed
 *   void — no plugin signalled anything
 */
export function tickPlugins(
    player: Player,
    thorny_id: number,
    objective: ObjectiveOut,
    progress: ObjectiveProgressOut
): 'fail' | 'advance' | void {
    const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? []
    for (const plugin of plugins) {
        const signal = plugin.onTick?.(player, objective, progress)
        if (signal) return signal
    }
}

export class ObjectiveProcessor {
    /**
     * Processes an objective against the given action.
     * @param action
     * @param thorny_id
     * @param objective
     * @param objectiveProgress
     * @returns true if the objective is complete, false otherwise
     */
    process(action: GameAction, thorny_id: number, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): boolean {
        if (objectiveProgress.status === ObjectiveProgressOutStatus.completed) return false

        // Run all passer plugins — if any return false, block the action
        if (!this.passesCustomizations(action, thorny_id, objective, objectiveProgress)) return false

        const processor = TARGET_PROCESSORS[objective.objective_type]
        if (!processor) return false

        switch (objective.logic) {
            case ObjectiveOutLogic.or: return this.processOr(action, objective, objectiveProgress, processor)
            case ObjectiveOutLogic.and: return this.processAnd(action, objective, objectiveProgress, processor)
            case ObjectiveOutLogic.sequential: return this.processSequential(action, objective, objectiveProgress, processor)
        }
    }

    private complete(progress: ObjectiveProgressOut): true {
        progress.status = ObjectiveProgressOutStatus.completed
        progress.end_time = new Date().toISOString()
        return true
    }

    /**
     * Iterates the passes() hook of every active plugin for this player.
     * Returns false as soon as any plugin blocks the action.
     */
    private passesCustomizations(action: GameAction, thorny_id: number, objective: ObjectiveOut, progress: ObjectiveProgressOut): boolean {
        const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? []
        for (const plugin of plugins) {
            if (plugin.passes?.(action, objective, progress) === false) return false
        }
        return true
    }

    private processOr(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor): boolean {
        const sharedPool = objective.target_count ?? null

        for (const targetProgress of progress.target_progress as AnyTargetProgress[]) {
            const increment = processor.evaluate(action, objective, targetProgress)
            if (increment === 0) continue

            targetProgress.count = (targetProgress.count ?? 0) + increment

            if (sharedPool !== null) {
                // Shared pool — sum all targets together
                const total = (progress.target_progress as AnyTargetProgress[]).reduce((sum, tp) => sum + (tp.count ?? 0), 0)
                if (total >= sharedPool) return this.complete(progress)
            } else {
                // Individual — this specific target must reach its own count
                const def = objective.targets.find(t => t.target_uuid === targetProgress.target_uuid) as AnyTarget | undefined
                const required = def ? targetCount(def) : 1
                if (targetProgress.count >= required) return this.complete(progress)
            }
        }

        return false
    }

    private processAnd(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor): boolean {
        for (const targetProgress of progress.target_progress as AnyTargetProgress[]) {
            const def = objective.targets.find(t => t.target_uuid === targetProgress.target_uuid) as AnyTarget | undefined
            if (!def) continue
            if ((targetProgress.count ?? 0) >= targetCount(def)) continue  // already complete

            const increment = processor.evaluate(action, objective, targetProgress)
            if (increment > 0) targetProgress.count = (targetProgress.count ?? 0) + increment
        }

        const allDone = (progress.target_progress as AnyTargetProgress[]).every(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as AnyTarget | undefined
            return def ? (tp.count ?? 0) >= targetCount(def) : false
        })

        return allDone ? this.complete(progress) : false
    }

    private processSequential(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut, processor: TargetProcessor): boolean {
        const currentTarget = (progress.target_progress as AnyTargetProgress[]).find(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as AnyTarget | undefined
            return def ? (tp.count ?? 0) < targetCount(def) : false
        })

        if (!currentTarget) return this.complete(progress)  // all targets already done

        const increment = processor.evaluate(action, objective, currentTarget)
        if (increment === 0) return false

        currentTarget.count = (currentTarget.count ?? 0) + increment

        const allDone = (progress.target_progress as AnyTargetProgress[]).every(tp => {
            const def = objective.targets.find(t => t.target_uuid === tp.target_uuid) as AnyTarget | undefined
            return def ? (tp.count ?? 0) >= targetCount(def) : false
        })

        return allDone ? this.complete(progress) : false
    }
}
