import {
    Entity,
    EntityComponentTypes,
    EquipmentSlot,
    ItemComponentTypes,
    ItemStack,
    Player,
    system,
    world
} from "@minecraft/server";
import api from "../api";
import utils from "../utils";
import {MinecraftEntityTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";

type TradeItem = {
    count: number;
    item: string;
};

type FishTrade = {
    name: string;
    sizes: Record<string, TradeItem>;
};

const fishing_trades: Record<string, FishTrade> = {
    // --- Rare / Special ---
    "amethyst:nemo": {
        name: "Nemo",
        sizes: {
            "23cm": {count: 42, item: "amethyst:diamond_nugget"},
        }
    },
    "amethyst:cheeky_fish": {
        name: "Cheeky Bugger",
        sizes: {
            "60cm": {count: 4, item: "amethyst:diamond_nugget"},
            "57cm": {count: 5, item: "amethyst:diamond_nugget"},
            "54cm": {count: 4, item: "amethyst:diamond_nugget"},
        }
    },
    "amethyst:void_fish": {
        name: "Voidswimmer",
        sizes: {
            "124cm": {count: 10, item: "amethyst:diamond_nugget"},
            "112cm": {count: 8, item: "amethyst:diamond_nugget"},
            "101cm": {count: 6, item: "amethyst:diamond_nugget"},
            "90cm": {count: 3, item: "amethyst:diamond_nugget"},
        }
    },

    // --- High Tier ---
    "amethyst:blue_dwarf_fish": {
        name: "Blue Dwarf Fish",
        sizes: {
            "8cm": {count: 9, item: "amethyst:diamond_nugget"},
            "10cm": {count: 5, item: "amethyst:diamond_nugget"},
            "13cm": {count: 3, item: "amethyst:diamond_nugget"},
        }
    },
    "amethyst:thorn_fish": {
        name: "Thornfish",
        sizes: {
            "113cm": {count: 7, item: "amethyst:diamond_nugget"},
            "100cm": {count: 6, item: "amethyst:diamond_nugget"},
            "84cm": {count: 5, item: "amethyst:diamond_nugget"},
            "78cm": {count: 2, item: "amethyst:diamond_nugget"},
            "66cm": {count: 2, item: "amethyst:diamond_nugget"},
            "57cm": {count: 2, item: "amethyst:diamond_nugget"},
        }
    },
    "amethyst:tuff_fish": {
        name: "Tuffback Minnow",
        sizes: {
            "110cm": {count: 4, item: "amethyst:diamond_nugget"},
            "104cm": {count: 1, item: "amethyst:diamond_nugget"},
            "98cm": {count: 12, item: "amethyst:sea_urchin"},
            "91cm": {count: 6, item: "amethyst:sea_urchin"},
        }
    },

    // --- Medium Tier ---
    "amethyst:dwarf_fish": {
        name: "Dwarf Fish",
        sizes: {
            "8cm": {count: 7, item: "amethyst:diamond_nugget"},
            "11cm": {count: 2, item: "amethyst:diamond_nugget"},
            "14cm": {count: 5, item: "amethyst:sea_urchin"},
            "20cm": {count: 3, item: "amethyst:sea_urchin"},
        }
    },
    "amethyst:ever_fish": {
        name: "Everfish",
        sizes: {
            "100cm": {count: 2, item: "amethyst:diamond_nugget"},
            "94cm": {count: 1, item: "amethyst:diamond_nugget"},
            "86cm": {count: 8, item: "amethyst:sea_urchin"},
            "82cm": {count: 7, item: "amethyst:sea_urchin"},
            "74cm": {count: 4, item: "amethyst:sea_urchin"},
        }
    },
    "amethyst:night_fish": {
        name: "Night Trout",
        sizes: {
            "66cm": {count: 4, item: "amethyst:diamond_nugget"},
            "61cm": {count: 2, item: "amethyst:diamond_nugget"},
            "56cm": {count: 10, item: "amethyst:sea_urchin"},
            "52cm": {count: 5, item: "amethyst:sea_urchin"},
        }
    },
    "amethyst:slime_fish": {
        name: "Slimey Bass",
        sizes: {
            "78cm": {count: 3, item: "amethyst:diamond_nugget"},
            "72cm": {count: 1, item: "amethyst:diamond_nugget"},
            "67cm": {count: 8, item: "amethyst:sea_urchin"},
            "62cm": {count: 4, item: "amethyst:sea_urchin"},
        }
    },

    // --- Common Tier ---
    "amethyst:ember_minnow": {
        name: "Ember Minnow",
        sizes: {
            "84cm": {count: 4, item: "amethyst:sea_urchin"},
            "78cm": {count: 5, item: "amethyst:sea_urchin"},
            "75cm": {count: 5, item: "amethyst:sea_urchin"},
            "73cm": {count: 6, item: "amethyst:sea_urchin"},
            "70cm": {count: 9, item: "amethyst:diamond_nugget"}, // Super Rare jackpot
            "68cm": {count: 4, item: "amethyst:sea_urchin"},
        }
    },
    "amethyst:northern_chomper": {
        name: "Northern Chomper",
        sizes: {
            "70cm": {count: 5, item: "amethyst:sea_urchin"},
            "65cm": {count: 4, item: "amethyst:sea_urchin"},
            "63cm": {count: 4, item: "amethyst:sea_urchin"},
            "54cm": {count: 2, item: "amethyst:sea_urchin"},
            "50cm": {count: 1, item: "amethyst:sea_urchin"},
        }
    },
}

function trade_fish(eliana: Entity, player: Player, item: ItemStack) {
    const size: string = item.getLore()[0].split(" ")[1]

    const item_count = fishing_trades[item.typeId].sizes[size].count
    const item_stack = new ItemStack(fishing_trades[item.typeId].sizes[size].item)

    utils.commands.give_item(player.name, item_count, item_stack)

    if (item.amount === 1) {
        player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, undefined)
    } else {
        item.amount -= 1
        player.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, item)
    }

    player.playSound("mob.villager.yes", {location: eliana.location})
    player.sendMessage(
        `§l§8[§eEliana§8]§r Oh wow! Thanks for the §l${fishing_trades[item.typeId].name}§r! Here's some cash you can use somewhere.`
    )
}

