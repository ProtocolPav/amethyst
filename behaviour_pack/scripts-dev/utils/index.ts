import DeathMessage from './death_messages'
import checks from './checks'
import send_motd from './motd'
import commands from './commands'
import convert_seconds_to_hms from './time_string'
import clean_id from './clean_minecraft_ids'
import combine from './combine_two_lists'
import AltarMessage from "./altar_messages";
import DragonHeartMessage from "./dragon_messages";

const utils = {
    DeathMessage,
    AltarMessage,
    DragonHeartMessage,
    send_motd,
    checks,
    commands,
    convert_seconds_to_hms,
    clean_id,
    combine
}

export default utils