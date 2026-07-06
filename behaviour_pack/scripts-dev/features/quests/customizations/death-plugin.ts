import {EntityDieAfterEvent, Player, world} from "@minecraft/server";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";
import { CustomizationPlugin } from "../core/customization-plugin";
import {markDirty} from "../write-back";
import ThornyUser from "../../../api/user";

/**
 * Watcher — fails the objective if the player dies too many times.
 *
 * On activation, subscribes to `world.afterEvents.entityDie` and filters
 * events to the specific player by entity ID. The death count is seeded
 * from `customization_progress.maximum_deaths.deaths` so that counts
 * survive an objective deactivation/reactivation (e.g. player rejoins).
 *
 * The unsubscribe closure captures the exact handler reference so that
 * onDeactivate can cleanly remove only this plugin's listener.
 */
export class DeathPlugin implements CustomizationPlugin {
    private exceeded = false
    private shouldFail = false
    private unsubscribe: (() => void) | undefined

    onActivate(player: Player, objective: ObjectiveOut, progress: ObjectiveProgressOut): void {
        const c = objective.customizations.maximum_deaths
        if (!c) return

        this.exceeded = false
        this.shouldFail = c.fail ?? false

        const thornyUser = ThornyUser.fetch_user(player.name)!

        // Seed from existing progress so reloads don't reset the count
        let deaths = progress.customization_progress.maximum_deaths?.deaths ?? 0

        const handler = (event: EntityDieAfterEvent) => {
            if (event.deadEntity.id !== player.id) return
            deaths++

            if (!progress.customization_progress.maximum_deaths) {
                progress.customization_progress.maximum_deaths = { deaths: 0 }
            }
            progress.customization_progress.maximum_deaths.deaths = deaths

            markDirty(thornyUser.thorny_id)

            if (deaths >= c.deaths) this.exceeded = true
        }

        world.afterEvents.entityDie.subscribe(handler)

        // Store the exact unsubscribe closure so onDeactivate removes only this listener
        this.unsubscribe = () => world.afterEvents.entityDie.unsubscribe(handler)
    }

    onDeactivate(_player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        this.unsubscribe?.()
        this.unsubscribe = undefined
        this.exceeded = false
    }

    onTick(_player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): 'fail' | 'skip' | void {
        if (!this.exceeded) return
        return this.shouldFail ? 'fail' : 'skip'
    }
}