export default function load_eliana_handler() {
    let speaking_to: string[] = []

    world.afterEvents.playerInteractWithEntity.subscribe(async (event) => {
        const entity_id = event.target.typeId

        if (entity_id !== "amethyst:eliana_fisherman") return

        const entity_location = [event.target.location.x, event.target.location.y, event.target.location.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        if (mainhand && mainhand.getLore().length === 1 && Object.keys(fishing_trades).includes(mainhand.typeId)) {
            trade_fish(event.target, event.player, mainhand)

            system.run(() => {
                const interaction = new api.Interaction(
                    {
                        thorny_id: api.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
                        type: 'use',
                        coordinates: entity_location,
                        reference: entity_id,
                        mainhand: mainhand.typeId,
                        dimension: dimension.id
                    }
                )

                interaction.post_interaction()
            })

            // system.sendScriptEvent()

        } else if (!speaking_to.includes(event.player.name)) {
            speaking_to.push(event.player.name)

            event.player.playSound("mob.villager.haggle", {location: event.target.location})
            event.player.sendMessage(
                `§l§8[§eEliana§8]§r Hey, ${event.player.name}! I'm Eliana. I §lloove§r collecting fishes!`
            )

            await system.waitTicks(40)

            event.player.playSound("mob.villager.yes", {location: event.target.location})
            event.player.sendMessage(
                `§l§8[§eEliana§8]§r Believe it or not, it's currently §efish migration season§r! ` +
                `It happens once every 10 years, and you're able to catch some totally rare fish during this period!`
            )

            await system.waitTicks(100)

            event.player.playSound("mob.villager.haggle", {location: event.target.location})
            event.player.sendMessage(
                `§l§8[§eEliana§8]§r Let me know if you catch any, cause I'll buy them off of ya!`
            )

            await system.waitTicks(30)

            delete speaking_to[speaking_to.indexOf(event.player.name)]
        }
    })

    // Handle Fishing Rod Use Event
    world.afterEvents.itemUse.subscribe((event) => {
        const item_id = event.itemStack.typeId
        const player = event.source
        const player_location = [player.location.x, player.location.y, player.location.z]
        const dimension = player.dimension
        const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        if (item_id === MinecraftItemTypes.FishingRod) {
            system.run(() => {
                const interaction = new api.Interaction(
                    {
                        thorny_id: api.ThornyUser.fetch_user(player.name)?.thorny_id ?? 0,
                        type: 'use',
                        coordinates: player_location,
                        reference: item_id,
                        mainhand: mainhand?.typeId ?? null,
                        dimension: dimension.id
                    }
                )

                interaction.post_interaction()
            })
        }
    })
}