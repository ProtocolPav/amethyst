import {system, world} from "@minecraft/server";
import api from "../../api";

export default function load_chat_handler() {
    world.beforeEvents.chatSend.subscribe((chat_event) => {
        const gamertag = chat_event.sender.name
        const thorny_user = api.ThornyUser.fetch_user(gamertag)

        world.sendMessage({
            rawtext: [{text: `${thorny_user?.get_role_display()} §7${gamertag}:§r ${chat_event.message}`}],
        });

        system.run(() => { api.Relay.message(gamertag, chat_event.message) });

        chat_event.cancel = true;
    });

}