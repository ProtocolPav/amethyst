import {
    Dimension,
    Vector3,
    system, ItemComponentConsumeEvent, TicksPerSecond, Player
} from "@minecraft/server";
import {MinecraftEffectTypes} from "@minecraft/vanilla-data";

export default function load_beer_component() {
    async function on_drink(event : ItemComponentConsumeEvent) {
        const player = event.source

        const drunk_data_string = player.getDynamicProperty('amethyst:drunk_data') as string | undefined

        if (!drunk_data_string) {
            player.setDynamicProperty('amethyst:drunk_data', JSON.stringify({type: 'beer', drinks: 1}))
        } else {
            let drunk_data = JSON.parse(drunk_data_string)

            drunk_data.drinks += 1
            player.setDynamicProperty('amethyst:drunk_data', JSON.stringify(drunk_data))
        }
    }

    system.beforeEvents.startup.subscribe(initEvent => {
        initEvent.itemComponentRegistry.registerCustomComponent('amethyst:alcohol',
            {
                async onConsume(event) {
                    await on_drink(event)
                },
            }
        )
    })
}