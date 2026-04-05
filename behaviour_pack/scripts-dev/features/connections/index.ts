import handleConnections from "./connections";
import handleWhitelist from "./whitelist";

export default function loadConnectionsFeature(guild_id: string) {
    handleConnections()
    handleWhitelist(guild_id)
}