import { EquipmentSlot, Player, world, system, EntityComponentTypes, ItemComponentTypes, EnchantmentType } from '@minecraft/server';
import { MinecraftEnchantmentTypes, MinecraftItemTypes } from '@minecraft/vanilla-data';


function elytraCheck(player: Player) {
    const player_equipment = player.getComponent(EntityComponentTypes.Equippable);
    const item = player_equipment?.getEquipment(EquipmentSlot.Chest)

    if (item) {
        const enchantments = item?.getComponent(ItemComponentTypes.Enchantable);

        const has_mending = enchantments?.hasEnchantment(MinecraftEnchantmentTypes.Mending);

        if (has_mending && item?.typeId == MinecraftItemTypes.Elytra) {
            if (!enchantments?.hasEnchantment(MinecraftEnchantmentTypes.Vanishing)) {
                enchantments?.addEnchantment(
                    { 
                        type: new EnchantmentType(MinecraftEnchantmentTypes.Vanishing),
                        level: 1 
                    }
                );
            }

            enchantments?.removeEnchantment(MinecraftEnchantmentTypes.Mending);

            const durability_component = item.getComponent(ItemComponentTypes.Durability)

            if (durability_component) {
                durability_component.damage = durability_component.maxDurability
            }

            item.setLore([`\n§o"My wings are cursed!"`])

            world.getDimension("overworld").runCommand(`title "${player.name}" actionbar §o§iMy Elytra feels different...`)

            player_equipment?.setEquipment(EquipmentSlot.Chest, item);

            console.log(`[ElytraCheck] Player ${player.name} has elytra with mending. Removing Mending.`);
        }
    }
}

export default function loadRemoveMendingFromElytraLoop() {
    system.runInterval(() => {
        let playerlist = world.getPlayers();
    
        playerlist.forEach((player) => {
            elytraCheck(player)
        });
    }, 20)
}