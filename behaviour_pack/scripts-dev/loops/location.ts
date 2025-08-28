import {EntityComponentTypes, EquipmentSlot, Player, system, world, TicksPerSecond} from "@minecraft/server";
import {MinecraftItemTypes} from "@minecraft/vanilla-data";
import api from "../api";

function location_log(player: Player) {
    const head_gear = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Head)
    const check_list: string[] = [
        MinecraftItemTypes.SkeletonSkull,
        MinecraftItemTypes.WitherSkeletonSkull,
        MinecraftItemTypes.CarvedPumpkin,
        MinecraftItemTypes.PlayerHead,
        MinecraftItemTypes.PiglinHead,
        MinecraftItemTypes.CreeperHead,
        MinecraftItemTypes.ZombieHead,
        MinecraftItemTypes.DragonHead
    ]
    let hidden = false

    hidden = head_gear?.typeId ? check_list.includes(head_gear.typeId) : false

    const location = [Math.round(player.location.x), Math.round(player.location.y), Math.round(player.location.z)];

    const thorny_user = api.ThornyUser.fetch_user(player.name)

    if (thorny_user) {
        thorny_user.location = location
        thorny_user.dimension = player.dimension.id
        thorny_user.hidden = hidden

        thorny_user.update().then()
    }
}

export default function load_location_logger() {
    system.runInterval(() => {
        let playerlist = world.getPlayers();

        playerlist.forEach((player) => {
            location_log(player)
        });
    }, TicksPerSecond*5)

    console.log('[Loops] Loaded Location Loop')
}