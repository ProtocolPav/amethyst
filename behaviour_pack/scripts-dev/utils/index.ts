import DeathMessage from './death_messages'
import checks from './checks'
import send_motd from './motd'
import commands from './commands'
import AltarMessage from "./altar_messages";
import DragonHeartMessage from "./dragon_messages";
import EvilActs from "./evil_acts";
import Glitches from "./glitches";

function convert_seconds_to_hms(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

function combine(list1: { [key: string]: any }[], list2: { [key: string]: any }[], id: string) {
    let combined_list = []

    for (let item of list1) {
        combined_list.push({...item, ...list2.find(item2 => item2[id] === item[id])})
    }

    return combined_list
}

function clean_id(id: string) {
    return id.replace(/^[^:]+:/, "") // Remove the "XXXX:" prefix
        .replace(/_/g, " ")        // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}

function normalizeDateString(datetime: string): string {
    if (!datetime.includes('.')) {
        // Add microseconds if missing
        return `${datetime}.000000`;
    }

    // Pad or trim to exactly 6 digits
    return datetime.replace(/\.(\d{1,6})\d*/, (_, digits) => {
        return `.${digits.padEnd(6, '0')}`;
    });
}

function getWeightedChoice<T>(choices: Array<{item: T, weight: number}>): T {
    // Calculate total weight
    const total_weight = choices.reduce((sum, choice) => sum + choice.weight, 0)

    // Pick random value between 0 and total weight
    const random_value = Math.random() * total_weight

    // Find which item was selected
    let cumulative_weight = 0
    for (const choice of choices) {
        cumulative_weight += choice.weight
        if (random_value < cumulative_weight) {
            return choice.item
        }
    }

    // Fallback (should never happen)
    return choices[0].item
}

const emojis = {
    EVERTHORN: '',
    NUGS: '',
    BUILDER: '',
    KNIGHT: '',
    GATHERER: '',
    MERCHANT: '',
    BARD: '',
    STONER: '',
    MINER: '',
    DISCORD_ICON: '',
    DISCORD: '',
    OWNER: '',
    MANAGER: '',
    PATRON: '',
    NEWBIE: '',
    DWELLER: '',
    SERVER: '',
}

const utils = {
    DeathMessage,
    AltarMessage,
    DragonHeartMessage,
    send_motd,
    checks,
    commands,
    convert_seconds_to_hms,
    clean_id,
    combine,
    EvilActs,
    Glitches,
    normalizeDateString,
    emojis,
    getWeightedChoice
}

export default utils