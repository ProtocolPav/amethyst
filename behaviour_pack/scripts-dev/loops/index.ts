import load_elytra_mending_checker from "../features/items/elytra-mending";
import load_world_border from "../features/border";
import load_quest_loop from "./quests";
import load_totem_o_togetherness from "../features/items/totem-of-togetherness";
import load_location_logger from "../features/location-logger";
import load_champion_set from "../features/items/champion-set";
import load_drunk from "../features/wine-n-beer/loops";

export default function load_loops() {
    load_elytra_mending_checker()
    load_world_border()
    load_quest_loop()
    load_totem_o_togetherness()
    load_location_logger()
    load_champion_set()
    load_drunk()
}