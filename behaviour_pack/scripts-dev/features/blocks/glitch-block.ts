import {Player, BlockComponentTickEvent, system} from "@minecraft/server";
import utils from "../../utils";


export default function loadGlitchBlockComponent() {
    const glitches = new utils.Glitches();

    function glitch(event : BlockComponentTickEvent) {
        if (Math.random() < 0.07 && event.block.isValid) {
            const location = event.block.location;
            const radius = 12;

            const players = event.block.dimension.getPlayers({location: location, maxDistance: radius})

            players.forEach((player: Player) => {
                glitches.executeRandomGlitch(player);
            })
        }
    }

    function glitch_particles(event : BlockComponentTickEvent) {
        if (event.block.isValid) {
            const location = event.block.location;
            const radius = 20;

            let random_location = {
                x: location.x + (Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1)),
                y: location.y + Math.floor(Math.random() * 4),
                z: location.z + (Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1))
            };

            if (event.block.dimension.getBlock(random_location)) {
                event.dimension.spawnParticle("minecraft:eyeofender_death_explode_particle", random_location)
            }
        }
    }

    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.blockComponentRegistry.registerCustomComponent('amethyst:glitch',
            {
                onTick(event) {
                    glitch_particles(event)
                    glitch(event)
                }
            }
        )
    })
}