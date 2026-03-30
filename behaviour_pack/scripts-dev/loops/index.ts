import load_elytra_mending_checker from "./elytra_no_mending";
import load_world_border from "./border";
import load_quest_loop from "./quests";
import load_totem_o_togetherness from "./totem_of_togetherness";
import load_location_logger from "./location";
import load_champion_set from "./champion_set";
import load_drunk from "./drunk";

export default function load_loops() {
    load_elytra_mending_checker()
    load_world_border()
    load_quest_loop()
    load_totem_o_togetherness()
    load_location_logger()
    load_champion_set()
    load_drunk()
}