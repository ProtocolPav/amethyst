import { CustomizationPlugin } from "../types/customization-plugin";
import { GameAction } from "../types/action";
import { ObjectiveOut, ObjectiveProgressOut } from "../../../api/nexuscore/model";

/**
 * Passer — gates any action to a specified location box.
 *
 * Reads `objective.customizations.location` and checks the action's
 * coordinates against the defined centre point and radii. Returns false
 * (blocking progress) if the action falls outside the box.
 *
 * Uses horizontal_radius for X/Z and vertical_radius for Y, matching the
 * shape of the existing hardcoded check in passesCustomizations.
 */
export class LocationPlugin implements CustomizationPlugin {
    passes(action: GameAction, objective: ObjectiveOut, _progress: ObjectiveProgressOut): boolean {
        const loc = objective.customizations.location
        if (!loc) return true

        const dx = Math.abs(action.coordinates.x - loc.coordinates[0])
        const dy = Math.abs(action.coordinates.y - loc.coordinates[1])
        const dz = Math.abs(action.coordinates.z - loc.coordinates[2])

        const horizontalOk = dx <= loc.horizontal_radius && dz <= loc.horizontal_radius
        const verticalOk = loc.vertical_radius <= 0 || dy <= loc.vertical_radius

        return horizontalOk && verticalOk
    }
}
