import {EntityComponentTypes, EquipmentSlot, Player, system, world, TicksPerSecond} from "@minecraft/server";
import {MinecraftItemTypes} from "@minecraft/vanilla-data";
import api from "../api";

const HEAD_GEAR: string[] = [
    MinecraftItemTypes.SkeletonSkull,
    MinecraftItemTypes.WitherSkeletonSkull,
    MinecraftItemTypes.CarvedPumpkin,
    MinecraftItemTypes.PlayerHead,
    MinecraftItemTypes.PiglinHead,
    MinecraftItemTypes.CreeperHead,
    MinecraftItemTypes.ZombieHead,
    MinecraftItemTypes.DragonHead
]

function location_log(player: Player) {
    const head_gear = player.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Head)

    let hidden = (head_gear?.typeId ? HEAD_GEAR.includes(head_gear.typeId) : false) || player.isSneaking

    const location = [Math.round(player.location.x), Math.round(player.location.y), Math.round(player.location.z)];

    const thorny_user = api.ThornyUser.fetch_user(player.name)

    if (thorny_user) {
        thorny_user.location = location
        thorny_user.dimension = player.dimension.id
        thorny_user.hidden = hidden

        thorny_user.update().then()
    }
}

export default function loadLocationLogger() {
    system.runInterval(() => {
        let playerlist = world.getPlayers();

        playerlist.forEach((player) => {
            location_log(player)
        });
    }, TicksPerSecond*5)
}