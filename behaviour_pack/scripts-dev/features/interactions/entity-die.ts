import {Entity, EntityDamageCause, system, world} from "@minecraft/server"
import api from "../../api"
import utils from "../../utils"
import { EntityComponentTypes, EquipmentSlot, Player } from "@minecraft/server"

export default function entityDie() {
    /**
     * When a player kills an entity. That entity can be another player or a mob.
     *
     * Logs the KILL interaction and preprocesses interaction for Quests.
     */
    async function playerKillEntity(player: Player, entity: Entity) {
        const dimension = player.dimension
        const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const thorny_user = api.ThornyUser.fetch_user(player.name)!

        const interaction = new api.Interaction(
            {
                thorny_id: thorny_user?.thorny_id ?? 0,
                type: 'kill',
                coordinates: [entity.location.x, entity.location.y, entity.location.z],
                reference: entity.typeId,
                mainhand: mainhand?.typeId ?? null,
                dimension: dimension.id
            }
        )

        await interaction.post_interaction()
    }

    /**
     * When a player dies by another player.
     *
     * Logs the DEATH interaction for the dead player and queues it for Quest Processing.
     * Also relays a PVP message to the Discord Chat.
     */
    async function playerDieByPlayer(killer_player: Player, dead_player: Player) {
        const dimension = killer_player.dimension
        const entity_mainhand = dead_player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const dead_thorny_user = api.ThornyUser.fetch_user(dead_player.name)!

        const death_interaction = new api.Interaction(
            {
                thorny_id: dead_thorny_user?.thorny_id ?? 0,
                type: 'die',
                coordinates: [dead_player.location.x, dead_player.location.y, dead_player.location.z],
                reference: killer_player.name,
                mainhand: entity_mainhand?.typeId ?? null,
                dimension: dimension.id

            }
        )

        await death_interaction.post_interaction()

        api.Relay.event(utils.DeathMessage.random_pvp(killer_player.name, dead_player.name), '', 'other')
    }

    /**
     * When a player dies by an entity
     *
     * Logs the DEATH interaction for the dead player and queues it for Quest Processing.
     * Also relays a PVE message to the Discord Chat.
     */
    async function playerDieByEntity(player: Player, entity: Entity) {
        const dimension = player.dimension
        const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const thorny_user = api.ThornyUser.fetch_user(player.name)!

        const death_interaction = new api.Interaction(
            {
                thorny_id: thorny_user?.thorny_id ?? 0,
                type: 'die',
                coordinates: [player.location.x, player.location.y, player.location.z],
                reference: entity.typeId,
                mainhand: mainhand?.typeId ?? null,
                dimension: dimension.id

            }
        )

        await death_interaction.post_interaction()

        api.Relay.event(utils.DeathMessage.random_pve(player.name, entity.typeId), '', 'other')
    }

    /**
     * When a player dies by other circumstances
     *
     * Logs the DEATH interaction for the dead player, queues it for Quest Processing.
     * Also relays a death message to the Discord Chat.
     */
    async function playerDieByOther(player: Player, damageCause: EntityDamageCause) {
        const dimension = player.dimension
        const mainhand = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const thorny_user = api.ThornyUser.fetch_user(player.name)!

        const death_interaction = new api.Interaction(
            {
                thorny_id: thorny_user?.thorny_id ?? 0,
                type: 'die',
                coordinates: [player.location.x, player.location.y, player.location.z],
                reference: damageCause,
                mainhand: mainhand?.typeId ?? null,
                dimension: dimension.id

            }
        )

        await death_interaction.post_interaction()

        api.Relay.event(utils.DeathMessage.random_suicide(player.name, damageCause), '', 'other')
    }

    world.afterEvents.entityDie.subscribe(async (event) => {
        const damage_cause = event.damageSource.cause
        const damaging_entity = event.damageSource.damagingEntity
        const dead_entity = event.deadEntity

        if (damaging_entity instanceof Player) {
            await playerKillEntity(damaging_entity, dead_entity)

            if (dead_entity instanceof Player) {
                await playerDieByPlayer(damaging_entity, dead_entity)
            }
        }

        else if (dead_entity instanceof Player && damaging_entity) {
            await playerDieByEntity(dead_entity, damaging_entity)
        }

        else if (dead_entity instanceof Player && !damaging_entity) {
            await playerDieByOther(dead_entity, damage_cause)
        }
    })
}