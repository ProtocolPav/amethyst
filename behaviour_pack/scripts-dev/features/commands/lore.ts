import {
    CommandPermissionLevel,
    CustomCommand,
    CustomCommandParamType, CustomCommandStatus,
    EntityComponentTypes,
    EquipmentSlot,
    system
} from "@minecraft/server";
import api from "../../api";

export default function loreCommand() {
    system.beforeEvents.startup.subscribe(initEvent => {
        system.run(() => {
            api.Relay.event(
                'Amethyst successfully loaded',
                "Don't see this on server startup? Ping a CM! It's important!",
                'other'
            )
        })

        const loreCommand: CustomCommand = {
            name: "amethyst:lore",
            description: "Add a line to the lore, or remove all lore if blank",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            optionalParameters: [{ type: CustomCommandParamType.String, name: "text" }],
        };

        initEvent.customCommandRegistry.registerCommand(
            loreCommand,
            (origin, ...args) => {
                try {
                    const mainhand = origin.sourceEntity?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

                    system.run(() => {
                        if (args[0] === null || args[0] === undefined || args[0] === '') {
                            mainhand?.setLore();
                        } else {
                            const lore = mainhand?.getLore()
                            lore?.push(args[0])
                            mainhand?.setLore(lore)
                        }

                        origin.sourceEntity?.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, mainhand)
                    })
                } catch (e: any) {
                    return {
                        status: CustomCommandStatus.Failure,
                        message: e.message
                    }
                }

                return {
                    status: CustomCommandStatus.Success
                }
            }
        )

    })
}