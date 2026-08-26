import {LocationWaypoint, Player, world} from "@minecraft/server";
import {ObjectiveOut, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {CustomizationPlugin} from "../types/customization-plugin";
import {MinecraftDimensionTypes} from "@minecraft/vanilla-data";


export class WaypointPlugin implements CustomizationPlugin {
    onActivate(player: Player, objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        const c = objective.customizations.waypoint
        if (!c) return

        c.waypoints.forEach((waypoint) => {
            player.locatorBar.addWaypoint(new LocationWaypoint(
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
            ))
        })
    }

    onDeactivate(player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        player.locatorBar.removeAllWaypoints()
    }
}
