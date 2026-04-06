import api from '../api'
import utils from '../utils';
import { world } from '@minecraft/server';

export default function loadConnectionsFeature() {
    world.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
        if (spawn_event.initialSpawn) {
            try {
                const thorny_user = api.ThornyUser.fetch_user(spawn_event.player.name)!
                thorny_user.send_connect_event('connect')
                api.Relay.event(`${spawn_event.player.name} has joined the server`, '', 'join')

                utils.send_motd(spawn_event.player, null)

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

    world.afterEvents.playerLeave.subscribe((leave_event) => {
        const thorny_user = api.ThornyUser.fetch_user(leave_event.playerName)!

        if (thorny_user) {
            api.QuestProgress.clear_cache(thorny_user)
        }

        thorny_user?.send_connect_event('disconnect')

        api.Relay.event(`${leave_event.playerName} has left the server`, '', 'leave')
    })
}