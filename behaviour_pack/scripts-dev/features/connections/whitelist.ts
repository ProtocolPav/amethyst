import {AsyncPlayerJoinBeforeEvent, beforeEvents} from "@minecraft/server-admin";
import api from "../../api";
import {world} from "@minecraft/server";

type JoinBlockReason = 'no_whitelist' | 'only_gamertag' | 'not_active' | 'other'

const BlockMessageMap = {
    'no_whitelist': 'You are not whitelisted. Check the guidelines to see how to whitelist yourself.',
    'not_active': "WAIT! Don't go!\n\nCouldn't resist a peek, could you? We don't blame you. Let's get you back to where you belong.\n\nRejoin us at everthorn.net/apply or reach out on Discord. We'll get you right back in!",
    'only_gamertag': "Almost there! Your gamertag is set up correctly. Now, just ask a CM to add you to the whitelist and you'll be good to go!",
    'other': 'You are not whitelisted.',
}

async function blockJoin(join_event: AsyncPlayerJoinBeforeEvent, reason: JoinBlockReason = 'other') {
    join_event.disallowJoin(BlockMessageMap[reason] || 'You are not whitelisted.')

    api.Relay.event(
        `${join_event.name} blocked from joining`,
        BlockMessageMap[reason] || 'You are not whitelisted.',
        'other')

    console.log(`[Admin] ${join_event.name} blocked from joining. Reason: ${reason}`)
}

export default function handleWhitelist(guild_id: string) {
    // Blocked in early-execution mode, must be loaded after worldLoad
    world.afterEvents.worldLoad.subscribe(() => {
        beforeEvents.asyncPlayerJoin.subscribe(async (join_event) => {
            try {
                const thorny_user = await api.ThornyUser.get_user_from_api(guild_id, join_event.name)

                if (!thorny_user.active) {
                    await blockJoin(join_event, 'not_active')
                    return
                }

                if (thorny_user.whitelist !== join_event.name) {
                    await blockJoin(join_event, 'only_gamertag')
                    return
                }

                join_event.allowJoin()
            }
            catch (e) {
                await blockJoin(join_event, 'no_whitelist')
            }
        })
    })
}