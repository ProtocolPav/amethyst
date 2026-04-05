import {EntityComponentTypes, EquipmentSlot, Player, system, world} from "@minecraft/server";
import {MinecraftEffectTypes} from '@minecraft/vanilla-data';


const healthboost = MinecraftEffectTypes.HealthBoost;


function togetherness(player: Player): void {
    const position = player.location;
    const equippable = player.getComponent(EntityComponentTypes.Equippable)
    const offhand = equippable?.getEquipment(EquipmentSlot.Offhand)
    const mainhand = equippable?.getEquipment(EquipmentSlot.Mainhand)

    if (offhand?.hasTag("amethyst:togetherness") || mainhand?.hasTag("amethyst:togetherness") ) {
        const uniqueplayerslist = player.dimension.getPlayers({
            location: position,
            maxDistance: 16,
            excludeNames: [player.name]
        })
        const effect_level = Math.min(5, uniqueplayerslist.length)
        if (effect_level-1 >= 0) {
            player.addEffect(healthboost, 40, {amplifier: effect_level-1, showParticles: false})
        }
    }
}

export default function loadTotemOfTogethernessLoop() {
    system.runInterval(() => {
        let playerlist = world.getPlayers();
    
        playerlist.forEach((player) => {
            togetherness(player)
        });
    }, 20)
}
