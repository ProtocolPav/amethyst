import load_block_event_handler from "../features/interactions/block-interact";
import load_chat_handler from "../features/chat-decoration/chat";
import load_connections_handler from "./connections";
import load_entity_event_handler from "../features/interactions/entity-die";
import load_script_event_handler from "../features/interactions/script_events";
import load_eliana_handler from "./eliana_trade";

export default function load_world_event_handlers(guild_id: string) {
    load_block_event_handler();
    load_chat_handler();
    load_connections_handler(guild_id);
    load_entity_event_handler();
    load_script_event_handler();
    load_eliana_handler()
};