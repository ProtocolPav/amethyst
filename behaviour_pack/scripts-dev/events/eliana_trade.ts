import {EntityComponentTypes, EquipmentSlot, system, world} from "@minecraft/server";
import {MinecraftEntityTypes} from "@minecraft/vanilla-data";
import api from "../api";

export default function load_eliana_handler() {
    let speaking_to: string[] = []

    world.afterEvents.playerInteractWithEntity.subscribe(async (event) => {
        const entity_id = event.target.typeId

        if (entity_id !== "amethyst:eliana_fisherman") return

        const entity_location = [event.target.location.x, event.target.location.y, event.target.location.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const acceptable_mainhand: string[] = [
            "amethyst:blue_dwarf_fish", "amethyst:cheeky_fish", "amethyst:dwarf_fish", "amethyst:ember_minnow",
            "amethyst:ever_fish", "amethyst:nemo", "amethyst:night_fish", "amethyst:northern_chomper",
            "amethyst:slime_fish", "amethyst:thorn_fish", "amethyst:tuff_fish", "amethyst:void_fish"
        ]

        if (mainhand && acceptable_mainhand.includes(mainhand.typeId)) {
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