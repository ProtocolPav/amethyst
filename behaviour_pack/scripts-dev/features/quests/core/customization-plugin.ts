import { Player } from "@minecraft/server";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";
import { GameAction } from "./action";

/**
 * A CustomizationPlugin is a modular participant in an objective's lifecycle.
 *
 * Plugins are instantiated once per objective activation (per player) and
 * stored in ACTIVE_PLUGINS in objective-processor.ts. Each plugin can
 * implement any combination of the four hooks below — omitting a hook means
 * the plugin has nothing to do at that point.
 *
 * There are three conceptual plugin types:
 *
 *   Passers — implement only `passes`. They gate whether a game action
 *               counts toward progress (e.g. location, mainhand, natural_block).
 *
 *   Watchers — implement `onActivate`, `onDeactivate`, and `onTick`. They
 *               observe time or events independently of player actions and
 *               can trigger a fail or advance (e.g. timer, maximum_deaths).
 *
 *   Effects — implement only `onActivate` and `onDeactivate`. They produce
 *               side effects with no influence on progress counting
 *               (e.g. music_loop, command_loop — future additions).
 */
export interface CustomizationPlugin {
    /**
     * Called when the objective becomes active for a player.
     * Use to start timers, subscribe to events, play music, run commands, etc.
     */
    onActivate?(player: Player, objective: ObjectiveOut, progress: ObjectiveProgressOut): void

    /**
     * Called when the objective is deactivated for any reason
     * (completion, failure, quest abandonment, player leave).
     * Use to clear timers, unsubscribe events, stop music, etc.
     */
    onDeactivate?(player: Player, objective: ObjectiveOut, progress: ObjectiveProgressOut): void

    /**
     * Called before processor.evaluate() on every incoming game action.
     * Return false to block this action from counting toward progress.
     * Passers implement only this hook.
     */
    passes?(action: GameAction, objective: ObjectiveOut, progress: ObjectiveProgressOut): boolean

    /**
     * Called after each process() cycle in quest-processor.ts via tickPlugins().
     * Watchers use this to check whether a condition has been exceeded.
     *
     * Return values:
     *   'fail'    — the objective fails immediately
     *   'advance' — the objective is skipped/passed (e.g. non-failing timer expiry)
     *   void      — nothing happens
     */
    onTick?(player: Player, objective: ObjectiveOut, progress: ObjectiveProgressOut): 'fail' | 'advance' | void
}
