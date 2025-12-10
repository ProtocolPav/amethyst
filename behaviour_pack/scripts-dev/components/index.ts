import load_fungus_spreading_component from "./fungus_spread";
import load_glitch_component from "./glitch";
import load_altar_component from "./sacrifice";
import load_whoop_component from "./whoop";
import load_reactor_activate_component from "./reactor_activate";
import load_heal_dragon_component from "./heal_dragon";
import load_alcohol_component from "./alcohol";

export default function load_custom_components(guild_id: string) {
    // Block Components
    load_fungus_spreading_component()
    load_glitch_component()
    load_whoop_component()
    load_altar_component(guild_id)
    load_reactor_activate_component()
    load_heal_dragon_component()

    // Item Components
    load_alcohol_component()
}