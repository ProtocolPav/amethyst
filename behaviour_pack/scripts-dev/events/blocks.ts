import { world, system } from "@minecraft/server"
import api from "../api"
import { EntityComponentTypes, EquipmentSlot } from "@minecraft/server"
import { MinecraftBlockTypes } from "@minecraft/vanilla-data"
import {interaction_preprocess} from "../utils/interaction_preprocess";

export default function load_block_event_handler() {

    // Handle Block Break Event
    world.beforeEvents.playerBreakBlock.subscribe(async (event) => {
        const block_id = event.block.typeId
        const block_location = [event.block.x, event.block.y, event.block.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        const thorny_user = api.ThornyUser.fetch_user(event.player.name)!
        const active_quest = await api.QuestWithProgress.get_active_quest(thorny_user)

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
    
    // Handle Block Place Event
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
    
    // Handle Block Interact Event
    world.afterEvents.playerInteractWithBlock.subscribe((event) => {
        const block_id = event.block.typeId
        const block_location = [event.block.x, event.block.y, event.block.z]
        const dimension = event.player.dimension
        const mainhand = event.player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand)

        // List of all block IDs that the system will log.
        // Anything that isn't these will not be logged.
        const all_blocks: string[] = [
            // Containers
            MinecraftBlockTypes.Chest, MinecraftBlockTypes.Barrel, MinecraftBlockTypes.EnderChest,
            MinecraftBlockTypes.TrappedChest,
            MinecraftBlockTypes.CopperChest, MinecraftBlockTypes.ExposedCopperChest, MinecraftBlockTypes.WeatheredCopperChest,
            MinecraftBlockTypes.OxidizedCopperChest,
            MinecraftBlockTypes.WaxedCopperChest, MinecraftBlockTypes.WaxedExposedCopperChest,
            MinecraftBlockTypes.WaxedOxidizedCopperChest, MinecraftBlockTypes.WaxedWeatheredCopperChest,

            // Shulkers
            MinecraftBlockTypes.RedShulkerBox, MinecraftBlockTypes.LightGrayShulkerBox, MinecraftBlockTypes.LightBlueShulkerBox,
            MinecraftBlockTypes.BlueShulkerBox, MinecraftBlockTypes.CyanShulkerBox, MinecraftBlockTypes.GrayShulkerBox,
            MinecraftBlockTypes.LimeShulkerBox, MinecraftBlockTypes.PinkShulkerBox, MinecraftBlockTypes.BlackShulkerBox,
            MinecraftBlockTypes.BrownShulkerBox, MinecraftBlockTypes.GreenShulkerBox, MinecraftBlockTypes.WhiteShulkerBox,
            MinecraftBlockTypes.OrangeShulkerBox, MinecraftBlockTypes.PurpleShulkerBox, MinecraftBlockTypes.UndyedShulkerBox,
            MinecraftBlockTypes.YellowShulkerBox, MinecraftBlockTypes.MagentaShulkerBox,

            // Other Blocks
            MinecraftBlockTypes.Crafter, MinecraftBlockTypes.CraftingTable, MinecraftBlockTypes.Furnace,
            MinecraftBlockTypes.BlastFurnace, MinecraftBlockTypes.LitFurnace, MinecraftBlockTypes.LitBlastFurnace,
            MinecraftBlockTypes.LitSmoker, MinecraftBlockTypes.Smoker, MinecraftBlockTypes.Hopper,
            MinecraftBlockTypes.EnchantingTable, MinecraftBlockTypes.Anvil, MinecraftBlockTypes.ChippedAnvil,
            MinecraftBlockTypes.DamagedAnvil, MinecraftBlockTypes.BrewingStand,
            MinecraftBlockTypes.Beacon, MinecraftBlockTypes.CartographyTable, MinecraftBlockTypes.Grindstone,
            MinecraftBlockTypes.Lectern, MinecraftBlockTypes.Loom, MinecraftBlockTypes.SmithingTable,
            MinecraftBlockTypes.StonecutterBlock, MinecraftBlockTypes.ChiseledBookshelf, MinecraftBlockTypes.Jukebox,

            // Buttons
            MinecraftBlockTypes.Lever,
            MinecraftBlockTypes.WoodenButton, MinecraftBlockTypes.SpruceButton, MinecraftBlockTypes.BirchButton,
            MinecraftBlockTypes.JungleButton, MinecraftBlockTypes.AcaciaButton, MinecraftBlockTypes.DarkOakButton,
            MinecraftBlockTypes.MangroveButton, MinecraftBlockTypes.CherryButton, MinecraftBlockTypes.PaleOakButton,
            MinecraftBlockTypes.BambooButton, MinecraftBlockTypes.CrimsonButton, MinecraftBlockTypes.WarpedButton,
            MinecraftBlockTypes.PolishedBlackstoneButton, MinecraftBlockTypes.StoneButton,

            // Doors
            MinecraftBlockTypes.WoodenDoor, MinecraftBlockTypes.SpruceDoor, MinecraftBlockTypes.BirchDoor,
            MinecraftBlockTypes.JungleDoor, MinecraftBlockTypes.AcaciaDoor, MinecraftBlockTypes.DarkOakDoor,
            MinecraftBlockTypes.MangroveDoor, MinecraftBlockTypes.CherryDoor, MinecraftBlockTypes.PaleOakDoor,
            MinecraftBlockTypes.BambooDoor, MinecraftBlockTypes.CrimsonDoor, MinecraftBlockTypes.WarpedDoor,
            MinecraftBlockTypes.IronDoor,
            MinecraftBlockTypes.CopperDoor, MinecraftBlockTypes.ExposedCopperDoor, MinecraftBlockTypes.WeatheredCopperDoor,
            MinecraftBlockTypes.OxidizedCopperDoor,
            MinecraftBlockTypes.WaxedCopperDoor, MinecraftBlockTypes.WaxedExposedCopperDoor,
            MinecraftBlockTypes.WaxedOxidizedCopperDoor, MinecraftBlockTypes.WaxedWeatheredCopperDoor,

            // Trapdoors
            MinecraftBlockTypes.Trapdoor, MinecraftBlockTypes.SpruceTrapdoor, MinecraftBlockTypes.BirchTrapdoor,
            MinecraftBlockTypes.JungleTrapdoor, MinecraftBlockTypes.AcaciaTrapdoor, MinecraftBlockTypes.DarkOakTrapdoor,
            MinecraftBlockTypes.MangroveTrapdoor, MinecraftBlockTypes.CherryTrapdoor, MinecraftBlockTypes.PaleOakTrapdoor,
            MinecraftBlockTypes.BambooTrapdoor, MinecraftBlockTypes.CrimsonTrapdoor, MinecraftBlockTypes.WarpedTrapdoor,
            MinecraftBlockTypes.IronTrapdoor,
            MinecraftBlockTypes.CopperTrapdoor, MinecraftBlockTypes.ExposedCopperTrapdoor,
            MinecraftBlockTypes.WeatheredCopperTrapdoor, MinecraftBlockTypes.OxidizedCopperTrapdoor,
            MinecraftBlockTypes.WaxedCopperTrapdoor, MinecraftBlockTypes.WaxedExposedCopperTrapdoor,
            MinecraftBlockTypes.WaxedOxidizedCopperTrapdoor, MinecraftBlockTypes.WaxedWeatheredCopperTrapdoor
        ]

        // If the block is being held, and the Before and after is different, don't log
        // This is so we don't get double logs with the Place event
        if (
            all_blocks.includes(block_id)
            && !(
                event.beforeItemStack?.typeId === block_id
                && event.itemStack?.amount !== event.beforeItemStack?.amount
            )
        ) {
            system.run(() => {
                const interaction = new api.Interaction(
                    {
                        thorny_id: api.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
                        type: 'use',
                        coordinates: block_location,
                        reference: block_id,
                        mainhand: mainhand?.typeId ?? null,
                        dimension: dimension.id
    
                    }
                )
                
                interaction.post_interaction()
            })
        }
    })
}