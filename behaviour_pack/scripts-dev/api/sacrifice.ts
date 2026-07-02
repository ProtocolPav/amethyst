import {
    getItemV1GuildsMeWorldsItemsItemIdGet, getWorldV1GuildsMeWorldsGet,
    partialUpdateItemV1GuildsMeWorldsItemsItemIdPatch, partialUpdateWorldV1GuildsMeWorldsPatch
} from "./nexuscore/worlds/worlds";

export interface IItem {
    item_id: string
    value: number
    max_uses: number
    depreciation: number
    current_uses: number
}

export interface IWorld {
    guild_id: string
    overworld_border: number
    nether_border: number
    end_border: number
}

export class Item {
    item_id: string
    value: number
    max_uses: number
    depreciation: number
    current_uses: number

    constructor(data: IItem) {
        this.item_id = data.item_id
        this.value = data.value
        this.max_uses = data.max_uses
        this.depreciation = data.depreciation
        this.current_uses = data.current_uses
    }

    public static async get_item(item_id: string) {
        try {
            const item_response = await getItemV1GuildsMeWorldsItemsItemIdGet(item_id)
            const item_data = item_response as IItem;

            return new Item(item_data);

        } catch (error) {
            console.error("Error fetching item:", error);
            throw error;
        }
    }

    public async update_item() {
        await partialUpdateItemV1GuildsMeWorldsItemsItemIdPatch(this.item_id, {
            current_uses: this.current_uses
        })
    }
}

export class World {
    guild_id: string
    overworld_border: number
    nether_border: number
    end_border: number

    constructor(data: IWorld) {
        this.guild_id = data.guild_id
        this.overworld_border = data.overworld_border
        this.nether_border = data.nether_border
        this.end_border = data.end_border
    }

    public static async get_world() {
        try {
            const world_response = await getWorldV1GuildsMeWorldsGet()
            const world_data = world_response as unknown as IWorld;

            return new World(world_data);

        } catch (error) {
            console.error("Error fetching world:", error);
            throw error;
        }
    }

    public async update_world() {
        await partialUpdateWorldV1GuildsMeWorldsPatch({
            overworld_border: this.overworld_border,
            nether_border: this.nether_border,
            end_border: this.end_border
        })
    }
}

export class WorldCache {
    static world: World

    public static async load_world() {
        WorldCache.world = await World.get_world()
    }
}