import {Player, system, TicksPerSecond} from "@minecraft/server";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";
import { CustomizationPlugin } from "../core/customization-plugin";

/**
 * Watcher — fails or advances the objective when a time limit expires.
 *
 * On activation, schedules a one-shot runTimeout for c.timer.seconds * 20
 * ticks. When it fires it sets an `expired` flag. On each onTick call,
 * the flag is checked and the appropriate signal is returned.
 *
 * Uses runTimeout (not runInterval) so no repeated polling is needed —
 * the flag is set once and read on the next onTick call.
 *
 * `c.timer.fail` controls the outcome:
 *   true (default) → return 'fail' (objective fails)
 *   false → return 'advance' (objective is skipped/passed)
 */
export class TimerPlugin implements CustomizationPlugin {
    private runId: number | undefined
    private expired = false
    private shouldFail = true

    onActivate(_player: Player, objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        const c = objective.customizations.timer
        if (!c) return

        this.shouldFail = c.fail ?? true
        this.expired = false

        this.runId = system.runTimeout(() => {
            this.expired = true
        }, TicksPerSecond * c.seconds)
    }

    onDeactivate(_player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        // Clear the pending timeout if the objective ends before the timer fires
        if (this.runId !== undefined) {
            system.clearRun(this.runId)
            this.runId = undefined
        }
        this.expired = false
    }

    onTick(_player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): 'fail' | 'advance' | void {
        if (!this.expired) return
        return this.shouldFail ? 'fail' : 'advance'
    }
}
