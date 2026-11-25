import {LocationWaypoint, Player, world} from "@minecraft/server";
import {ObjectiveOut, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {CustomizationPlugin} from "../types/customization-plugin";
import { DeactivationContext } from "../types/deactivation-context";
import { ActivationContext } from "../types/slot";
import {MinecraftDimensionTypes} from "@minecraft/vanilla-data";


/**
 * Effect — shows the objective's waypoints on the player's locator bar.
 *
 * Only the waypoints this plugin added are removed on deactivation, so the
 * player's other quest slot keeps its own waypoints.
 */
export class WaypointPlugin implements CustomizationPlugin {
    private added: LocationWaypoint[] = []

    onActivate(ctx: ActivationContext, objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        const c = objective.customizations.waypoint
        if (!c) return

        const player = ctx.player

        c.waypoints.forEach((waypoint) => {
            const locationWaypoint = new LocationWaypoint(
                {
                    dimension: world.getDimension(waypoint.dimension ?? MinecraftDimensionTypes.Overworld),
                    x: waypoint.coordinates[0], y: waypoint.coordinates[1], z: waypoint.coordinates[2],
                },
                {
                    textureBoundsList: [
                        {
                            lowerBound: 0,
                            texture: {
                                iconHeight: 1,
                                iconWidth: 1,
                                path: `textures/waypoints/${waypoint.waypoint_type}.png`
                            }
                        }
                    ]
                }
            )
            player.locatorBar.addWaypoint(locationWaypoint)
            this.added.push(locationWaypoint)
        })
    }

    onDeactivate(ctx: DeactivationContext, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        const added = this.added
        this.added = []

        if (ctx.isLeaving || !ctx.player?.isValid) return;
        for (const waypoint of added) {
            try {
                ctx.player.locatorBar.removeWaypoint(waypoint)
            } catch (e) {
                // Already removed
            }
        }
    }
}
