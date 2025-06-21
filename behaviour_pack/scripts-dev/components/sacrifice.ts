import {
    BlockComponentRandomTickEvent,
    BlockComponentPlayerInteractEvent,
    system,
    EntityComponentTypes,
    EquipmentSlot,
    TicksPerSecond,
    ItemComponentTypes
} from "@minecraft/server";
import utils from "../utils";

type playerName = string;
type timeoutID = number;

export default function load_altar_component(guild_id: string) {
    const sacrificeTimers: Map<playerName, timeoutID> = new Map();
    const sacrificeTotals: Map<playerName, {val: number, orig: number}> = new Map();

    const banned_gamertags = [
        'MarsOfSoa',
        'lumilime',
        'bellissensei',
        'Gamingwarrior65',
        'Eziofilm65',
        // 'ProtocolPav',
    ]

    async function sacrifice(event: BlockComponentPlayerInteractEvent) {
        if (event.player) {
            const playerName = event.player.name;
            const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand);

            if (mainhand && !banned_gamertags.includes(playerName)) {
                if (mainhand.amount == 1) {
                    event.player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand);
                } else {
                    mainhand.amount -= 1
                    event.player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, mainhand);
                }

                event.dimension.playSound("random.pop", event.player.location, {volume: 0.5})

                try {
                    let modifier = 0
                    const block_value = 10

                    const total_value = sacrificeTotals.get(playerName)?.val
                    const total_original_value = sacrificeTotals.get(playerName)?.orig

                    if (total_value && total_original_value) {
                        sacrificeTotals.set(playerName, {val: block_value + total_value, orig: 10})
                    } else {
                        sacrificeTotals.set(playerName, {val: block_value, orig: 10})
                    }

                    // Cancel any existing timeout
                    if (sacrificeTimers.has(playerName)) {
                        system.clearRun(sacrificeTimers.get(playerName)!);
                    }

                    const timeoutId = system.runTimeout(() => {
                        ambient(event);
                        event.dimension.playSound("altar.sacrifice", event.block.center(), { volume: 8 });

                        const total_value = Math.round(sacrificeTotals.get(playerName)?.val!)
                        const total_original = Math.round(sacrificeTotals.get(playerName)?.orig!)
                        const message = utils.AltarMessage.random_sacrifice(total_value, total_original)
                        utils.commands.send_message(
                            event.dimension.id,
                            playerName,
                            `[§l§aAltar§r] ${message}`
                        );

                        const valueRemaining = total_value / total_original

                        if (valueRemaining < 0.3) {
                            // Do an evil act to punish the player
                        }

                        sacrificeTimers.delete(playerName) // Clean up timers
                        sacrificeTotals.delete(playerName)
                    }, TicksPerSecond*0.5);

                    sacrificeTimers.set(playerName, timeoutId);
                } catch (e) {
                    ambient(event);

                    const spawned_item = mainhand.clone()
                    spawned_item.amount = 1

                    const spawned_location = event.block.center()
                    spawned_location.y += 0.7

                    event.dimension.spawnItem(spawned_item, spawned_location)

                    const message = utils.AltarMessage.random_not_sacrificial()
                    utils.commands.send_message(
                        event.dimension.id,
                        playerName,
                        `[§l§aAltar§r] ${message}`
                    )
                }
            }
            else {
                ambient(event);

                const message = utils.AltarMessage.random_info(1434)
                utils.commands.send_message(
                    event.dimension.id,
                    playerName,
                    `[§l§aAltar§r] ${message}`
                )
            }
        }
    }

    function ambient(event : BlockComponentRandomTickEvent) {
        if (event.block.isValid) {
            const location = event.block.center();
            event.dimension.playSound("altar.ambient", location, {volume: 3})
        }
    }

    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:sacrifice',
            {
                onRandomTick(event) {
                    ambient(event)
                },
                onPlayerInteract(event) {
                    sacrifice(event).then()
                }
            }
        )
    })
}