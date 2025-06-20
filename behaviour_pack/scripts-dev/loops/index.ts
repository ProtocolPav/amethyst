import load_elytra_mending_checker from "./elytra_no_mending";
import load_glitch_loop from "./glitches";
import load_totem_o_togetherness from "./totem_of_togetherness";
import load_champion_set from "./champion_set";

export default function load_loops() {
    load_elytra_mending_checker()
    load_glitch_loop()
    load_totem_o_togetherness()
    load_champion_set()
}