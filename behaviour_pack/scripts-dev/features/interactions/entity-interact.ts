import {EntityComponentTypes, EquipmentSlot, PlayerInteractWithEntityAfterEvent, system, world} from "@minecraft/server";
import {MinecraftEntityTypes} from "@minecraft/vanilla-data";
import api from "../../api";

export default function entityInteract() {
    const LOGGABLE_ENTITIES: string[] = [
        // Villagers
        MinecraftEntityTypes.VillagerV2, MinecraftEntityTypes.WanderingTrader,

        // Rideable Entities
        MinecraftEntityTypes.Horse, MinecraftEntityTypes.Donkey, MinecraftEntityTypes.Mule, MinecraftEntityTypes.Minecart,
        MinecraftEntityTypes.Strider, MinecraftEntityTypes.Pig, MinecraftEntityTypes.Boat, MinecraftEntityTypes.Camel,
        MinecraftEntityTypes.ZombieHorse, MinecraftEntityTypes.SkeletonHorse, MinecraftEntityTypes.Nautilus,
        MinecraftEntityTypes.ZombieNautilus, MinecraftEntityTypes.CamelHusk, MinecraftEntityTypes.HappyGhast,
        MinecraftEntityTypes.Llama, MinecraftEntityTypes.TraderLlama,

        // Entity Containers
        MinecraftEntityTypes.ChestBoat, MinecraftEntityTypes.ChestMinecart, MinecraftEntityTypes.HopperMinecart,

        // Amethyst Entities
        "amethyst:james_collector"
    ]

    function entityInteraction(event: PlayerInteractWithEntityAfterEvent) {
        const entity_id = event.target.typeId
        const entity_location = [event.target.location.x, event.target.location.y, event.target.location.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        system.run(() => {
            const interaction = new api.Interaction(
                {
                    thorny_id: api.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
                    type: 'use',
                    coordinates: entity_location,
                    reference: entity_id,
                    mainhand: mainhand?.typeId ?? null,
                    dimension: dimension.id
                }
            )

            interaction.post_interaction()
        })
    }

    world.afterEvents.playerInteractWithEntity.subscribe((event) => {
        if (LOGGABLE_ENTITIES.includes(event.target.typeId)) {
            entityInteraction(event)
        }
    })
}
