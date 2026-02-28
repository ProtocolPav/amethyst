// behaviour_pack/scripts-dev/main.ts
var guild_id = "1213827104945471538";
WorldCache.load_world(guild_id).then();
load_loops();
load_custom_components(guild_id);
load_world_event_handlers(guild_id);
system.beforeEvents.startup.subscribe((initEvent) => {
  system.run(() => {
    api.Relay.event(
      "Amethyst successfully loaded",
      "Don't see this on server startup? Ping a CM! It's important!",
      "other"
    );
  });
  const loreCommand = {
    name: "amethyst:loreadd",
    description: "Add one line of lore to the item you're holding",
    permissionLevel: CustomCommandPermissionLevel.Admin,
    optionalParameters: [{ type: CustomCommandParamType.Integer, name: "celebrationSize" }]
  };
  initEvent.customCommandRegistry.registerCommand(
    loreCommand,
    (origin, args) => {
    }
  );
});
