import api from '../api'
import utils from '../utils';
import { world } from '@minecraft/server';
import {AsyncPlayerJoinBeforeEvent, beforeEvents} from '@minecraft/server-admin'

export default function load_connections_handler(guild_id: string) {

    // Handle Player Join Event
    world.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
        if (spawn_event.initialSpawn) {
            try {
                const thorny_user = await api.ThornyUser.get_user_from_api(guild_id, spawn_event.player.name)
                thorny_user.send_connect_event('connect')
                api.Relay.event(`${spawn_event.player.name} has joined the server`, '', 'join')

                const quest = await api.QuestProgress.get_quest_progress(thorny_user)
                utils.send_motd(spawn_event.player, quest)

                if (thorny_user.patron) {
                    spawn_event.player.nameTag = `§l§c${spawn_event.player.nameTag}§r`
                }
            }
            catch (e) {
                api.Relay.event(`${spawn_event.player.name} has joined the server`, 'API Issue Detected', 'join')
                console.error(e);
            }
        }
    })

    // Handle Player Leave Event
    world.afterEvents.playerLeave.subscribe((leave_event) => {
        const thorny_user = api.ThornyUser.fetch_user(leave_event.playerName)
        if (thorny_user) { api.QuestProgress.clear_cache(thorny_user) }
        thorny_user?.send_connect_event('disconnect')
        api.Relay.event(`${leave_event.playerName} has left the server`, '', 'leave')
    })
}

export function load_admin_connections_handler(guild_id: string) {
    type JoinBlockReason = 'no_whitelist' | 'only_gamertag' | 'not_active' | 'other'

    const BlockMessageMap = {
        'no_whitelist': 'You are not whitelisted. Check the guidelines to see how to whitelist yourself.',
        'not_active': "WAIT! Don't leave!\n\nItching for more building? We're itching to have you back! It's not every day an ex-member \n\nRejoin us at everthorn.net/apply or reach out on Discord, and we'll get you right back in!",
        'only_gamertag': "Almost there! Your gamertag is set up correctly. Now, just ask a CM to add you to the whitelist and you'll be good to go!",
        'other': 'You are not whitelisted.',
    }

    function blockJoin(join_event: AsyncPlayerJoinBeforeEvent, reason: JoinBlockReason = 'other') {
        join_event.disallowJoin(BlockMessageMap[reason] || 'You are not whitelisted.')

        api.Relay.event(
            `${join_event.name} blocked from joining`,
            BlockMessageMap[reason] || 'You are not whitelisted.',
            'other')

        console.log(`[Admin] ${join_event.name} blocked from joining. Reason: ${reason}`)
    }

    // Handle Allowlist
    beforeEvents.asyncPlayerJoin.subscribe(async (join_event) => {
        try {
            const thorny_user = await api.ThornyUser.get_user_from_api(guild_id, join_event.name)

            if (!thorny_user.active) {
                blockJoin(join_event, 'not_active')
            }

            if (thorny_user.whitelist !== join_event.name) {
                blockJoin(join_event, 'only_gamertag')
            }

            join_event.allowJoin()
        }
        catch (e) {
            blockJoin(join_event, 'no_whitelist')

            console.error(e);
        }
    })
}