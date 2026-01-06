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
import {MinecraftEntityTypes} from "@minecraft/vanilla-data";

type TradeItem = {
    count: number;
    item: string;
};

type FishTrade = {
    name: string;
    sizes: Record<string, TradeItem>;
};

const fishing_trades: Record<string, FishTrade> = {
    "amethyst:dwarf_fish": {
        name: "Dwarf Fish",
        sizes: {
            "8cm": {count: 9, item: "amethyst:diamond_nugget"},
            "11cm": {count: 2, item: "amethyst:diamond_nugget"},
            "14cm": {count: 5, item: "amethyst:sea_urchin"},
            "20cm": {count: 3, item: "amethyst:sea_urchin"},
        }
    },
    "amethyst:blue_dwarf_fish": {
        name: "Blue Dwarf Fish",
        sizes: {
            "8cm": {count: 15, item: "amethyst:diamond_nugget"},
            "10cm": {count: 7, item: "amethyst:diamond_nugget"},
            "13cm": {count: 5, item: "amethyst:diamond_nugget"},
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
}