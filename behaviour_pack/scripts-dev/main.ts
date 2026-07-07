import './polyfills/url-search-params'

import loadWorldBorder from "./features/border";
import loadItemComponents from "./features/items";
import loadBlockComponents from "./features/blocks";
import loadDragonFightFeature from "./features/dragon-fight";
import loadCommands from "./features/commands";
import loadWineAndBeerFeature from "./features/wine-n-beer";
import loadChatDecorationFeature from "./features/chat";
import loadInteractionHandlers from "./features/interactions";
import loadConnectionsFeature from "./features/connections";
import loadLocationLogger from "./features/location-logger";
import loadQuestsFeature from "./features/quests";
import loadWhitelistFeature from "./features/whitelist";

function load(name: string, fn: () => void): void

function load<T extends unknown[]>(name: string, fn: (...args: T) => void, ...args: T): void

function load(name: string, fn: (...args: any[]) => void, ...args: any[]) {
    try {
        fn(...args)
        console.log(`[Amethyst] Loaded ${name}`)
    }
    catch (e) {
        console.log(`[Amethyst] Error loading ${name}: ${e}`)
    }
}

load("Block Components", loadBlockComponents)
load("Commands", loadCommands)
load("Dragon Fight Feature", loadDragonFightFeature)
load("Interactions Logging Feature", loadInteractionHandlers)
load("Item Components", loadItemComponents)
load("Wine And Beer Update Features", loadWineAndBeerFeature)
load("World Border Feature", loadWorldBorder)
load("Chat Decoration Feature", loadChatDecorationFeature)
load("Connection Logging Feature", loadConnectionsFeature)
load("Location Logging Feature", loadLocationLogger)
load("Quests Feature", loadQuestsFeature)
load("Whitelist Feature", loadWhitelistFeature)
