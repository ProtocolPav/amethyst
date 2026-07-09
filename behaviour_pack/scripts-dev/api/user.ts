import utils from "../utils";
import {
    lookupUserV1GuildsMeUsersLookupGet,
    partialUpdateUserV1GuildsMeUsersThornyIdPatch, partialUpdateUserV1GuildsMeUsersThornyIdPut
} from "./nexuscore/users/users";
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
    public static thorny_user_map: Record<string, ThornyUser> = {}
    public static thorny_id_map: Record<string, ThornyUser> = {}
    public static cache_expiry: Record<string, Date> = {}
    private static pending_fetches: Record<string, Promise<ThornyUser>> = {}

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

    public static async get_user_from_api(gamertag: string): Promise<ThornyUser> {
        const response = await lookupUserV1GuildsMeUsersLookupGet({ gamertag })
        const thorny_user = new ThornyUser(response as unknown as IThornyUser)

        thorny_user.gamertag = gamertag
        ThornyUser.thorny_user_map[gamertag] = thorny_user
        ThornyUser.thorny_id_map[thorny_user.thorny_id] = thorny_user
        ThornyUser.cache_expiry[thorny_user.thorny_id] = new Date(Date.now() + 1000 * 60 * 5) // 5 minute cache expiry time

        return thorny_user
    }

    public static fetch_user(gamertag: string): ThornyUser | undefined {
        const cached = ThornyUser.thorny_user_map[gamertag]
        const exp = cached ? ThornyUser.cache_expiry[cached.thorny_id] : undefined
        const is_fresh = cached && exp && exp > new Date()

        if (!is_fresh && !ThornyUser.pending_fetches[gamertag]) {
            const request = ThornyUser.get_user_from_api(gamertag)
                .catch((err) => {
                    console.error(`Failed to refresh ThornyUser for ${gamertag}:`, err)
                    return cached as ThornyUser
                })
                .finally(() => {
                    delete ThornyUser.pending_fetches[gamertag]
                })

            ThornyUser.pending_fetches[gamertag] = request
        }

        return cached
    }

    public static fetch_user_by_id(thorny_id: number): ThornyUser | undefined {
        const cached = ThornyUser.thorny_id_map[thorny_id]
        const exp = cached ? ThornyUser.cache_expiry[thorny_id] : undefined
        const is_fresh = cached && exp && exp > new Date()

        if (!is_fresh && cached && !ThornyUser.pending_fetches[cached.gamertag]) {
            const request = ThornyUser.get_user_from_api(cached.gamertag)
                .catch((err) => {
                    console.error(`Failed to refresh ThornyUser for id ${thorny_id}:`, err)
                    return cached
                })
                .finally(() => {
                    delete ThornyUser.pending_fetches[cached.gamertag]
                })

            ThornyUser.pending_fetches[cached.gamertag] = request
        }

        return cached
    }
    
    /**
     * Update this user in NexusCore.
     */
    public async update() {
        await partialUpdateUserV1GuildsMeUsersThornyIdPatch(this.thorny_id, {
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