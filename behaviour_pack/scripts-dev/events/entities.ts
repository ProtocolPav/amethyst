import {system, world} from "@minecraft/server"
import api from "../api"
import utils from "../utils"
import { EntityComponentTypes, EquipmentSlot, Player } from "@minecraft/server"
import {MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes} from "@minecraft/vanilla-data"
import {interaction_preprocess} from "../utils/interaction_preprocess";

export default function load_entity_event_handler() {
    // Handle Entity Die/Kill event
    world.afterEvents.entityDie.subscribe(async (event) => {

        // Player kills Something
        if (event.damageSource.damagingEntity instanceof Player) {
            const player = event.damageSource.damagingEntity
            const dimension = player.dimension
            const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

            const killer_thorny_user = api.ThornyUser.fetch_user(player.name)!
            const killer_active_quest = await api.QuestProgress.get_quest_progress(killer_thorny_user)

            const interaction = new api.Interaction(
                {
                    thorny_id: killer_thorny_user?.thorny_id ?? 0,
                    type: 'kill',
                    coordinates: [event.deadEntity.location.x, event.deadEntity.location.y, event.deadEntity.location.z],
                    reference: event.deadEntity.typeId,
                    mainhand: mainhand?.typeId ?? null,
                    dimension: dimension.id

                }
            )

            // Player kills Player
            // Log dead player's death
            if (event.deadEntity instanceof Player) {
                const dead_player = event.deadEntity
                const dead_mainhand = dead_player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

                const dead_thorny_user = api.ThornyUser.fetch_user(dead_player.name)!
                
                // Replace Interaction Ref with dead players name
                interaction.reference = dead_player.name

                const death_interaction = new api.Interaction(
                    {
                        thorny_id: dead_thorny_user?.thorny_id ?? 0,
                        type: 'die',
                        coordinates: [dead_player.location.x, dead_player.location.y, dead_player.location.z],
                        reference: player.name,
                        mainhand: dead_mainhand?.typeId ?? null,
                        dimension: dimension.id

                    }
                )

                // Set reference back to player so that Quests can
                // correctly handle them :))
                interaction.reference = MinecraftEntityTypes.Player

                // Log kill interaction
                interaction.post_interaction()

                // Log death interaction. Don't pre-process as this is fine
                death_interaction.post_interaction()
                api.Interaction.enqueue(death_interaction)

                // Relay death
                api.Relay.event(utils.DeathMessage.random_pvp(player.name, dead_player.name), '', 'other')
            } else {
                // Log kill interaction
                interaction.post_interaction()
            }

            if (interaction_preprocess(interaction, killer_active_quest)) {
                api.Interaction.enqueue(interaction)
            }
        }

        // Entity Kills Player
        else if (event.deadEntity instanceof Player && event.damageSource.damagingEntity) {
            const killer = event.damageSource.damagingEntity
            const player = event.deadEntity

            const dimension = player.dimension
            const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

            const thorny_user = api.ThornyUser.fetch_user(player.name)!
            const active_quest = await api.QuestProgress.get_quest_progress(thorny_user)

            const death_interaction = new api.Interaction(
                {
                    thorny_id: thorny_user?.thorny_id ?? 0,
                    type: 'die',
                    coordinates: [player.location.x, player.location.y, player.location.z],
                    reference: killer.typeId,
                    mainhand: mainhand?.typeId ?? null,
                    dimension: dimension.id

                }
            )

            // Log death interaction
            death_interaction.post_interaction()
            api.Interaction.enqueue(death_interaction)

            // Relay death
            api.Relay.event(utils.DeathMessage.random_pve(player.name, killer.typeId), '', 'other')
        }

        // Player Suicide
        else if (event.deadEntity instanceof Player && !event.damageSource.damagingEntity) {
            const player = event.deadEntity

            const dimension = player.dimension
            const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

            const thorny_user = api.ThornyUser.fetch_user(player.name)!
            const active_quest = await api.QuestProgress.get_quest_progress(thorny_user)

            const death_interaction = new api.Interaction(
                {
                    thorny_id: thorny_user?.thorny_id ?? 0,
                    type: 'die',
                    coordinates: [player.location.x, player.location.y, player.location.z],
                    reference: event.damageSource.cause,
                    mainhand: mainhand?.typeId ?? null,
                    dimension: dimension.id

                }
            )

            // Log death interaction
            death_interaction.post_interaction()
            api.Interaction.enqueue(death_interaction)

            // Relay death
            api.Relay.event(utils.DeathMessage.random_suicide(player.name, event.damageSource.cause), '', 'other')
        }
    })

    // Handle Entity Interact event
    world.afterEvents.playerInteractWithEntity.subscribe((event) => {
        const entity_id = event.target.typeId
        const entity_location = [event.target.location.x, event.target.location.y, event.target.location.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        // List of all block IDs that the system will log.
        // Anything that isn't these will not be logged.
        const all_entities: string[] = [
            // Villagers
            MinecraftEntityTypes.Villager, MinecraftEntityTypes.VillagerV2, MinecraftEntityTypes.WanderingTrader,

            // Rideable Entities
            MinecraftEntityTypes.Horse, MinecraftEntityTypes.Donkey, MinecraftEntityTypes.Mule, MinecraftEntityTypes.Minecart,
            MinecraftEntityTypes.Strider, MinecraftEntityTypes.Pig, MinecraftEntityTypes.Boat, MinecraftEntityTypes.Camel,

            // Entity Containers
            MinecraftEntityTypes.ChestBoat, MinecraftEntityTypes.ChestMinecart, MinecraftEntityTypes.HopperMinecart,

            "amethyst:james_collector"
        ]

        if (
            all_entities.includes(entity_id)
        ) {
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
    })

    let first_stage = false
    let second_stage = false

    // Handle Dragon Health
    world.afterEvents.entityHurt.subscribe((event) => {
        if (event.hurtEntity.typeId === MinecraftEntityTypes.EnderDragon) {
            const health_component = event.hurtEntity.getComponent(EntityComponentTypes.Health)

            if (health_component && !first_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.75) {
                first_stage = true

                const message = utils.DragonHeartMessage.health_stage_message(1)
                utils.commands.send_message(
                    event.hurtEntity.dimension.id,
                    '@a',
                    message
                );

                utils.DragonHeartMessage.summon_minions()

            } else if (health_component && !second_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.25) {
                second_stage = true

                const message = utils.DragonHeartMessage.health_stage_message(2)
                utils.commands.send_message(
                    event.hurtEntity.dimension.id,
                    '@a',
                    message
                );

                utils.DragonHeartMessage.summon_minions()
            }
        }
    })
}