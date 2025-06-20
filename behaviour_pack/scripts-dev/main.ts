import load_custom_components from './components';
import load_loops from './loops'
import {WorldCache} from "./api/sacrifice";

const guild_id = process.env.GUILD_ID || '0'

WorldCache.load_world(guild_id).then()

// Loading Game Loops
// These are scripts that loop every now and then
load_loops()

// Loading Custom Component Scripts
// These are scripts which get executed by blocks/items
load_custom_components(guild_id)

// Load Event Handlers
// These are handlers for game events such as join, leave, break blocks, etc.