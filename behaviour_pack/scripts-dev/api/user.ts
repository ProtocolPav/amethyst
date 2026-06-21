import utils from "../utils";
import {lookupUserV1GuildsMeUsersLookupGet, partialUpdateUserV1GuildsMeUsersThornyIdPut} from "./nexuscore/users/users";
import {createConnectionV1GuildsMeConnectionPost} from "./nexuscore/guilds/guilds";

interface IThornyUser {
    thorny_id: number
    user_id: number
    guild_id: number
    username: string | null
    join_date: Date
    birthday: Date | null
    balance: number
    active: boolean
    role: string
    patron: boolean
    level: number
    xp: number
    required_xp: number
    last_message: Date
    gamertag: string
    whitelist: string
    profile: object
    location: number[] | null
    dimension: string | null
    hidden: boolean
}

export default class ThornyUser implements IThornyUser {
    private static thorny_user_map: {[gamertag: string]: ThornyUser} = {}
    private static thorny_id_map: {[thorny_id: number]: ThornyUser} = {}

    thorny_id: number
    user_id: number
    guild_id: number
    username: string | null
    join_date: Date
    birthday: Date | null
    balance: number
    active: boolean
    role: string
    patron: boolean
    level: number
    xp: number
    required_xp: number
    last_message: Date
    gamertag: string
    whitelist: string
    profile: object
    location: number[] | null
    dimension: string | null
    hidden: boolean

    constructor(api_data: IThornyUser) {
        this.thorny_id = api_data.thorny_id
        this.user_id = api_data.user_id
        this.guild_id = api_data.guild_id
        this.username = api_data.username
        this.join_date = api_data.join_date
        this.birthday = api_data.birthday
        this.balance = api_data.balance
        this.active = api_data.active
        this.role = api_data.role
        this.patron = api_data.patron
        this.level = api_data.level
        this.xp = api_data.xp
        this.required_xp = api_data.required_xp
        this.last_message = api_data.last_message
        this.gamertag = api_data.gamertag
        this.whitelist = api_data.whitelist
        this.profile = api_data.profile
        this.location = api_data.location
        this.dimension = api_data.dimension
        this.hidden = api_data.hidden
    }

    public static async get_user_from_api(guild_id: string, gamertag: string): Promise<ThornyUser> {
        const response = await lookupUserV1GuildsMeUsersLookupGet({gamertag: gamertag})
        const thorny_user = new ThornyUser(response as unknown as IThornyUser)

        // Adds user to the map for quick fetching
        ThornyUser.thorny_user_map[gamertag] = thorny_user
        ThornyUser.thorny_id_map[thorny_user.thorny_id] = thorny_user
        thorny_user.gamertag = gamertag

        return thorny_user
    }

    public static fetch_user(gamertag: string): ThornyUser | undefined {
        return ThornyUser.thorny_user_map[gamertag]
    }

    public static fetch_user_by_id(thorny_id: number): ThornyUser {
        return ThornyUser.thorny_id_map[thorny_id]
    }
    
    /**
     * Update this user in NexusCore.
     * Currently only updates balance.
     */
    public async update() {
        await partialUpdateUserV1GuildsMeUsersThornyIdPut(this.thorny_id, {
            "balance": this.balance,
            "location": this.location as [number, number, number],
            "dimension": this.dimension,
            "hidden": this.hidden
        })
    }

    /**
     * Send a connection event to NexusCore, either
     * connect or disconnect
     */
    public async send_connect_event(event_type: "connect" | "disconnect") {
        console.log(`[CONNECTION] Sending ${event_type} to nexuscore for ThornyID ${this.thorny_id} (${this.whitelist})`);

        await createConnectionV1GuildsMeConnectionPost({
            "type": event_type,
            "thorny_id": this.thorny_id
        })
    }

    /**
     * Returns a decorated role string for chat decoration
     */
    public get_role_display(): string {
        if (this.role == 'New Recruit') {
            return utils.emojis.NEWBIE
        }

        let role_emojis: string[] = []

        switch (this.role) {
            case 'Builder':
                role_emojis.push(utils.emojis.BUILDER)
                break;

            case 'Merchant':
                role_emojis.push(utils.emojis.MERCHANT)
                break;

            case 'Knight':
                role_emojis.push(utils.emojis.KNIGHT)
                break;

            case 'Gatherer':
                role_emojis.push(utils.emojis.GATHERER)
                break;

            case 'Miner':
                role_emojis.push(utils.emojis.MINER)
                break;

            case 'Bard':
                role_emojis.push(utils.emojis.BARD)
                break;

            case 'Stoner':
                role_emojis.push(utils.emojis.STONER)
                break;
        }

        if (this.role == 'Owner') {
            role_emojis.push(utils.emojis.OWNER)
        }
        else if (this.role == 'Community Manager') {
            role_emojis.push(utils.emojis.MANAGER)
        }
        else if (this.patron) {
            role_emojis.push(utils.emojis.PATRON)
        }
        else {
            role_emojis.push(utils.emojis.DWELLER)
        }

        return role_emojis.join('')
    }
}