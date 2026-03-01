import load_custom_components from './components';
import load_loops from './loops'
import load_world_event_handlers from './events';
import {WorldCache} from "./api/sacrifice";
import api from "./api";
import {
    CommandPermissionLevel,
    CustomCommand,
    CustomCommandParamType,
    CustomCommandStatus, EntityComponentTypes,
    EntityInventoryComponent, EquipmentSlot,
    system
} from "@minecraft/server";

import {ArgumentOutOfBoundsError} from "@minecraft/common"

const guild_id = process.env.GUILD_ID || '0'

WorldCache.load_world(guild_id).then()

// Loading Game Loops
// These are scripts that loop every now and then
load_loops()

// Loading Custom Component Scripts
// These are scripts which get executed by blocks/items
load_custom_components(guild_id)

// Load Event Handlers
// These are handlers for game events such as join, leave, break blocks, etc.
load_world_event_handlers(guild_id)

// Relay Startup Event
system.beforeEvents.startup.subscribe(initEvent => {
    system.run(() => {
        api.Relay.event(
            'Amethyst successfully loaded',
            "Don't see this on server startup? Ping a CM! It's important!",
            'other'
        )
    })

    const loreCommand: CustomCommand = {
        name: "amethyst:loreadd",
        description: "Add one line of lore to the item you're holding",
        permissionLevel: CommandPermissionLevel.Admin,
        mandatoryParameters: [{ type: CustomCommandParamType.String, name: "text" }],
    };

    initEvent.customCommandRegistry.registerCommand(
        loreCommand,
        (origin, ...args) => {
            try {
                const mainhand = origin.initiator?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

                const lore = mainhand?.getLore()
                lore?.push(args[0])
                mainhand?.setLore(lore)

                origin.initiator?.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, mainhand)
            } catch (e: any) {
                if (e instanceof ArgumentOutOfBoundsError) {
                    return {
                        status: CustomCommandStatus.Failure,
                        message: e.message
                    }
                }

                return {
                    status: CustomCommandStatus.Failure,
                    message: "Something went wrong"
                }
            }

            return {
                status: CustomCommandStatus.Success
            }
        }
    )

    const removeLoreCommand: CustomCommand = {
        name: "amethyst:loreremove",
        description: "Remove all lore from the item you're holding",
        permissionLevel: CommandPermissionLevel.Admin
    };

    initEvent.customCommandRegistry.registerCommand(
        removeLoreCommand,
        (origin, ...args) => {
            try {
                const mainhand = origin.initiator?.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

                mainhand?.setLore();

                origin.initiator?.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, mainhand)
            } catch (e: any) {
                if (e instanceof ArgumentOutOfBoundsError) {
                    return {
                        status: CustomCommandStatus.Failure,
                        message: e.message
                    }
                }

                return {
                    status: CustomCommandStatus.Failure,
                    message: "Something went wrong"
                }
            }

            return {
                status: CustomCommandStatus.Success
            }
        }
    )

})