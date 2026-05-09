import {EntityComponentTypes, EquipmentSlot, MolangVariableMap, Player, system, world} from "@minecraft/server";


function champion(player: Player): void {
    const molang = new MolangVariableMap();
    molang.setColorRGB("variable.color", { red: 1, green: 0.913, blue: 0.576 });

    const position = player.location;
    const equippable = player.getComponent(EntityComponentTypes.Equippable)
    let equipped = 0
    equippable?.getEquipment(EquipmentSlot.Head)?.hasTag("amethyst:champion") ? equipped++ : null
    equippable?.getEquipment(EquipmentSlot.Chest)?.hasTag("amethyst:champion") ? equipped++ : null
    equippable?.getEquipment(EquipmentSlot.Legs)?.hasTag("amethyst:champion") ? equipped++ : null
    equippable?.getEquipment(EquipmentSlot.Feet)?.hasTag("amethyst:champion") ? equipped++ : null

    if (equipped > 0 && Math.random() <= equipped/5) {
        const radius = 3;

        let random_location = {
            x: position.x + (Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1)),
            y: position.y + 0.5 + Math.floor(Math.random() * radius),
            z: position.z + (Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1))
        };

        player.dimension.spawnParticle('minecraft:glow_particle', random_location, molang)
    }
}

export default function loadChampionSet() {
    system.runInterval(() => {
        let playerlist = world.getPlayers();
    
        playerlist.forEach((player) => {
            champion(player)
        });
    }, 4)
}
