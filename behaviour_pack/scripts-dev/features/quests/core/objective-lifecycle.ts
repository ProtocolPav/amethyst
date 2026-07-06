import {CustomizationPlugin} from "./customization-plugin";
import {Player} from "@minecraft/server";
import {ObjectiveOut, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {TARGET_PROCESSORS} from "../processors/objective-processor";
import {DeathPlugin} from "../customizations/death-plugin";
import {LocationPlugin} from "../customizations/location-plugin";
import {MainhandPlugin} from "../customizations/mainhand-plugin";
import {NaturalBlockPlugin} from "../customizations/natural-block-plugin";
import {TimerPlugin} from "../customizations/timer-plugin";

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
export const ACTIVE_PLUGINS: Map<number, CustomizationPlugin[]> = new Map()

/**
 * Activates the currently active objective for a player.
 * Calls onActivate on the matching target processor if defined,
 * then instantiates and activates all matching customization plugins.
 */
export function activateObjective(player: Player, thorny_id: number, objective: ObjectiveOut, objectiveProgress: ObjectiveProgressOut): void {
    // Activate the target processor lifecycle hook
    const processor = TARGET_PROCESSORS[objective.objective_type]
    processor?.onActivate?.(player, objective, objectiveProgress)

    // Instantiate a plugin for every customization that is not null
    const plugins: CustomizationPlugin[] = []
    for (const [key, value] of Object.entries(objective.customizations)) {
        if (value === null) continue
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