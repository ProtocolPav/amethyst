import {EntityComponentTypes, EquipmentSlot, system, world} from "@minecraft/server";
import api from "../../api";
import {interaction_preprocess} from "../../utils/interaction_preprocess";

export default function blockBreak() {
    world.beforeEvents.playerBreakBlock.subscribe(async (event) => {
        const block_id = event.block.typeId
        const block_location = [event.block.x, event.block.y, event.block.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const thorny_user = api.ThornyUser.fetch_user(event.player.name)!
        const active_quest = await api.QuestProgress.get_quest_progress(thorny_user)

        system.run(() => {
            const interaction = new api.Interaction(
                {
                    thorny_id: thorny_user?.thorny_id ?? 0,
                    type: 'mine',
                    coordinates: block_location,
                    reference: block_id,
                    mainhand: mainhand?.typeId ?? null,
                    dimension: dimension.id

                }
            )

            interaction.post_interaction()

            if (interaction_preprocess(interaction, active_quest)) {
                api.Interaction.enqueue(interaction)
            }
        })
    })
}