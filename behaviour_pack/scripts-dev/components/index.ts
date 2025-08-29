import load_fungus_spreading_component from "./fungus_spread";
import load_glitch_component from "./glitch";
import load_whoop_component from "./whoop";
import load_reactor_activate_component from "./reactor_activate";
import load_lucky_component from "./lucky";

export default function load_custom_components() {
    load_fungus_spreading_component()
    load_glitch_component()
    load_whoop_component()
    load_reactor_activate_component()
    load_lucky_component()
}