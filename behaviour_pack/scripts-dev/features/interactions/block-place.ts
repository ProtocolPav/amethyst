import {EntityComponentTypes, EquipmentSlot, system, world} from "@minecraft/server";
import api from "../../api";

export default function blockPlace() {
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
        const block_id = event.block.typeId
        const block_location = [event.block.x, event.block.y, event.block.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        system.run(() => {
            const interaction = new api.Interaction(
                {
                    thorny_id: api.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
                    type: 'place',
                    coordinates: block_location,
                    reference: block_id,
                    mainhand: mainhand?.typeId ?? null,
                    dimension: dimension.id

                }
            )

            interaction.post_interaction()
        })
    })
}
