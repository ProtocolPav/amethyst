import {LocationWaypoint, Player, system, WaypointTexture, world} from "@minecraft/server";
import {ObjectiveOut, ObjectiveProgressOut} from "../../../api/nexuscore/model";
import {CustomizationPlugin} from "../types/customization-plugin";
import {MinecraftDimensionTypes} from "@minecraft/vanilla-data";


export class WaypointPlugin implements CustomizationPlugin {
    onActivate(player: Player, objective: ObjectiveOut, progress: ObjectiveProgressOut): void {
        const c = objective.customizations.waypoint
        if (!c) return

        player.locatorBar.addWaypoint(new LocationWaypoint(
            {
                dimension: world.getDimension(MinecraftDimensionTypes.Overworld),
                x: c.coordinates[0], y: c.coordinates[1], z: c.coordinates[2],
            },
            {
                textureBoundsList: [
                    {lowerBound: 0, texture: WaypointTexture.SmallSquare}
                ]
            },
            {
                red: 1, green: 0, blue: 0
            }
        ))
    }

    onDeactivate(player: Player, _objective: ObjectiveOut, _progress: ObjectiveProgressOut): void {
        player.locatorBar.removeAllWaypoints()
    }
}
