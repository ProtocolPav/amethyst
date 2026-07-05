import {Player, system, TicksPerSecond} from "@minecraft/server";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";
import { CustomizationPlugin } from "../core/customization-plugin";
import {showTimer} from "../core/notify";

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
    private shouldFail = false
    private remaining_seconds = 0

    onActivate(player: Player, objective: ObjectiveOut, progress: ObjectiveProgressOut): void {
        const c = objective.customizations.timer
        if (!c) return

        this.shouldFail = c.fail ?? false
        this.expired = false

        const startedAt = progress.start_time ? new Date(progress.start_time).getTime() : Date.now()
        const elapsedSeconds = (Date.now() - startedAt) / 1000
        this.remaining_seconds = Math.max(0, c.seconds - elapsedSeconds)

        if (this.remaining_seconds === 0) {
            this.expired = true
            return
        }

        this.runId = system.runTimeout(() => {
            this.expired = true
        }, Math.ceil(this.remaining_seconds) * TicksPerSecond)
    }

    onDeactivate(_player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        // Clear the pending timeout if the objective ends before the timer fires
        if (this.runId !== undefined) {
            system.clearRun(this.runId)
            this.runId = undefined
        }
        this.expired = false
    }

    onTick(_player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): 'fail' | 'skip' | void {
        this.remaining_seconds -= 1
        showTimer(_player, this.remaining_seconds)
        if (!this.expired) return
        return this.shouldFail ? 'fail' : 'skip'
    }
}
