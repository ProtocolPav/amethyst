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
    EquipmentSlot,
    system, world
} from "@minecraft/server";
import {load_admin_connections_handler} from "./events/connections";

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

// Set up admin connections
world.afterEvents.worldLoad.subscribe(() => {
    load_admin_connections_handler(guild_id)
})