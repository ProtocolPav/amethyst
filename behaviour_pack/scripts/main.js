var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// behaviour_pack/scripts-dev/polyfills/url-search-params.ts
if (typeof globalThis.URLSearchParams === "undefined") {
  globalThis.URLSearchParams = class URLSearchParams {
    constructor(init) {
      this.params = [];
      if (!init) return;
      if (typeof init === "string") {
        init.replace(/^\?/, "").split("&").forEach((pair) => {
          const [k, v] = pair.split("=");
          if (k) this.params.push([decodeURIComponent(k), decodeURIComponent(v ?? "")]);
        });
      } else if (Array.isArray(init)) {
        this.params = init.map(([k, v]) => [k, v]);
      } else {
        this.params = Object.entries(init);
      }
    }
    static {
      __name(this, "URLSearchParams");
    }
    append(key, value) {
      this.params.push([key, value]);
    }
    delete(key) {
      this.params = this.params.filter(([k]) => k !== key);
    }
    get(key) {
      return this.params.find(([k]) => k === key)?.[1] ?? null;
    }
    getAll(key) {
      return this.params.filter(([k]) => k === key).map(([, v]) => v);
    }
    has(key) {
      return this.params.some(([k]) => k === key);
    }
    set(key, value) {
      this.delete(key);
      this.params.push([key, value]);
    }
    toString() {
      return this.params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
    }
    forEach(cb) {
      this.params.forEach(([k, v]) => cb(v, k));
    }
  };
}

// behaviour_pack/scripts-dev/features/border.ts
import { world, system, EntityDamageCause } from "@minecraft/server";

// node_modules/@minecraft/vanilla-data/lib/index.js
var MinecraftBiomeTypes = ((MinecraftBiomeTypes2) => {
  MinecraftBiomeTypes2["BambooJungle"] = "minecraft:bamboo_jungle";
  MinecraftBiomeTypes2["BambooJungleHills"] = "minecraft:bamboo_jungle_hills";
  MinecraftBiomeTypes2["BasaltDeltas"] = "minecraft:basalt_deltas";
  MinecraftBiomeTypes2["Beach"] = "minecraft:beach";
  MinecraftBiomeTypes2["BirchForest"] = "minecraft:birch_forest";
  MinecraftBiomeTypes2["BirchForestHills"] = "minecraft:birch_forest_hills";
  MinecraftBiomeTypes2["BirchForestHillsMutated"] = "minecraft:birch_forest_hills_mutated";
  MinecraftBiomeTypes2["BirchForestMutated"] = "minecraft:birch_forest_mutated";
  MinecraftBiomeTypes2["CherryGrove"] = "minecraft:cherry_grove";
  MinecraftBiomeTypes2["ColdBeach"] = "minecraft:cold_beach";
  MinecraftBiomeTypes2["ColdOcean"] = "minecraft:cold_ocean";
  MinecraftBiomeTypes2["ColdTaiga"] = "minecraft:cold_taiga";
  MinecraftBiomeTypes2["ColdTaigaHills"] = "minecraft:cold_taiga_hills";
  MinecraftBiomeTypes2["ColdTaigaMutated"] = "minecraft:cold_taiga_mutated";
  MinecraftBiomeTypes2["CrimsonForest"] = "minecraft:crimson_forest";
  MinecraftBiomeTypes2["DeepColdOcean"] = "minecraft:deep_cold_ocean";
  MinecraftBiomeTypes2["DeepDark"] = "minecraft:deep_dark";
  MinecraftBiomeTypes2["DeepFrozenOcean"] = "minecraft:deep_frozen_ocean";
  MinecraftBiomeTypes2["DeepLukewarmOcean"] = "minecraft:deep_lukewarm_ocean";
  MinecraftBiomeTypes2["DeepOcean"] = "minecraft:deep_ocean";
  MinecraftBiomeTypes2["DeepWarmOcean"] = "minecraft:deep_warm_ocean";
  MinecraftBiomeTypes2["Desert"] = "minecraft:desert";
  MinecraftBiomeTypes2["DesertHills"] = "minecraft:desert_hills";
  MinecraftBiomeTypes2["DesertMutated"] = "minecraft:desert_mutated";
  MinecraftBiomeTypes2["DripstoneCaves"] = "minecraft:dripstone_caves";
  MinecraftBiomeTypes2["ExtremeHills"] = "minecraft:extreme_hills";
  MinecraftBiomeTypes2["ExtremeHillsEdge"] = "minecraft:extreme_hills_edge";
  MinecraftBiomeTypes2["ExtremeHillsMutated"] = "minecraft:extreme_hills_mutated";
  MinecraftBiomeTypes2["ExtremeHillsPlusTrees"] = "minecraft:extreme_hills_plus_trees";
  MinecraftBiomeTypes2["ExtremeHillsPlusTreesMutated"] = "minecraft:extreme_hills_plus_trees_mutated";
  MinecraftBiomeTypes2["FlowerForest"] = "minecraft:flower_forest";
  MinecraftBiomeTypes2["Forest"] = "minecraft:forest";
  MinecraftBiomeTypes2["ForestHills"] = "minecraft:forest_hills";
  MinecraftBiomeTypes2["FrozenOcean"] = "minecraft:frozen_ocean";
  MinecraftBiomeTypes2["FrozenPeaks"] = "minecraft:frozen_peaks";
  MinecraftBiomeTypes2["FrozenRiver"] = "minecraft:frozen_river";
  MinecraftBiomeTypes2["Grove"] = "minecraft:grove";
  MinecraftBiomeTypes2["Hell"] = "minecraft:hell";
  MinecraftBiomeTypes2["IceMountains"] = "minecraft:ice_mountains";
  MinecraftBiomeTypes2["IcePlains"] = "minecraft:ice_plains";
  MinecraftBiomeTypes2["IcePlainsSpikes"] = "minecraft:ice_plains_spikes";
  MinecraftBiomeTypes2["JaggedPeaks"] = "minecraft:jagged_peaks";
  MinecraftBiomeTypes2["Jungle"] = "minecraft:jungle";
  MinecraftBiomeTypes2["JungleEdge"] = "minecraft:jungle_edge";
  MinecraftBiomeTypes2["JungleEdgeMutated"] = "minecraft:jungle_edge_mutated";
  MinecraftBiomeTypes2["JungleHills"] = "minecraft:jungle_hills";
  MinecraftBiomeTypes2["JungleMutated"] = "minecraft:jungle_mutated";
  MinecraftBiomeTypes2["LegacyFrozenOcean"] = "minecraft:legacy_frozen_ocean";
  MinecraftBiomeTypes2["LukewarmOcean"] = "minecraft:lukewarm_ocean";
  MinecraftBiomeTypes2["LushCaves"] = "minecraft:lush_caves";
  MinecraftBiomeTypes2["MangroveSwamp"] = "minecraft:mangrove_swamp";
  MinecraftBiomeTypes2["Meadow"] = "minecraft:meadow";
  MinecraftBiomeTypes2["MegaTaiga"] = "minecraft:mega_taiga";
  MinecraftBiomeTypes2["MegaTaigaHills"] = "minecraft:mega_taiga_hills";
  MinecraftBiomeTypes2["Mesa"] = "minecraft:mesa";
  MinecraftBiomeTypes2["MesaBryce"] = "minecraft:mesa_bryce";
  MinecraftBiomeTypes2["MesaPlateau"] = "minecraft:mesa_plateau";
  MinecraftBiomeTypes2["MesaPlateauMutated"] = "minecraft:mesa_plateau_mutated";
  MinecraftBiomeTypes2["MesaPlateauStone"] = "minecraft:mesa_plateau_stone";
  MinecraftBiomeTypes2["MesaPlateauStoneMutated"] = "minecraft:mesa_plateau_stone_mutated";
  MinecraftBiomeTypes2["MushroomIsland"] = "minecraft:mushroom_island";
  MinecraftBiomeTypes2["MushroomIslandShore"] = "minecraft:mushroom_island_shore";
  MinecraftBiomeTypes2["Ocean"] = "minecraft:ocean";
  MinecraftBiomeTypes2["PaleGarden"] = "minecraft:pale_garden";
  MinecraftBiomeTypes2["Plains"] = "minecraft:plains";
  MinecraftBiomeTypes2["RedwoodTaigaHillsMutated"] = "minecraft:redwood_taiga_hills_mutated";
  MinecraftBiomeTypes2["RedwoodTaigaMutated"] = "minecraft:redwood_taiga_mutated";
  MinecraftBiomeTypes2["River"] = "minecraft:river";
  MinecraftBiomeTypes2["RoofedForest"] = "minecraft:roofed_forest";
  MinecraftBiomeTypes2["RoofedForestMutated"] = "minecraft:roofed_forest_mutated";
  MinecraftBiomeTypes2["Savanna"] = "minecraft:savanna";
  MinecraftBiomeTypes2["SavannaMutated"] = "minecraft:savanna_mutated";
  MinecraftBiomeTypes2["SavannaPlateau"] = "minecraft:savanna_plateau";
  MinecraftBiomeTypes2["SavannaPlateauMutated"] = "minecraft:savanna_plateau_mutated";
  MinecraftBiomeTypes2["SnowySlopes"] = "minecraft:snowy_slopes";
  MinecraftBiomeTypes2["SoulsandValley"] = "minecraft:soulsand_valley";
  MinecraftBiomeTypes2["StoneBeach"] = "minecraft:stone_beach";
  MinecraftBiomeTypes2["StonyPeaks"] = "minecraft:stony_peaks";
  MinecraftBiomeTypes2["SunflowerPlains"] = "minecraft:sunflower_plains";
  MinecraftBiomeTypes2["Swampland"] = "minecraft:swampland";
  MinecraftBiomeTypes2["SwamplandMutated"] = "minecraft:swampland_mutated";
  MinecraftBiomeTypes2["Taiga"] = "minecraft:taiga";
  MinecraftBiomeTypes2["TaigaHills"] = "minecraft:taiga_hills";
  MinecraftBiomeTypes2["TaigaMutated"] = "minecraft:taiga_mutated";
  MinecraftBiomeTypes2["TheEnd"] = "minecraft:the_end";
  MinecraftBiomeTypes2["WarmOcean"] = "minecraft:warm_ocean";
  MinecraftBiomeTypes2["WarpedForest"] = "minecraft:warped_forest";
  return MinecraftBiomeTypes2;
})(MinecraftBiomeTypes || {});
var MinecraftBlockTypes = ((MinecraftBlockTypes2) => {
  MinecraftBlockTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftBlockTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftBlockTypes2["AcaciaDoubleSlab"] = "minecraft:acacia_double_slab";
  MinecraftBlockTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftBlockTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftBlockTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftBlockTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftBlockTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftBlockTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftBlockTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftBlockTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftBlockTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftBlockTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftBlockTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftBlockTypes2["AcaciaStandingSign"] = "minecraft:acacia_standing_sign";
  MinecraftBlockTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftBlockTypes2["AcaciaWallSign"] = "minecraft:acacia_wall_sign";
  MinecraftBlockTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftBlockTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftBlockTypes2["Air"] = "minecraft:air";
  MinecraftBlockTypes2["Allium"] = "minecraft:allium";
  MinecraftBlockTypes2["Allow"] = "minecraft:allow";
  MinecraftBlockTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftBlockTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftBlockTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftBlockTypes2["Andesite"] = "minecraft:andesite";
  MinecraftBlockTypes2["AndesiteDoubleSlab"] = "minecraft:andesite_double_slab";
  MinecraftBlockTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftBlockTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftBlockTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftBlockTypes2["Anvil"] = "minecraft:anvil";
  MinecraftBlockTypes2["Azalea"] = "minecraft:azalea";
  MinecraftBlockTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftBlockTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftBlockTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftBlockTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftBlockTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftBlockTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftBlockTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftBlockTypes2["BambooDoubleSlab"] = "minecraft:bamboo_double_slab";
  MinecraftBlockTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftBlockTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftBlockTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftBlockTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftBlockTypes2["BambooMosaicDoubleSlab"] = "minecraft:bamboo_mosaic_double_slab";
  MinecraftBlockTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftBlockTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftBlockTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftBlockTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftBlockTypes2["BambooSapling"] = "minecraft:bamboo_sapling";
  MinecraftBlockTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftBlockTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftBlockTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftBlockTypes2["BambooStandingSign"] = "minecraft:bamboo_standing_sign";
  MinecraftBlockTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftBlockTypes2["BambooWallSign"] = "minecraft:bamboo_wall_sign";
  MinecraftBlockTypes2["Barrel"] = "minecraft:barrel";
  MinecraftBlockTypes2["Barrier"] = "minecraft:barrier";
  MinecraftBlockTypes2["Basalt"] = "minecraft:basalt";
  MinecraftBlockTypes2["Beacon"] = "minecraft:beacon";
  MinecraftBlockTypes2["Bed"] = "minecraft:bed";
  MinecraftBlockTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftBlockTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftBlockTypes2["Beehive"] = "minecraft:beehive";
  MinecraftBlockTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftBlockTypes2["Bell"] = "minecraft:bell";
  MinecraftBlockTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftBlockTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftBlockTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftBlockTypes2["BirchDoubleSlab"] = "minecraft:birch_double_slab";
  MinecraftBlockTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftBlockTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftBlockTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftBlockTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftBlockTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftBlockTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftBlockTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftBlockTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftBlockTypes2["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftBlockTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftBlockTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftBlockTypes2["BirchStandingSign"] = "minecraft:birch_standing_sign";
  MinecraftBlockTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftBlockTypes2["BirchWallSign"] = "minecraft:birch_wall_sign";
  MinecraftBlockTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftBlockTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftBlockTypes2["BlackCandleCake"] = "minecraft:black_candle_cake";
  MinecraftBlockTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftBlockTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftBlockTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftBlockTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftBlockTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftBlockTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftBlockTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftBlockTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftBlockTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftBlockTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftBlockTypes2["BlackstoneDoubleSlab"] = "minecraft:blackstone_double_slab";
  MinecraftBlockTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftBlockTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftBlockTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftBlockTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftBlockTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftBlockTypes2["BlueCandleCake"] = "minecraft:blue_candle_cake";
  MinecraftBlockTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftBlockTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftBlockTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftBlockTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftBlockTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftBlockTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftBlockTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftBlockTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftBlockTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftBlockTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftBlockTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftBlockTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftBlockTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftBlockTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftBlockTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftBlockTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftBlockTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftBlockTypes2["BrainCoralWallFan"] = "minecraft:brain_coral_wall_fan";
  MinecraftBlockTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftBlockTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftBlockTypes2["BrickDoubleSlab"] = "minecraft:brick_double_slab";
  MinecraftBlockTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftBlockTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftBlockTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftBlockTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftBlockTypes2["BrownCandleCake"] = "minecraft:brown_candle_cake";
  MinecraftBlockTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftBlockTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftBlockTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftBlockTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftBlockTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftBlockTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftBlockTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftBlockTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftBlockTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftBlockTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftBlockTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftBlockTypes2["BubbleColumn"] = "minecraft:bubble_column";
  MinecraftBlockTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftBlockTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftBlockTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftBlockTypes2["BubbleCoralWallFan"] = "minecraft:bubble_coral_wall_fan";
  MinecraftBlockTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftBlockTypes2["Bush"] = "minecraft:bush";
  MinecraftBlockTypes2["Cactus"] = "minecraft:cactus";
  MinecraftBlockTypes2["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftBlockTypes2["Cake"] = "minecraft:cake";
  MinecraftBlockTypes2["Calcite"] = "minecraft:calcite";
  MinecraftBlockTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftBlockTypes2["Camera"] = "minecraft:camera";
  MinecraftBlockTypes2["Campfire"] = "minecraft:campfire";
  MinecraftBlockTypes2["Candle"] = "minecraft:candle";
  MinecraftBlockTypes2["CandleCake"] = "minecraft:candle_cake";
  MinecraftBlockTypes2["Carrots"] = "minecraft:carrots";
  MinecraftBlockTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftBlockTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftBlockTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftBlockTypes2["CaveVines"] = "minecraft:cave_vines";
  MinecraftBlockTypes2["CaveVinesBodyWithBerries"] = "minecraft:cave_vines_body_with_berries";
  MinecraftBlockTypes2["CaveVinesHeadWithBerries"] = "minecraft:cave_vines_head_with_berries";
  MinecraftBlockTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftBlockTypes2["ChemicalHeat"] = "minecraft:chemical_heat";
  MinecraftBlockTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftBlockTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftBlockTypes2["CherryDoubleSlab"] = "minecraft:cherry_double_slab";
  MinecraftBlockTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftBlockTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftBlockTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftBlockTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftBlockTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftBlockTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftBlockTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftBlockTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftBlockTypes2["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftBlockTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftBlockTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftBlockTypes2["CherryStandingSign"] = "minecraft:cherry_standing_sign";
  MinecraftBlockTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftBlockTypes2["CherryWallSign"] = "minecraft:cherry_wall_sign";
  MinecraftBlockTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftBlockTypes2["Chest"] = "minecraft:chest";
  MinecraftBlockTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftBlockTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftBlockTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftBlockTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftBlockTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftBlockTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftBlockTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftBlockTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftBlockTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftBlockTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftBlockTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftBlockTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftBlockTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftBlockTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftBlockTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftBlockTypes2["Clay"] = "minecraft:clay";
  MinecraftBlockTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftBlockTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftBlockTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftBlockTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftBlockTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftBlockTypes2["CobbledDeepslateDoubleSlab"] = "minecraft:cobbled_deepslate_double_slab";
  MinecraftBlockTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftBlockTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftBlockTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftBlockTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftBlockTypes2["CobblestoneDoubleSlab"] = "minecraft:cobblestone_double_slab";
  MinecraftBlockTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftBlockTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftBlockTypes2["Cocoa"] = "minecraft:cocoa";
  MinecraftBlockTypes2["ColoredTorchBlue"] = "minecraft:colored_torch_blue";
  MinecraftBlockTypes2["ColoredTorchGreen"] = "minecraft:colored_torch_green";
  MinecraftBlockTypes2["ColoredTorchPurple"] = "minecraft:colored_torch_purple";
  MinecraftBlockTypes2["ColoredTorchRed"] = "minecraft:colored_torch_red";
  MinecraftBlockTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftBlockTypes2["Composter"] = "minecraft:composter";
  MinecraftBlockTypes2["CompoundCreator"] = "minecraft:compound_creator";
  MinecraftBlockTypes2["Conduit"] = "minecraft:conduit";
  MinecraftBlockTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftBlockTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftBlockTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftBlockTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftBlockTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftBlockTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftBlockTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftBlockTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftBlockTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftBlockTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftBlockTypes2["CopperTorch"] = "minecraft:copper_torch";
  MinecraftBlockTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftBlockTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftBlockTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftBlockTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftBlockTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftBlockTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftBlockTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftBlockTypes2["Crafter"] = "minecraft:crafter";
  MinecraftBlockTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftBlockTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftBlockTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftBlockTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftBlockTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftBlockTypes2["CrimsonDoubleSlab"] = "minecraft:crimson_double_slab";
  MinecraftBlockTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftBlockTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftBlockTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftBlockTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftBlockTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftBlockTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftBlockTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftBlockTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftBlockTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftBlockTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftBlockTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftBlockTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftBlockTypes2["CrimsonStandingSign"] = "minecraft:crimson_standing_sign";
  MinecraftBlockTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftBlockTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftBlockTypes2["CrimsonWallSign"] = "minecraft:crimson_wall_sign";
  MinecraftBlockTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftBlockTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftBlockTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftBlockTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftBlockTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftBlockTypes2["CutRedSandstoneDoubleSlab"] = "minecraft:cut_red_sandstone_double_slab";
  MinecraftBlockTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftBlockTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftBlockTypes2["CutSandstoneDoubleSlab"] = "minecraft:cut_sandstone_double_slab";
  MinecraftBlockTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftBlockTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftBlockTypes2["CyanCandleCake"] = "minecraft:cyan_candle_cake";
  MinecraftBlockTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftBlockTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftBlockTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftBlockTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftBlockTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftBlockTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftBlockTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftBlockTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftBlockTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftBlockTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftBlockTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftBlockTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftBlockTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftBlockTypes2["DarkOakDoubleSlab"] = "minecraft:dark_oak_double_slab";
  MinecraftBlockTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftBlockTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftBlockTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftBlockTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftBlockTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftBlockTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftBlockTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftBlockTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftBlockTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftBlockTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftBlockTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftBlockTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftBlockTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftBlockTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftBlockTypes2["DarkPrismarineDoubleSlab"] = "minecraft:dark_prismarine_double_slab";
  MinecraftBlockTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftBlockTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftBlockTypes2["DarkoakStandingSign"] = "minecraft:darkoak_standing_sign";
  MinecraftBlockTypes2["DarkoakWallSign"] = "minecraft:darkoak_wall_sign";
  MinecraftBlockTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftBlockTypes2["DaylightDetectorInverted"] = "minecraft:daylight_detector_inverted";
  MinecraftBlockTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftBlockTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftBlockTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftBlockTypes2["DeadBrainCoralWallFan"] = "minecraft:dead_brain_coral_wall_fan";
  MinecraftBlockTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftBlockTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftBlockTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftBlockTypes2["DeadBubbleCoralWallFan"] = "minecraft:dead_bubble_coral_wall_fan";
  MinecraftBlockTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftBlockTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftBlockTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftBlockTypes2["DeadFireCoralWallFan"] = "minecraft:dead_fire_coral_wall_fan";
  MinecraftBlockTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftBlockTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftBlockTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftBlockTypes2["DeadHornCoralWallFan"] = "minecraft:dead_horn_coral_wall_fan";
  MinecraftBlockTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftBlockTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftBlockTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftBlockTypes2["DeadTubeCoralWallFan"] = "minecraft:dead_tube_coral_wall_fan";
  MinecraftBlockTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftBlockTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftBlockTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftBlockTypes2["DeepslateBrickDoubleSlab"] = "minecraft:deepslate_brick_double_slab";
  MinecraftBlockTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftBlockTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftBlockTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftBlockTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftBlockTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftBlockTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftBlockTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftBlockTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftBlockTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftBlockTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftBlockTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftBlockTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftBlockTypes2["DeepslateTileDoubleSlab"] = "minecraft:deepslate_tile_double_slab";
  MinecraftBlockTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftBlockTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftBlockTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftBlockTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftBlockTypes2["Deny"] = "minecraft:deny";
  MinecraftBlockTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftBlockTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftBlockTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftBlockTypes2["Diorite"] = "minecraft:diorite";
  MinecraftBlockTypes2["DioriteDoubleSlab"] = "minecraft:diorite_double_slab";
  MinecraftBlockTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftBlockTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftBlockTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftBlockTypes2["Dirt"] = "minecraft:dirt";
  MinecraftBlockTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftBlockTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftBlockTypes2["DoubleCutCopperSlab"] = "minecraft:double_cut_copper_slab";
  MinecraftBlockTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftBlockTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftBlockTypes2["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftBlockTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftBlockTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftBlockTypes2["Dropper"] = "minecraft:dropper";
  MinecraftBlockTypes2["Element0"] = "minecraft:element_0";
  MinecraftBlockTypes2["Element1"] = "minecraft:element_1";
  MinecraftBlockTypes2["Element10"] = "minecraft:element_10";
  MinecraftBlockTypes2["Element100"] = "minecraft:element_100";
  MinecraftBlockTypes2["Element101"] = "minecraft:element_101";
  MinecraftBlockTypes2["Element102"] = "minecraft:element_102";
  MinecraftBlockTypes2["Element103"] = "minecraft:element_103";
  MinecraftBlockTypes2["Element104"] = "minecraft:element_104";
  MinecraftBlockTypes2["Element105"] = "minecraft:element_105";
  MinecraftBlockTypes2["Element106"] = "minecraft:element_106";
  MinecraftBlockTypes2["Element107"] = "minecraft:element_107";
  MinecraftBlockTypes2["Element108"] = "minecraft:element_108";
  MinecraftBlockTypes2["Element109"] = "minecraft:element_109";
  MinecraftBlockTypes2["Element11"] = "minecraft:element_11";
  MinecraftBlockTypes2["Element110"] = "minecraft:element_110";
  MinecraftBlockTypes2["Element111"] = "minecraft:element_111";
  MinecraftBlockTypes2["Element112"] = "minecraft:element_112";
  MinecraftBlockTypes2["Element113"] = "minecraft:element_113";
  MinecraftBlockTypes2["Element114"] = "minecraft:element_114";
  MinecraftBlockTypes2["Element115"] = "minecraft:element_115";
  MinecraftBlockTypes2["Element116"] = "minecraft:element_116";
  MinecraftBlockTypes2["Element117"] = "minecraft:element_117";
  MinecraftBlockTypes2["Element118"] = "minecraft:element_118";
  MinecraftBlockTypes2["Element12"] = "minecraft:element_12";
  MinecraftBlockTypes2["Element13"] = "minecraft:element_13";
  MinecraftBlockTypes2["Element14"] = "minecraft:element_14";
  MinecraftBlockTypes2["Element15"] = "minecraft:element_15";
  MinecraftBlockTypes2["Element16"] = "minecraft:element_16";
  MinecraftBlockTypes2["Element17"] = "minecraft:element_17";
  MinecraftBlockTypes2["Element18"] = "minecraft:element_18";
  MinecraftBlockTypes2["Element19"] = "minecraft:element_19";
  MinecraftBlockTypes2["Element2"] = "minecraft:element_2";
  MinecraftBlockTypes2["Element20"] = "minecraft:element_20";
  MinecraftBlockTypes2["Element21"] = "minecraft:element_21";
  MinecraftBlockTypes2["Element22"] = "minecraft:element_22";
  MinecraftBlockTypes2["Element23"] = "minecraft:element_23";
  MinecraftBlockTypes2["Element24"] = "minecraft:element_24";
  MinecraftBlockTypes2["Element25"] = "minecraft:element_25";
  MinecraftBlockTypes2["Element26"] = "minecraft:element_26";
  MinecraftBlockTypes2["Element27"] = "minecraft:element_27";
  MinecraftBlockTypes2["Element28"] = "minecraft:element_28";
  MinecraftBlockTypes2["Element29"] = "minecraft:element_29";
  MinecraftBlockTypes2["Element3"] = "minecraft:element_3";
  MinecraftBlockTypes2["Element30"] = "minecraft:element_30";
  MinecraftBlockTypes2["Element31"] = "minecraft:element_31";
  MinecraftBlockTypes2["Element32"] = "minecraft:element_32";
  MinecraftBlockTypes2["Element33"] = "minecraft:element_33";
  MinecraftBlockTypes2["Element34"] = "minecraft:element_34";
  MinecraftBlockTypes2["Element35"] = "minecraft:element_35";
  MinecraftBlockTypes2["Element36"] = "minecraft:element_36";
  MinecraftBlockTypes2["Element37"] = "minecraft:element_37";
  MinecraftBlockTypes2["Element38"] = "minecraft:element_38";
  MinecraftBlockTypes2["Element39"] = "minecraft:element_39";
  MinecraftBlockTypes2["Element4"] = "minecraft:element_4";
  MinecraftBlockTypes2["Element40"] = "minecraft:element_40";
  MinecraftBlockTypes2["Element41"] = "minecraft:element_41";
  MinecraftBlockTypes2["Element42"] = "minecraft:element_42";
  MinecraftBlockTypes2["Element43"] = "minecraft:element_43";
  MinecraftBlockTypes2["Element44"] = "minecraft:element_44";
  MinecraftBlockTypes2["Element45"] = "minecraft:element_45";
  MinecraftBlockTypes2["Element46"] = "minecraft:element_46";
  MinecraftBlockTypes2["Element47"] = "minecraft:element_47";
  MinecraftBlockTypes2["Element48"] = "minecraft:element_48";
  MinecraftBlockTypes2["Element49"] = "minecraft:element_49";
  MinecraftBlockTypes2["Element5"] = "minecraft:element_5";
  MinecraftBlockTypes2["Element50"] = "minecraft:element_50";
  MinecraftBlockTypes2["Element51"] = "minecraft:element_51";
  MinecraftBlockTypes2["Element52"] = "minecraft:element_52";
  MinecraftBlockTypes2["Element53"] = "minecraft:element_53";
  MinecraftBlockTypes2["Element54"] = "minecraft:element_54";
  MinecraftBlockTypes2["Element55"] = "minecraft:element_55";
  MinecraftBlockTypes2["Element56"] = "minecraft:element_56";
  MinecraftBlockTypes2["Element57"] = "minecraft:element_57";
  MinecraftBlockTypes2["Element58"] = "minecraft:element_58";
  MinecraftBlockTypes2["Element59"] = "minecraft:element_59";
  MinecraftBlockTypes2["Element6"] = "minecraft:element_6";
  MinecraftBlockTypes2["Element60"] = "minecraft:element_60";
  MinecraftBlockTypes2["Element61"] = "minecraft:element_61";
  MinecraftBlockTypes2["Element62"] = "minecraft:element_62";
  MinecraftBlockTypes2["Element63"] = "minecraft:element_63";
  MinecraftBlockTypes2["Element64"] = "minecraft:element_64";
  MinecraftBlockTypes2["Element65"] = "minecraft:element_65";
  MinecraftBlockTypes2["Element66"] = "minecraft:element_66";
  MinecraftBlockTypes2["Element67"] = "minecraft:element_67";
  MinecraftBlockTypes2["Element68"] = "minecraft:element_68";
  MinecraftBlockTypes2["Element69"] = "minecraft:element_69";
  MinecraftBlockTypes2["Element7"] = "minecraft:element_7";
  MinecraftBlockTypes2["Element70"] = "minecraft:element_70";
  MinecraftBlockTypes2["Element71"] = "minecraft:element_71";
  MinecraftBlockTypes2["Element72"] = "minecraft:element_72";
  MinecraftBlockTypes2["Element73"] = "minecraft:element_73";
  MinecraftBlockTypes2["Element74"] = "minecraft:element_74";
  MinecraftBlockTypes2["Element75"] = "minecraft:element_75";
  MinecraftBlockTypes2["Element76"] = "minecraft:element_76";
  MinecraftBlockTypes2["Element77"] = "minecraft:element_77";
  MinecraftBlockTypes2["Element78"] = "minecraft:element_78";
  MinecraftBlockTypes2["Element79"] = "minecraft:element_79";
  MinecraftBlockTypes2["Element8"] = "minecraft:element_8";
  MinecraftBlockTypes2["Element80"] = "minecraft:element_80";
  MinecraftBlockTypes2["Element81"] = "minecraft:element_81";
  MinecraftBlockTypes2["Element82"] = "minecraft:element_82";
  MinecraftBlockTypes2["Element83"] = "minecraft:element_83";
  MinecraftBlockTypes2["Element84"] = "minecraft:element_84";
  MinecraftBlockTypes2["Element85"] = "minecraft:element_85";
  MinecraftBlockTypes2["Element86"] = "minecraft:element_86";
  MinecraftBlockTypes2["Element87"] = "minecraft:element_87";
  MinecraftBlockTypes2["Element88"] = "minecraft:element_88";
  MinecraftBlockTypes2["Element89"] = "minecraft:element_89";
  MinecraftBlockTypes2["Element9"] = "minecraft:element_9";
  MinecraftBlockTypes2["Element90"] = "minecraft:element_90";
  MinecraftBlockTypes2["Element91"] = "minecraft:element_91";
  MinecraftBlockTypes2["Element92"] = "minecraft:element_92";
  MinecraftBlockTypes2["Element93"] = "minecraft:element_93";
  MinecraftBlockTypes2["Element94"] = "minecraft:element_94";
  MinecraftBlockTypes2["Element95"] = "minecraft:element_95";
  MinecraftBlockTypes2["Element96"] = "minecraft:element_96";
  MinecraftBlockTypes2["Element97"] = "minecraft:element_97";
  MinecraftBlockTypes2["Element98"] = "minecraft:element_98";
  MinecraftBlockTypes2["Element99"] = "minecraft:element_99";
  MinecraftBlockTypes2["ElementConstructor"] = "minecraft:element_constructor";
  MinecraftBlockTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftBlockTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftBlockTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftBlockTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftBlockTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftBlockTypes2["EndPortal"] = "minecraft:end_portal";
  MinecraftBlockTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftBlockTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftBlockTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftBlockTypes2["EndStoneBrickDoubleSlab"] = "minecraft:end_stone_brick_double_slab";
  MinecraftBlockTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftBlockTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftBlockTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftBlockTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftBlockTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftBlockTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftBlockTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftBlockTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftBlockTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftBlockTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftBlockTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftBlockTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftBlockTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftBlockTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftBlockTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftBlockTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftBlockTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftBlockTypes2["ExposedDoubleCutCopperSlab"] = "minecraft:exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftBlockTypes2["Farmland"] = "minecraft:farmland";
  MinecraftBlockTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftBlockTypes2["Fern"] = "minecraft:fern";
  MinecraftBlockTypes2["Fire"] = "minecraft:fire";
  MinecraftBlockTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftBlockTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftBlockTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftBlockTypes2["FireCoralWallFan"] = "minecraft:fire_coral_wall_fan";
  MinecraftBlockTypes2["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftBlockTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftBlockTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftBlockTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftBlockTypes2["FlowingLava"] = "minecraft:flowing_lava";
  MinecraftBlockTypes2["FlowingWater"] = "minecraft:flowing_water";
  MinecraftBlockTypes2["Frame"] = "minecraft:frame";
  MinecraftBlockTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftBlockTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftBlockTypes2["Furnace"] = "minecraft:furnace";
  MinecraftBlockTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftBlockTypes2["Glass"] = "minecraft:glass";
  MinecraftBlockTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftBlockTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftBlockTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftBlockTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftBlockTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftBlockTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftBlockTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftBlockTypes2["Granite"] = "minecraft:granite";
  MinecraftBlockTypes2["GraniteDoubleSlab"] = "minecraft:granite_double_slab";
  MinecraftBlockTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftBlockTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftBlockTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftBlockTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftBlockTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftBlockTypes2["Gravel"] = "minecraft:gravel";
  MinecraftBlockTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftBlockTypes2["GrayCandleCake"] = "minecraft:gray_candle_cake";
  MinecraftBlockTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftBlockTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftBlockTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftBlockTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftBlockTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftBlockTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftBlockTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftBlockTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftBlockTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftBlockTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftBlockTypes2["GreenCandleCake"] = "minecraft:green_candle_cake";
  MinecraftBlockTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftBlockTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftBlockTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftBlockTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftBlockTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftBlockTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftBlockTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftBlockTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftBlockTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftBlockTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftBlockTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftBlockTypes2["HardBlackStainedGlass"] = "minecraft:hard_black_stained_glass";
  MinecraftBlockTypes2["HardBlackStainedGlassPane"] = "minecraft:hard_black_stained_glass_pane";
  MinecraftBlockTypes2["HardBlueStainedGlass"] = "minecraft:hard_blue_stained_glass";
  MinecraftBlockTypes2["HardBlueStainedGlassPane"] = "minecraft:hard_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardBrownStainedGlass"] = "minecraft:hard_brown_stained_glass";
  MinecraftBlockTypes2["HardBrownStainedGlassPane"] = "minecraft:hard_brown_stained_glass_pane";
  MinecraftBlockTypes2["HardCyanStainedGlass"] = "minecraft:hard_cyan_stained_glass";
  MinecraftBlockTypes2["HardCyanStainedGlassPane"] = "minecraft:hard_cyan_stained_glass_pane";
  MinecraftBlockTypes2["HardGlass"] = "minecraft:hard_glass";
  MinecraftBlockTypes2["HardGlassPane"] = "minecraft:hard_glass_pane";
  MinecraftBlockTypes2["HardGrayStainedGlass"] = "minecraft:hard_gray_stained_glass";
  MinecraftBlockTypes2["HardGrayStainedGlassPane"] = "minecraft:hard_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardGreenStainedGlass"] = "minecraft:hard_green_stained_glass";
  MinecraftBlockTypes2["HardGreenStainedGlassPane"] = "minecraft:hard_green_stained_glass_pane";
  MinecraftBlockTypes2["HardLightBlueStainedGlass"] = "minecraft:hard_light_blue_stained_glass";
  MinecraftBlockTypes2["HardLightBlueStainedGlassPane"] = "minecraft:hard_light_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardLightGrayStainedGlass"] = "minecraft:hard_light_gray_stained_glass";
  MinecraftBlockTypes2["HardLightGrayStainedGlassPane"] = "minecraft:hard_light_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardLimeStainedGlass"] = "minecraft:hard_lime_stained_glass";
  MinecraftBlockTypes2["HardLimeStainedGlassPane"] = "minecraft:hard_lime_stained_glass_pane";
  MinecraftBlockTypes2["HardMagentaStainedGlass"] = "minecraft:hard_magenta_stained_glass";
  MinecraftBlockTypes2["HardMagentaStainedGlassPane"] = "minecraft:hard_magenta_stained_glass_pane";
  MinecraftBlockTypes2["HardOrangeStainedGlass"] = "minecraft:hard_orange_stained_glass";
  MinecraftBlockTypes2["HardOrangeStainedGlassPane"] = "minecraft:hard_orange_stained_glass_pane";
  MinecraftBlockTypes2["HardPinkStainedGlass"] = "minecraft:hard_pink_stained_glass";
  MinecraftBlockTypes2["HardPinkStainedGlassPane"] = "minecraft:hard_pink_stained_glass_pane";
  MinecraftBlockTypes2["HardPurpleStainedGlass"] = "minecraft:hard_purple_stained_glass";
  MinecraftBlockTypes2["HardPurpleStainedGlassPane"] = "minecraft:hard_purple_stained_glass_pane";
  MinecraftBlockTypes2["HardRedStainedGlass"] = "minecraft:hard_red_stained_glass";
  MinecraftBlockTypes2["HardRedStainedGlassPane"] = "minecraft:hard_red_stained_glass_pane";
  MinecraftBlockTypes2["HardWhiteStainedGlass"] = "minecraft:hard_white_stained_glass";
  MinecraftBlockTypes2["HardWhiteStainedGlassPane"] = "minecraft:hard_white_stained_glass_pane";
  MinecraftBlockTypes2["HardYellowStainedGlass"] = "minecraft:hard_yellow_stained_glass";
  MinecraftBlockTypes2["HardYellowStainedGlassPane"] = "minecraft:hard_yellow_stained_glass_pane";
  MinecraftBlockTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftBlockTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftBlockTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftBlockTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftBlockTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftBlockTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftBlockTypes2["Hopper"] = "minecraft:hopper";
  MinecraftBlockTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftBlockTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftBlockTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftBlockTypes2["HornCoralWallFan"] = "minecraft:horn_coral_wall_fan";
  MinecraftBlockTypes2["Ice"] = "minecraft:ice";
  MinecraftBlockTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftBlockTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftBlockTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftBlockTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftBlockTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftBlockTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftBlockTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftBlockTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftBlockTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftBlockTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftBlockTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftBlockTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftBlockTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftBlockTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftBlockTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftBlockTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftBlockTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftBlockTypes2["JungleDoubleSlab"] = "minecraft:jungle_double_slab";
  MinecraftBlockTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftBlockTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftBlockTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftBlockTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftBlockTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftBlockTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftBlockTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftBlockTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftBlockTypes2["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftBlockTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftBlockTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftBlockTypes2["JungleStandingSign"] = "minecraft:jungle_standing_sign";
  MinecraftBlockTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftBlockTypes2["JungleWallSign"] = "minecraft:jungle_wall_sign";
  MinecraftBlockTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftBlockTypes2["Kelp"] = "minecraft:kelp";
  MinecraftBlockTypes2["LabTable"] = "minecraft:lab_table";
  MinecraftBlockTypes2["Ladder"] = "minecraft:ladder";
  MinecraftBlockTypes2["Lantern"] = "minecraft:lantern";
  MinecraftBlockTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftBlockTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftBlockTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftBlockTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftBlockTypes2["Lava"] = "minecraft:lava";
  MinecraftBlockTypes2["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftBlockTypes2["Lectern"] = "minecraft:lectern";
  MinecraftBlockTypes2["Lever"] = "minecraft:lever";
  MinecraftBlockTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftBlockTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftBlockTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftBlockTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftBlockTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftBlockTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftBlockTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftBlockTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftBlockTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftBlockTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftBlockTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftBlockTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftBlockTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftBlockTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftBlockTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftBlockTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftBlockTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftBlockTypes2["LightBlueCandleCake"] = "minecraft:light_blue_candle_cake";
  MinecraftBlockTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftBlockTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftBlockTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftBlockTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftBlockTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftBlockTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftBlockTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftBlockTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftBlockTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftBlockTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftBlockTypes2["LightGrayCandleCake"] = "minecraft:light_gray_candle_cake";
  MinecraftBlockTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftBlockTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftBlockTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftBlockTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftBlockTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftBlockTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftBlockTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftBlockTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftBlockTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftBlockTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftBlockTypes2["Lilac"] = "minecraft:lilac";
  MinecraftBlockTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftBlockTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftBlockTypes2["LimeCandleCake"] = "minecraft:lime_candle_cake";
  MinecraftBlockTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftBlockTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftBlockTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftBlockTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftBlockTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftBlockTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftBlockTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftBlockTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftBlockTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftBlockTypes2["LitBlastFurnace"] = "minecraft:lit_blast_furnace";
  MinecraftBlockTypes2["LitDeepslateRedstoneOre"] = "minecraft:lit_deepslate_redstone_ore";
  MinecraftBlockTypes2["LitFurnace"] = "minecraft:lit_furnace";
  MinecraftBlockTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftBlockTypes2["LitRedstoneLamp"] = "minecraft:lit_redstone_lamp";
  MinecraftBlockTypes2["LitRedstoneOre"] = "minecraft:lit_redstone_ore";
  MinecraftBlockTypes2["LitSmoker"] = "minecraft:lit_smoker";
  MinecraftBlockTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftBlockTypes2["Loom"] = "minecraft:loom";
  MinecraftBlockTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftBlockTypes2["MagentaCandleCake"] = "minecraft:magenta_candle_cake";
  MinecraftBlockTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftBlockTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftBlockTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftBlockTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftBlockTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftBlockTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftBlockTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftBlockTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftBlockTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftBlockTypes2["Magma"] = "minecraft:magma";
  MinecraftBlockTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftBlockTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftBlockTypes2["MangroveDoubleSlab"] = "minecraft:mangrove_double_slab";
  MinecraftBlockTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftBlockTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftBlockTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftBlockTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftBlockTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftBlockTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftBlockTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftBlockTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftBlockTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftBlockTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftBlockTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftBlockTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftBlockTypes2["MangroveStandingSign"] = "minecraft:mangrove_standing_sign";
  MinecraftBlockTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftBlockTypes2["MangroveWallSign"] = "minecraft:mangrove_wall_sign";
  MinecraftBlockTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftBlockTypes2["MaterialReducer"] = "minecraft:material_reducer";
  MinecraftBlockTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftBlockTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftBlockTypes2["MelonStem"] = "minecraft:melon_stem";
  MinecraftBlockTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftBlockTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftBlockTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftBlockTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftBlockTypes2["MossyCobblestoneDoubleSlab"] = "minecraft:mossy_cobblestone_double_slab";
  MinecraftBlockTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftBlockTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftBlockTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftBlockTypes2["MossyStoneBrickDoubleSlab"] = "minecraft:mossy_stone_brick_double_slab";
  MinecraftBlockTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftBlockTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftBlockTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftBlockTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftBlockTypes2["Mud"] = "minecraft:mud";
  MinecraftBlockTypes2["MudBrickDoubleSlab"] = "minecraft:mud_brick_double_slab";
  MinecraftBlockTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftBlockTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftBlockTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftBlockTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftBlockTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftBlockTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftBlockTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftBlockTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftBlockTypes2["NetherBrickDoubleSlab"] = "minecraft:nether_brick_double_slab";
  MinecraftBlockTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftBlockTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftBlockTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftBlockTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftBlockTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftBlockTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftBlockTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftBlockTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftBlockTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftBlockTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftBlockTypes2["NormalStoneDoubleSlab"] = "minecraft:normal_stone_double_slab";
  MinecraftBlockTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftBlockTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftBlockTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftBlockTypes2["OakDoubleSlab"] = "minecraft:oak_double_slab";
  MinecraftBlockTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftBlockTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftBlockTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftBlockTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftBlockTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftBlockTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftBlockTypes2["OakShelf"] = "minecraft:oak_shelf";
  MinecraftBlockTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftBlockTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftBlockTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftBlockTypes2["Observer"] = "minecraft:observer";
  MinecraftBlockTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftBlockTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftBlockTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftBlockTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftBlockTypes2["OrangeCandleCake"] = "minecraft:orange_candle_cake";
  MinecraftBlockTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftBlockTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftBlockTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftBlockTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftBlockTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftBlockTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftBlockTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftBlockTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftBlockTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftBlockTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftBlockTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftBlockTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftBlockTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftBlockTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftBlockTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftBlockTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftBlockTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftBlockTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftBlockTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftBlockTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftBlockTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftBlockTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftBlockTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftBlockTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["OxidizedDoubleCutCopperSlab"] = "minecraft:oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftBlockTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftBlockTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftBlockTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftBlockTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftBlockTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftBlockTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftBlockTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftBlockTypes2["PaleOakDoubleSlab"] = "minecraft:pale_oak_double_slab";
  MinecraftBlockTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftBlockTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftBlockTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftBlockTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftBlockTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftBlockTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftBlockTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftBlockTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftBlockTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftBlockTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftBlockTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftBlockTypes2["PaleOakStandingSign"] = "minecraft:pale_oak_standing_sign";
  MinecraftBlockTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftBlockTypes2["PaleOakWallSign"] = "minecraft:pale_oak_wall_sign";
  MinecraftBlockTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftBlockTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftBlockTypes2["Peony"] = "minecraft:peony";
  MinecraftBlockTypes2["PetrifiedOakDoubleSlab"] = "minecraft:petrified_oak_double_slab";
  MinecraftBlockTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftBlockTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftBlockTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftBlockTypes2["PinkCandleCake"] = "minecraft:pink_candle_cake";
  MinecraftBlockTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftBlockTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftBlockTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftBlockTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftBlockTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftBlockTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftBlockTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftBlockTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftBlockTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftBlockTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftBlockTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftBlockTypes2["Piston"] = "minecraft:piston";
  MinecraftBlockTypes2["PistonArmCollision"] = "minecraft:piston_arm_collision";
  MinecraftBlockTypes2["PitcherCrop"] = "minecraft:pitcher_crop";
  MinecraftBlockTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftBlockTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftBlockTypes2["Podzol"] = "minecraft:podzol";
  MinecraftBlockTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftBlockTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftBlockTypes2["PolishedAndesiteDoubleSlab"] = "minecraft:polished_andesite_double_slab";
  MinecraftBlockTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftBlockTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftBlockTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftBlockTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftBlockTypes2["PolishedBlackstoneBrickDoubleSlab"] = "minecraft:polished_blackstone_brick_double_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftBlockTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftBlockTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftBlockTypes2["PolishedBlackstoneDoubleSlab"] = "minecraft:polished_blackstone_double_slab";
  MinecraftBlockTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftBlockTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftBlockTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftBlockTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftBlockTypes2["PolishedDeepslateDoubleSlab"] = "minecraft:polished_deepslate_double_slab";
  MinecraftBlockTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftBlockTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftBlockTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftBlockTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftBlockTypes2["PolishedDioriteDoubleSlab"] = "minecraft:polished_diorite_double_slab";
  MinecraftBlockTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftBlockTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftBlockTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftBlockTypes2["PolishedGraniteDoubleSlab"] = "minecraft:polished_granite_double_slab";
  MinecraftBlockTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftBlockTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftBlockTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftBlockTypes2["PolishedTuffDoubleSlab"] = "minecraft:polished_tuff_double_slab";
  MinecraftBlockTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftBlockTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftBlockTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftBlockTypes2["Poppy"] = "minecraft:poppy";
  MinecraftBlockTypes2["Portal"] = "minecraft:portal";
  MinecraftBlockTypes2["Potatoes"] = "minecraft:potatoes";
  MinecraftBlockTypes2["PowderSnow"] = "minecraft:powder_snow";
  MinecraftBlockTypes2["PoweredComparator"] = "minecraft:powered_comparator";
  MinecraftBlockTypes2["PoweredRepeater"] = "minecraft:powered_repeater";
  MinecraftBlockTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftBlockTypes2["PrismarineBrickDoubleSlab"] = "minecraft:prismarine_brick_double_slab";
  MinecraftBlockTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftBlockTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftBlockTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftBlockTypes2["PrismarineDoubleSlab"] = "minecraft:prismarine_double_slab";
  MinecraftBlockTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftBlockTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftBlockTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftBlockTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftBlockTypes2["PumpkinStem"] = "minecraft:pumpkin_stem";
  MinecraftBlockTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftBlockTypes2["PurpleCandleCake"] = "minecraft:purple_candle_cake";
  MinecraftBlockTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftBlockTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftBlockTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftBlockTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftBlockTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftBlockTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftBlockTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftBlockTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftBlockTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftBlockTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftBlockTypes2["PurpurDoubleSlab"] = "minecraft:purpur_double_slab";
  MinecraftBlockTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftBlockTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftBlockTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftBlockTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftBlockTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftBlockTypes2["QuartzDoubleSlab"] = "minecraft:quartz_double_slab";
  MinecraftBlockTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftBlockTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftBlockTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftBlockTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftBlockTypes2["Rail"] = "minecraft:rail";
  MinecraftBlockTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftBlockTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftBlockTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftBlockTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftBlockTypes2["RedCandleCake"] = "minecraft:red_candle_cake";
  MinecraftBlockTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftBlockTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftBlockTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftBlockTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftBlockTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftBlockTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftBlockTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftBlockTypes2["RedNetherBrickDoubleSlab"] = "minecraft:red_nether_brick_double_slab";
  MinecraftBlockTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftBlockTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftBlockTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftBlockTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftBlockTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftBlockTypes2["RedSandstoneDoubleSlab"] = "minecraft:red_sandstone_double_slab";
  MinecraftBlockTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftBlockTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftBlockTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftBlockTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftBlockTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftBlockTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftBlockTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftBlockTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftBlockTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftBlockTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftBlockTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftBlockTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftBlockTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftBlockTypes2["RedstoneWire"] = "minecraft:redstone_wire";
  MinecraftBlockTypes2["Reeds"] = "minecraft:reeds";
  MinecraftBlockTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftBlockTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftBlockTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftBlockTypes2["ResinBrickDoubleSlab"] = "minecraft:resin_brick_double_slab";
  MinecraftBlockTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftBlockTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftBlockTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftBlockTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftBlockTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftBlockTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftBlockTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftBlockTypes2["Sand"] = "minecraft:sand";
  MinecraftBlockTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftBlockTypes2["SandstoneDoubleSlab"] = "minecraft:sandstone_double_slab";
  MinecraftBlockTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftBlockTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftBlockTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftBlockTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftBlockTypes2["Sculk"] = "minecraft:sculk";
  MinecraftBlockTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftBlockTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftBlockTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftBlockTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftBlockTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftBlockTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftBlockTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftBlockTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftBlockTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftBlockTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftBlockTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftBlockTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftBlockTypes2["Slime"] = "minecraft:slime";
  MinecraftBlockTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftBlockTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftBlockTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftBlockTypes2["Smoker"] = "minecraft:smoker";
  MinecraftBlockTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftBlockTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftBlockTypes2["SmoothQuartzDoubleSlab"] = "minecraft:smooth_quartz_double_slab";
  MinecraftBlockTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftBlockTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftBlockTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftBlockTypes2["SmoothRedSandstoneDoubleSlab"] = "minecraft:smooth_red_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftBlockTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftBlockTypes2["SmoothSandstoneDoubleSlab"] = "minecraft:smooth_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftBlockTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftBlockTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftBlockTypes2["SmoothStoneDoubleSlab"] = "minecraft:smooth_stone_double_slab";
  MinecraftBlockTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftBlockTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftBlockTypes2["Snow"] = "minecraft:snow";
  MinecraftBlockTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftBlockTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftBlockTypes2["SoulFire"] = "minecraft:soul_fire";
  MinecraftBlockTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftBlockTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftBlockTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftBlockTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftBlockTypes2["Sponge"] = "minecraft:sponge";
  MinecraftBlockTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftBlockTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftBlockTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftBlockTypes2["SpruceDoubleSlab"] = "minecraft:spruce_double_slab";
  MinecraftBlockTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftBlockTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftBlockTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftBlockTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftBlockTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftBlockTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftBlockTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftBlockTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftBlockTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftBlockTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftBlockTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftBlockTypes2["SpruceStandingSign"] = "minecraft:spruce_standing_sign";
  MinecraftBlockTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftBlockTypes2["SpruceWallSign"] = "minecraft:spruce_wall_sign";
  MinecraftBlockTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftBlockTypes2["StandingBanner"] = "minecraft:standing_banner";
  MinecraftBlockTypes2["StandingSign"] = "minecraft:standing_sign";
  MinecraftBlockTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftBlockTypes2["StickyPistonArmCollision"] = "minecraft:sticky_piston_arm_collision";
  MinecraftBlockTypes2["Stone"] = "minecraft:stone";
  MinecraftBlockTypes2["StoneBrickDoubleSlab"] = "minecraft:stone_brick_double_slab";
  MinecraftBlockTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftBlockTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftBlockTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftBlockTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftBlockTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftBlockTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftBlockTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftBlockTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftBlockTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftBlockTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftBlockTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftBlockTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftBlockTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftBlockTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftBlockTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftBlockTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftBlockTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftBlockTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftBlockTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftBlockTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftBlockTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftBlockTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftBlockTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftBlockTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftBlockTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftBlockTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftBlockTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftBlockTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftBlockTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftBlockTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftBlockTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftBlockTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftBlockTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftBlockTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftBlockTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftBlockTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftBlockTypes2["SweetBerryBush"] = "minecraft:sweet_berry_bush";
  MinecraftBlockTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftBlockTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftBlockTypes2["Target"] = "minecraft:target";
  MinecraftBlockTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftBlockTypes2["Tnt"] = "minecraft:tnt";
  MinecraftBlockTypes2["Torch"] = "minecraft:torch";
  MinecraftBlockTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftBlockTypes2["TorchflowerCrop"] = "minecraft:torchflower_crop";
  MinecraftBlockTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftBlockTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftBlockTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftBlockTypes2["TripWire"] = "minecraft:trip_wire";
  MinecraftBlockTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftBlockTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftBlockTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftBlockTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftBlockTypes2["TubeCoralWallFan"] = "minecraft:tube_coral_wall_fan";
  MinecraftBlockTypes2["Tuff"] = "minecraft:tuff";
  MinecraftBlockTypes2["TuffBrickDoubleSlab"] = "minecraft:tuff_brick_double_slab";
  MinecraftBlockTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftBlockTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftBlockTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftBlockTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftBlockTypes2["TuffDoubleSlab"] = "minecraft:tuff_double_slab";
  MinecraftBlockTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftBlockTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftBlockTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftBlockTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftBlockTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftBlockTypes2["UnderwaterTnt"] = "minecraft:underwater_tnt";
  MinecraftBlockTypes2["UnderwaterTorch"] = "minecraft:underwater_torch";
  MinecraftBlockTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftBlockTypes2["Unknown"] = "minecraft:unknown";
  MinecraftBlockTypes2["UnlitRedstoneTorch"] = "minecraft:unlit_redstone_torch";
  MinecraftBlockTypes2["UnpoweredComparator"] = "minecraft:unpowered_comparator";
  MinecraftBlockTypes2["UnpoweredRepeater"] = "minecraft:unpowered_repeater";
  MinecraftBlockTypes2["Vault"] = "minecraft:vault";
  MinecraftBlockTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftBlockTypes2["Vine"] = "minecraft:vine";
  MinecraftBlockTypes2["WallBanner"] = "minecraft:wall_banner";
  MinecraftBlockTypes2["WallSign"] = "minecraft:wall_sign";
  MinecraftBlockTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftBlockTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftBlockTypes2["WarpedDoubleSlab"] = "minecraft:warped_double_slab";
  MinecraftBlockTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftBlockTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftBlockTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftBlockTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftBlockTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftBlockTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftBlockTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftBlockTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftBlockTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftBlockTypes2["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftBlockTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftBlockTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftBlockTypes2["WarpedStandingSign"] = "minecraft:warped_standing_sign";
  MinecraftBlockTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftBlockTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftBlockTypes2["WarpedWallSign"] = "minecraft:warped_wall_sign";
  MinecraftBlockTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftBlockTypes2["Water"] = "minecraft:water";
  MinecraftBlockTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftBlockTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftBlockTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftBlockTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftBlockTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftBlockTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftBlockTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftBlockTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftBlockTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftBlockTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftBlockTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftBlockTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedDoubleCutCopperSlab"] = "minecraft:waxed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftBlockTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftBlockTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftBlockTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftBlockTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftBlockTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftBlockTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftBlockTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftBlockTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftBlockTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftBlockTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedExposedDoubleCutCopperSlab"] = "minecraft:waxed_exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftBlockTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftBlockTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftBlockTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftBlockTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftBlockTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftBlockTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftBlockTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftBlockTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftBlockTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftBlockTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftBlockTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedOxidizedDoubleCutCopperSlab"] = "minecraft:waxed_oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftBlockTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftBlockTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftBlockTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftBlockTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftBlockTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftBlockTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftBlockTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftBlockTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftBlockTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftBlockTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedWeatheredDoubleCutCopperSlab"] = "minecraft:waxed_weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftBlockTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftBlockTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftBlockTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftBlockTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftBlockTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftBlockTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftBlockTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftBlockTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftBlockTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftBlockTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftBlockTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftBlockTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftBlockTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WeatheredDoubleCutCopperSlab"] = "minecraft:weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftBlockTypes2["Web"] = "minecraft:web";
  MinecraftBlockTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftBlockTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftBlockTypes2["Wheat"] = "minecraft:wheat";
  MinecraftBlockTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftBlockTypes2["WhiteCandleCake"] = "minecraft:white_candle_cake";
  MinecraftBlockTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftBlockTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftBlockTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftBlockTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftBlockTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftBlockTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftBlockTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftBlockTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftBlockTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftBlockTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftBlockTypes2["Wildflowers"] = "minecraft:wildflowers";
  MinecraftBlockTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftBlockTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftBlockTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftBlockTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftBlockTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftBlockTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftBlockTypes2["YellowCandleCake"] = "minecraft:yellow_candle_cake";
  MinecraftBlockTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftBlockTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftBlockTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftBlockTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftBlockTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftBlockTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftBlockTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftBlockTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftBlockTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftBlockTypes2["ZombieHead"] = "minecraft:zombie_head";
  return MinecraftBlockTypes2;
})(MinecraftBlockTypes || {});
var MinecraftCameraPresetsTypes = ((MinecraftCameraPresetsTypes2) => {
  MinecraftCameraPresetsTypes2["ControlSchemeCamera"] = "minecraft:control_scheme_camera";
  MinecraftCameraPresetsTypes2["FirstPerson"] = "minecraft:first_person";
  MinecraftCameraPresetsTypes2["FixedBoom"] = "minecraft:fixed_boom";
  MinecraftCameraPresetsTypes2["FollowOrbit"] = "minecraft:follow_orbit";
  MinecraftCameraPresetsTypes2["Free"] = "minecraft:free";
  MinecraftCameraPresetsTypes2["ThirdPerson"] = "minecraft:third_person";
  MinecraftCameraPresetsTypes2["ThirdPersonFront"] = "minecraft:third_person_front";
  return MinecraftCameraPresetsTypes2;
})(MinecraftCameraPresetsTypes || {});
var MinecraftCooldownCategoryTypes = ((MinecraftCooldownCategoryTypes2) => {
  MinecraftCooldownCategoryTypes2["Chorusfruit"] = "minecraft:chorusfruit";
  MinecraftCooldownCategoryTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftCooldownCategoryTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftCooldownCategoryTypes2["Shield"] = "minecraft:shield";
  MinecraftCooldownCategoryTypes2["Spear"] = "minecraft:spear";
  MinecraftCooldownCategoryTypes2["WindCharge"] = "minecraft:wind_charge";
  return MinecraftCooldownCategoryTypes2;
})(MinecraftCooldownCategoryTypes || {});
var MinecraftDimensionTypes = ((MinecraftDimensionTypes2) => {
  MinecraftDimensionTypes2["Nether"] = "minecraft:nether";
  MinecraftDimensionTypes2["Overworld"] = "minecraft:overworld";
  MinecraftDimensionTypes2["TheEnd"] = "minecraft:the_end";
  return MinecraftDimensionTypes2;
})(MinecraftDimensionTypes || {});
var MinecraftEffectTypes = ((MinecraftEffectTypes2) => {
  MinecraftEffectTypes2["Absorption"] = "minecraft:absorption";
  MinecraftEffectTypes2["BadOmen"] = "minecraft:bad_omen";
  MinecraftEffectTypes2["Blindness"] = "minecraft:blindness";
  MinecraftEffectTypes2["BreathOfTheNautilus"] = "minecraft:breath_of_the_nautilus";
  MinecraftEffectTypes2["ConduitPower"] = "minecraft:conduit_power";
  MinecraftEffectTypes2["Darkness"] = "minecraft:darkness";
  MinecraftEffectTypes2["FatalPoison"] = "minecraft:fatal_poison";
  MinecraftEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftEffectTypes2["Haste"] = "minecraft:haste";
  MinecraftEffectTypes2["HealthBoost"] = "minecraft:health_boost";
  MinecraftEffectTypes2["Hunger"] = "minecraft:hunger";
  MinecraftEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftEffectTypes2["InstantDamage"] = "minecraft:instant_damage";
  MinecraftEffectTypes2["InstantHealth"] = "minecraft:instant_health";
  MinecraftEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftEffectTypes2["JumpBoost"] = "minecraft:jump_boost";
  MinecraftEffectTypes2["Levitation"] = "minecraft:levitation";
  MinecraftEffectTypes2["MiningFatigue"] = "minecraft:mining_fatigue";
  MinecraftEffectTypes2["Nausea"] = "minecraft:nausea";
  MinecraftEffectTypes2["NightVision"] = "minecraft:night_vision";
  MinecraftEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftEffectTypes2["RaidOmen"] = "minecraft:raid_omen";
  MinecraftEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftEffectTypes2["Resistance"] = "minecraft:resistance";
  MinecraftEffectTypes2["Saturation"] = "minecraft:saturation";
  MinecraftEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftEffectTypes2["Speed"] = "minecraft:speed";
  MinecraftEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftEffectTypes2["TrialOmen"] = "minecraft:trial_omen";
  MinecraftEffectTypes2["VillageHero"] = "minecraft:village_hero";
  MinecraftEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftEffectTypes2;
})(MinecraftEffectTypes || {});
var MinecraftEnchantmentTypes = ((MinecraftEnchantmentTypes2) => {
  MinecraftEnchantmentTypes2["AquaAffinity"] = "minecraft:aqua_affinity";
  MinecraftEnchantmentTypes2["BaneOfArthropods"] = "minecraft:bane_of_arthropods";
  MinecraftEnchantmentTypes2["Binding"] = "minecraft:binding";
  MinecraftEnchantmentTypes2["BlastProtection"] = "minecraft:blast_protection";
  MinecraftEnchantmentTypes2["BowInfinity"] = "minecraft:infinity";
  MinecraftEnchantmentTypes2["Breach"] = "minecraft:breach";
  MinecraftEnchantmentTypes2["Channeling"] = "minecraft:channeling";
  MinecraftEnchantmentTypes2["Density"] = "minecraft:density";
  MinecraftEnchantmentTypes2["DepthStrider"] = "minecraft:depth_strider";
  MinecraftEnchantmentTypes2["Efficiency"] = "minecraft:efficiency";
  MinecraftEnchantmentTypes2["FeatherFalling"] = "minecraft:feather_falling";
  MinecraftEnchantmentTypes2["FireAspect"] = "minecraft:fire_aspect";
  MinecraftEnchantmentTypes2["FireProtection"] = "minecraft:fire_protection";
  MinecraftEnchantmentTypes2["Flame"] = "minecraft:flame";
  MinecraftEnchantmentTypes2["Fortune"] = "minecraft:fortune";
  MinecraftEnchantmentTypes2["FrostWalker"] = "minecraft:frost_walker";
  MinecraftEnchantmentTypes2["Impaling"] = "minecraft:impaling";
  MinecraftEnchantmentTypes2["Knockback"] = "minecraft:knockback";
  MinecraftEnchantmentTypes2["Looting"] = "minecraft:looting";
  MinecraftEnchantmentTypes2["Loyalty"] = "minecraft:loyalty";
  MinecraftEnchantmentTypes2["LuckOfTheSea"] = "minecraft:luck_of_the_sea";
  MinecraftEnchantmentTypes2["Lunge"] = "minecraft:lunge";
  MinecraftEnchantmentTypes2["Lure"] = "minecraft:lure";
  MinecraftEnchantmentTypes2["Mending"] = "minecraft:mending";
  MinecraftEnchantmentTypes2["Multishot"] = "minecraft:multishot";
  MinecraftEnchantmentTypes2["Piercing"] = "minecraft:piercing";
  MinecraftEnchantmentTypes2["Power"] = "minecraft:power";
  MinecraftEnchantmentTypes2["ProjectileProtection"] = "minecraft:projectile_protection";
  MinecraftEnchantmentTypes2["Protection"] = "minecraft:protection";
  MinecraftEnchantmentTypes2["Punch"] = "minecraft:punch";
  MinecraftEnchantmentTypes2["QuickCharge"] = "minecraft:quick_charge";
  MinecraftEnchantmentTypes2["Respiration"] = "minecraft:respiration";
  MinecraftEnchantmentTypes2["Riptide"] = "minecraft:riptide";
  MinecraftEnchantmentTypes2["Sharpness"] = "minecraft:sharpness";
  MinecraftEnchantmentTypes2["SilkTouch"] = "minecraft:silk_touch";
  MinecraftEnchantmentTypes2["Smite"] = "minecraft:smite";
  MinecraftEnchantmentTypes2["SoulSpeed"] = "minecraft:soul_speed";
  MinecraftEnchantmentTypes2["SwiftSneak"] = "minecraft:swift_sneak";
  MinecraftEnchantmentTypes2["Thorns"] = "minecraft:thorns";
  MinecraftEnchantmentTypes2["Unbreaking"] = "minecraft:unbreaking";
  MinecraftEnchantmentTypes2["Vanishing"] = "minecraft:vanishing";
  MinecraftEnchantmentTypes2["WindBurst"] = "minecraft:wind_burst";
  return MinecraftEnchantmentTypes2;
})(MinecraftEnchantmentTypes || {});
var MinecraftEntityTypes = ((MinecraftEntityTypes2) => {
  MinecraftEntityTypes2["Agent"] = "minecraft:agent";
  MinecraftEntityTypes2["Allay"] = "minecraft:allay";
  MinecraftEntityTypes2["AreaEffectCloud"] = "minecraft:area_effect_cloud";
  MinecraftEntityTypes2["Armadillo"] = "minecraft:armadillo";
  MinecraftEntityTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftEntityTypes2["Arrow"] = "minecraft:arrow";
  MinecraftEntityTypes2["Axolotl"] = "minecraft:axolotl";
  MinecraftEntityTypes2["Bat"] = "minecraft:bat";
  MinecraftEntityTypes2["Bee"] = "minecraft:bee";
  MinecraftEntityTypes2["Blaze"] = "minecraft:blaze";
  MinecraftEntityTypes2["Boat"] = "minecraft:boat";
  MinecraftEntityTypes2["Bogged"] = "minecraft:bogged";
  MinecraftEntityTypes2["Breeze"] = "minecraft:breeze";
  MinecraftEntityTypes2["BreezeWindChargeProjectile"] = "minecraft:breeze_wind_charge_projectile";
  MinecraftEntityTypes2["Camel"] = "minecraft:camel";
  MinecraftEntityTypes2["CamelHusk"] = "minecraft:camel_husk";
  MinecraftEntityTypes2["Cat"] = "minecraft:cat";
  MinecraftEntityTypes2["CaveSpider"] = "minecraft:cave_spider";
  MinecraftEntityTypes2["ChestBoat"] = "minecraft:chest_boat";
  MinecraftEntityTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftEntityTypes2["Chicken"] = "minecraft:chicken";
  MinecraftEntityTypes2["Cod"] = "minecraft:cod";
  MinecraftEntityTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftEntityTypes2["CopperGolem"] = "minecraft:copper_golem";
  MinecraftEntityTypes2["Cow"] = "minecraft:cow";
  MinecraftEntityTypes2["Creaking"] = "minecraft:creaking";
  MinecraftEntityTypes2["Creeper"] = "minecraft:creeper";
  MinecraftEntityTypes2["Dolphin"] = "minecraft:dolphin";
  MinecraftEntityTypes2["Donkey"] = "minecraft:donkey";
  MinecraftEntityTypes2["DragonFireball"] = "minecraft:dragon_fireball";
  MinecraftEntityTypes2["Drowned"] = "minecraft:drowned";
  MinecraftEntityTypes2["Egg"] = "minecraft:egg";
  MinecraftEntityTypes2["ElderGuardian"] = "minecraft:elder_guardian";
  MinecraftEntityTypes2["EnderCrystal"] = "minecraft:ender_crystal";
  MinecraftEntityTypes2["EnderDragon"] = "minecraft:ender_dragon";
  MinecraftEntityTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftEntityTypes2["Enderman"] = "minecraft:enderman";
  MinecraftEntityTypes2["Endermite"] = "minecraft:endermite";
  MinecraftEntityTypes2["EvocationIllager"] = "minecraft:evocation_illager";
  MinecraftEntityTypes2["EyeOfEnderSignal"] = "minecraft:eye_of_ender_signal";
  MinecraftEntityTypes2["Fireball"] = "minecraft:fireball";
  MinecraftEntityTypes2["FireworksRocket"] = "minecraft:fireworks_rocket";
  MinecraftEntityTypes2["FishingHook"] = "minecraft:fishing_hook";
  MinecraftEntityTypes2["Fox"] = "minecraft:fox";
  MinecraftEntityTypes2["Frog"] = "minecraft:frog";
  MinecraftEntityTypes2["Ghast"] = "minecraft:ghast";
  MinecraftEntityTypes2["GlowSquid"] = "minecraft:glow_squid";
  MinecraftEntityTypes2["Goat"] = "minecraft:goat";
  MinecraftEntityTypes2["Guardian"] = "minecraft:guardian";
  MinecraftEntityTypes2["HappyGhast"] = "minecraft:happy_ghast";
  MinecraftEntityTypes2["Hoglin"] = "minecraft:hoglin";
  MinecraftEntityTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftEntityTypes2["Horse"] = "minecraft:horse";
  MinecraftEntityTypes2["Husk"] = "minecraft:husk";
  MinecraftEntityTypes2["IronGolem"] = "minecraft:iron_golem";
  MinecraftEntityTypes2["LightningBolt"] = "minecraft:lightning_bolt";
  MinecraftEntityTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftEntityTypes2["Llama"] = "minecraft:llama";
  MinecraftEntityTypes2["LlamaSpit"] = "minecraft:llama_spit";
  MinecraftEntityTypes2["MagmaCube"] = "minecraft:magma_cube";
  MinecraftEntityTypes2["Minecart"] = "minecraft:minecart";
  MinecraftEntityTypes2["Mooshroom"] = "minecraft:mooshroom";
  MinecraftEntityTypes2["Mule"] = "minecraft:mule";
  MinecraftEntityTypes2["Nautilus"] = "minecraft:nautilus";
  MinecraftEntityTypes2["Npc"] = "minecraft:npc";
  MinecraftEntityTypes2["Ocelot"] = "minecraft:ocelot";
  MinecraftEntityTypes2["OminousItemSpawner"] = "minecraft:ominous_item_spawner";
  MinecraftEntityTypes2["Panda"] = "minecraft:panda";
  MinecraftEntityTypes2["Parched"] = "minecraft:parched";
  MinecraftEntityTypes2["Parrot"] = "minecraft:parrot";
  MinecraftEntityTypes2["Phantom"] = "minecraft:phantom";
  MinecraftEntityTypes2["Pig"] = "minecraft:pig";
  MinecraftEntityTypes2["Piglin"] = "minecraft:piglin";
  MinecraftEntityTypes2["PiglinBrute"] = "minecraft:piglin_brute";
  MinecraftEntityTypes2["Pillager"] = "minecraft:pillager";
  MinecraftEntityTypes2["Player"] = "minecraft:player";
  MinecraftEntityTypes2["PolarBear"] = "minecraft:polar_bear";
  MinecraftEntityTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftEntityTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftEntityTypes2["Ravager"] = "minecraft:ravager";
  MinecraftEntityTypes2["Salmon"] = "minecraft:salmon";
  MinecraftEntityTypes2["Sheep"] = "minecraft:sheep";
  MinecraftEntityTypes2["Shulker"] = "minecraft:shulker";
  MinecraftEntityTypes2["ShulkerBullet"] = "minecraft:shulker_bullet";
  MinecraftEntityTypes2["Silverfish"] = "minecraft:silverfish";
  MinecraftEntityTypes2["Skeleton"] = "minecraft:skeleton";
  MinecraftEntityTypes2["SkeletonHorse"] = "minecraft:skeleton_horse";
  MinecraftEntityTypes2["Slime"] = "minecraft:slime";
  MinecraftEntityTypes2["SmallFireball"] = "minecraft:small_fireball";
  MinecraftEntityTypes2["Sniffer"] = "minecraft:sniffer";
  MinecraftEntityTypes2["SnowGolem"] = "minecraft:snow_golem";
  MinecraftEntityTypes2["Snowball"] = "minecraft:snowball";
  MinecraftEntityTypes2["Spider"] = "minecraft:spider";
  MinecraftEntityTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftEntityTypes2["Squid"] = "minecraft:squid";
  MinecraftEntityTypes2["Stray"] = "minecraft:stray";
  MinecraftEntityTypes2["Strider"] = "minecraft:strider";
  MinecraftEntityTypes2["Tadpole"] = "minecraft:tadpole";
  MinecraftEntityTypes2["ThrownTrident"] = "minecraft:thrown_trident";
  MinecraftEntityTypes2["Tnt"] = "minecraft:tnt";
  MinecraftEntityTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftEntityTypes2["TraderLlama"] = "minecraft:trader_llama";
  MinecraftEntityTypes2["TripodCamera"] = "minecraft:tripod_camera";
  MinecraftEntityTypes2["Tropicalfish"] = "minecraft:tropicalfish";
  MinecraftEntityTypes2["Turtle"] = "minecraft:turtle";
  MinecraftEntityTypes2["Vex"] = "minecraft:vex";
  MinecraftEntityTypes2["Villager"] = "minecraft:villager";
  MinecraftEntityTypes2["VillagerV2"] = "minecraft:villager_v2";
  MinecraftEntityTypes2["Vindicator"] = "minecraft:vindicator";
  MinecraftEntityTypes2["WanderingTrader"] = "minecraft:wandering_trader";
  MinecraftEntityTypes2["Warden"] = "minecraft:warden";
  MinecraftEntityTypes2["WindChargeProjectile"] = "minecraft:wind_charge_projectile";
  MinecraftEntityTypes2["Witch"] = "minecraft:witch";
  MinecraftEntityTypes2["Wither"] = "minecraft:wither";
  MinecraftEntityTypes2["WitherSkeleton"] = "minecraft:wither_skeleton";
  MinecraftEntityTypes2["WitherSkull"] = "minecraft:wither_skull";
  MinecraftEntityTypes2["WitherSkullDangerous"] = "minecraft:wither_skull_dangerous";
  MinecraftEntityTypes2["Wolf"] = "minecraft:wolf";
  MinecraftEntityTypes2["XpBottle"] = "minecraft:xp_bottle";
  MinecraftEntityTypes2["XpOrb"] = "minecraft:xp_orb";
  MinecraftEntityTypes2["Zoglin"] = "minecraft:zoglin";
  MinecraftEntityTypes2["Zombie"] = "minecraft:zombie";
  MinecraftEntityTypes2["ZombieHorse"] = "minecraft:zombie_horse";
  MinecraftEntityTypes2["ZombieNautilus"] = "minecraft:zombie_nautilus";
  MinecraftEntityTypes2["ZombiePigman"] = "minecraft:zombie_pigman";
  MinecraftEntityTypes2["ZombieVillager"] = "minecraft:zombie_villager";
  MinecraftEntityTypes2["ZombieVillagerV2"] = "minecraft:zombie_villager_v2";
  return MinecraftEntityTypes2;
})(MinecraftEntityTypes || {});
var MinecraftFeatureTypes = ((MinecraftFeatureTypes2) => {
  MinecraftFeatureTypes2["AncientCity"] = "minecraft:ancient_city";
  MinecraftFeatureTypes2["BastionRemnant"] = "minecraft:bastion_remnant";
  MinecraftFeatureTypes2["BuriedTreasure"] = "minecraft:buried_treasure";
  MinecraftFeatureTypes2["EndCity"] = "minecraft:end_city";
  MinecraftFeatureTypes2["Fortress"] = "minecraft:fortress";
  MinecraftFeatureTypes2["Mansion"] = "minecraft:mansion";
  MinecraftFeatureTypes2["Mineshaft"] = "minecraft:mineshaft";
  MinecraftFeatureTypes2["Monument"] = "minecraft:monument";
  MinecraftFeatureTypes2["PillagerOutpost"] = "minecraft:pillager_outpost";
  MinecraftFeatureTypes2["RuinedPortal"] = "minecraft:ruined_portal";
  MinecraftFeatureTypes2["Ruins"] = "minecraft:ruins";
  MinecraftFeatureTypes2["Shipwreck"] = "minecraft:shipwreck";
  MinecraftFeatureTypes2["Stronghold"] = "minecraft:stronghold";
  MinecraftFeatureTypes2["Temple"] = "minecraft:temple";
  MinecraftFeatureTypes2["TrailRuins"] = "minecraft:trail_ruins";
  MinecraftFeatureTypes2["TrialChambers"] = "minecraft:trial_chambers";
  MinecraftFeatureTypes2["Village"] = "minecraft:village";
  return MinecraftFeatureTypes2;
})(MinecraftFeatureTypes || {});
var MinecraftItemTypes = ((MinecraftItemTypes2) => {
  MinecraftItemTypes2["AcaciaBoat"] = "minecraft:acacia_boat";
  MinecraftItemTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftItemTypes2["AcaciaChestBoat"] = "minecraft:acacia_chest_boat";
  MinecraftItemTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftItemTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftItemTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftItemTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftItemTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftItemTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftItemTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftItemTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftItemTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftItemTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftItemTypes2["AcaciaSign"] = "minecraft:acacia_sign";
  MinecraftItemTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftItemTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftItemTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftItemTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftItemTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftItemTypes2["AllaySpawnEgg"] = "minecraft:allay_spawn_egg";
  MinecraftItemTypes2["Allium"] = "minecraft:allium";
  MinecraftItemTypes2["Allow"] = "minecraft:allow";
  MinecraftItemTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftItemTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftItemTypes2["AmethystShard"] = "minecraft:amethyst_shard";
  MinecraftItemTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftItemTypes2["Andesite"] = "minecraft:andesite";
  MinecraftItemTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftItemTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftItemTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftItemTypes2["AnglerPotterySherd"] = "minecraft:angler_pottery_sherd";
  MinecraftItemTypes2["Anvil"] = "minecraft:anvil";
  MinecraftItemTypes2["Apple"] = "minecraft:apple";
  MinecraftItemTypes2["ArcherPotterySherd"] = "minecraft:archer_pottery_sherd";
  MinecraftItemTypes2["ArmadilloScute"] = "minecraft:armadillo_scute";
  MinecraftItemTypes2["ArmadilloSpawnEgg"] = "minecraft:armadillo_spawn_egg";
  MinecraftItemTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftItemTypes2["ArmsUpPotterySherd"] = "minecraft:arms_up_pottery_sherd";
  MinecraftItemTypes2["Arrow"] = "minecraft:arrow";
  MinecraftItemTypes2["AxolotlBucket"] = "minecraft:axolotl_bucket";
  MinecraftItemTypes2["AxolotlSpawnEgg"] = "minecraft:axolotl_spawn_egg";
  MinecraftItemTypes2["Azalea"] = "minecraft:azalea";
  MinecraftItemTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftItemTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftItemTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftItemTypes2["BakedPotato"] = "minecraft:baked_potato";
  MinecraftItemTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftItemTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftItemTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftItemTypes2["BambooChestRaft"] = "minecraft:bamboo_chest_raft";
  MinecraftItemTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftItemTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftItemTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftItemTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftItemTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftItemTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftItemTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftItemTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftItemTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftItemTypes2["BambooRaft"] = "minecraft:bamboo_raft";
  MinecraftItemTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftItemTypes2["BambooSign"] = "minecraft:bamboo_sign";
  MinecraftItemTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftItemTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftItemTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftItemTypes2["Banner"] = "minecraft:banner";
  MinecraftItemTypes2["Barrel"] = "minecraft:barrel";
  MinecraftItemTypes2["Barrier"] = "minecraft:barrier";
  MinecraftItemTypes2["Basalt"] = "minecraft:basalt";
  MinecraftItemTypes2["BatSpawnEgg"] = "minecraft:bat_spawn_egg";
  MinecraftItemTypes2["Beacon"] = "minecraft:beacon";
  MinecraftItemTypes2["Bed"] = "minecraft:bed";
  MinecraftItemTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftItemTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftItemTypes2["BeeSpawnEgg"] = "minecraft:bee_spawn_egg";
  MinecraftItemTypes2["Beef"] = "minecraft:beef";
  MinecraftItemTypes2["Beehive"] = "minecraft:beehive";
  MinecraftItemTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftItemTypes2["BeetrootSeeds"] = "minecraft:beetroot_seeds";
  MinecraftItemTypes2["BeetrootSoup"] = "minecraft:beetroot_soup";
  MinecraftItemTypes2["Bell"] = "minecraft:bell";
  MinecraftItemTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftItemTypes2["BirchBoat"] = "minecraft:birch_boat";
  MinecraftItemTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftItemTypes2["BirchChestBoat"] = "minecraft:birch_chest_boat";
  MinecraftItemTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftItemTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftItemTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftItemTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftItemTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftItemTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftItemTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftItemTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftItemTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftItemTypes2["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftItemTypes2["BirchSign"] = "minecraft:birch_sign";
  MinecraftItemTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftItemTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftItemTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftItemTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftItemTypes2["BlackBundle"] = "minecraft:black_bundle";
  MinecraftItemTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftItemTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftItemTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftItemTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftItemTypes2["BlackDye"] = "minecraft:black_dye";
  MinecraftItemTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftItemTypes2["BlackHarness"] = "minecraft:black_harness";
  MinecraftItemTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftItemTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftItemTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftItemTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftItemTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftItemTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftItemTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftItemTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftItemTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftItemTypes2["BladePotterySherd"] = "minecraft:blade_pottery_sherd";
  MinecraftItemTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftItemTypes2["BlazePowder"] = "minecraft:blaze_powder";
  MinecraftItemTypes2["BlazeRod"] = "minecraft:blaze_rod";
  MinecraftItemTypes2["BlazeSpawnEgg"] = "minecraft:blaze_spawn_egg";
  MinecraftItemTypes2["BlueBundle"] = "minecraft:blue_bundle";
  MinecraftItemTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftItemTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftItemTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftItemTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftItemTypes2["BlueDye"] = "minecraft:blue_dye";
  MinecraftItemTypes2["BlueEgg"] = "minecraft:blue_egg";
  MinecraftItemTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftItemTypes2["BlueHarness"] = "minecraft:blue_harness";
  MinecraftItemTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftItemTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftItemTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftItemTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftItemTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftItemTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftItemTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftItemTypes2["BoggedSpawnEgg"] = "minecraft:bogged_spawn_egg";
  MinecraftItemTypes2["BoltArmorTrimSmithingTemplate"] = "minecraft:bolt_armor_trim_smithing_template";
  MinecraftItemTypes2["Bone"] = "minecraft:bone";
  MinecraftItemTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftItemTypes2["BoneMeal"] = "minecraft:bone_meal";
  MinecraftItemTypes2["Book"] = "minecraft:book";
  MinecraftItemTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftItemTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftItemTypes2["BordureIndentedBannerPattern"] = "minecraft:bordure_indented_banner_pattern";
  MinecraftItemTypes2["Bow"] = "minecraft:bow";
  MinecraftItemTypes2["Bowl"] = "minecraft:bowl";
  MinecraftItemTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftItemTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftItemTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftItemTypes2["Bread"] = "minecraft:bread";
  MinecraftItemTypes2["BreezeRod"] = "minecraft:breeze_rod";
  MinecraftItemTypes2["BreezeSpawnEgg"] = "minecraft:breeze_spawn_egg";
  MinecraftItemTypes2["BrewerPotterySherd"] = "minecraft:brewer_pottery_sherd";
  MinecraftItemTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftItemTypes2["Brick"] = "minecraft:brick";
  MinecraftItemTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftItemTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftItemTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftItemTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftItemTypes2["BrownBundle"] = "minecraft:brown_bundle";
  MinecraftItemTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftItemTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftItemTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftItemTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftItemTypes2["BrownDye"] = "minecraft:brown_dye";
  MinecraftItemTypes2["BrownEgg"] = "minecraft:brown_egg";
  MinecraftItemTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftItemTypes2["BrownHarness"] = "minecraft:brown_harness";
  MinecraftItemTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftItemTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftItemTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftItemTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftItemTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftItemTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftItemTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftItemTypes2["Brush"] = "minecraft:brush";
  MinecraftItemTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftItemTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftItemTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftItemTypes2["Bucket"] = "minecraft:bucket";
  MinecraftItemTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftItemTypes2["Bundle"] = "minecraft:bundle";
  MinecraftItemTypes2["BurnPotterySherd"] = "minecraft:burn_pottery_sherd";
  MinecraftItemTypes2["Bush"] = "minecraft:bush";
  MinecraftItemTypes2["Cactus"] = "minecraft:cactus";
  MinecraftItemTypes2["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftItemTypes2["Cake"] = "minecraft:cake";
  MinecraftItemTypes2["Calcite"] = "minecraft:calcite";
  MinecraftItemTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftItemTypes2["CamelHuskSpawnEgg"] = "minecraft:camel_husk_spawn_egg";
  MinecraftItemTypes2["CamelSpawnEgg"] = "minecraft:camel_spawn_egg";
  MinecraftItemTypes2["Campfire"] = "minecraft:campfire";
  MinecraftItemTypes2["Candle"] = "minecraft:candle";
  MinecraftItemTypes2["Carrot"] = "minecraft:carrot";
  MinecraftItemTypes2["CarrotOnAStick"] = "minecraft:carrot_on_a_stick";
  MinecraftItemTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftItemTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftItemTypes2["CatSpawnEgg"] = "minecraft:cat_spawn_egg";
  MinecraftItemTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftItemTypes2["CaveSpiderSpawnEgg"] = "minecraft:cave_spider_spawn_egg";
  MinecraftItemTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftItemTypes2["ChainmailBoots"] = "minecraft:chainmail_boots";
  MinecraftItemTypes2["ChainmailChestplate"] = "minecraft:chainmail_chestplate";
  MinecraftItemTypes2["ChainmailHelmet"] = "minecraft:chainmail_helmet";
  MinecraftItemTypes2["ChainmailLeggings"] = "minecraft:chainmail_leggings";
  MinecraftItemTypes2["Charcoal"] = "minecraft:charcoal";
  MinecraftItemTypes2["CherryBoat"] = "minecraft:cherry_boat";
  MinecraftItemTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftItemTypes2["CherryChestBoat"] = "minecraft:cherry_chest_boat";
  MinecraftItemTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftItemTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftItemTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftItemTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftItemTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftItemTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftItemTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftItemTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftItemTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftItemTypes2["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftItemTypes2["CherrySign"] = "minecraft:cherry_sign";
  MinecraftItemTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftItemTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftItemTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftItemTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftItemTypes2["Chest"] = "minecraft:chest";
  MinecraftItemTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftItemTypes2["Chicken"] = "minecraft:chicken";
  MinecraftItemTypes2["ChickenSpawnEgg"] = "minecraft:chicken_spawn_egg";
  MinecraftItemTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftItemTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftItemTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftItemTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftItemTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftItemTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftItemTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftItemTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftItemTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftItemTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftItemTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftItemTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftItemTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftItemTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftItemTypes2["ChorusFruit"] = "minecraft:chorus_fruit";
  MinecraftItemTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftItemTypes2["Clay"] = "minecraft:clay";
  MinecraftItemTypes2["ClayBall"] = "minecraft:clay_ball";
  MinecraftItemTypes2["Clock"] = "minecraft:clock";
  MinecraftItemTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftItemTypes2["Coal"] = "minecraft:coal";
  MinecraftItemTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftItemTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftItemTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftItemTypes2["CoastArmorTrimSmithingTemplate"] = "minecraft:coast_armor_trim_smithing_template";
  MinecraftItemTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftItemTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftItemTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftItemTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftItemTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftItemTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftItemTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftItemTypes2["CocoaBeans"] = "minecraft:cocoa_beans";
  MinecraftItemTypes2["Cod"] = "minecraft:cod";
  MinecraftItemTypes2["CodBucket"] = "minecraft:cod_bucket";
  MinecraftItemTypes2["CodSpawnEgg"] = "minecraft:cod_spawn_egg";
  MinecraftItemTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftItemTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftItemTypes2["Comparator"] = "minecraft:comparator";
  MinecraftItemTypes2["Compass"] = "minecraft:compass";
  MinecraftItemTypes2["Composter"] = "minecraft:composter";
  MinecraftItemTypes2["Conduit"] = "minecraft:conduit";
  MinecraftItemTypes2["CookedBeef"] = "minecraft:cooked_beef";
  MinecraftItemTypes2["CookedChicken"] = "minecraft:cooked_chicken";
  MinecraftItemTypes2["CookedCod"] = "minecraft:cooked_cod";
  MinecraftItemTypes2["CookedMutton"] = "minecraft:cooked_mutton";
  MinecraftItemTypes2["CookedPorkchop"] = "minecraft:cooked_porkchop";
  MinecraftItemTypes2["CookedRabbit"] = "minecraft:cooked_rabbit";
  MinecraftItemTypes2["CookedSalmon"] = "minecraft:cooked_salmon";
  MinecraftItemTypes2["Cookie"] = "minecraft:cookie";
  MinecraftItemTypes2["CopperAxe"] = "minecraft:copper_axe";
  MinecraftItemTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftItemTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftItemTypes2["CopperBoots"] = "minecraft:copper_boots";
  MinecraftItemTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftItemTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftItemTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftItemTypes2["CopperChestplate"] = "minecraft:copper_chestplate";
  MinecraftItemTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftItemTypes2["CopperGolemSpawnEgg"] = "minecraft:copper_golem_spawn_egg";
  MinecraftItemTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftItemTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftItemTypes2["CopperHelmet"] = "minecraft:copper_helmet";
  MinecraftItemTypes2["CopperHoe"] = "minecraft:copper_hoe";
  MinecraftItemTypes2["CopperHorseArmor"] = "minecraft:copper_horse_armor";
  MinecraftItemTypes2["CopperIngot"] = "minecraft:copper_ingot";
  MinecraftItemTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftItemTypes2["CopperLeggings"] = "minecraft:copper_leggings";
  MinecraftItemTypes2["CopperNautilusArmor"] = "minecraft:copper_nautilus_armor";
  MinecraftItemTypes2["CopperNugget"] = "minecraft:copper_nugget";
  MinecraftItemTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftItemTypes2["CopperPickaxe"] = "minecraft:copper_pickaxe";
  MinecraftItemTypes2["CopperShovel"] = "minecraft:copper_shovel";
  MinecraftItemTypes2["CopperSpear"] = "minecraft:copper_spear";
  MinecraftItemTypes2["CopperSword"] = "minecraft:copper_sword";
  MinecraftItemTypes2["CopperTorch"] = "minecraft:copper_torch";
  MinecraftItemTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftItemTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftItemTypes2["CowSpawnEgg"] = "minecraft:cow_spawn_egg";
  MinecraftItemTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftItemTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftItemTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftItemTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftItemTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftItemTypes2["Crafter"] = "minecraft:crafter";
  MinecraftItemTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftItemTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftItemTypes2["CreakingSpawnEgg"] = "minecraft:creaking_spawn_egg";
  MinecraftItemTypes2["CreeperBannerPattern"] = "minecraft:creeper_banner_pattern";
  MinecraftItemTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftItemTypes2["CreeperSpawnEgg"] = "minecraft:creeper_spawn_egg";
  MinecraftItemTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftItemTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftItemTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftItemTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftItemTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftItemTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftItemTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftItemTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftItemTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftItemTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftItemTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftItemTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftItemTypes2["CrimsonSign"] = "minecraft:crimson_sign";
  MinecraftItemTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftItemTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftItemTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftItemTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftItemTypes2["Crossbow"] = "minecraft:crossbow";
  MinecraftItemTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftItemTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftItemTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftItemTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftItemTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftItemTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftItemTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftItemTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftItemTypes2["CyanBundle"] = "minecraft:cyan_bundle";
  MinecraftItemTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftItemTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftItemTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftItemTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftItemTypes2["CyanDye"] = "minecraft:cyan_dye";
  MinecraftItemTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftItemTypes2["CyanHarness"] = "minecraft:cyan_harness";
  MinecraftItemTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftItemTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftItemTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftItemTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftItemTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftItemTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftItemTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftItemTypes2["DangerPotterySherd"] = "minecraft:danger_pottery_sherd";
  MinecraftItemTypes2["DarkOakBoat"] = "minecraft:dark_oak_boat";
  MinecraftItemTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftItemTypes2["DarkOakChestBoat"] = "minecraft:dark_oak_chest_boat";
  MinecraftItemTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftItemTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftItemTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftItemTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftItemTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftItemTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftItemTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftItemTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftItemTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftItemTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftItemTypes2["DarkOakSign"] = "minecraft:dark_oak_sign";
  MinecraftItemTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftItemTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftItemTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftItemTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftItemTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftItemTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftItemTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftItemTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftItemTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftItemTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftItemTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftItemTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftItemTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftItemTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftItemTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftItemTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftItemTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftItemTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftItemTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftItemTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftItemTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftItemTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftItemTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftItemTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftItemTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftItemTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftItemTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftItemTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftItemTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftItemTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftItemTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftItemTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftItemTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftItemTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftItemTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftItemTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftItemTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftItemTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftItemTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftItemTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftItemTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftItemTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftItemTypes2["Deny"] = "minecraft:deny";
  MinecraftItemTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftItemTypes2["Diamond"] = "minecraft:diamond";
  MinecraftItemTypes2["DiamondAxe"] = "minecraft:diamond_axe";
  MinecraftItemTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftItemTypes2["DiamondBoots"] = "minecraft:diamond_boots";
  MinecraftItemTypes2["DiamondChestplate"] = "minecraft:diamond_chestplate";
  MinecraftItemTypes2["DiamondHelmet"] = "minecraft:diamond_helmet";
  MinecraftItemTypes2["DiamondHoe"] = "minecraft:diamond_hoe";
  MinecraftItemTypes2["DiamondHorseArmor"] = "minecraft:diamond_horse_armor";
  MinecraftItemTypes2["DiamondLeggings"] = "minecraft:diamond_leggings";
  MinecraftItemTypes2["DiamondNautilusArmor"] = "minecraft:diamond_nautilus_armor";
  MinecraftItemTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftItemTypes2["DiamondPickaxe"] = "minecraft:diamond_pickaxe";
  MinecraftItemTypes2["DiamondShovel"] = "minecraft:diamond_shovel";
  MinecraftItemTypes2["DiamondSpear"] = "minecraft:diamond_spear";
  MinecraftItemTypes2["DiamondSword"] = "minecraft:diamond_sword";
  MinecraftItemTypes2["Diorite"] = "minecraft:diorite";
  MinecraftItemTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftItemTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftItemTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftItemTypes2["Dirt"] = "minecraft:dirt";
  MinecraftItemTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftItemTypes2["DiscFragment5"] = "minecraft:disc_fragment_5";
  MinecraftItemTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftItemTypes2["DolphinSpawnEgg"] = "minecraft:dolphin_spawn_egg";
  MinecraftItemTypes2["DonkeySpawnEgg"] = "minecraft:donkey_spawn_egg";
  MinecraftItemTypes2["DragonBreath"] = "minecraft:dragon_breath";
  MinecraftItemTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftItemTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftItemTypes2["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftItemTypes2["DriedKelp"] = "minecraft:dried_kelp";
  MinecraftItemTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftItemTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftItemTypes2["Dropper"] = "minecraft:dropper";
  MinecraftItemTypes2["DrownedSpawnEgg"] = "minecraft:drowned_spawn_egg";
  MinecraftItemTypes2["DuneArmorTrimSmithingTemplate"] = "minecraft:dune_armor_trim_smithing_template";
  MinecraftItemTypes2["EchoShard"] = "minecraft:echo_shard";
  MinecraftItemTypes2["Egg"] = "minecraft:egg";
  MinecraftItemTypes2["ElderGuardianSpawnEgg"] = "minecraft:elder_guardian_spawn_egg";
  MinecraftItemTypes2["Elytra"] = "minecraft:elytra";
  MinecraftItemTypes2["Emerald"] = "minecraft:emerald";
  MinecraftItemTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftItemTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftItemTypes2["EmptyMap"] = "minecraft:empty_map";
  MinecraftItemTypes2["EnchantedBook"] = "minecraft:enchanted_book";
  MinecraftItemTypes2["EnchantedGoldenApple"] = "minecraft:enchanted_golden_apple";
  MinecraftItemTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftItemTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftItemTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftItemTypes2["EndCrystal"] = "minecraft:end_crystal";
  MinecraftItemTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftItemTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftItemTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftItemTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftItemTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftItemTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftItemTypes2["EnderDragonSpawnEgg"] = "minecraft:ender_dragon_spawn_egg";
  MinecraftItemTypes2["EnderEye"] = "minecraft:ender_eye";
  MinecraftItemTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftItemTypes2["EndermanSpawnEgg"] = "minecraft:enderman_spawn_egg";
  MinecraftItemTypes2["EndermiteSpawnEgg"] = "minecraft:endermite_spawn_egg";
  MinecraftItemTypes2["EvokerSpawnEgg"] = "minecraft:evoker_spawn_egg";
  MinecraftItemTypes2["ExperienceBottle"] = "minecraft:experience_bottle";
  MinecraftItemTypes2["ExplorerPotterySherd"] = "minecraft:explorer_pottery_sherd";
  MinecraftItemTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftItemTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftItemTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftItemTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftItemTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftItemTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftItemTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftItemTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftItemTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftItemTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftItemTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftItemTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftItemTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftItemTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftItemTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftItemTypes2["EyeArmorTrimSmithingTemplate"] = "minecraft:eye_armor_trim_smithing_template";
  MinecraftItemTypes2["Farmland"] = "minecraft:farmland";
  MinecraftItemTypes2["Feather"] = "minecraft:feather";
  MinecraftItemTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftItemTypes2["FermentedSpiderEye"] = "minecraft:fermented_spider_eye";
  MinecraftItemTypes2["Fern"] = "minecraft:fern";
  MinecraftItemTypes2["FieldMasonedBannerPattern"] = "minecraft:field_masoned_banner_pattern";
  MinecraftItemTypes2["FilledMap"] = "minecraft:filled_map";
  MinecraftItemTypes2["FireCharge"] = "minecraft:fire_charge";
  MinecraftItemTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftItemTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftItemTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftItemTypes2["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftItemTypes2["FireworkRocket"] = "minecraft:firework_rocket";
  MinecraftItemTypes2["FireworkStar"] = "minecraft:firework_star";
  MinecraftItemTypes2["FishingRod"] = "minecraft:fishing_rod";
  MinecraftItemTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftItemTypes2["Flint"] = "minecraft:flint";
  MinecraftItemTypes2["FlintAndSteel"] = "minecraft:flint_and_steel";
  MinecraftItemTypes2["FlowArmorTrimSmithingTemplate"] = "minecraft:flow_armor_trim_smithing_template";
  MinecraftItemTypes2["FlowBannerPattern"] = "minecraft:flow_banner_pattern";
  MinecraftItemTypes2["FlowPotterySherd"] = "minecraft:flow_pottery_sherd";
  MinecraftItemTypes2["FlowerBannerPattern"] = "minecraft:flower_banner_pattern";
  MinecraftItemTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftItemTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftItemTypes2["FoxSpawnEgg"] = "minecraft:fox_spawn_egg";
  MinecraftItemTypes2["Frame"] = "minecraft:frame";
  MinecraftItemTypes2["FriendPotterySherd"] = "minecraft:friend_pottery_sherd";
  MinecraftItemTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftItemTypes2["FrogSpawnEgg"] = "minecraft:frog_spawn_egg";
  MinecraftItemTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftItemTypes2["Furnace"] = "minecraft:furnace";
  MinecraftItemTypes2["GhastSpawnEgg"] = "minecraft:ghast_spawn_egg";
  MinecraftItemTypes2["GhastTear"] = "minecraft:ghast_tear";
  MinecraftItemTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftItemTypes2["Glass"] = "minecraft:glass";
  MinecraftItemTypes2["GlassBottle"] = "minecraft:glass_bottle";
  MinecraftItemTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftItemTypes2["GlisteringMelonSlice"] = "minecraft:glistering_melon_slice";
  MinecraftItemTypes2["GlobeBannerPattern"] = "minecraft:globe_banner_pattern";
  MinecraftItemTypes2["GlowBerries"] = "minecraft:glow_berries";
  MinecraftItemTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftItemTypes2["GlowInkSac"] = "minecraft:glow_ink_sac";
  MinecraftItemTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftItemTypes2["GlowSquidSpawnEgg"] = "minecraft:glow_squid_spawn_egg";
  MinecraftItemTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftItemTypes2["GlowstoneDust"] = "minecraft:glowstone_dust";
  MinecraftItemTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftItemTypes2["GoatSpawnEgg"] = "minecraft:goat_spawn_egg";
  MinecraftItemTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftItemTypes2["GoldIngot"] = "minecraft:gold_ingot";
  MinecraftItemTypes2["GoldNugget"] = "minecraft:gold_nugget";
  MinecraftItemTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftItemTypes2["GoldenApple"] = "minecraft:golden_apple";
  MinecraftItemTypes2["GoldenAxe"] = "minecraft:golden_axe";
  MinecraftItemTypes2["GoldenBoots"] = "minecraft:golden_boots";
  MinecraftItemTypes2["GoldenCarrot"] = "minecraft:golden_carrot";
  MinecraftItemTypes2["GoldenChestplate"] = "minecraft:golden_chestplate";
  MinecraftItemTypes2["GoldenHelmet"] = "minecraft:golden_helmet";
  MinecraftItemTypes2["GoldenHoe"] = "minecraft:golden_hoe";
  MinecraftItemTypes2["GoldenHorseArmor"] = "minecraft:golden_horse_armor";
  MinecraftItemTypes2["GoldenLeggings"] = "minecraft:golden_leggings";
  MinecraftItemTypes2["GoldenNautilusArmor"] = "minecraft:golden_nautilus_armor";
  MinecraftItemTypes2["GoldenPickaxe"] = "minecraft:golden_pickaxe";
  MinecraftItemTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftItemTypes2["GoldenShovel"] = "minecraft:golden_shovel";
  MinecraftItemTypes2["GoldenSpear"] = "minecraft:golden_spear";
  MinecraftItemTypes2["GoldenSword"] = "minecraft:golden_sword";
  MinecraftItemTypes2["Granite"] = "minecraft:granite";
  MinecraftItemTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftItemTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftItemTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftItemTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftItemTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftItemTypes2["Gravel"] = "minecraft:gravel";
  MinecraftItemTypes2["GrayBundle"] = "minecraft:gray_bundle";
  MinecraftItemTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftItemTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftItemTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftItemTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftItemTypes2["GrayDye"] = "minecraft:gray_dye";
  MinecraftItemTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftItemTypes2["GrayHarness"] = "minecraft:gray_harness";
  MinecraftItemTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftItemTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftItemTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftItemTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftItemTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftItemTypes2["GreenBundle"] = "minecraft:green_bundle";
  MinecraftItemTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftItemTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftItemTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftItemTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftItemTypes2["GreenDye"] = "minecraft:green_dye";
  MinecraftItemTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftItemTypes2["GreenHarness"] = "minecraft:green_harness";
  MinecraftItemTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftItemTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftItemTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftItemTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftItemTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftItemTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftItemTypes2["GuardianSpawnEgg"] = "minecraft:guardian_spawn_egg";
  MinecraftItemTypes2["Gunpowder"] = "minecraft:gunpowder";
  MinecraftItemTypes2["GusterBannerPattern"] = "minecraft:guster_banner_pattern";
  MinecraftItemTypes2["GusterPotterySherd"] = "minecraft:guster_pottery_sherd";
  MinecraftItemTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftItemTypes2["HappyGhastSpawnEgg"] = "minecraft:happy_ghast_spawn_egg";
  MinecraftItemTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftItemTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftItemTypes2["HeartOfTheSea"] = "minecraft:heart_of_the_sea";
  MinecraftItemTypes2["HeartPotterySherd"] = "minecraft:heart_pottery_sherd";
  MinecraftItemTypes2["HeartbreakPotterySherd"] = "minecraft:heartbreak_pottery_sherd";
  MinecraftItemTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftItemTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftItemTypes2["HoglinSpawnEgg"] = "minecraft:hoglin_spawn_egg";
  MinecraftItemTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftItemTypes2["HoneyBottle"] = "minecraft:honey_bottle";
  MinecraftItemTypes2["Honeycomb"] = "minecraft:honeycomb";
  MinecraftItemTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftItemTypes2["Hopper"] = "minecraft:hopper";
  MinecraftItemTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftItemTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftItemTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftItemTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftItemTypes2["HorseSpawnEgg"] = "minecraft:horse_spawn_egg";
  MinecraftItemTypes2["HostArmorTrimSmithingTemplate"] = "minecraft:host_armor_trim_smithing_template";
  MinecraftItemTypes2["HowlPotterySherd"] = "minecraft:howl_pottery_sherd";
  MinecraftItemTypes2["HuskSpawnEgg"] = "minecraft:husk_spawn_egg";
  MinecraftItemTypes2["Ice"] = "minecraft:ice";
  MinecraftItemTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftItemTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftItemTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftItemTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftItemTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftItemTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftItemTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftItemTypes2["InkSac"] = "minecraft:ink_sac";
  MinecraftItemTypes2["IronAxe"] = "minecraft:iron_axe";
  MinecraftItemTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftItemTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftItemTypes2["IronBoots"] = "minecraft:iron_boots";
  MinecraftItemTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftItemTypes2["IronChestplate"] = "minecraft:iron_chestplate";
  MinecraftItemTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftItemTypes2["IronGolemSpawnEgg"] = "minecraft:iron_golem_spawn_egg";
  MinecraftItemTypes2["IronHelmet"] = "minecraft:iron_helmet";
  MinecraftItemTypes2["IronHoe"] = "minecraft:iron_hoe";
  MinecraftItemTypes2["IronHorseArmor"] = "minecraft:iron_horse_armor";
  MinecraftItemTypes2["IronIngot"] = "minecraft:iron_ingot";
  MinecraftItemTypes2["IronLeggings"] = "minecraft:iron_leggings";
  MinecraftItemTypes2["IronNautilusArmor"] = "minecraft:iron_nautilus_armor";
  MinecraftItemTypes2["IronNugget"] = "minecraft:iron_nugget";
  MinecraftItemTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftItemTypes2["IronPickaxe"] = "minecraft:iron_pickaxe";
  MinecraftItemTypes2["IronShovel"] = "minecraft:iron_shovel";
  MinecraftItemTypes2["IronSpear"] = "minecraft:iron_spear";
  MinecraftItemTypes2["IronSword"] = "minecraft:iron_sword";
  MinecraftItemTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftItemTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftItemTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftItemTypes2["JungleBoat"] = "minecraft:jungle_boat";
  MinecraftItemTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftItemTypes2["JungleChestBoat"] = "minecraft:jungle_chest_boat";
  MinecraftItemTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftItemTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftItemTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftItemTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftItemTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftItemTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftItemTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftItemTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftItemTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftItemTypes2["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftItemTypes2["JungleSign"] = "minecraft:jungle_sign";
  MinecraftItemTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftItemTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftItemTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftItemTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftItemTypes2["Kelp"] = "minecraft:kelp";
  MinecraftItemTypes2["Ladder"] = "minecraft:ladder";
  MinecraftItemTypes2["Lantern"] = "minecraft:lantern";
  MinecraftItemTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftItemTypes2["LapisLazuli"] = "minecraft:lapis_lazuli";
  MinecraftItemTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftItemTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftItemTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftItemTypes2["LavaBucket"] = "minecraft:lava_bucket";
  MinecraftItemTypes2["Lead"] = "minecraft:lead";
  MinecraftItemTypes2["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftItemTypes2["Leather"] = "minecraft:leather";
  MinecraftItemTypes2["LeatherBoots"] = "minecraft:leather_boots";
  MinecraftItemTypes2["LeatherChestplate"] = "minecraft:leather_chestplate";
  MinecraftItemTypes2["LeatherHelmet"] = "minecraft:leather_helmet";
  MinecraftItemTypes2["LeatherHorseArmor"] = "minecraft:leather_horse_armor";
  MinecraftItemTypes2["LeatherLeggings"] = "minecraft:leather_leggings";
  MinecraftItemTypes2["Lectern"] = "minecraft:lectern";
  MinecraftItemTypes2["Lever"] = "minecraft:lever";
  MinecraftItemTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftItemTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftItemTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftItemTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftItemTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftItemTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftItemTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftItemTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftItemTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftItemTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftItemTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftItemTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftItemTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftItemTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftItemTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftItemTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftItemTypes2["LightBlueBundle"] = "minecraft:light_blue_bundle";
  MinecraftItemTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftItemTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftItemTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftItemTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftItemTypes2["LightBlueDye"] = "minecraft:light_blue_dye";
  MinecraftItemTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftItemTypes2["LightBlueHarness"] = "minecraft:light_blue_harness";
  MinecraftItemTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftItemTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftItemTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftItemTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftItemTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftItemTypes2["LightGrayBundle"] = "minecraft:light_gray_bundle";
  MinecraftItemTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftItemTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftItemTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftItemTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftItemTypes2["LightGrayDye"] = "minecraft:light_gray_dye";
  MinecraftItemTypes2["LightGrayHarness"] = "minecraft:light_gray_harness";
  MinecraftItemTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftItemTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftItemTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftItemTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftItemTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftItemTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftItemTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftItemTypes2["Lilac"] = "minecraft:lilac";
  MinecraftItemTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftItemTypes2["LimeBundle"] = "minecraft:lime_bundle";
  MinecraftItemTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftItemTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftItemTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftItemTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftItemTypes2["LimeDye"] = "minecraft:lime_dye";
  MinecraftItemTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftItemTypes2["LimeHarness"] = "minecraft:lime_harness";
  MinecraftItemTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftItemTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftItemTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftItemTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftItemTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftItemTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftItemTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftItemTypes2["LlamaSpawnEgg"] = "minecraft:llama_spawn_egg";
  MinecraftItemTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftItemTypes2["LodestoneCompass"] = "minecraft:lodestone_compass";
  MinecraftItemTypes2["Loom"] = "minecraft:loom";
  MinecraftItemTypes2["Mace"] = "minecraft:mace";
  MinecraftItemTypes2["MagentaBundle"] = "minecraft:magenta_bundle";
  MinecraftItemTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftItemTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftItemTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftItemTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftItemTypes2["MagentaDye"] = "minecraft:magenta_dye";
  MinecraftItemTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftItemTypes2["MagentaHarness"] = "minecraft:magenta_harness";
  MinecraftItemTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftItemTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftItemTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftItemTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftItemTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftItemTypes2["Magma"] = "minecraft:magma";
  MinecraftItemTypes2["MagmaCream"] = "minecraft:magma_cream";
  MinecraftItemTypes2["MagmaCubeSpawnEgg"] = "minecraft:magma_cube_spawn_egg";
  MinecraftItemTypes2["MangroveBoat"] = "minecraft:mangrove_boat";
  MinecraftItemTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftItemTypes2["MangroveChestBoat"] = "minecraft:mangrove_chest_boat";
  MinecraftItemTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftItemTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftItemTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftItemTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftItemTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftItemTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftItemTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftItemTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftItemTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftItemTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftItemTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftItemTypes2["MangroveSign"] = "minecraft:mangrove_sign";
  MinecraftItemTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftItemTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftItemTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftItemTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftItemTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftItemTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftItemTypes2["MelonSeeds"] = "minecraft:melon_seeds";
  MinecraftItemTypes2["MelonSlice"] = "minecraft:melon_slice";
  MinecraftItemTypes2["MilkBucket"] = "minecraft:milk_bucket";
  MinecraftItemTypes2["Minecart"] = "minecraft:minecart";
  MinecraftItemTypes2["MinerPotterySherd"] = "minecraft:miner_pottery_sherd";
  MinecraftItemTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftItemTypes2["MojangBannerPattern"] = "minecraft:mojang_banner_pattern";
  MinecraftItemTypes2["MooshroomSpawnEgg"] = "minecraft:mooshroom_spawn_egg";
  MinecraftItemTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftItemTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftItemTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftItemTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftItemTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftItemTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftItemTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftItemTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftItemTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftItemTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftItemTypes2["MournerPotterySherd"] = "minecraft:mourner_pottery_sherd";
  MinecraftItemTypes2["Mud"] = "minecraft:mud";
  MinecraftItemTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftItemTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftItemTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftItemTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftItemTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftItemTypes2["MuleSpawnEgg"] = "minecraft:mule_spawn_egg";
  MinecraftItemTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftItemTypes2["MushroomStew"] = "minecraft:mushroom_stew";
  MinecraftItemTypes2["MusicDisc11"] = "minecraft:music_disc_11";
  MinecraftItemTypes2["MusicDisc13"] = "minecraft:music_disc_13";
  MinecraftItemTypes2["MusicDisc5"] = "minecraft:music_disc_5";
  MinecraftItemTypes2["MusicDiscBlocks"] = "minecraft:music_disc_blocks";
  MinecraftItemTypes2["MusicDiscCat"] = "minecraft:music_disc_cat";
  MinecraftItemTypes2["MusicDiscChirp"] = "minecraft:music_disc_chirp";
  MinecraftItemTypes2["MusicDiscCreator"] = "minecraft:music_disc_creator";
  MinecraftItemTypes2["MusicDiscCreatorMusicBox"] = "minecraft:music_disc_creator_music_box";
  MinecraftItemTypes2["MusicDiscFar"] = "minecraft:music_disc_far";
  MinecraftItemTypes2["MusicDiscLavaChicken"] = "minecraft:music_disc_lava_chicken";
  MinecraftItemTypes2["MusicDiscMall"] = "minecraft:music_disc_mall";
  MinecraftItemTypes2["MusicDiscMellohi"] = "minecraft:music_disc_mellohi";
  MinecraftItemTypes2["MusicDiscOtherside"] = "minecraft:music_disc_otherside";
  MinecraftItemTypes2["MusicDiscPigstep"] = "minecraft:music_disc_pigstep";
  MinecraftItemTypes2["MusicDiscPrecipice"] = "minecraft:music_disc_precipice";
  MinecraftItemTypes2["MusicDiscRelic"] = "minecraft:music_disc_relic";
  MinecraftItemTypes2["MusicDiscStal"] = "minecraft:music_disc_stal";
  MinecraftItemTypes2["MusicDiscStrad"] = "minecraft:music_disc_strad";
  MinecraftItemTypes2["MusicDiscTears"] = "minecraft:music_disc_tears";
  MinecraftItemTypes2["MusicDiscWait"] = "minecraft:music_disc_wait";
  MinecraftItemTypes2["MusicDiscWard"] = "minecraft:music_disc_ward";
  MinecraftItemTypes2["Mutton"] = "minecraft:mutton";
  MinecraftItemTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftItemTypes2["NameTag"] = "minecraft:name_tag";
  MinecraftItemTypes2["NautilusShell"] = "minecraft:nautilus_shell";
  MinecraftItemTypes2["NautilusSpawnEgg"] = "minecraft:nautilus_spawn_egg";
  MinecraftItemTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftItemTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftItemTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftItemTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftItemTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftItemTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftItemTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftItemTypes2["NetherStar"] = "minecraft:nether_star";
  MinecraftItemTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftItemTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftItemTypes2["Netherbrick"] = "minecraft:netherbrick";
  MinecraftItemTypes2["NetheriteAxe"] = "minecraft:netherite_axe";
  MinecraftItemTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftItemTypes2["NetheriteBoots"] = "minecraft:netherite_boots";
  MinecraftItemTypes2["NetheriteChestplate"] = "minecraft:netherite_chestplate";
  MinecraftItemTypes2["NetheriteHelmet"] = "minecraft:netherite_helmet";
  MinecraftItemTypes2["NetheriteHoe"] = "minecraft:netherite_hoe";
  MinecraftItemTypes2["NetheriteHorseArmor"] = "minecraft:netherite_horse_armor";
  MinecraftItemTypes2["NetheriteIngot"] = "minecraft:netherite_ingot";
  MinecraftItemTypes2["NetheriteLeggings"] = "minecraft:netherite_leggings";
  MinecraftItemTypes2["NetheriteNautilusArmor"] = "minecraft:netherite_nautilus_armor";
  MinecraftItemTypes2["NetheritePickaxe"] = "minecraft:netherite_pickaxe";
  MinecraftItemTypes2["NetheriteScrap"] = "minecraft:netherite_scrap";
  MinecraftItemTypes2["NetheriteShovel"] = "minecraft:netherite_shovel";
  MinecraftItemTypes2["NetheriteSpear"] = "minecraft:netherite_spear";
  MinecraftItemTypes2["NetheriteSword"] = "minecraft:netherite_sword";
  MinecraftItemTypes2["NetheriteUpgradeSmithingTemplate"] = "minecraft:netherite_upgrade_smithing_template";
  MinecraftItemTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftItemTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftItemTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftItemTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftItemTypes2["OakBoat"] = "minecraft:oak_boat";
  MinecraftItemTypes2["OakChestBoat"] = "minecraft:oak_chest_boat";
  MinecraftItemTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftItemTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftItemTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftItemTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftItemTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftItemTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftItemTypes2["OakShelf"] = "minecraft:oak_shelf";
  MinecraftItemTypes2["OakSign"] = "minecraft:oak_sign";
  MinecraftItemTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftItemTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftItemTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftItemTypes2["Observer"] = "minecraft:observer";
  MinecraftItemTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftItemTypes2["OcelotSpawnEgg"] = "minecraft:ocelot_spawn_egg";
  MinecraftItemTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftItemTypes2["OminousBottle"] = "minecraft:ominous_bottle";
  MinecraftItemTypes2["OminousTrialKey"] = "minecraft:ominous_trial_key";
  MinecraftItemTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftItemTypes2["OrangeBundle"] = "minecraft:orange_bundle";
  MinecraftItemTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftItemTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftItemTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftItemTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftItemTypes2["OrangeDye"] = "minecraft:orange_dye";
  MinecraftItemTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftItemTypes2["OrangeHarness"] = "minecraft:orange_harness";
  MinecraftItemTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftItemTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftItemTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftItemTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftItemTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftItemTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftItemTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftItemTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftItemTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftItemTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftItemTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftItemTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftItemTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftItemTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftItemTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftItemTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftItemTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftItemTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftItemTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftItemTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftItemTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftItemTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftItemTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftItemTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftItemTypes2["Painting"] = "minecraft:painting";
  MinecraftItemTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftItemTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftItemTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftItemTypes2["PaleOakBoat"] = "minecraft:pale_oak_boat";
  MinecraftItemTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftItemTypes2["PaleOakChestBoat"] = "minecraft:pale_oak_chest_boat";
  MinecraftItemTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftItemTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftItemTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftItemTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftItemTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftItemTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftItemTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftItemTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftItemTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftItemTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftItemTypes2["PaleOakSign"] = "minecraft:pale_oak_sign";
  MinecraftItemTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftItemTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftItemTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftItemTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftItemTypes2["PandaSpawnEgg"] = "minecraft:panda_spawn_egg";
  MinecraftItemTypes2["Paper"] = "minecraft:paper";
  MinecraftItemTypes2["ParchedSpawnEgg"] = "minecraft:parched_spawn_egg";
  MinecraftItemTypes2["ParrotSpawnEgg"] = "minecraft:parrot_spawn_egg";
  MinecraftItemTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftItemTypes2["Peony"] = "minecraft:peony";
  MinecraftItemTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftItemTypes2["PhantomMembrane"] = "minecraft:phantom_membrane";
  MinecraftItemTypes2["PhantomSpawnEgg"] = "minecraft:phantom_spawn_egg";
  MinecraftItemTypes2["PigSpawnEgg"] = "minecraft:pig_spawn_egg";
  MinecraftItemTypes2["PiglinBannerPattern"] = "minecraft:piglin_banner_pattern";
  MinecraftItemTypes2["PiglinBruteSpawnEgg"] = "minecraft:piglin_brute_spawn_egg";
  MinecraftItemTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftItemTypes2["PiglinSpawnEgg"] = "minecraft:piglin_spawn_egg";
  MinecraftItemTypes2["PillagerSpawnEgg"] = "minecraft:pillager_spawn_egg";
  MinecraftItemTypes2["PinkBundle"] = "minecraft:pink_bundle";
  MinecraftItemTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftItemTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftItemTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftItemTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftItemTypes2["PinkDye"] = "minecraft:pink_dye";
  MinecraftItemTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftItemTypes2["PinkHarness"] = "minecraft:pink_harness";
  MinecraftItemTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftItemTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftItemTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftItemTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftItemTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftItemTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftItemTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftItemTypes2["Piston"] = "minecraft:piston";
  MinecraftItemTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftItemTypes2["PitcherPod"] = "minecraft:pitcher_pod";
  MinecraftItemTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftItemTypes2["PlentyPotterySherd"] = "minecraft:plenty_pottery_sherd";
  MinecraftItemTypes2["Podzol"] = "minecraft:podzol";
  MinecraftItemTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftItemTypes2["PoisonousPotato"] = "minecraft:poisonous_potato";
  MinecraftItemTypes2["PolarBearSpawnEgg"] = "minecraft:polar_bear_spawn_egg";
  MinecraftItemTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftItemTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftItemTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftItemTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftItemTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftItemTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftItemTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftItemTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftItemTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftItemTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftItemTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftItemTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftItemTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftItemTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftItemTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftItemTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftItemTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftItemTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftItemTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftItemTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftItemTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftItemTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftItemTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftItemTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftItemTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftItemTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftItemTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftItemTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftItemTypes2["PoppedChorusFruit"] = "minecraft:popped_chorus_fruit";
  MinecraftItemTypes2["Poppy"] = "minecraft:poppy";
  MinecraftItemTypes2["Porkchop"] = "minecraft:porkchop";
  MinecraftItemTypes2["Potato"] = "minecraft:potato";
  MinecraftItemTypes2["Potion"] = "minecraft:potion";
  MinecraftItemTypes2["PowderSnowBucket"] = "minecraft:powder_snow_bucket";
  MinecraftItemTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftItemTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftItemTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftItemTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftItemTypes2["PrismarineCrystals"] = "minecraft:prismarine_crystals";
  MinecraftItemTypes2["PrismarineShard"] = "minecraft:prismarine_shard";
  MinecraftItemTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftItemTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftItemTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftItemTypes2["PrizePotterySherd"] = "minecraft:prize_pottery_sherd";
  MinecraftItemTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftItemTypes2["PufferfishBucket"] = "minecraft:pufferfish_bucket";
  MinecraftItemTypes2["PufferfishSpawnEgg"] = "minecraft:pufferfish_spawn_egg";
  MinecraftItemTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftItemTypes2["PumpkinPie"] = "minecraft:pumpkin_pie";
  MinecraftItemTypes2["PumpkinSeeds"] = "minecraft:pumpkin_seeds";
  MinecraftItemTypes2["PurpleBundle"] = "minecraft:purple_bundle";
  MinecraftItemTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftItemTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftItemTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftItemTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftItemTypes2["PurpleDye"] = "minecraft:purple_dye";
  MinecraftItemTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftItemTypes2["PurpleHarness"] = "minecraft:purple_harness";
  MinecraftItemTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftItemTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftItemTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftItemTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftItemTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftItemTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftItemTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftItemTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftItemTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftItemTypes2["Quartz"] = "minecraft:quartz";
  MinecraftItemTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftItemTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftItemTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftItemTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftItemTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftItemTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftItemTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftItemTypes2["RabbitFoot"] = "minecraft:rabbit_foot";
  MinecraftItemTypes2["RabbitHide"] = "minecraft:rabbit_hide";
  MinecraftItemTypes2["RabbitSpawnEgg"] = "minecraft:rabbit_spawn_egg";
  MinecraftItemTypes2["RabbitStew"] = "minecraft:rabbit_stew";
  MinecraftItemTypes2["Rail"] = "minecraft:rail";
  MinecraftItemTypes2["RaiserArmorTrimSmithingTemplate"] = "minecraft:raiser_armor_trim_smithing_template";
  MinecraftItemTypes2["RavagerSpawnEgg"] = "minecraft:ravager_spawn_egg";
  MinecraftItemTypes2["RawCopper"] = "minecraft:raw_copper";
  MinecraftItemTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftItemTypes2["RawGold"] = "minecraft:raw_gold";
  MinecraftItemTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftItemTypes2["RawIron"] = "minecraft:raw_iron";
  MinecraftItemTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftItemTypes2["RecoveryCompass"] = "minecraft:recovery_compass";
  MinecraftItemTypes2["RedBundle"] = "minecraft:red_bundle";
  MinecraftItemTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftItemTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftItemTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftItemTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftItemTypes2["RedDye"] = "minecraft:red_dye";
  MinecraftItemTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftItemTypes2["RedHarness"] = "minecraft:red_harness";
  MinecraftItemTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftItemTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftItemTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftItemTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftItemTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftItemTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftItemTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftItemTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftItemTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftItemTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftItemTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftItemTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftItemTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftItemTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftItemTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftItemTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftItemTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftItemTypes2["Redstone"] = "minecraft:redstone";
  MinecraftItemTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftItemTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftItemTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftItemTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftItemTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftItemTypes2["Repeater"] = "minecraft:repeater";
  MinecraftItemTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftItemTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftItemTypes2["ResinBrick"] = "minecraft:resin_brick";
  MinecraftItemTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftItemTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftItemTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftItemTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftItemTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftItemTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftItemTypes2["RibArmorTrimSmithingTemplate"] = "minecraft:rib_armor_trim_smithing_template";
  MinecraftItemTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftItemTypes2["RottenFlesh"] = "minecraft:rotten_flesh";
  MinecraftItemTypes2["Saddle"] = "minecraft:saddle";
  MinecraftItemTypes2["Salmon"] = "minecraft:salmon";
  MinecraftItemTypes2["SalmonBucket"] = "minecraft:salmon_bucket";
  MinecraftItemTypes2["SalmonSpawnEgg"] = "minecraft:salmon_spawn_egg";
  MinecraftItemTypes2["Sand"] = "minecraft:sand";
  MinecraftItemTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftItemTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftItemTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftItemTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftItemTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftItemTypes2["ScrapePotterySherd"] = "minecraft:scrape_pottery_sherd";
  MinecraftItemTypes2["Sculk"] = "minecraft:sculk";
  MinecraftItemTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftItemTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftItemTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftItemTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftItemTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftItemTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftItemTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftItemTypes2["SentryArmorTrimSmithingTemplate"] = "minecraft:sentry_armor_trim_smithing_template";
  MinecraftItemTypes2["ShaperArmorTrimSmithingTemplate"] = "minecraft:shaper_armor_trim_smithing_template";
  MinecraftItemTypes2["SheafPotterySherd"] = "minecraft:sheaf_pottery_sherd";
  MinecraftItemTypes2["Shears"] = "minecraft:shears";
  MinecraftItemTypes2["SheepSpawnEgg"] = "minecraft:sheep_spawn_egg";
  MinecraftItemTypes2["ShelterPotterySherd"] = "minecraft:shelter_pottery_sherd";
  MinecraftItemTypes2["Shield"] = "minecraft:shield";
  MinecraftItemTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftItemTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftItemTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftItemTypes2["ShulkerShell"] = "minecraft:shulker_shell";
  MinecraftItemTypes2["ShulkerSpawnEgg"] = "minecraft:shulker_spawn_egg";
  MinecraftItemTypes2["SilenceArmorTrimSmithingTemplate"] = "minecraft:silence_armor_trim_smithing_template";
  MinecraftItemTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftItemTypes2["SilverfishSpawnEgg"] = "minecraft:silverfish_spawn_egg";
  MinecraftItemTypes2["SkeletonHorseSpawnEgg"] = "minecraft:skeleton_horse_spawn_egg";
  MinecraftItemTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftItemTypes2["SkeletonSpawnEgg"] = "minecraft:skeleton_spawn_egg";
  MinecraftItemTypes2["SkullBannerPattern"] = "minecraft:skull_banner_pattern";
  MinecraftItemTypes2["SkullPotterySherd"] = "minecraft:skull_pottery_sherd";
  MinecraftItemTypes2["Slime"] = "minecraft:slime";
  MinecraftItemTypes2["SlimeBall"] = "minecraft:slime_ball";
  MinecraftItemTypes2["SlimeSpawnEgg"] = "minecraft:slime_spawn_egg";
  MinecraftItemTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftItemTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftItemTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftItemTypes2["Smoker"] = "minecraft:smoker";
  MinecraftItemTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftItemTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftItemTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftItemTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftItemTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftItemTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftItemTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftItemTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftItemTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftItemTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftItemTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftItemTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftItemTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftItemTypes2["SnifferSpawnEgg"] = "minecraft:sniffer_spawn_egg";
  MinecraftItemTypes2["SnortPotterySherd"] = "minecraft:snort_pottery_sherd";
  MinecraftItemTypes2["SnoutArmorTrimSmithingTemplate"] = "minecraft:snout_armor_trim_smithing_template";
  MinecraftItemTypes2["Snow"] = "minecraft:snow";
  MinecraftItemTypes2["SnowGolemSpawnEgg"] = "minecraft:snow_golem_spawn_egg";
  MinecraftItemTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftItemTypes2["Snowball"] = "minecraft:snowball";
  MinecraftItemTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftItemTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftItemTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftItemTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftItemTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftItemTypes2["SpiderEye"] = "minecraft:spider_eye";
  MinecraftItemTypes2["SpiderSpawnEgg"] = "minecraft:spider_spawn_egg";
  MinecraftItemTypes2["SpireArmorTrimSmithingTemplate"] = "minecraft:spire_armor_trim_smithing_template";
  MinecraftItemTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftItemTypes2["Sponge"] = "minecraft:sponge";
  MinecraftItemTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftItemTypes2["SpruceBoat"] = "minecraft:spruce_boat";
  MinecraftItemTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftItemTypes2["SpruceChestBoat"] = "minecraft:spruce_chest_boat";
  MinecraftItemTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftItemTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftItemTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftItemTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftItemTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftItemTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftItemTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftItemTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftItemTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftItemTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftItemTypes2["SpruceSign"] = "minecraft:spruce_sign";
  MinecraftItemTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftItemTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftItemTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftItemTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftItemTypes2["Spyglass"] = "minecraft:spyglass";
  MinecraftItemTypes2["SquidSpawnEgg"] = "minecraft:squid_spawn_egg";
  MinecraftItemTypes2["Stick"] = "minecraft:stick";
  MinecraftItemTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftItemTypes2["Stone"] = "minecraft:stone";
  MinecraftItemTypes2["StoneAxe"] = "minecraft:stone_axe";
  MinecraftItemTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftItemTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftItemTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftItemTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftItemTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftItemTypes2["StoneHoe"] = "minecraft:stone_hoe";
  MinecraftItemTypes2["StonePickaxe"] = "minecraft:stone_pickaxe";
  MinecraftItemTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftItemTypes2["StoneShovel"] = "minecraft:stone_shovel";
  MinecraftItemTypes2["StoneSpear"] = "minecraft:stone_spear";
  MinecraftItemTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftItemTypes2["StoneSword"] = "minecraft:stone_sword";
  MinecraftItemTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftItemTypes2["StraySpawnEgg"] = "minecraft:stray_spawn_egg";
  MinecraftItemTypes2["StriderSpawnEgg"] = "minecraft:strider_spawn_egg";
  MinecraftItemTypes2["String"] = "minecraft:string";
  MinecraftItemTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftItemTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftItemTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftItemTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftItemTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftItemTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftItemTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftItemTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftItemTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftItemTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftItemTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftItemTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftItemTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftItemTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftItemTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftItemTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftItemTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftItemTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftItemTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftItemTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftItemTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftItemTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftItemTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftItemTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftItemTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftItemTypes2["Sugar"] = "minecraft:sugar";
  MinecraftItemTypes2["SugarCane"] = "minecraft:sugar_cane";
  MinecraftItemTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftItemTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftItemTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftItemTypes2["SuspiciousStew"] = "minecraft:suspicious_stew";
  MinecraftItemTypes2["SweetBerries"] = "minecraft:sweet_berries";
  MinecraftItemTypes2["TadpoleBucket"] = "minecraft:tadpole_bucket";
  MinecraftItemTypes2["TadpoleSpawnEgg"] = "minecraft:tadpole_spawn_egg";
  MinecraftItemTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftItemTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftItemTypes2["Target"] = "minecraft:target";
  MinecraftItemTypes2["TideArmorTrimSmithingTemplate"] = "minecraft:tide_armor_trim_smithing_template";
  MinecraftItemTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftItemTypes2["Tnt"] = "minecraft:tnt";
  MinecraftItemTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftItemTypes2["Torch"] = "minecraft:torch";
  MinecraftItemTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftItemTypes2["TorchflowerSeeds"] = "minecraft:torchflower_seeds";
  MinecraftItemTypes2["TotemOfUndying"] = "minecraft:totem_of_undying";
  MinecraftItemTypes2["TraderLlamaSpawnEgg"] = "minecraft:trader_llama_spawn_egg";
  MinecraftItemTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftItemTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftItemTypes2["TrialKey"] = "minecraft:trial_key";
  MinecraftItemTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftItemTypes2["Trident"] = "minecraft:trident";
  MinecraftItemTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftItemTypes2["TropicalFish"] = "minecraft:tropical_fish";
  MinecraftItemTypes2["TropicalFishBucket"] = "minecraft:tropical_fish_bucket";
  MinecraftItemTypes2["TropicalFishSpawnEgg"] = "minecraft:tropical_fish_spawn_egg";
  MinecraftItemTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftItemTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftItemTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftItemTypes2["Tuff"] = "minecraft:tuff";
  MinecraftItemTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftItemTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftItemTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftItemTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftItemTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftItemTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftItemTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftItemTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftItemTypes2["TurtleHelmet"] = "minecraft:turtle_helmet";
  MinecraftItemTypes2["TurtleScute"] = "minecraft:turtle_scute";
  MinecraftItemTypes2["TurtleSpawnEgg"] = "minecraft:turtle_spawn_egg";
  MinecraftItemTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftItemTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftItemTypes2["Vault"] = "minecraft:vault";
  MinecraftItemTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftItemTypes2["VexArmorTrimSmithingTemplate"] = "minecraft:vex_armor_trim_smithing_template";
  MinecraftItemTypes2["VexSpawnEgg"] = "minecraft:vex_spawn_egg";
  MinecraftItemTypes2["VillagerSpawnEgg"] = "minecraft:villager_spawn_egg";
  MinecraftItemTypes2["VindicatorSpawnEgg"] = "minecraft:vindicator_spawn_egg";
  MinecraftItemTypes2["Vine"] = "minecraft:vine";
  MinecraftItemTypes2["WanderingTraderSpawnEgg"] = "minecraft:wandering_trader_spawn_egg";
  MinecraftItemTypes2["WardArmorTrimSmithingTemplate"] = "minecraft:ward_armor_trim_smithing_template";
  MinecraftItemTypes2["WardenSpawnEgg"] = "minecraft:warden_spawn_egg";
  MinecraftItemTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftItemTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftItemTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftItemTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftItemTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftItemTypes2["WarpedFungusOnAStick"] = "minecraft:warped_fungus_on_a_stick";
  MinecraftItemTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftItemTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftItemTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftItemTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftItemTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftItemTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftItemTypes2["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftItemTypes2["WarpedSign"] = "minecraft:warped_sign";
  MinecraftItemTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftItemTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftItemTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftItemTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftItemTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftItemTypes2["WaterBucket"] = "minecraft:water_bucket";
  MinecraftItemTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftItemTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftItemTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftItemTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftItemTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftItemTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftItemTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftItemTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftItemTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftItemTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftItemTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftItemTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftItemTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftItemTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftItemTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftItemTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftItemTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftItemTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftItemTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftItemTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftItemTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftItemTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftItemTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftItemTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftItemTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftItemTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftItemTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftItemTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftItemTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftItemTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftItemTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftItemTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftItemTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftItemTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftItemTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftItemTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftItemTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftItemTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftItemTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftItemTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftItemTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftItemTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftItemTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftItemTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftItemTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftItemTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftItemTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftItemTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftItemTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftItemTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftItemTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftItemTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftItemTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftItemTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftItemTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftItemTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftItemTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftItemTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftItemTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftItemTypes2["WayfinderArmorTrimSmithingTemplate"] = "minecraft:wayfinder_armor_trim_smithing_template";
  MinecraftItemTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftItemTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftItemTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftItemTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftItemTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftItemTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftItemTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftItemTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftItemTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftItemTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftItemTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftItemTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftItemTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftItemTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftItemTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftItemTypes2["Web"] = "minecraft:web";
  MinecraftItemTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftItemTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftItemTypes2["Wheat"] = "minecraft:wheat";
  MinecraftItemTypes2["WheatSeeds"] = "minecraft:wheat_seeds";
  MinecraftItemTypes2["WhiteBundle"] = "minecraft:white_bundle";
  MinecraftItemTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftItemTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftItemTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftItemTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftItemTypes2["WhiteDye"] = "minecraft:white_dye";
  MinecraftItemTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftItemTypes2["WhiteHarness"] = "minecraft:white_harness";
  MinecraftItemTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftItemTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftItemTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftItemTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftItemTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftItemTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftItemTypes2["WildArmorTrimSmithingTemplate"] = "minecraft:wild_armor_trim_smithing_template";
  MinecraftItemTypes2["Wildflowers"] = "minecraft:wildflowers";
  MinecraftItemTypes2["WindCharge"] = "minecraft:wind_charge";
  MinecraftItemTypes2["WitchSpawnEgg"] = "minecraft:witch_spawn_egg";
  MinecraftItemTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftItemTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftItemTypes2["WitherSkeletonSpawnEgg"] = "minecraft:wither_skeleton_spawn_egg";
  MinecraftItemTypes2["WitherSpawnEgg"] = "minecraft:wither_spawn_egg";
  MinecraftItemTypes2["WolfArmor"] = "minecraft:wolf_armor";
  MinecraftItemTypes2["WolfSpawnEgg"] = "minecraft:wolf_spawn_egg";
  MinecraftItemTypes2["WoodenAxe"] = "minecraft:wooden_axe";
  MinecraftItemTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftItemTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftItemTypes2["WoodenHoe"] = "minecraft:wooden_hoe";
  MinecraftItemTypes2["WoodenPickaxe"] = "minecraft:wooden_pickaxe";
  MinecraftItemTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftItemTypes2["WoodenShovel"] = "minecraft:wooden_shovel";
  MinecraftItemTypes2["WoodenSpear"] = "minecraft:wooden_spear";
  MinecraftItemTypes2["WoodenSword"] = "minecraft:wooden_sword";
  MinecraftItemTypes2["WritableBook"] = "minecraft:writable_book";
  MinecraftItemTypes2["YellowBundle"] = "minecraft:yellow_bundle";
  MinecraftItemTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftItemTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftItemTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftItemTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftItemTypes2["YellowDye"] = "minecraft:yellow_dye";
  MinecraftItemTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftItemTypes2["YellowHarness"] = "minecraft:yellow_harness";
  MinecraftItemTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftItemTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftItemTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftItemTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftItemTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftItemTypes2["ZoglinSpawnEgg"] = "minecraft:zoglin_spawn_egg";
  MinecraftItemTypes2["ZombieHead"] = "minecraft:zombie_head";
  MinecraftItemTypes2["ZombieHorseSpawnEgg"] = "minecraft:zombie_horse_spawn_egg";
  MinecraftItemTypes2["ZombieNautilusSpawnEgg"] = "minecraft:zombie_nautilus_spawn_egg";
  MinecraftItemTypes2["ZombiePigmanSpawnEgg"] = "minecraft:zombie_pigman_spawn_egg";
  MinecraftItemTypes2["ZombieSpawnEgg"] = "minecraft:zombie_spawn_egg";
  MinecraftItemTypes2["ZombieVillagerSpawnEgg"] = "minecraft:zombie_villager_spawn_egg";
  return MinecraftItemTypes2;
})(MinecraftItemTypes || {});
var MinecraftPotionDeliveryTypes = ((MinecraftPotionDeliveryTypes2) => {
  MinecraftPotionDeliveryTypes2["Consume"] = "Consume";
  MinecraftPotionDeliveryTypes2["ThrownLingering"] = "ThrownLingering";
  MinecraftPotionDeliveryTypes2["ThrownSplash"] = "ThrownSplash";
  return MinecraftPotionDeliveryTypes2;
})(MinecraftPotionDeliveryTypes || {});
var MinecraftPotionEffectTypes = ((MinecraftPotionEffectTypes2) => {
  MinecraftPotionEffectTypes2["Awkward"] = "minecraft:awkward";
  MinecraftPotionEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftPotionEffectTypes2["Harming"] = "minecraft:harming";
  MinecraftPotionEffectTypes2["Healing"] = "minecraft:healing";
  MinecraftPotionEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftPotionEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftPotionEffectTypes2["Leaping"] = "minecraft:leaping";
  MinecraftPotionEffectTypes2["LongFireResistance"] = "minecraft:long_fire_resistance";
  MinecraftPotionEffectTypes2["LongInvisibility"] = "minecraft:long_invisibility";
  MinecraftPotionEffectTypes2["LongLeaping"] = "minecraft:long_leaping";
  MinecraftPotionEffectTypes2["LongMundane"] = "minecraft:long_mundane";
  MinecraftPotionEffectTypes2["LongNightvision"] = "minecraft:long_nightvision";
  MinecraftPotionEffectTypes2["LongPoison"] = "minecraft:long_poison";
  MinecraftPotionEffectTypes2["LongRegeneration"] = "minecraft:long_regeneration";
  MinecraftPotionEffectTypes2["LongSlowFalling"] = "minecraft:long_slow_falling";
  MinecraftPotionEffectTypes2["LongSlowness"] = "minecraft:long_slowness";
  MinecraftPotionEffectTypes2["LongStrength"] = "minecraft:long_strength";
  MinecraftPotionEffectTypes2["LongSwiftness"] = "minecraft:long_swiftness";
  MinecraftPotionEffectTypes2["LongTurtleMaster"] = "minecraft:long_turtle_master";
  MinecraftPotionEffectTypes2["LongWaterBreathing"] = "minecraft:long_water_breathing";
  MinecraftPotionEffectTypes2["LongWeakness"] = "minecraft:long_weakness";
  MinecraftPotionEffectTypes2["Mundane"] = "minecraft:mundane";
  MinecraftPotionEffectTypes2["Nightvision"] = "minecraft:nightvision";
  MinecraftPotionEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftPotionEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftPotionEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftPotionEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftPotionEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftPotionEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftPotionEffectTypes2["StrongHarming"] = "minecraft:strong_harming";
  MinecraftPotionEffectTypes2["StrongHealing"] = "minecraft:strong_healing";
  MinecraftPotionEffectTypes2["StrongLeaping"] = "minecraft:strong_leaping";
  MinecraftPotionEffectTypes2["StrongPoison"] = "minecraft:strong_poison";
  MinecraftPotionEffectTypes2["StrongRegeneration"] = "minecraft:strong_regeneration";
  MinecraftPotionEffectTypes2["StrongSlowness"] = "minecraft:strong_slowness";
  MinecraftPotionEffectTypes2["StrongStrength"] = "minecraft:strong_strength";
  MinecraftPotionEffectTypes2["StrongSwiftness"] = "minecraft:strong_swiftness";
  MinecraftPotionEffectTypes2["StrongTurtleMaster"] = "minecraft:strong_turtle_master";
  MinecraftPotionEffectTypes2["Swiftness"] = "minecraft:swiftness";
  MinecraftPotionEffectTypes2["Thick"] = "minecraft:thick";
  MinecraftPotionEffectTypes2["TurtleMaster"] = "minecraft:turtle_master";
  MinecraftPotionEffectTypes2["Water"] = "minecraft:water";
  MinecraftPotionEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftPotionEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftPotionEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftPotionEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftPotionEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftPotionEffectTypes2;
})(MinecraftPotionEffectTypes || {});

// behaviour_pack/scripts-dev/api/minecraft-fetch.ts
import { http as http2, HttpHeader as HttpHeader2, HttpRequest as HttpRequest2, HttpRequestMethod as HttpRequestMethod2 } from "@minecraft/server-net";

// behaviour_pack/scripts-dev/api/token.ts
import { secrets } from "@minecraft/server-admin";
import { http, HttpHeader, HttpRequest, HttpRequestMethod } from "@minecraft/server-net";
var BASE_URL = "http://nexuscore:8000/api";
var cachedToken = null;
var tokenExpiresAt = 0;
async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }
  const clientCredentials = secrets.get("NEXUSCORE_CLIENT_CREDENTIALS_B64");
  const request = new HttpRequest(`${BASE_URL}/auth/token`);
  request.method = HttpRequestMethod.Post;
  request.headers = [
    new HttpHeader("Content-Type", "application/x-www-form-urlencoded"),
    new HttpHeader("Authorization", clientCredentials ? clientCredentials : "")
  ];
  request.body = new URLSearchParams({ grant_type: "client_credentials" }).toString();
  const response = await http.request(request);
  if (response.status !== 200) {
    throw new Error(`OAuth token fetch failed: ${response.status} ${response.body}`);
  }
  const data = JSON.parse(response.body);
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 30) * 1e3;
  return cachedToken;
}
__name(getAccessToken, "getAccessToken");

// behaviour_pack/scripts-dev/api/http-errors.ts
var HttpError = class extends Error {
  static {
    __name(this, "HttpError");
  }
  constructor(status, body) {
    super(`HTTP ${status}: ${body}`);
    this.name = "HttpError";
  }
};
var NotFoundError = class extends HttpError {
  static {
    __name(this, "NotFoundError");
  }
  constructor(body) {
    super(404, body);
    this.name = "NotFoundError";
  }
};
var UnauthorizedError = class extends HttpError {
  static {
    __name(this, "UnauthorizedError");
  }
  constructor(body) {
    super(401, body);
    this.name = "UnauthorizedError";
  }
};

// behaviour_pack/scripts-dev/api/minecraft-fetch.ts
var BASE_URL2 = "http://nexuscore:8000/api";
var METHOD_MAP = {
  GET: HttpRequestMethod2.Get,
  POST: HttpRequestMethod2.Post,
  PUT: HttpRequestMethod2.Put,
  PATCH: HttpRequestMethod2.Put,
  DELETE: HttpRequestMethod2.Delete,
  HEAD: HttpRequestMethod2.Head
};
var minecraftFetch = /* @__PURE__ */ __name(async (url, options = {}) => {
  const token = await getAccessToken();
  const request = new HttpRequest2(`${BASE_URL2}${url}`);
  request.method = METHOD_MAP[(options.method ?? "GET").toUpperCase()] ?? HttpRequestMethod2.Get;
  let extraHeaders = [];
  if (options.headers) {
    if (Array.isArray(options.headers)) {
      extraHeaders = options.headers;
    } else {
      extraHeaders = Object.entries(options.headers);
    }
  }
  request.headers = [
    new HttpHeader2("Content-Type", "application/json"),
    new HttpHeader2("Authorization", `Bearer ${token}`),
    ...extraHeaders.map(([k, v]) => new HttpHeader2(k, v))
  ];
  if (options.body) {
    request.body = options.body.toString();
  } else if (request.method === HttpRequestMethod2.Delete) {
    request.body = "";
  }
  const response = await http2.request(request);
  if (response.status < 200 || response.status >= 300) {
    switch (response.status) {
      case 404:
        throw new NotFoundError(response.body);
      case 401:
        throw new UnauthorizedError(response.body);
      default:
        throw new HttpError(response.status, response.body);
    }
  }
  return JSON.parse(response.body);
}, "minecraftFetch");

// behaviour_pack/scripts-dev/api/nexuscore/worlds/worlds.ts
var getGetWorldV1GuildsMeWorldsGetUrl = /* @__PURE__ */ __name(() => {
  return `/v1/guilds/me/worlds`;
}, "getGetWorldV1GuildsMeWorldsGetUrl");
var getWorldV1GuildsMeWorldsGet = /* @__PURE__ */ __name(async (options) => {
  return minecraftFetch(
    getGetWorldV1GuildsMeWorldsGetUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "getWorldV1GuildsMeWorldsGet");
var getPartialUpdateWorldV1GuildsMeWorldsPatchUrl = /* @__PURE__ */ __name(() => {
  return `/v1/guilds/me/worlds`;
}, "getPartialUpdateWorldV1GuildsMeWorldsPatchUrl");
var partialUpdateWorldV1GuildsMeWorldsPatch = /* @__PURE__ */ __name(async (worldUpdate, options) => {
  return minecraftFetch(
    getPartialUpdateWorldV1GuildsMeWorldsPatchUrl(),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(worldUpdate)
    }
  );
}, "partialUpdateWorldV1GuildsMeWorldsPatch");
var getGetItemV1GuildsMeWorldsItemsItemIdGetUrl = /* @__PURE__ */ __name((itemId) => {
  return `/v1/guilds/me/worlds/items/${itemId}`;
}, "getGetItemV1GuildsMeWorldsItemsItemIdGetUrl");
var getItemV1GuildsMeWorldsItemsItemIdGet = /* @__PURE__ */ __name(async (itemId, options) => {
  return minecraftFetch(
    getGetItemV1GuildsMeWorldsItemsItemIdGetUrl(itemId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getItemV1GuildsMeWorldsItemsItemIdGet");
var getPartialUpdateItemV1GuildsMeWorldsItemsItemIdPatchUrl = /* @__PURE__ */ __name((itemId) => {
  return `/v1/guilds/me/worlds/items/${itemId}`;
}, "getPartialUpdateItemV1GuildsMeWorldsItemsItemIdPatchUrl");
var partialUpdateItemV1GuildsMeWorldsItemsItemIdPatch = /* @__PURE__ */ __name(async (itemId, itemUpdateModel, options) => {
  return minecraftFetch(
    getPartialUpdateItemV1GuildsMeWorldsItemsItemIdPatchUrl(itemId),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(itemUpdateModel)
    }
  );
}, "partialUpdateItemV1GuildsMeWorldsItemsItemIdPatch");

// behaviour_pack/scripts-dev/api/sacrifice.ts
var Item = class _Item {
  static {
    __name(this, "Item");
  }
  constructor(data) {
    this.item_id = data.item_id;
    this.value = data.value;
    this.max_uses = data.max_uses;
    this.depreciation = data.depreciation;
    this.current_uses = data.current_uses;
  }
  static async get_item(item_id) {
    try {
      const item_response = await getItemV1GuildsMeWorldsItemsItemIdGet(item_id);
      const item_data = item_response;
      return new _Item(item_data);
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  }
  async update_item() {
    await partialUpdateItemV1GuildsMeWorldsItemsItemIdPatch(this.item_id, {
      current_uses: this.current_uses
    });
  }
};
var World = class _World {
  static {
    __name(this, "World");
  }
  constructor(data) {
    this.guild_id = data.guild_id;
    this.overworld_border = data.overworld_border;
    this.nether_border = data.nether_border;
    this.end_border = data.end_border;
  }
  static async get_world() {
    try {
      const world_response = await getWorldV1GuildsMeWorldsGet();
      const world_data = world_response;
      return new _World(world_data);
    } catch (error) {
      console.error("Error fetching world:", error);
      throw error;
    }
  }
  async update_world() {
    await partialUpdateWorldV1GuildsMeWorldsPatch({
      overworld_border: this.overworld_border,
      nether_border: this.nether_border,
      end_border: this.end_border
    });
  }
};
var WorldCache = class _WorldCache {
  static {
    __name(this, "WorldCache");
  }
  static async load_world() {
    _WorldCache.world = await World.get_world();
  }
};

// behaviour_pack/scripts-dev/features/border.ts
function borderCheck(player, dimensionID, border_size, warning_range, outside) {
  const position = player.location;
  const distance_2d = Math.sqrt(position.x ** 2 + position.z ** 2);
  if (border_size < distance_2d && outside.indexOf(player.name) == -1) {
    outside.push(player.name);
    console.log(`[Plugin] [Border] Player ${player.name} is outside of the ${dimensionID} border.`);
  } else if (border_size > distance_2d && outside.indexOf(player.name) != -1) {
    outside.splice(outside.indexOf(player.name), 1);
    console.log(`[Plugin] [Border] Player ${player.name} has re-entered the ${dimensionID} border.`);
  }
  if (border_size < distance_2d) {
    world.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar \xA7o\xA7iI shouldn't go any further. It's too dangerous here.`);
    world.getDimension(dimensionID).runCommand(`effect "${player.name}" blindness 4 2`);
    player.applyDamage(1.3, { cause: EntityDamageCause.void });
  } else if (border_size - 20 < distance_2d) {
    world.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar \xA7o\xA7iThe Monolith's protection is wearing off. I can feel it...`);
  }
  if (border_size - 100 < distance_2d && warning_range.indexOf(player.name) == -1) {
    warning_range.push(player.name);
    world.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar \xA7o\xA7iMaybe I should start heading back now...`);
  } else if (border_size - 100 > distance_2d && warning_range.indexOf(player.name) != -1) {
    warning_range.splice(warning_range.indexOf(player.name), 1);
  }
}
__name(borderCheck, "borderCheck");
function loadWorldBorder() {
  world.afterEvents.worldLoad.subscribe(() => {
    WorldCache.load_world().then();
    let players_100_blocks_away = { overworld: [], nether: [], end: [] };
    let players_outside_border = { overworld: [], nether: [], end: [] };
    system.runInterval(() => {
      let players = {
        overworld: world.getDimension(MinecraftDimensionTypes.Overworld).getPlayers(),
        nether: world.getDimension(MinecraftDimensionTypes.Nether).getPlayers(),
        end: world.getDimension(MinecraftDimensionTypes.TheEnd).getPlayers()
      };
      players.overworld.forEach((player) => {
        borderCheck(player, MinecraftDimensionTypes.Overworld, WorldCache.world.overworld_border, players_100_blocks_away.overworld, players_outside_border.overworld);
      });
      players.nether.forEach((player) => {
        borderCheck(player, MinecraftDimensionTypes.Nether, WorldCache.world.nether_border, players_100_blocks_away.nether, players_outside_border.nether);
      });
      players.end.forEach((player) => {
        borderCheck(player, MinecraftDimensionTypes.TheEnd, WorldCache.world.end_border, players_100_blocks_away.end, players_outside_border.end);
      });
    }, 20);
  });
}
__name(loadWorldBorder, "loadWorldBorder");

// behaviour_pack/scripts-dev/features/items/elytra-mending.ts
import { EquipmentSlot, world as world2, system as system2, EntityComponentTypes, ItemComponentTypes, EnchantmentType } from "@minecraft/server";
function elytraCheck(player) {
  const player_equipment = player.getComponent(EntityComponentTypes.Equippable);
  const item = player_equipment?.getEquipment(EquipmentSlot.Chest);
  if (item) {
    const enchantments = item?.getComponent(ItemComponentTypes.Enchantable);
    const has_mending = enchantments?.hasEnchantment(MinecraftEnchantmentTypes.Mending);
    if (has_mending && item?.typeId == MinecraftItemTypes.Elytra) {
      if (!enchantments?.hasEnchantment(MinecraftEnchantmentTypes.Vanishing)) {
        enchantments?.addEnchantment(
          {
            type: new EnchantmentType(MinecraftEnchantmentTypes.Vanishing),
            level: 1
          }
        );
      }
      enchantments?.removeEnchantment(MinecraftEnchantmentTypes.Mending);
      const durability_component = item.getComponent(ItemComponentTypes.Durability);
      if (durability_component) {
        durability_component.damage = durability_component.maxDurability;
      }
      item.setLore([`
\xA7o"My wings are cursed!"`]);
      world2.getDimension("overworld").runCommand(`title "${player.name}" actionbar \xA7o\xA7iMy Elytra feels different...`);
      player_equipment?.setEquipment(EquipmentSlot.Chest, item);
      console.log(`[ElytraCheck] Player ${player.name} has elytra with mending. Removing Mending.`);
    }
  }
}
__name(elytraCheck, "elytraCheck");
function loadRemoveMendingFromElytraLoop() {
  system2.runInterval(() => {
    let playerlist = world2.getPlayers();
    playerlist.forEach((player) => {
      elytraCheck(player);
    });
  }, 20);
}
__name(loadRemoveMendingFromElytraLoop, "loadRemoveMendingFromElytraLoop");

// behaviour_pack/scripts-dev/features/items/champion-set.ts
import { EntityComponentTypes as EntityComponentTypes2, EquipmentSlot as EquipmentSlot2, MolangVariableMap, system as system3, world as world3 } from "@minecraft/server";
function champion(player) {
  const molang = new MolangVariableMap();
  molang.setColorRGB("variable.color", { red: 1, green: 0.913, blue: 0.576 });
  const position = player.location;
  const equippable = player.getComponent(EntityComponentTypes2.Equippable);
  let equipped = 0;
  equippable?.getEquipment(EquipmentSlot2.Head)?.hasTag("amethyst:champion") ? equipped++ : null;
  equippable?.getEquipment(EquipmentSlot2.Chest)?.hasTag("amethyst:champion") ? equipped++ : null;
  equippable?.getEquipment(EquipmentSlot2.Legs)?.hasTag("amethyst:champion") ? equipped++ : null;
  equippable?.getEquipment(EquipmentSlot2.Feet)?.hasTag("amethyst:champion") ? equipped++ : null;
  if (equipped > 0 && Math.random() <= equipped / 5) {
    const radius = 3;
    let random_location = {
      x: position.x + Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1),
      y: position.y + 0.5 + Math.floor(Math.random() * radius),
      z: position.z + Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1)
    };
    player.dimension.spawnParticle("minecraft:glow_particle", random_location, molang);
  }
}
__name(champion, "champion");
function loadChampionSet() {
  system3.runInterval(() => {
    let playerlist = world3.getPlayers();
    playerlist.forEach((player) => {
      champion(player);
    });
  }, 4);
}
__name(loadChampionSet, "loadChampionSet");

// behaviour_pack/scripts-dev/features/items/totem-of-togetherness.ts
import { EntityComponentTypes as EntityComponentTypes3, EquipmentSlot as EquipmentSlot3, system as system4, world as world4 } from "@minecraft/server";
var healthboost = MinecraftEffectTypes.HealthBoost;
function togetherness(player) {
  const position = player.location;
  const equippable = player.getComponent(EntityComponentTypes3.Equippable);
  const offhand = equippable?.getEquipment(EquipmentSlot3.Offhand);
  const mainhand = equippable?.getEquipment(EquipmentSlot3.Mainhand);
  if (offhand?.hasTag("amethyst:togetherness") || mainhand?.hasTag("amethyst:togetherness")) {
    const uniqueplayerslist = player.dimension.getPlayers({
      location: position,
      maxDistance: 16,
      excludeNames: [player.name]
    });
    const effect_level = Math.min(5, uniqueplayerslist.length);
    if (effect_level - 1 >= 0) {
      player.addEffect(healthboost, 40, { amplifier: effect_level - 1, showParticles: false });
    }
  }
}
__name(togetherness, "togetherness");
function loadTotemOfTogethernessLoop() {
  system4.runInterval(() => {
    let playerlist = world4.getPlayers();
    playerlist.forEach((player) => {
      togetherness(player);
    });
  }, 20);
}
__name(loadTotemOfTogethernessLoop, "loadTotemOfTogethernessLoop");

// behaviour_pack/scripts-dev/features/items/index.ts
function loadItemComponents() {
  loadRemoveMendingFromElytraLoop();
  loadChampionSet();
  loadTotemOfTogethernessLoop();
}
__name(loadItemComponents, "loadItemComponents");

// behaviour_pack/scripts-dev/features/blocks/fungus-spread.ts
import {
  system as system5,
  TicksPerSecond
} from "@minecraft/server";
function loadFungusSpreadComponent() {
  function fungus_spread(event) {
    if (Math.random() < 0.5) {
      const adjacent_blocks = [event.block.above(), event.block.below(), event.block.south(), event.block.west(), event.block.north(), event.block.east()];
      const random_index = Math.floor(Math.random() * adjacent_blocks.length);
      const random_adjacent_block = adjacent_blocks[random_index];
      if (random_adjacent_block?.typeId == MinecraftBlockTypes.Air) {
        random_adjacent_block.setType(event.block.typeId);
      }
    }
  }
  __name(fungus_spread, "fungus_spread");
  function fungus_destroy(event) {
    const random_choice = Math.random();
    const mobs = [
      MinecraftEntityTypes.CaveSpider,
      MinecraftEntityTypes.Spider,
      MinecraftEntityTypes.Zombie,
      MinecraftEntityTypes.Stray,
      MinecraftEntityTypes.Witch,
      MinecraftEntityTypes.Blaze,
      MinecraftEntityTypes.Frog,
      MinecraftEntityTypes.Strider,
      MinecraftEntityTypes.GlowSquid,
      MinecraftEntityTypes.Goat
    ];
    const effects = [
      MinecraftEffectTypes.Hunger,
      MinecraftEffectTypes.Blindness,
      MinecraftEffectTypes.Weakness,
      MinecraftEffectTypes.Poison,
      MinecraftEffectTypes.Haste,
      MinecraftEffectTypes.Invisibility,
      MinecraftEffectTypes.MiningFatigue,
      MinecraftEffectTypes.Regeneration
    ];
    if (random_choice < 0.5) {
      const entity = event.dimension.spawnEntity(
        mobs[Math.floor(Math.random() * mobs.length)],
        event.block.location
      );
      system5.runTimeout(() => {
        if (entity.isValid) {
          entity.kill();
        }
      }, TicksPerSecond * 120);
    } else if (random_choice > 0.5) {
      event.player?.addEffect(
        effects[Math.floor(Math.random() * effects.length)],
        TicksPerSecond * 30
      );
    }
  }
  __name(fungus_destroy, "fungus_destroy");
  system5.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(
      "amethyst:fungus_spread",
      {
        onRandomTick(event) {
          fungus_spread(event);
        },
        onPlayerBreak(event) {
          fungus_destroy(event);
        }
      }
    );
  });
}
__name(loadFungusSpreadComponent, "loadFungusSpreadComponent");

// behaviour_pack/scripts-dev/features/blocks/glitch-block.ts
import { system as system8 } from "@minecraft/server";

// behaviour_pack/scripts-dev/utils/death_messages.ts
var DeathMessage = class {
  static {
    __name(this, "DeathMessage");
  }
  static random_pvp(killer, dead) {
    const deathMessages = [
      // Quirky messages
      `${killer} ended ${dead}'s life with style`,
      `${killer} cut ${dead}'s journey short`,
      `${killer} turned ${dead} into a spectator`,
      `${killer} sent ${dead} on a one-way trip to respawn`,
      `${killer} said goodbye to ${dead}, permanently`,
      `${killer} reminded ${dead} why armor is important`,
      `${killer} made sure ${dead} won't see another sunrise`,
      `${killer} put an end to ${dead}'s ambitions`,
      `${killer} decided ${dead} needed a timeout`,
      `${killer} proved ${dead} wasn't ready for the fight`,
      `${killer} gave ${dead} a firsthand lesson in humility`,
      `${killer} turned ${dead} into an unwilling fireworks display`,
      `${killer} showed ${dead} the real power of an enchanted weapon`,
      `${killer} made ${dead} regret forgetting their shield`,
      `${killer} casually yeeted ${dead} into the afterlife`,
      `${killer} turned ${dead} into a pi\xF1ata full of loot`,
      `${killer} made ${dead} wonder why they even logged in today`,
      `${killer} turned ${dead}'s health bar into a suggestion`,
      `${killer} gave ${dead} a one-way ticket to spectator mode`,
      // More serious messages
      `${killer} struck the final blow, ending ${dead}'s fight`,
      `${killer} executed ${dead} with precision and skill`,
      `${killer} proved to be the stronger warrior against ${dead}`,
      `${killer} ended ${dead}'s journey with a decisive strike`,
      `${killer} overwhelmed ${dead} with superior tactics`,
      `${killer} delivered a critical hit, silencing ${dead}`,
      `${killer} claimed victory over ${dead} in a fierce battle`,
      `${killer} vanquished ${dead}, leaving no room for doubt`,
      `${killer} dominated ${dead}, proving their superiority`,
      `${killer} took ${dead}'s life in a moment of triumph`,
      `${killer} emerged victorious over ${dead} in combat`,
      `${killer} brought an end to ${dead}'s reign on the battlefield`,
      `${killer} showed no mercy and finished off ${dead}`,
      `${killer} shattered ${dead}'s defenses, claiming victory`,
      `${killer} crushed ${dead} with unrelenting force`,
      `${killer} left no chance for ${dead} to recover`,
      `${killer} turned the tide of battle, defeating ${dead}`,
      `${killer} demonstrated unmatched skill, taking down ${dead}`,
      `${killer} secured their dominance by defeating ${dead}`
    ];
    return deathMessages[Math.floor(Math.random() * deathMessages.length)];
  }
  static random_pve(player, entity) {
    entity = entity.replace("minecraft:", "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    const deathMessages = [
      // Funny Death Messages
      `${player} picked a fight with a ${entity} and lost... miserably`,
      `${player} thought they could outsmart a ${entity}. Spoiler: They couldn't`,
      `${player} tried to pet a ${entity}. It was not in the mood`,
      `${player} challenged a ${entity} to a duel. Only one of them read the rules`,
      `${player} learned that ${entity}s are not for cuddling`,
      `${player} thought they were the hunter. The ${entity} disagreed`,
      `${player} got turned into loot by a ${entity}`,
      `${player} thought they could YOLO past a ${entity}. They YOLO'd too hard`,
      `${player} underestimated the bite of a ${entity}`,
      `${player} wanted to be brave. The ${entity} wanted them to respawn`,
      `${player} was schooled by a ${entity} in PvP 101`,
      `${player} tried to befriend a ${entity}. It wasn't interested`,
      `${player} was taught a hard lesson in humility by a ${entity}`,
      `${player} learned the definition of pain from a ${entity}`,
      `${player} thought shields were optional. The ${entity} proved otherwise`,
      `${player} charged at a ${entity} with confidence. The ${entity} sent them back to respawn`,
      `${player} tried to roast a ${entity}, but it roasted them instead`,
      `${player} got smacked into next Tuesday by a ${entity}`,
      `${player} tried diplomacy with a ${entity}. The ${entity} voted "No."`,
      `${player} found out what happens when you ignore ${entity}s`,
      // Serious Death Messages
      `${player} fought valiantly but was slain by a ${entity}`,
      `${player} fell in battle to a ${entity}`,
      `${player} was overpowered by the relentless assault of a ${entity}`,
      `${player} met their end at the hands of a ${entity}`,
      `${player} was defeated by the ferocity of a ${entity}`,
      `${player} tried to stand their ground but was overwhelmed by a ${entity}`,
      `${player}'s journey was cut short by a ${entity}`,
      `${player} underestimated the strength of a ${entity} and paid the price`,
      `${player} was caught off guard by a ${entity} and didn't make it`,
      `${player} was brought down by a ${entity} in a brutal fight`,
      `${player} gave their all but couldn't survive the wrath of a ${entity}`,
      `${player} fought to the bitter end against a ${entity}`,
      `${player} fell to the might of a ${entity}`,
      `${player} couldn't withstand the power of a ${entity}`,
      `${player} was outmatched in combat by a ${entity}`,
      `${player} succumbed to their wounds after a fight with a ${entity}`,
      `${player} met their match in a ${entity}`,
      `${player} was slain by a ${entity} in a moment of intense combat`,
      `${player} fought with honor but was defeated by a ${entity}`,
      `${player} was overwhelmed by a ${entity} after a fierce struggle`,
      // Ambiguous Death Messages
      `${player} fought valiantly... or so they thought`,
      `${player} couldn't stand against their foe`,
      `${player} gave it their all but couldn't survive the battle`,
      `${player} fell in a moment of chaos`,
      `${player} met their end in the heat of battle`,
      `${player} was overwhelmed by a deadly opponent`,
      `${player} tried to fight back, but it wasn't enough`,
      `${player} was taken down in a fierce skirmish`,
      `${player} lost their life in a brutal confrontation`,
      `${player} perished in the heat of combat`,
      `${player} was struck down in the middle of a fight`,
      `${player} fought bravely but ultimately succumbed`,
      `${player} couldn't escape the fury of their attacker`,
      `${player} miscalculated during a tense battle`,
      `${player}'s life ended during a relentless assault`,
      `${player} couldn't recover from the damage dealt`,
      `${player} was caught in the chaos of combat`,
      `${player} lost the fight and paid the ultimate price`,
      `${player} was overcome by an insurmountable challenge`
    ];
    return deathMessages[Math.floor(Math.random() * deathMessages.length)];
  }
  static random_suicide(player, cause) {
    let deathMessages;
    const fallDeathMessages = [
      `${player} took a tumble and couldn't recover from the fall`,
      `${player} had a long drop. Too bad they didn't stick the landing`,
      `${player} fell from a great height... and didn't make it`,
      `${player} misjudged the fall, and gravity made sure they paid`,
      `${player} learned the hard way that falling isn't a safe way down`
    ];
    const lavaDeathMessages = [
      `${player} got too close to the heat and didn't survive the burn`,
      `${player} decided to take a swim in lava. It didn't end well`,
      `${player} got cooked alive in lava`,
      `${player} thought lava was just a harmless pool. It was not`,
      `${player} learned that lava isn't as warm as it looks`
    ];
    const drowningDeathMessages = [
      `${player} couldn't hold their breath long enough and drowned`,
      `${player} tried to swim but forgot how to breathe`,
      `${player} sank to the depths... and stayed there`,
      `${player} was caught in the water's grip and couldn't escape`,
      `${player} drowned while exploring the depths of the ocean`
    ];
    const fireDeathMessages = [
      `${player} got too close to the fire and burned to a crisp`,
      `${player} spent too much time in the flames`,
      `${player} felt the heat... and it was the last thing they felt`,
      `${player} tried to walk through fire. It didn't work out`,
      `${player} got roasted by a fire they couldn't escape`
    ];
    const fallingBlockDeathMessages = [
      `${player} was crushed by a falling block`,
      `${player} didn't stand a chance against the falling blocks`,
      `${player} took a hit from a falling block and didn't make it`,
      `${player} miscalculated and was crushed by falling debris`,
      `${player} learned to watch out for falling blocks the hard way`
    ];
    const contactDeathMessages = [
      `${player} couldn't handle the sharp prick of a cactus`,
      `${player} made contact with a cactus and it didn't end well`,
      `${player} took a wrong step into a cactus patch`,
      `${player} tried to walk through a sweet berry bush and learned its lesson`,
      `${player} found out the hard way that cactus isn't friendly`
    ];
    const magicDeathMessages = [
      `${player} couldn't resist the effects of the potion and fell`,
      `${player} was too weak to survive the magic that hit them`,
      `${player} couldn't outlast the effects of the enchanted potion`,
      `${player} succumbed to the magic that surrounded them`,
      `${player} was struck by a magical force beyond their control`
    ];
    const defaultDeathMessages = [
      `${player} met an untimely end due to mysterious circumstances`,
      `${player} was caught off guard by the unforgiving world`,
      `${player} disappeared, leaving behind only questions`,
      `${player} succumbed to forces beyond understanding`,
      `${player} didn't make it`,
      `${player} encountered something they couldn't survive`,
      `${player} was claimed by the unknown`,
      `${player} was no match for whatever happened`,
      `${player} fell victim to an unforeseen fate`,
      `${player} perished, but no one knows how or why`,
      `${player} met their end, and the details remain a mystery`,
      `${player} passed away under unknown circumstances`,
      `${player} was taken by the world in an unknown way`,
      `${player} didn't live to tell the tale... for unknown reasons`,
      `${player} didn't survive, but the cause will forever remain a secret`,
      `${player} faced an untold fate, leaving behind no explanation`
    ];
    if (cause === "fall") {
      deathMessages = fallDeathMessages;
    } else if (cause === "lava") {
      deathMessages = lavaDeathMessages;
    } else if (cause === "drowning") {
      deathMessages = drowningDeathMessages;
    } else if (cause === "fire") {
      deathMessages = fireDeathMessages;
    } else if (cause === "fallingBlock") {
      deathMessages = fallingBlockDeathMessages;
    } else if (cause === "contact") {
      deathMessages = contactDeathMessages;
    } else if (cause === "magic") {
      deathMessages = magicDeathMessages;
    } else {
      deathMessages = defaultDeathMessages;
    }
    return deathMessages[Math.floor(Math.random() * deathMessages.length)];
  }
};

// node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;
var constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

// node_modules/date-fns/constructFrom.js
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}
__name(constructFrom, "constructFrom");

// node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}
__name(toDate, "toDate");

// node_modules/date-fns/_lib/getRoundingMethod.js
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    return result === 0 ? 0 : result;
  };
}
__name(getRoundingMethod, "getRoundingMethod");

// node_modules/date-fns/differenceInMilliseconds.js
function differenceInMilliseconds(laterDate, earlierDate) {
  return +toDate(laterDate) - +toDate(earlierDate);
}
__name(differenceInMilliseconds, "differenceInMilliseconds");

// node_modules/date-fns/differenceInSeconds.js
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff = differenceInMilliseconds(laterDate, earlierDate) / 1e3;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
__name(differenceInSeconds, "differenceInSeconds");

// behaviour_pack/scripts-dev/utils/checks.ts
function distance_check(c1, c2, horizontalRadius, verticalRadius) {
  const dx = c1[0] - c2[0];
  const dy = c1[1] - c2[1];
  const dz = c1[2] - c2[2];
  const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
  const verticalDistance = Math.abs(dy);
  return horizontalDistance <= horizontalRadius && verticalDistance <= verticalRadius;
}
__name(distance_check, "distance_check");
function timer_check(now, start, seconds) {
  return differenceInSeconds(now, start) <= seconds;
}
__name(timer_check, "timer_check");
var checks = {
  timer_check,
  distance_check
};
var checks_default = checks;

// behaviour_pack/scripts-dev/utils/motd.ts
import { world as world6 } from "@minecraft/server";
function send_motd(player) {
  const motd_shorts = [
    "You're a star! \uE107",
    "Your adventure awaits...",
    "Don't forget to eat! \uE100",
    "Ready to explore?",
    "First we mine, then we craft.",
    "It's craftin' time! \uE10A",
    "I lava you! \uE10C",
    "RISE AND GRIND!!!",
    "Got what it takes?",
    "Dream big, build bigger. \uE108",
    "We missed you!!!",
    "Hey, you dropped this \uE108",
    "Together We Stand \uE10C",
    "Do some quests!"
  ];
  const motd_longs = [
    "\xA7oDo our quests by running \xA7l\xA75/quests view\xA7r\xA7o on discord!",
    "\xA7oPssst... Have you checked out this month's \xA7l\xA7gMonthly Market\xA7r\xA7o yet?",
    "\xA7oExplore different projects by traversing our \xA7lroad network\xA7r\xA7ro.",
    "\xA7oHave you seen our AMAZING \xA7l\xA7nSubway System\xA7r\xA7o? Ask about it!",
    "\xA7oCheck out our \xA7lLive Map\xA7r\xA7o on \xA79everthorn.net/map\xA7r\xA7o!",
    "\xA7oBuild to your heart's content, and become part of Everthorn's history.",
    "\xA7oRemember, projects \xA7lmust\xA7r\xA7o be connected to our \xA7lroad network\xA7r\xA7o.",
    "\xA7oFeelin' lonely? Ping the \xA7l@Get On The Server\xA7r\xA7o ping :))"
  ];
  const randomShort = motd_shorts[Math.floor(Math.random() * motd_shorts.length)];
  let randomLong = motd_longs[Math.floor(Math.random() * motd_longs.length)];
  let questReminder = "";
  if (Math.random() < 5e-3) {
    randomLong = "\xA7o\xA7p\xA7lLucky you! You just found 1 Nug! Send a screenshot in #general and ping a CM to claim it!";
  }
  world6.getDimension(MinecraftDimensionTypes.Overworld).runCommand(
    `title "${player.name}" actionbar \xA7a\xA7lWelcome to Everthorn!\xA7r ${randomShort}`
  );
  player.sendMessage(
    `\xA7aWelcome to Everthorn, \xA7l${player.name}\xA7r
\xA77${randomShort}\xA7r
${randomLong}\xA7r
---------
${questReminder}`
  );
}
__name(send_motd, "send_motd");

// behaviour_pack/scripts-dev/utils/commands.ts
import {
  EntityComponentTypes as EntityComponentTypes4,
  system as system6,
  TicksPerSecond as TicksPerSecond2,
  world as world7
} from "@minecraft/server";
function send_message(dimension, target, message) {
  const msg = { "rawtext": [{ "text": message }] };
  if (!target.startsWith("@")) {
    target = `"${target}"`;
  }
  world7.getDimension(dimension).runCommand(`tellraw ${target} ${JSON.stringify(msg)}`);
}
__name(send_message, "send_message");
function play_quest_notify(gamertag) {
  let player = world7.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.notify",
    { volume: 100, location: player.location }
  );
}
__name(play_quest_notify, "play_quest_notify");
function play_quest_progress_sound(gamertag) {
  let player = world7.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.objective.progress",
    { volume: 100, location: player.location }
  );
}
__name(play_quest_progress_sound, "play_quest_progress_sound");
function play_quest_complete_sound(gamertag) {
  let player = world7.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.complete",
    { volume: 100, location: player.location }
  );
  for (let i = 0; i < 5; i++) {
    system6.runTimeout(() => {
      player.runCommand(`particle minecraft:totem_particle ~ ~2 ~`);
    }, 10);
  }
}
__name(play_quest_complete_sound, "play_quest_complete_sound");
function play_objective_complete_sound(gamertag) {
  let player = world7.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.objective.complete",
    { volume: 100, location: player.location }
  );
}
__name(play_objective_complete_sound, "play_objective_complete_sound");
function play_quest_fail_sound(gamertag) {
  let player = world7.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.fail",
    { volume: 100, location: player.location }
  );
}
__name(play_quest_fail_sound, "play_quest_fail_sound");
function send_title(dimension, target, type, message) {
  world7.getDimension(dimension).runCommand(`title "${target}" ${type} ${message}`);
}
__name(send_title, "send_title");
function add_or_spawn_item(player, item) {
  const player_container = player.getComponent(EntityComponentTypes4.Inventory)?.container;
  if (!player_container) {
    throw new Error(`Could not get inventory container for "${player.name}"`);
  }
  if (player_container.emptySlotsCount >= 1) {
    player_container.addItem(item);
  } else {
    player.dimension.spawnItem(item, player.location);
  }
}
__name(add_or_spawn_item, "add_or_spawn_item");
function give_item(gamertag, count, item) {
  const item_stack = item;
  let stack_amount = Math.trunc(count / item_stack.maxAmount);
  let amount = count;
  const player = world7.getPlayers({ name: gamertag })[0];
  if (stack_amount >= 1) {
    item_stack.amount = item_stack.maxAmount;
    for (let i = 1; i <= stack_amount; i++) {
      add_or_spawn_item(player, item_stack);
    }
    amount -= stack_amount * item_stack.maxAmount;
  }
  if (amount > 0) {
    item_stack.amount = amount;
    add_or_spawn_item(player, item_stack);
  }
}
__name(give_item, "give_item");
function noise_glitch(player) {
  const noises = [
    [{ "name": "mob.villager.yes", "options": { "volume": 100, "pitch": 1 } }],
    [
      { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.3 } },
      { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.5 } },
      { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.8 } },
      { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.4 } }
    ],
    [{ "name": "random.fuse", "options": { "volume": 100, "pitch": 1 } }],
    [{ "name": "mob.llama.idle", "options": { "volume": 100, "pitch": 1 } }],
    [{ "name": "random.anvil_land", "options": { "volume": 100, "pitch": 1 } }],
    [{ "name": "block.end_portal.spawn", "options": { "volume": 100, "pitch": 1 } }],
    [
      { "name": "mob.shulker.ambient", "options": { "volume": 100, "pitch": 0.75 } },
      { "name": "mob.shulker.ambient", "options": { "volume": 100, "pitch": 1.25 } }
    ],
    [{ "name": "mob.cat.meow", "options": { "volume": 100, "pitch": 1 } }]
  ];
  const noise = noises[Math.floor(Math.random() * noises.length)];
  for (const noise_instance of noise) {
    system6.runTimeout(
      () => {
        player.playSound(noise_instance.name, noise_instance.options);
      },
      5
    );
  }
}
__name(noise_glitch, "noise_glitch");
function vision_entity_glitch(player) {
  const entities = [
    MinecraftEntityTypes.Enderman,
    MinecraftEntityTypes.Panda,
    MinecraftEntityTypes.Rabbit,
    MinecraftEntityTypes.ZombieHorse,
    MinecraftEntityTypes.Breeze,
    MinecraftEntityTypes.Camel,
    MinecraftEntityTypes.Sheep,
    MinecraftEntityTypes.Stray,
    "amethyst:the_breath",
    "amethyst:endstone_golem"
  ];
  const entity = entities[Math.floor(Math.random() * entities.length)];
  let location = player.location;
  let facing = player.getViewDirection();
  location.x -= facing.x * 2;
  location.z -= facing.z * 2;
  let current_entity = player.dimension.spawnEntity(entity, location);
  let sysid = system6.runInterval(() => {
    if (current_entity.isValid) {
      current_entity.teleport(location);
      current_entity.getComponent(EntityComponentTypes4.Health)?.resetToMaxValue();
    } else {
      system6.clearRun(sysid);
      current_entity.remove();
    }
  });
  system6.waitTicks(TicksPerSecond2 * 15).then(() => {
    system6.clearRun(sysid);
    current_entity.remove();
  });
}
__name(vision_entity_glitch, "vision_entity_glitch");
function vision_block_glitch(player) {
  const blocks = [
    MinecraftBlockTypes.Bedrock,
    MinecraftBlockTypes.LightBlock15,
    MinecraftBlockTypes.BambooStairs,
    MinecraftBlockTypes.Dispenser,
    MinecraftBlockTypes.DarkOakFence,
    MinecraftBlockTypes.EnchantingTable,
    MinecraftBlockTypes.Campfire
  ];
  const block = blocks[Math.floor(Math.random() * blocks.length)];
  let location = player.location;
  let facing = player.getViewDirection();
  location.x += facing.x * 2;
  location.z += facing.z * 2;
  let random_block = player.dimension.getBlock(location);
  if (random_block?.typeId === MinecraftBlockTypes.Air && player.dimension.getEntitiesAtBlockLocation(location).length === 0) {
    random_block.setType(block);
    system6.waitTicks(TicksPerSecond2).then(() => {
      random_block.setType(MinecraftBlockTypes.Air);
    });
  }
}
__name(vision_block_glitch, "vision_block_glitch");
function effect_glitch(player) {
  const effects = [
    MinecraftEffectTypes.Haste,
    MinecraftEffectTypes.MiningFatigue,
    MinecraftEffectTypes.SlowFalling,
    MinecraftEffectTypes.JumpBoost,
    MinecraftEffectTypes.HealthBoost,
    MinecraftEffectTypes.Hunger
  ];
  const effect = effects[Math.floor(Math.random() * effects.length)];
  system6.run(
    () => {
      player.addEffect(effect, TicksPerSecond2 * 20);
    }
  );
}
__name(effect_glitch, "effect_glitch");
function place_glitch_block(player) {
  const block = "amethyst:glitch_block";
  let location = player.location;
  let facing = player.getViewDirection();
  location.x += facing.x * 2;
  location.z += facing.z * 2;
  let random_block = player.dimension.getBlock(location);
  if (random_block?.typeId === MinecraftBlockTypes.Air && player.dimension.getEntitiesAtBlockLocation(location).length === 0) {
    random_block.setType(block);
  }
}
__name(place_glitch_block, "place_glitch_block");
var commands = {
  send_message,
  play_quest_notify,
  play_quest_complete_sound,
  play_quest_progress_sound,
  send_title,
  play_objective_complete_sound,
  play_quest_fail_sound,
  give_item,
  noise_glitch,
  vision_block_glitch,
  vision_entity_glitch,
  effect_glitch,
  place_glitch_block
};
var commands_default = commands;

// behaviour_pack/scripts-dev/utils/altar_messages.ts
var AltarMessage = class {
  static {
    __name(this, "AltarMessage");
  }
  static random_sacrifice(blockValue, originalBlockValue) {
    const noValueMessages = [
      `The Anomaly cracks audibly... your empty gesture rejected. \xA78\xA7l${blockValue} blocks\xA7r`,
      `The void ignores your hollow tribute. Not even dust remains`,
      `Your hands burn with static... the crystal knows you lied. \xA78\xA7l${blockValue} blocks\xA7r`,
      `A chorus of enderman laughter... your mockery exposed. \xA78\xA7l${blockValue} blocks\xA7r`,
      `The Altar bleeds black ichor... your insult quantified. \xA78\xA7l${blockValue} blocks\xA7r`,
      `Reality itself flinches from your apathy. Contribution: Null`,
      `The Anomaly shows you visions of your own indifference. \xA78\xA7l${blockValue} blocks\xA7r`,
      `Your 'offering' shatters into anti-matter. Debt unpaid`,
      `The void between stars whispers: \xA7oWorthless\xA7r. \xA78\xA7l${blockValue} blocks\xA7r`,
      `The crystal's core turns obsidian... a permanent record of your deceit`
    ];
    if (blockValue <= 0) {
      return noValueMessages[Math.floor(Math.random() * noValueMessages.length)];
    }
    const valueTierMessages = {
      extreme: [
        // 100+
        `Reality tears open. \xA7l+${blockValue} blocks\xA7r claimed for the border`,
        `The void screams in hunger. \xA7l+${blockValue} blocks\xA7r added`,
        `Dimensions collapse inward. \xA7l+${blockValue} blocks\xA7r added`
      ],
      very: [
        // 30+
        `Shadows dance with purpose. \xA7l+${blockValue} blocks\xA7r added`,
        `The crystal pulses greedily. \xA7l+${blockValue} blocks\xA7r expanded`,
        `Time stutters briefly. \xA7l+${blockValue} blocks\xA7r expanded`
      ],
      valuable: [
        // 10+
        `A whisper of change. \xA7l+${blockValue} blocks\xA7r expanded`,
        `Minor disturbance detected. \xA7l+${blockValue} blocks\xA7r added`,
        `The air shifts slightly. \xA7l+${blockValue} blocks\xA7r claimed for the border`
      ],
      not: [
        // <10
        `Barely a tremor. \xA7l+${blockValue} blocks\xA7r claimed for the border`,
        `The Anomaly yawns. \xA7l+${blockValue} blocks\xA7r expanded`,
        `Dust motes settle. \xA7l+${blockValue} blocks\xA7r added`
      ]
    };
    const depreciationMessages = {
      high: [
        // 80-65% - Yellow (still decent value)
        `The Anomaly pauses, confused... "Why do you repeat this hollow act?" \xA7e\xA7l+${blockValue} blocks\xA7r`,
        `The crystal dims with disappointment. "Have you forgotten the meaning?" \xA7e\xA7l+${blockValue} blocks\xA7r`,
        `The void whispers uncertainty... "Is this all you offer now?" \xA7e\xA7l+${blockValue} blocks\xA7r`
      ],
      mid: [
        // 65-50% - Orange (declining value)
        `"How... predictable," the Anomaly laughs coldly. \xA76\xA7l+${blockValue} blocks\xA7r`,
        `The void yawns theatrically. "Another 'grand' gesture." \xA76\xA7l+${blockValue} blocks\xA7r`,
        `"You bore me," echoes through reality. \xA76\xA7l+${blockValue} blocks\xA7r`
      ],
      low: [
        // 50-30% - Red (poor value)
        `"Your mockery ends NOW," the void seethes. \xA7c\xA7l+${blockValue} blocks\xA7r`,
        `The Anomaly's rage cracks the ground beneath you. \xA7c\xA7l+${blockValue} blocks\xA7r`,
        `"Continue this insult and face the consequences." \xA7c\xA7l+${blockValue} blocks\xA7r`
      ],
      negligible: [
        // <30% - Dark Red (terrible value)
        `The Anomaly's wrath tears through reality. "YOU WILL SUFFER." \xA74\xA7l+${blockValue} blocks\xA7r`,
        `"Your insolence demands retribution," the void seethes. \xA74\xA7l+${blockValue} blocks\xA7r`,
        `The cosmos itself turns against you in fury. \xA74\xA7l+${blockValue} blocks\xA7r`
      ]
    };
    const getValueTier = /* @__PURE__ */ __name(() => {
      if (blockValue >= 100) return valueTierMessages.extreme;
      if (blockValue >= 30) return valueTierMessages.very;
      if (blockValue >= 10) return valueTierMessages.valuable;
      return valueTierMessages.not;
    }, "getValueTier");
    let messages = getValueTier();
    if (blockValue < originalBlockValue) {
      const valueRemaining = blockValue / originalBlockValue;
      if (valueRemaining < 0.8) {
        if (valueRemaining >= 0.65) {
          messages = depreciationMessages.high;
        } else if (valueRemaining >= 0.5) {
          messages = depreciationMessages.mid;
        } else if (valueRemaining >= 0.3) {
          messages = depreciationMessages.low;
        } else {
          messages = depreciationMessages.negligible;
        }
      }
    }
    return messages[Math.floor(Math.random() * messages.length)];
  }
  static random_not_sacrificial() {
    const rejectionMessages = [
      "The Anomaly probes your soul... finds no attachment. Try harder",
      "The void whispers: 'Sacrifice what you'd mourn to lose'",
      "Your hands remain unburned. You didn't truly care about this",
      "The crystal glows faintly: 'Your heartrate never changed'",
      "The Altar rejects empty gestures. Bring meaning, not objects",
      "The Anomaly shows you visions of actual valuables... as a hint",
      "Your reflection shakes its head. 'You know the rules'",
      "The void hungers for emotional weight, not dead weight",
      "The crystal seeks sacrifices soaked in your longing",
      "Your apathy is louder than this offering. Try again"
    ];
    return rejectionMessages[Math.floor(Math.random() * rejectionMessages.length)];
  }
  static random_info(currentBorderSize) {
    const infoMessages = [
      `The Anomaly hums quietly... current border: \xA7l${currentBorderSize} blocks\xA7r`,
      `The void's edge shimmers at \xA7l${currentBorderSize} blocks\xA7r from center`,
      `Crystal energies oscillate... border diameter: \xA7l${currentBorderSize} blocks\xA7r`,
      `A map etches itself in your mind: \xA7l${currentBorderSize} blocks\xA7r claimed`,
      `The Anomaly whispers dimensions into your thoughts: \xA7l${currentBorderSize} blocks\xA7r`,
      `Ender particles outline a circle of \xA7l${currentBorderSize} blocks\xA7r diameter`,
      `The crystal projects the border's reach: \xA7l${currentBorderSize} blocks\xA7r`,
      `Your shadow stretches to the void's edge: \xA7l${currentBorderSize} blocks\xA7r`,
      `Reality's membrane currently extends \xA7l${currentBorderSize} blocks\xA7r outward`,
      `The Altar displays ethereal runes: \xA7l${currentBorderSize} blocks\xA7r of safety`
    ];
    return infoMessages[Math.floor(Math.random() * infoMessages.length)];
  }
};

// behaviour_pack/scripts-dev/utils/dragon_messages.ts
import { world as world8 } from "@minecraft/server";
var DragonHeartMessage = class {
  static {
    __name(this, "DragonHeartMessage");
  }
  static heart_mined(heartsMined) {
    const heartMessages = {
      1: `\xA7l\xA75The Ancient Dragon's roar echoes across dimensions...
\xA7r"NO! You dare shatter my essence? My remaining \xA7l5 Hearts\xA7r beat frantically across the Relic Islands. Each one you destroy weakens my immortal form... I must stop you before it's too late!"`,
      2: `\xA7l\xA75The Dragon's voice cracks with growing desperation...
\xA7r"My power... it's draining away! \xA7l4 Hearts\xA7r still pulse on distant islands, but I can feel my strength ebbing. You don't understand - without them, I become... vulnerable. MORTAL."`,
      3: `\xA7l\xA75Panic seeps into the Dragon's ancient voice...
\xA7r"Three of my Hearts destroyed! Only \xA7l3 remain\xA7r to sustain my immortality! My scales grow brittle, my fire dims... If you take the rest, I'll be nothing more than flesh and bone. Please... reconsider this madness!"`,
      4: `\xA7l\xA75The Dragon's terror becomes palpable...
\xA7r"I BEG YOU, STOP! With only \xA7l2 Hearts\xA7r left, my ancient body begins to fail! My wings tremble, my breath grows weak... Soon I'll be defenseless against mortal weapons. You are not victorious, you are VICIOUS!"`,
      5: `\xA7l\xA75The Dragon's voice breaks into desperate whispers...
\xA7r"One... only \xA7l1 Heart\xA7r remains between me and certain death. I can feel mortality creeping through my veins like poison. When it's gone, any blade can pierce my hide, any arrow can find my heart. You've doomed me to die like... like the rest of them."`,
      6: `\xA7l\xA75The Dragon's final scream pierces reality itself...
\xA7r"IT IS FINISHED! All \xA7l6 Hearts\xA7r lie shattered! My immortality bleeds away like water through sand! I am... I am just flesh now. Mortal. Killable. The hunt begins, and I... I am the prey."`
    };
    return heartMessages[heartsMined] || "\xA7cError: Invalid heart count";
  }
  static health_stage_message(stage) {
    if (stage === 1) {
      const stage1Messages = [
        `\xA7l\xA75The Ancient Dragon roars with fury...
\xA7r"You think destroying my Hearts makes me weak? I am still DEATH INCARNATE! My minions will feast on your bones!"`,
        `\xA7l\xA75Draconic power surges through the battlefield...
\xA7r"Mortal fools! Even weakened, I command legions! Rise, my servants! Show them the price of defiance!"`,
        `\xA7l\xA75The Dragon's eyes blaze with ancient hatred...
\xA7r"You may have made me vulnerable, but I am FAR from defeated! Behold the armies that serve the Dragon Lord!"`,
        `\xA7l\xA75Wings beat like thunder across the End...
\xA7r"My immortality may be gone, but my RAGE remains eternal! Come forth, children of darkness! Defend your master!"`,
        `\xA7l\xA75The battlefield trembles with draconic might...
\xA7r"You celebrate too early, mortals! Even a mortal dragon commands respect! My minions will drown you in shadow!"`
      ];
      return stage1Messages[Math.floor(Math.random() * stage1Messages.length)];
    } else if (stage === 2) {
      const stage2Messages = [
        `\xA7l\xA75The Dragon's voice cracks with desperation...
\xA7r"No... NO! This cannot be! My loyal servants, protect me! I refuse to die like some common beast!"`,
        `\xA7l\xA75Blood drips from ancient scales...
\xA7r"I am the ANCIENT DRAGON! I will not fall to mortals! Rise, my champions! Give your lives for your master!"`,
        `\xA7l\xA75The Dragon's roar becomes a pained shriek...
\xA7r"My strength fades... but my will remains! Every creature in the End, come to my aid! I WILL NOT DIE ALONE!"`,
        `\xA7l\xA75Panic seeps into the Dragon's ancient voice...
\xA7r"This is impossible! I have ruled for millennia! My minions, my faithful servants... save me from this humiliation!"`,
        `\xA7l\xA75The Dragon's breathing grows labored...
\xA7r"I can feel death approaching... but I will take you all with me! My final army, emerge from the shadows! We die together!"`
      ];
      return stage2Messages[Math.floor(Math.random() * stage2Messages.length)];
    }
    return `\xA75The Ancient Dragon speaks... \xA7r"Unknown stage of battle reached..."`;
  }
  static summon_minions() {
    const mob_counts = {
      "amethyst:endstone_golem": 2.2,
      "amethyst:the_breath": 1.4
    };
    const radius = 30;
    const dimension = world8.getDimension(MinecraftDimensionTypes.TheEnd);
    const player_count = dimension.getPlayers().length;
    const totalMobs = Object.values(mob_counts).reduce((sum, count) => sum + count * player_count, 0);
    const angleIncrement = 2 * Math.PI / totalMobs;
    let mobIndex = 0;
    for (const [mobType, countPerPlayer] of Object.entries(mob_counts)) {
      const totalCount = countPerPlayer * player_count;
      for (let i = 0; i < totalCount; i++) {
        const angle = angleIncrement * mobIndex;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const groundY = dimension.getTopmostBlock({ x, z })?.y || 70;
        dimension.spawnEntity(mobType, { x, y: groundY + 1, z });
        mobIndex++;
      }
    }
  }
};

// behaviour_pack/scripts-dev/utils/evil_acts.ts
import { EntityDamageCause as EntityDamageCause2, TicksPerSecond as TicksPerSecond3, world as world9 } from "@minecraft/server";
var EvilActs = class {
  static {
    __name(this, "EvilActs");
  }
  constructor() {
    this.punishments = /* @__PURE__ */ new Map();
    this.initializePunishments();
  }
  initializePunishments() {
    this.addPunishment("blindness", (player) => this.applyBlindness(player));
    this.addPunishment("levitation", (player) => this.applyLevitation(player));
    this.addPunishment("nausea", (player) => this.applyNausea(player));
    this.addPunishment("slowness", (player) => this.applySlowness(player));
    this.addPunishment("weakness", (player) => this.applyWeakness(player));
    this.addPunishment("poison", (player) => this.applyPoison(player));
    this.addPunishment("wither", (player) => this.applyWither(player));
    this.addPunishment("lightning", (player) => this.strikeLightning(player));
    this.addPunishment("teleport_overworld", (player) => this.teleportToOverworld(player));
    this.addPunishment("spawn_hostile", (player) => this.spawnHostileMobs(player));
    this.addPunishment("damage", (player) => this.dealDamage(player));
    this.addPunishment("knockback", (player) => this.applyKnockback(player));
    this.addPunishment("launch_skyward", (player) => this.launchSkyward(player));
    this.addPunishment("inventory_shuffle", (player) => this.inventoryShuffle(player));
    this.addPunishment("fake_death", (player) => this.simulateDeath(player));
    this.addPunishment("phantom_sounds", (player) => this.playPhantomSounds(player));
  }
  addPunishment(name, punishmentFunction) {
    this.punishments.set(name, punishmentFunction);
  }
  executeRandomPunishment(player) {
    const punishmentKeys = Array.from(this.punishments.keys());
    const randomKey = punishmentKeys[Math.floor(Math.random() * punishmentKeys.length)];
    const punishment = this.punishments.get(randomKey);
    if (punishment) {
      console.log(punishment);
      punishment(player);
      return randomKey;
    }
  }
  // Basic negative effects
  applyBlindness(player, duration = 20) {
    player.addEffect("blindness", duration * TicksPerSecond3, { amplifier: 2 });
  }
  applyLevitation(player, duration = 18) {
    player.addEffect("levitation", duration * TicksPerSecond3, { amplifier: 1 });
  }
  applyNausea(player, duration = 10) {
    player.addEffect("nausea", duration * TicksPerSecond3, { amplifier: 2 });
  }
  applySlowness(player, duration = 10) {
    player.addEffect("slowness", duration * TicksPerSecond3, { amplifier: 3 });
  }
  applyWeakness(player, duration = 60) {
    player.addEffect("weakness", duration * TicksPerSecond3, { amplifier: 2 });
  }
  applyPoison(player, duration = 10) {
    player.addEffect("poison", duration * TicksPerSecond3, { amplifier: 1 });
  }
  applyWither(player, duration = 10) {
    player.addEffect("wither", duration * TicksPerSecond3, { amplifier: 1 });
  }
  // Environmental Punishments
  strikeLightning(player) {
    const location = player.location;
    player.dimension.spawnEntity("lightning_bolt", location);
  }
  teleportToOverworld(player) {
    const overworld = world9.getDimension("overworld");
    player.teleport({ x: 10, y: 100, z: 0 }, { dimension: overworld });
  }
  spawnHostileMobs(player) {
    const location = player.location;
    const mobs = ["zombie", "skeleton", "spider", "enderman"];
    const randomMob = mobs[Math.floor(Math.random() * mobs.length)];
    for (let i = 0; i < 3; i++) {
      const spawnLocation = {
        x: location.x + (Math.random() - 0.5) * 10,
        y: location.y,
        z: location.z + (Math.random() - 0.5) * 10
      };
      player.dimension.spawnEntity(`minecraft:${randomMob}`, spawnLocation);
    }
  }
  // Physical
  dealDamage(player, amount = 4) {
    player.applyDamage(amount, { cause: EntityDamageCause2.freezing });
  }
  applyKnockback(player) {
    const direction = {
      x: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2
    };
    player.applyKnockback(direction, 0.8);
  }
  launchSkyward(player) {
    player.applyKnockback({ x: 0, z: 0 }, 3);
  }
  inventoryShuffle(player) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return;
    const items = [];
    const slots = [];
    for (let i = 0; i < 9; i++) {
      const item = inventory.getItem(i);
      if (item) {
        items.push(item);
        slots.push(i);
        inventory.setItem(i, void 0);
      }
    }
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    for (let i = 0; i < items.length; i++) {
      inventory.setItem(slots[i], items[i]);
    }
  }
  // Psychological
  simulateDeath(player) {
    player.addEffect("blindness", 60 * TicksPerSecond3, { amplifier: 5 });
    player.addEffect("slowness", 60 * TicksPerSecond3, { amplifier: 10 });
    player.playSound("entity.player.death", { volume: 5 });
  }
  playPhantomSounds(player) {
    const sounds = [
      "entity.enderman.ambient",
      "entity.ghast.scream",
      "entity.wither.ambient",
      "block.portal.ambient"
    ];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    player.playSound(randomSound, { volume: 0.5 });
  }
};

// behaviour_pack/scripts-dev/utils/glitches.ts
import { EntityComponentTypes as EntityComponentTypes5, system as system7, TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
var Glitches = class {
  static {
    __name(this, "Glitches");
  }
  constructor() {
    this.glitches = /* @__PURE__ */ new Map();
    this.initializeGlitches();
  }
  initializeGlitches() {
    this.addGlitch("noise_chaos", (player) => this.noiseGlitch(player));
    this.addGlitch("audio_distortion", (player) => this.audioDistortionGlitch(player));
    this.addGlitch("phantom_music", (player) => this.phantomMusicGlitch(player));
    this.addGlitch("vision_entity", (player) => this.visionEntityGlitch(player));
    this.addGlitch("vision_block", (player) => this.visionBlockGlitch(player));
    this.addGlitch("particle_swarm", (player) => this.particleSwarmGlitch(player));
    this.addGlitch("fake_explosion", (player) => this.fakeExplosionGlitch(player));
    this.addGlitch("effect_chaos", (player) => this.effectGlitch(player));
    this.addGlitch("dimension_echo", (player) => this.dimensionEchoGlitch(player));
    this.addGlitch("inventory_shuffle", (player) => this.inventoryShuffleGlitch(player));
    this.addGlitch("ui_corruption", (player) => this.uiCorruptionGlitch(player));
  }
  addGlitch(name, glitchFunction) {
    this.glitches.set(name, glitchFunction);
  }
  executeRandomGlitch(player) {
    const glitchKeys = Array.from(this.glitches.keys());
    const randomKey = glitchKeys[Math.floor(Math.random() * glitchKeys.length)];
    const glitch = this.glitches.get(randomKey);
    if (glitch) {
      glitch(player);
      return randomKey;
    }
    return "";
  }
  executeGlitch(name, player) {
    const glitch = this.glitches.get(name);
    if (glitch) {
      glitch(player);
      return true;
    }
    return false;
  }
  getGlitchNames() {
    return Array.from(this.glitches.keys());
  }
  removeGlitch(name) {
    return this.glitches.delete(name);
  }
  noiseGlitch(player) {
    const noises = [
      [{ "name": "mob.villager.yes", "options": { "volume": 100, "pitch": 1 } }],
      [
        { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.3 } },
        { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.5 } },
        { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.8 } },
        { "name": "block.bell.hit", "options": { "volume": 100, "pitch": 0.4 } }
      ],
      [{ "name": "random.fuse", "options": { "volume": 100, "pitch": 1 } }],
      [{ "name": "mob.llama.idle", "options": { "volume": 100, "pitch": 1 } }],
      [{ "name": "random.anvil_land", "options": { "volume": 100, "pitch": 1 } }],
      [{ "name": "block.end_portal.spawn", "options": { "volume": 100, "pitch": 1 } }],
      [
        { "name": "mob.shulker.ambient", "options": { "volume": 100, "pitch": 0.75 } },
        { "name": "mob.shulker.ambient", "options": { "volume": 100, "pitch": 1.25 } }
      ],
      [{ "name": "mob.cat.meow", "options": { "volume": 100, "pitch": 1 } }]
    ];
    const noise = noises[Math.floor(Math.random() * noises.length)];
    for (const noise_instance of noise) {
      system7.runTimeout(
        () => {
          player.playSound(noise_instance.name, noise_instance.options);
        },
        5
      );
    }
  }
  audioDistortionGlitch(player) {
    const sounds = [
      "mob.enderman.scream",
      "mob.ghast.scream",
      "random.explode",
      "mob.wither.spawn"
    ];
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    const pitches = [0.1, 0.3, 1.5, 2];
    pitches.forEach((pitch, index) => {
      system7.runTimeout(() => {
        player.playSound(sound, { volume: 50, pitch });
      }, index * 10);
    });
  }
  phantomMusicGlitch(player) {
    const musicDiscs = [
      "record.11",
      "record.13",
      "record.ward",
      "record.cat"
    ];
    player.stopMusic();
    const disc = musicDiscs[Math.floor(Math.random() * musicDiscs.length)];
    player.playSound(disc, { volume: 30, pitch: Math.random() * 2 });
  }
  visionEntityGlitch(player) {
    const entities = [
      MinecraftEntityTypes.Enderman,
      MinecraftEntityTypes.Panda,
      MinecraftEntityTypes.Rabbit,
      MinecraftEntityTypes.ZombieHorse,
      MinecraftEntityTypes.Breeze,
      MinecraftEntityTypes.Camel,
      MinecraftEntityTypes.Sheep,
      MinecraftEntityTypes.Stray,
      "amethyst:the_breath",
      "amethyst:endstone_golem"
    ];
    const entity = entities[Math.floor(Math.random() * entities.length)];
    let location = player.location;
    let facing = player.getViewDirection();
    location.x -= facing.x * 2;
    location.z -= facing.z * 2;
    let current_entity = player.dimension.spawnEntity(entity, location);
    let sysid = system7.runInterval(() => {
      if (current_entity.isValid) {
        current_entity.teleport(location);
        current_entity.getComponent(EntityComponentTypes5.Health)?.resetToMaxValue();
      } else {
        system7.clearRun(sysid);
        current_entity.remove();
      }
    });
    system7.waitTicks(TicksPerSecond4 * 15).then(() => {
      system7.clearRun(sysid);
      current_entity.remove();
    });
  }
  visionBlockGlitch(player) {
    const blocks = [
      MinecraftBlockTypes.Bedrock,
      MinecraftBlockTypes.LightBlock15,
      MinecraftBlockTypes.BambooStairs,
      MinecraftBlockTypes.Dispenser,
      MinecraftBlockTypes.DarkOakFence,
      MinecraftBlockTypes.EnchantingTable,
      MinecraftBlockTypes.Campfire
    ];
    const block = blocks[Math.floor(Math.random() * blocks.length)];
    let location = player.location;
    let facing = player.getViewDirection();
    location.x += facing.x * 2;
    location.z += facing.z * 2;
    let random_block = player.dimension.getBlock(location);
    if (random_block?.typeId === MinecraftBlockTypes.Air && player.dimension.getEntitiesAtBlockLocation(location).length === 0) {
      random_block.setType(block);
      system7.waitTicks(TicksPerSecond4).then(() => {
        random_block.setType(MinecraftBlockTypes.Air);
      });
    }
  }
  particleSwarmGlitch(player) {
    const location = player.location;
    for (let i = 0; i < 20; i++) {
      system7.runTimeout(() => {
        const particleLocation = {
          x: location.x + (Math.random() - 0.5) * 4,
          y: location.y + Math.random() * 3,
          z: location.z + (Math.random() - 0.5) * 4
        };
        player.dimension.spawnParticle("minecraft:endrod", particleLocation);
      }, i * 5);
    }
  }
  fakeExplosionGlitch(player) {
    const location = player.location;
    player.playSound("random.explode", { volume: 100, pitch: 1 });
    player.dimension.spawnParticle("minecraft:huge_explosion_emitter", location);
    player.applyKnockback({ x: 0, z: 0 }, 0.2);
  }
  effectGlitch(player) {
    const effects = [
      MinecraftEffectTypes.Haste,
      MinecraftEffectTypes.MiningFatigue,
      MinecraftEffectTypes.SlowFalling,
      MinecraftEffectTypes.JumpBoost,
      MinecraftEffectTypes.HealthBoost,
      MinecraftEffectTypes.Hunger
    ];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    system7.run(() => {
      player.addEffect(effect, TicksPerSecond4 * 20);
    });
  }
  dimensionEchoGlitch(player) {
    const echoSounds = [
      "ambient.cave.cave",
      "portal.portal",
      "mob.endermen.portal",
      "ambient.nether.mood"
    ];
    const sound = echoSounds[Math.floor(Math.random() * echoSounds.length)];
    for (let i = 0; i < 3; i++) {
      system7.runTimeout(() => {
        player.playSound(sound, { volume: 50, pitch: 0.5 + i * 0.2 });
      }, i * 30);
    }
  }
  inventoryShuffleGlitch(player) {
    const inventory = player.getComponent("inventory")?.container;
    if (!inventory) return;
    const items = [];
    const slots = [];
    for (let i = 0; i < 9; i++) {
      const item = inventory.getItem(i);
      if (item) {
        items.push(item);
        slots.push(i);
        inventory.setItem(i, void 0);
      }
    }
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    for (let i = 0; i < items.length; i++) {
      inventory.setItem(slots[i], items[i]);
    }
  }
  uiCorruptionGlitch(player) {
    const fakeMessages = [
      "\xA7cError: Reality.exe has stopped working",
      "\xA74WARNING: Dimensional integrity compromised",
      "\xA78[SYSTEM] Recalibrating existence parameters...",
      "\xA75ANOMALY DETECTED: Player consciousness unstable"
    ];
    const message = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
    player.sendMessage(message);
  }
};

// behaviour_pack/scripts-dev/utils/index.ts
function convert_seconds_to_hms(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}
__name(convert_seconds_to_hms, "convert_seconds_to_hms");
function combine(list1, list2, id) {
  let combined_list = [];
  for (let item of list1) {
    combined_list.push({ ...item, ...list2.find((item2) => item2[id] === item[id]) });
  }
  return combined_list;
}
__name(combine, "combine");
function clean_id(id) {
  return id.replace(/^[^:]+:/, "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
__name(clean_id, "clean_id");
function normalizeDateString(datetime) {
  if (!datetime.includes(".")) {
    return `${datetime}.000000`;
  }
  return datetime.replace(/\.(\d{1,6})\d*/, (_, digits) => {
    return `.${digits.padEnd(6, "0")}`;
  });
}
__name(normalizeDateString, "normalizeDateString");
function getWeightedChoice(choices) {
  const total_weight = choices.reduce((sum, choice) => sum + choice.weight, 0);
  const random_value = Math.random() * total_weight;
  let cumulative_weight = 0;
  for (const choice of choices) {
    cumulative_weight += choice.weight;
    if (random_value < cumulative_weight) {
      return choice.item;
    }
  }
  return choices[0].item;
}
__name(getWeightedChoice, "getWeightedChoice");
var emojis = {
  EVERTHORN: "\uE600",
  NUGS: "\uE601",
  BUILDER: "\uE602",
  KNIGHT: "\uE603",
  GATHERER: "\uE604",
  MERCHANT: "\uE605",
  BARD: "\uE606",
  STONER: "\uE607",
  MINER: "\uE608",
  DISCORD_ICON: "\uE609",
  DISCORD: "\uE613",
  OWNER: "\uE610",
  MANAGER: "\uE611",
  PATRON: "\uE612",
  NEWBIE: "\uE614",
  DWELLER: "\uE615",
  SERVER: "\uE620"
};
var utils = {
  DeathMessage,
  AltarMessage,
  DragonHeartMessage,
  send_motd,
  checks: checks_default,
  commands: commands_default,
  convert_seconds_to_hms,
  clean_id,
  combine,
  EvilActs,
  Glitches,
  normalizeDateString,
  emojis,
  getWeightedChoice
};
var utils_default = utils;

// behaviour_pack/scripts-dev/features/blocks/glitch-block.ts
function loadGlitchBlockComponent() {
  const glitches = new utils_default.Glitches();
  function glitch(event) {
    if (Math.random() < 0.07 && event.block.isValid) {
      const location = event.block.location;
      const radius = 12;
      const players = event.block.dimension.getPlayers({ location, maxDistance: radius });
      players.forEach((player) => {
        glitches.executeRandomGlitch(player);
      });
    }
  }
  __name(glitch, "glitch");
  function glitch_particles(event) {
    if (event.block.isValid) {
      const location = event.block.location;
      const radius = 20;
      let random_location = {
        x: location.x + Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1),
        y: location.y + Math.floor(Math.random() * 4),
        z: location.z + Math.floor(Math.random() * radius) * (Math.random() < 0.5 ? -1 : 1)
      };
      if (event.block.dimension.getBlock(random_location)) {
        event.dimension.spawnParticle("minecraft:eyeofender_death_explode_particle", random_location);
      }
    }
  }
  __name(glitch_particles, "glitch_particles");
  system8.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(
      "amethyst:glitch",
      {
        onTick(event) {
          glitch_particles(event);
          glitch(event);
        }
      }
    );
  });
}
__name(loadGlitchBlockComponent, "loadGlitchBlockComponent");

// behaviour_pack/scripts-dev/features/blocks/monolithic-reactor.ts
import {
  BlockPermutation,
  EntityComponentTypes as EntityComponentTypes6,
  EquipmentSlot as EquipmentSlot4,
  system as system9
} from "@minecraft/server";
function loadMonolithicReactorComponent() {
  const GLITCHES = [
    utils_default.commands.noise_glitch,
    utils_default.commands.vision_block_glitch,
    utils_default.commands.vision_entity_glitch,
    utils_default.commands.effect_glitch,
    utils_default.commands.noise_glitch,
    utils_default.commands.noise_glitch,
    utils_default.commands.noise_glitch
  ];
  function on_interact(event) {
    const mainhand = event.player?.getComponent(EntityComponentTypes6.Equippable)?.getEquipment(EquipmentSlot4.Mainhand);
    if (mainhand?.typeId == "amethyst:glitch_core") {
      const active = event.block.permutation.getState("amethyst:reactor_active_state");
      if (event.block.isValid && !active) {
        event.block.setPermutation(BlockPermutation.resolve("amethyst:reactor", { "amethyst:reactor_active_state": true }));
        event.player?.getComponent(EntityComponentTypes6.Equippable)?.setEquipment(EquipmentSlot4.Mainhand);
        event.dimension.playSound("beacon.activate", event.block.center());
        event.block.dimension.getPlayers().forEach((player) => {
          GLITCHES.forEach((glitch) => {
            glitch(player);
          });
        });
      }
    }
  }
  __name(on_interact, "on_interact");
  system9.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(
      "amethyst:reactor_activate",
      {
        onPlayerInteract(event) {
          on_interact(event);
        }
      }
    );
  });
}
__name(loadMonolithicReactorComponent, "loadMonolithicReactorComponent");

// behaviour_pack/scripts-dev/features/blocks/whoopie-cushion.ts
import {
  BlockPermutation as BlockPermutation2,
  system as system10
} from "@minecraft/server";
function loadWhoopieCushionComponent() {
  function play_fart(dimension, location) {
    dimension.playSound("fart", location, { volume: 3, pitch: Math.max(0.45, Math.random() * 1.5) });
    location.y += 0.65;
    dimension.spawnParticle("minecraft:explosion_particle", location);
  }
  __name(play_fart, "play_fart");
  function on_interact(event) {
    play_fart(event.dimension, event.block.center());
  }
  __name(on_interact, "on_interact");
  function on_redstone(event) {
    const powered = event.block.permutation.getState("amethyst:powered_bit");
    if (event.block.isValid && event.block.getRedstonePower() && !powered) {
      event.block.setPermutation(BlockPermutation2.resolve("amethyst:whoopee_cushion", { "amethyst:powered_bit": true }));
      play_fart(event.dimension, event.block.center());
    } else if (event.block.isValid && !event.block.getRedstonePower() && powered) {
      event.block.setPermutation(BlockPermutation2.resolve("amethyst:whoopee_cushion", { "amethyst:powered_bit": false }));
    }
  }
  __name(on_redstone, "on_redstone");
  system10.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(
      "amethyst:whoop",
      {
        onTick(event) {
          on_redstone(event);
        },
        onPlayerInteract(event) {
          on_interact(event);
        },
        onStepOn(event) {
          on_interact(event);
        },
        beforeOnPlayerPlace(event) {
          on_interact(event);
        }
      }
    );
  });
}
__name(loadWhoopieCushionComponent, "loadWhoopieCushionComponent");

// behaviour_pack/scripts-dev/features/blocks/altar.ts
import {
  system as system11,
  EntityComponentTypes as EntityComponentTypes7,
  EquipmentSlot as EquipmentSlot5,
  TicksPerSecond as TicksPerSecond5,
  ItemComponentTypes as ItemComponentTypes3
} from "@minecraft/server";

// behaviour_pack/scripts-dev/api/nexuscore/users/users.ts
var getLookupUserV1GuildsMeUsersLookupGetUrl = /* @__PURE__ */ __name((params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/v1/guilds/me/users/lookup?${stringifiedParams}` : `/v1/guilds/me/users/lookup`;
}, "getLookupUserV1GuildsMeUsersLookupGetUrl");
var lookupUserV1GuildsMeUsersLookupGet = /* @__PURE__ */ __name(async (params, options) => {
  return minecraftFetch(
    getLookupUserV1GuildsMeUsersLookupGetUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
}, "lookupUserV1GuildsMeUsersLookupGet");
var getPartialUpdateUserV1GuildsMeUsersThornyIdPatchUrl = /* @__PURE__ */ __name((thornyId) => {
  return `/v1/guilds/me/users/${thornyId}`;
}, "getPartialUpdateUserV1GuildsMeUsersThornyIdPatchUrl");
var partialUpdateUserV1GuildsMeUsersThornyIdPatch = /* @__PURE__ */ __name(async (thornyId, userUpdate, options) => {
  return minecraftFetch(
    getPartialUpdateUserV1GuildsMeUsersThornyIdPatchUrl(thornyId),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(userUpdate)
    }
  );
}, "partialUpdateUserV1GuildsMeUsersThornyIdPatch");

// behaviour_pack/scripts-dev/api/nexuscore/guilds/guilds.ts
var getCreateConnectionV1GuildsMeConnectionPostUrl = /* @__PURE__ */ __name(() => {
  return `/v1/guilds/me/connection`;
}, "getCreateConnectionV1GuildsMeConnectionPostUrl");
var createConnectionV1GuildsMeConnectionPost = /* @__PURE__ */ __name(async (connectionIn, options) => {
  return minecraftFetch(
    getCreateConnectionV1GuildsMeConnectionPostUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(connectionIn)
    }
  );
}, "createConnectionV1GuildsMeConnectionPost");
var getCreateInteractionV1GuildsMeInteractionPostUrl = /* @__PURE__ */ __name(() => {
  return `/v1/guilds/me/interaction`;
}, "getCreateInteractionV1GuildsMeInteractionPostUrl");
var createInteractionV1GuildsMeInteractionPost = /* @__PURE__ */ __name(async (interactionIn, options) => {
  return minecraftFetch(
    getCreateInteractionV1GuildsMeInteractionPostUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(interactionIn)
    }
  );
}, "createInteractionV1GuildsMeInteractionPost");
var getListInteractionsV1GuildsMeInteractionsGetUrl = /* @__PURE__ */ __name((params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    const arrayFormatParameters = ["coordinates", "coordinates_end", "thorny_ids", "interaction_types", "references", "dimensions"];
    if (Array.isArray(value) && arrayFormatParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/v1/guilds/me/interactions?${stringifiedParams}` : `/v1/guilds/me/interactions`;
}, "getListInteractionsV1GuildsMeInteractionsGetUrl");
var listInteractionsV1GuildsMeInteractionsGet = /* @__PURE__ */ __name(async (params, options) => {
  return minecraftFetch(
    getListInteractionsV1GuildsMeInteractionsGetUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
}, "listInteractionsV1GuildsMeInteractionsGet");

// behaviour_pack/scripts-dev/api/user.ts
var ThornyUser = class _ThornyUser {
  static {
    __name(this, "ThornyUser");
  }
  static {
    this.thorny_user_map = {};
  }
  static {
    this.thorny_id_map = {};
  }
  static {
    this.cache_expiry = {};
  }
  static {
    this.pending_fetches = {};
  }
  constructor(api_data) {
    this.thorny_id = api_data.thorny_id;
    this.user_id = api_data.user_id;
    this.guild_id = api_data.guild_id;
    this.username = api_data.username;
    this.join_date = api_data.join_date;
    this.birthday = api_data.birthday;
    this.balance = api_data.balance;
    this.active = api_data.active;
    this.role = api_data.role;
    this.patron = api_data.patron;
    this.level = api_data.level;
    this.xp = api_data.xp;
    this.required_xp = api_data.required_xp;
    this.last_message = api_data.last_message;
    this.gamertag = api_data.gamertag;
    this.whitelist = api_data.whitelist;
    this.profile = api_data.profile;
    this.location = api_data.location;
    this.dimension = api_data.dimension;
    this.hidden = api_data.hidden;
  }
  static async get_user_from_api(gamertag) {
    const response = await lookupUserV1GuildsMeUsersLookupGet({ gamertag });
    const thorny_user = new _ThornyUser(response);
    thorny_user.gamertag = gamertag;
    _ThornyUser.thorny_user_map[gamertag] = thorny_user;
    _ThornyUser.thorny_id_map[thorny_user.thorny_id] = thorny_user;
    _ThornyUser.cache_expiry[thorny_user.thorny_id] = new Date(Date.now() + 1e3 * 60 * 5);
    return thorny_user;
  }
  static fetch_user(gamertag) {
    const cached = _ThornyUser.thorny_user_map[gamertag];
    const exp = cached ? _ThornyUser.cache_expiry[cached.thorny_id] : void 0;
    const is_fresh = cached && exp && exp > /* @__PURE__ */ new Date();
    if (!is_fresh && !_ThornyUser.pending_fetches[gamertag]) {
      const request = _ThornyUser.get_user_from_api(gamertag).catch((err) => {
        console.error(`Failed to refresh ThornyUser for ${gamertag}:`, err);
        return cached;
      }).finally(() => {
        delete _ThornyUser.pending_fetches[gamertag];
      });
      _ThornyUser.pending_fetches[gamertag] = request;
    }
    return cached;
  }
  static fetch_user_by_id(thorny_id) {
    const cached = _ThornyUser.thorny_id_map[thorny_id];
    const exp = cached ? _ThornyUser.cache_expiry[thorny_id] : void 0;
    const is_fresh = cached && exp && exp > /* @__PURE__ */ new Date();
    if (!is_fresh && cached && !_ThornyUser.pending_fetches[cached.gamertag]) {
      const request = _ThornyUser.get_user_from_api(cached.gamertag).catch((err) => {
        console.error(`Failed to refresh ThornyUser for id ${thorny_id}:`, err);
        return cached;
      }).finally(() => {
        delete _ThornyUser.pending_fetches[cached.gamertag];
      });
      _ThornyUser.pending_fetches[cached.gamertag] = request;
    }
    return cached;
  }
  /**
   * Update this user in NexusCore.
   */
  async update() {
    await partialUpdateUserV1GuildsMeUsersThornyIdPatch(this.thorny_id, {
      "location": this.location,
      "dimension": this.dimension,
      "hidden": this.hidden
    });
  }
  /**
   * Send a connection event to NexusCore, either
   * connect or disconnect
   */
  async send_connect_event(event_type) {
    await createConnectionV1GuildsMeConnectionPost({
      "type": event_type,
      "thorny_id": this.thorny_id
    });
  }
  /**
   * Returns a decorated role string for chat decoration
   */
  get_role_display() {
    if (this.role == "New Recruit") {
      return utils_default.emojis.NEWBIE;
    }
    let role_emojis = [];
    switch (this.role) {
      case "Builder":
        role_emojis.push(utils_default.emojis.BUILDER);
        break;
      case "Merchant":
        role_emojis.push(utils_default.emojis.MERCHANT);
        break;
      case "Knight":
        role_emojis.push(utils_default.emojis.KNIGHT);
        break;
      case "Gatherer":
        role_emojis.push(utils_default.emojis.GATHERER);
        break;
      case "Miner":
        role_emojis.push(utils_default.emojis.MINER);
        break;
      case "Bard":
        role_emojis.push(utils_default.emojis.BARD);
        break;
      case "Stoner":
        role_emojis.push(utils_default.emojis.STONER);
        break;
    }
    if (this.role == "Owner") {
      role_emojis.push(utils_default.emojis.OWNER);
    } else if (this.role == "Community Manager") {
      role_emojis.push(utils_default.emojis.MANAGER);
    } else if (this.patron) {
      role_emojis.push(utils_default.emojis.PATRON);
    } else {
      role_emojis.push(utils_default.emojis.DWELLER);
    }
    return role_emojis.join("");
  }
};

// behaviour_pack/scripts-dev/api/nexuscore/webhook-relay/webhook-relay.ts
var getServerRelayV1RelayPostUrl = /* @__PURE__ */ __name(() => {
  return `/v1/relay`;
}, "getServerRelayV1RelayPostUrl");
var serverRelayV1RelayPost = /* @__PURE__ */ __name(async (relayModel, options) => {
  return minecraftFetch(
    getServerRelayV1RelayPostUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(relayModel)
    }
  );
}, "serverRelayV1RelayPost");

// behaviour_pack/scripts-dev/api/relay.ts
var Relay = class {
  static {
    __name(this, "Relay");
  }
  static message(nametag, content) {
    serverRelayV1RelayPost({
      "type": "message",
      "content": content,
      "embed_title": "",
      "embed_content": "",
      "name": nametag
    }).then();
  }
  static event(title, content, event_type) {
    serverRelayV1RelayPost({
      "type": event_type,
      "content": "",
      "embed_title": title,
      "embed_content": content,
      "name": "Server"
    }).then();
  }
};

// behaviour_pack/scripts-dev/api/interaction.ts
var Interaction = class _Interaction {
  static {
    __name(this, "Interaction");
  }
  static {
    this.queue = [];
  }
  static {
    this.processing = false;
  }
  constructor(data) {
    this.thorny_id = data.thorny_id;
    this.type = data.type;
    this.coordinates = [Math.round(data.coordinates[0]), Math.round(data.coordinates[1]), Math.round(data.coordinates[2])];
    this.reference = data.reference;
    this.mainhand = data.mainhand;
    this.dimension = data.dimension;
    this.time = /* @__PURE__ */ new Date();
  }
  /**
   * Post interaction to NexusCore
   */
  async post_interaction() {
    await createInteractionV1GuildsMeInteractionPost({
      thorny_id: this.thorny_id,
      type: this.type,
      coordinates: this.coordinates,
      reference: this.reference,
      mainhand: this.mainhand,
      dimension: this.dimension
    });
  }
  static set_processing(value) {
    _Interaction.processing = value;
  }
  static is_processing() {
    return _Interaction.processing;
  }
  static enqueue(interaction) {
    _Interaction.queue.push(interaction);
  }
  static dequeue() {
    return _Interaction.queue.shift();
  }
};

// behaviour_pack/scripts-dev/api/index.ts
var api = {
  ThornyUser,
  Relay,
  Interaction,
  Item,
  World
};
var api_default = api;

// behaviour_pack/scripts-dev/features/blocks/altar.ts
function loadAltarComponent() {
  const sacrificeTimers = /* @__PURE__ */ new Map();
  const sacrificeTotals = /* @__PURE__ */ new Map();
  const evil_acts = new utils_default.EvilActs();
  const banned_gamertags = [
    "MarsOfSoa",
    "lumilime",
    "bellissensei",
    "Gamingwarrior65",
    "Eziofilm65"
    // 'ProtocolPav',
  ];
  async function sacrifice(event) {
    if (event.player) {
      const playerName = event.player.name;
      const mainhand = event.player.getComponent(EntityComponentTypes7.Equippable)?.getEquipment(EquipmentSlot5.Mainhand);
      const border = WorldCache.world;
      if (mainhand && !banned_gamertags.includes(playerName)) {
        if (mainhand.amount == 1) {
          event.player.getComponent(EntityComponentTypes7.Equippable)?.setEquipment(EquipmentSlot5.Mainhand);
        } else {
          mainhand.amount -= 1;
          event.player.getComponent(EntityComponentTypes7.Equippable)?.setEquipment(EquipmentSlot5.Mainhand, mainhand);
        }
        event.dimension.playSound("random.pop", event.player.location, { volume: 0.5 });
        try {
          const sacrificial_item = await api_default.Item.get_item(mainhand.typeId);
          sacrificial_item.current_uses += 1;
          let modifier = 0;
          let enchantment_levels = 0;
          let enchantments = 0;
          mainhand.getComponent(ItemComponentTypes3.Enchantable)?.getEnchantments().forEach((enchantment) => {
            enchantment_levels += enchantment.level;
            enchantments += 1;
          });
          modifier += enchantment_levels * enchantments * 0.3 / 100 + (mainhand.nameTag ? 0.1 : 0);
          const durability = mainhand.getComponent(ItemComponentTypes3.Durability);
          if (durability) {
            modifier -= durability.damage / durability.maxDurability;
          }
          const original_block_value = sacrificial_item.value * (1 + modifier);
          const log = Math.exp(-sacrificial_item.depreciation * 0.5 * Math.log(sacrificial_item.current_uses));
          const weight = sacrificial_item.current_uses / sacrificial_item.max_uses;
          const linear = 1 - weight;
          const block_value = original_block_value * ((1 - weight) * log + weight * linear);
          await sacrificial_item.update_item();
          border.end_border += block_value;
          await border.update_world();
          await WorldCache.load_world();
          const total_value = sacrificeTotals.get(playerName)?.val;
          const total_original_value = sacrificeTotals.get(playerName)?.orig;
          if (total_value && total_original_value) {
            sacrificeTotals.set(playerName, { val: block_value + total_value, orig: original_block_value + total_original_value });
          } else {
            sacrificeTotals.set(playerName, { val: block_value, orig: original_block_value });
          }
          if (sacrificeTimers.has(playerName)) {
            system11.clearRun(sacrificeTimers.get(playerName));
          }
          const timeoutId = system11.runTimeout(() => {
            ambient(event);
            event.dimension.playSound("altar.sacrifice", event.block.center(), { volume: 6 });
            const total_value2 = Math.round(sacrificeTotals.get(playerName)?.val);
            const total_original = Math.round(sacrificeTotals.get(playerName)?.orig);
            const message = utils_default.AltarMessage.random_sacrifice(total_value2, total_original);
            utils_default.commands.send_message(
              event.dimension.id,
              "@a",
              `[\xA7l\xA7aAltar\xA7r] ${message}`
            );
            const valueRemaining = total_value2 / total_original;
            if (event.player && valueRemaining < 0.3 && Math.random() < 0.5) {
              evil_acts.executeRandomPunishment(event.player);
            } else if (event.player && valueRemaining < 0.5 && Math.random() < 0.12) {
              evil_acts.executeRandomPunishment(event.player);
            }
            sacrificeTimers.delete(playerName);
            sacrificeTotals.delete(playerName);
          }, TicksPerSecond5 * 0.5);
          sacrificeTimers.set(playerName, timeoutId);
        } catch (e) {
          ambient(event);
          const spawned_item = mainhand.clone();
          spawned_item.amount = 1;
          const spawned_location = event.block.center();
          spawned_location.y += 0.7;
          event.dimension.spawnItem(spawned_item, spawned_location);
          const message = utils_default.AltarMessage.random_not_sacrificial();
          utils_default.commands.send_message(
            event.dimension.id,
            playerName,
            `[\xA7l\xA7aAltar\xA7r] ${message}`
          );
        }
      } else {
        ambient(event);
        const message = utils_default.AltarMessage.random_info(Math.round(border.end_border));
        utils_default.commands.send_message(
          event.dimension.id,
          playerName,
          `[\xA7l\xA7aAltar\xA7r] ${message}`
        );
      }
    }
  }
  __name(sacrifice, "sacrifice");
  function ambient(event) {
    if (event.block.isValid) {
      const location = event.block.center();
      event.dimension.playSound("altar.ambient", location, { volume: 3 });
    }
  }
  __name(ambient, "ambient");
  system11.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(
      "amethyst:sacrifice",
      {
        onRandomTick(event) {
          ambient(event);
        },
        onPlayerInteract(event) {
          sacrifice(event).then();
        }
      }
    );
  });
}
__name(loadAltarComponent, "loadAltarComponent");

// behaviour_pack/scripts-dev/features/blocks/index.ts
function loadBlockComponents() {
  loadFungusSpreadComponent();
  loadGlitchBlockComponent();
  loadMonolithicReactorComponent();
  loadWhoopieCushionComponent();
  loadAltarComponent();
}
__name(loadBlockComponents, "loadBlockComponents");

// behaviour_pack/scripts-dev/features/dragon-fight/health-manager.ts
import { EntityComponentTypes as EntityComponentTypes8, world as world12 } from "@minecraft/server";
function loadHealthManager() {
  let first_stage = false;
  let second_stage = false;
  function react_to_dragon_damage(event) {
    const health_component = event.hurtEntity.getComponent(EntityComponentTypes8.Health);
    if (health_component && !first_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.75) {
      first_stage = true;
      const message = utils_default.DragonHeartMessage.health_stage_message(1);
      utils_default.commands.send_message(
        event.hurtEntity.dimension.id,
        "@a",
        message
      );
      utils_default.DragonHeartMessage.summon_minions();
    } else if (health_component && !second_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.25) {
      second_stage = true;
      const message = utils_default.DragonHeartMessage.health_stage_message(2);
      utils_default.commands.send_message(
        event.hurtEntity.dimension.id,
        "@a",
        message
      );
      utils_default.DragonHeartMessage.summon_minions();
    }
  }
  __name(react_to_dragon_damage, "react_to_dragon_damage");
  function reset_health_stage(event) {
    first_stage = false;
    second_stage = false;
  }
  __name(reset_health_stage, "reset_health_stage");
  world12.afterEvents.entityHurt.subscribe(
    react_to_dragon_damage,
    { entityTypes: [MinecraftEntityTypes.EnderDragon] }
  );
  world12.afterEvents.entityDie.subscribe(
    reset_health_stage,
    { entityTypes: [MinecraftEntityTypes.EnderDragon] }
  );
}
__name(loadHealthManager, "loadHealthManager");

// behaviour_pack/scripts-dev/features/dragon-fight/draconic-heart.ts
import {
  system as system12,
  EntityComponentTypes as EntityComponentTypes9
} from "@minecraft/server";
function loadDraconicHeartComponents() {
  let mined_blocks = 0;
  function heal_dragon(event) {
    if (event.block.isValid) {
      const dragon = event.block.dimension.getEntities({ type: MinecraftEntityTypes.EnderDragon })[0];
      if (dragon && dragon.isValid) {
        dragon.getComponent(EntityComponentTypes9.Health)?.resetToMaxValue();
      }
      event.dimension.playSound("mob.warden.heartbeat", event.block.location);
    }
  }
  __name(heal_dragon, "heal_dragon");
  function heart_destroy(event) {
    mined_blocks++;
    event.dimension.spawnEntity(
      "amethyst:the_breath",
      event.block.location
    );
    event.dimension.spawnEntity(
      "amethyst:the_breath",
      event.block.location
    );
    event.dimension.spawnEntity(
      "amethyst:the_breath",
      event.block.location
    );
    event.dimension.spawnEntity(
      "amethyst:endstone_golem",
      event.block.location
    );
    event.dimension.playSound("mob.enderdragon.growl", event.block.location);
    const message = utils_default.DragonHeartMessage.heart_mined(mined_blocks);
    utils_default.commands.send_message(
      event.dimension.id,
      "@a",
      message
    );
  }
  __name(heart_destroy, "heart_destroy");
  system12.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent(
      "amethyst:heal_dragon",
      {
        onTick(event) {
          heal_dragon(event);
        },
        onPlayerBreak(event) {
          heart_destroy(event);
        }
      }
    );
  });
}
__name(loadDraconicHeartComponents, "loadDraconicHeartComponents");

// behaviour_pack/scripts-dev/features/dragon-fight/index.ts
function loadDragonFightFeature() {
  loadHealthManager();
  loadDraconicHeartComponents();
}
__name(loadDragonFightFeature, "loadDragonFightFeature");

// behaviour_pack/scripts-dev/features/commands/lore.ts
import {
  CommandPermissionLevel,
  CustomCommandParamType,
  CustomCommandStatus,
  EntityComponentTypes as EntityComponentTypes10,
  EquipmentSlot as EquipmentSlot6,
  system as system13
} from "@minecraft/server";
function loreCommand() {
  system13.beforeEvents.startup.subscribe((initEvent) => {
    system13.run(() => {
      api_default.Relay.event(
        "Amethyst successfully loaded",
        "Don't see this on server startup? Ping a CM! It's important!",
        "other"
      );
    });
    const loreCommand2 = {
      name: "amethyst:lore",
      description: "Add a line to the lore, or remove all lore if blank",
      permissionLevel: CommandPermissionLevel.GameDirectors,
      optionalParameters: [{ type: CustomCommandParamType.String, name: "text" }]
    };
    initEvent.customCommandRegistry.registerCommand(
      loreCommand2,
      (origin, ...args) => {
        try {
          const mainhand = origin.sourceEntity?.getComponent(EntityComponentTypes10.Equippable)?.getEquipment(EquipmentSlot6.Mainhand);
          system13.run(() => {
            if (args[0] === null || args[0] === void 0 || args[0] === "") {
              mainhand?.setLore();
            } else {
              const lore = mainhand?.getLore();
              lore?.push(args[0]);
              mainhand?.setLore(lore);
            }
            origin.sourceEntity?.getComponent(EntityComponentTypes10.Equippable)?.setEquipment(EquipmentSlot6.Mainhand, mainhand);
          });
        } catch (e) {
          return {
            status: CustomCommandStatus.Failure,
            message: e.message
          };
        }
        return {
          status: CustomCommandStatus.Success
        };
      }
    );
  });
}
__name(loreCommand, "loreCommand");

// behaviour_pack/scripts-dev/features/commands/index.ts
function loadCommands() {
  loreCommand();
}
__name(loadCommands, "loadCommands");

// behaviour_pack/scripts-dev/features/wine-n-beer/components.ts
import {
  system as system14
} from "@minecraft/server";
function loadOnDrinkComponent() {
  async function on_drink(event) {
    const player = event.source;
    const drunk_data_string = player.getDynamicProperty("amethyst:drunk_data");
    if (!drunk_data_string) {
      player.setDynamicProperty("amethyst:drunk_data", JSON.stringify({ type: event.itemStack.typeId, drinks: 1 }));
    } else {
      let drunk_data = JSON.parse(drunk_data_string);
      drunk_data.drinks += 1;
      drunk_data.type = event.itemStack.typeId;
      player.setDynamicProperty("amethyst:drunk_data", JSON.stringify(drunk_data));
    }
  }
  __name(on_drink, "on_drink");
  system14.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.itemComponentRegistry.registerCustomComponent(
      "amethyst:alcohol",
      {
        async onConsume(event) {
          await on_drink(event);
        }
      }
    );
  });
}
__name(loadOnDrinkComponent, "loadOnDrinkComponent");

// behaviour_pack/scripts-dev/features/wine-n-beer/loops.ts
import { system as system15, TicksPerSecond as TicksPerSecond7, world as world13 } from "@minecraft/server";
function sober_up(drunk_data) {
  const sober_chance = 0.06;
  const drunk_up_chance = 5e-3 * drunk_data.drinks;
  if (Math.random() < sober_chance) {
    drunk_data.drinks -= 1;
  } else if (Math.random() < drunk_up_chance) {
    drunk_data.drinks += 1;
  }
  return drunk_data;
}
__name(sober_up, "sober_up");
function cumulative_drunk_effects(player, drunk_data) {
  player.addEffect(MinecraftEffectTypes.Oozing, TicksPerSecond7 * 2);
  if (drunk_data.drinks > 4) {
    player.addEffect(MinecraftEffectTypes.Hunger, TicksPerSecond7 * drunk_data.drinks);
  }
  if (drunk_data.drinks > 18) {
    player.addEffect(MinecraftEffectTypes.Slowness, TicksPerSecond7 * 2, { amplifier: 3 });
  }
  if (drunk_data.drinks > 20) {
    player.addEffect(MinecraftEffectTypes.FatalPoison, TicksPerSecond7 * 2);
  }
}
__name(cumulative_drunk_effects, "cumulative_drunk_effects");
function drunk(player) {
  const drunk_data_string = player.getDynamicProperty("amethyst:drunk_data");
  if (drunk_data_string) {
    let drunk_data = JSON.parse(drunk_data_string);
    let effect_choices = [];
    cumulative_drunk_effects(player, drunk_data);
    if (drunk_data.type === "amethyst:beer") {
      effect_choices = [
        { item: "fart", weight: 2 },
        { item: "blink", weight: 3 },
        { item: "nausea", weight: 2 },
        { item: "burp", weight: 4 },
        { item: "slowness", weight: 1 },
        { item: "none", weight: 3 }
      ];
    } else if (drunk_data.type === "amethyst:wine") {
      effect_choices = [
        { item: "blink", weight: 3 },
        { item: "nausea", weight: 1 },
        { item: "slowness", weight: 2 },
        { item: "laugh", weight: 4 }
      ];
    } else if (drunk_data.type === "amethyst:glow_wine") {
      effect_choices = [
        { item: "blink", weight: 3 },
        { item: "nausea", weight: 1 },
        { item: "burp", weight: 1 },
        { item: "laugh", weight: 5 },
        { item: "night_vision", weight: 4 },
        { item: "speed", weight: 2 }
      ];
    }
    drunk_data = drunk_effects(player, drunk_data, effect_choices);
    drunk_data = sober_up(drunk_data);
    if (drunk_data.drinks <= 0) {
      player.camera.setFov({ easeOptions: { easeTime: 2.5 } });
      player.setDynamicProperty("amethyst:drunk_data", void 0);
    } else {
      player.setDynamicProperty("amethyst:drunk_data", JSON.stringify(drunk_data));
    }
  }
}
__name(drunk, "drunk");
function drunk_effects(player, drunk_data, effect_choices) {
  const dimension = player.dimension;
  const location = player.location;
  const target_fov_level = Math.max(45, 73 - drunk_data.drinks * 2);
  if (drunk_data.fov_level !== target_fov_level) {
    drunk_data.fov_level = target_fov_level;
    player.camera.setFov({ fov: drunk_data.fov_level, easeOptions: { easeTime: 4 } });
  }
  const effect_chance = 0.11 + drunk_data.drinks * 0.04;
  if (Math.random() < effect_chance) {
    const chosen_effect = utils_default.getWeightedChoice(effect_choices);
    if (chosen_effect === "fart") {
      dimension.playSound("fart", location, { volume: 1, pitch: Math.max(0.45, Math.random() * 1.5) });
      const particle_location = { ...location };
      particle_location.y += 1;
      dimension.spawnParticle("minecraft:explosion_particle", particle_location);
    } else if (chosen_effect === "burp") {
      dimension.playSound("burp", location, { volume: 1, pitch: Math.max(0.7, Math.random() * 1.5) });
      const particle_location = { ...location };
      particle_location.y += 2;
      dimension.spawnParticle("minecraft:explosion_particle", particle_location);
    } else if (chosen_effect === "laugh") {
      dimension.playSound("laugh", location, { volume: 1, pitch: Math.max(0.83, Math.random() * 1.7) });
    } else if (chosen_effect === "blink") {
      player.camera.fade({ fadeTime: { fadeInTime: 0.5, holdTime: 0.1, fadeOutTime: 0.25 } });
    } else if (chosen_effect === "nausea") {
      player.addEffect(MinecraftEffectTypes.Nausea, TicksPerSecond7 * drunk_data.drinks * 2.5);
    } else if (chosen_effect === "slowness") {
      player.addEffect(MinecraftEffectTypes.Slowness, TicksPerSecond7 * drunk_data.drinks);
    } else if (chosen_effect === "night_vision") {
      player.addEffect(MinecraftEffectTypes.NightVision, TicksPerSecond7 * drunk_data.drinks);
    } else if (chosen_effect === "speed") {
      player.addEffect(MinecraftEffectTypes.Speed, TicksPerSecond7 * drunk_data.drinks);
    }
  }
  return drunk_data;
}
__name(drunk_effects, "drunk_effects");
function drunkDataManager() {
  system15.runInterval(() => {
    let playerlist = world13.getPlayers();
    playerlist.forEach((player) => {
      drunk(player);
    });
  }, TicksPerSecond7);
  world13.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
    let player = spawn_event.player;
    if (player.getDynamicProperty("amethyst:drunk_data")) {
      player.camera.setFov();
      player.setDynamicProperty("amethyst:drunk_data", void 0);
    }
  });
}
__name(drunkDataManager, "drunkDataManager");

// behaviour_pack/scripts-dev/features/wine-n-beer/index.ts
function loadWineAndBeerFeature() {
  loadOnDrinkComponent();
  drunkDataManager();
}
__name(loadWineAndBeerFeature, "loadWineAndBeerFeature");

// behaviour_pack/scripts-dev/features/chat.ts
import { system as system16, world as world14 } from "@minecraft/server";
function loadChatDecorationFeature() {
  world14.beforeEvents.chatSend.subscribe((chat_event) => {
    const gamertag = chat_event.sender.name;
    const thorny_user = api_default.ThornyUser.fetch_user(gamertag);
    world14.sendMessage({
      rawtext: [{ text: `${thorny_user?.get_role_display()} \xA77${gamertag}:\xA7r ${chat_event.message}` }]
    });
    system16.run(() => {
      api_default.Relay.message(gamertag, chat_event.message);
    });
    chat_event.cancel = true;
  });
}
__name(loadChatDecorationFeature, "loadChatDecorationFeature");

// behaviour_pack/scripts-dev/features/interactions/block-interact.ts
import { world as world15, system as system17 } from "@minecraft/server";
import { EntityComponentTypes as EntityComponentTypes11, EquipmentSlot as EquipmentSlot7 } from "@minecraft/server";
function blockInteract() {
  const LOGGABLE_BLOCKS = [
    // Containers
    MinecraftBlockTypes.Chest,
    MinecraftBlockTypes.Barrel,
    MinecraftBlockTypes.EnderChest,
    MinecraftBlockTypes.TrappedChest,
    MinecraftBlockTypes.CopperChest,
    MinecraftBlockTypes.ExposedCopperChest,
    MinecraftBlockTypes.WeatheredCopperChest,
    MinecraftBlockTypes.OxidizedCopperChest,
    MinecraftBlockTypes.WaxedCopperChest,
    MinecraftBlockTypes.WaxedExposedCopperChest,
    MinecraftBlockTypes.WaxedOxidizedCopperChest,
    MinecraftBlockTypes.WaxedWeatheredCopperChest,
    // Shulkers
    MinecraftBlockTypes.RedShulkerBox,
    MinecraftBlockTypes.LightGrayShulkerBox,
    MinecraftBlockTypes.LightBlueShulkerBox,
    MinecraftBlockTypes.BlueShulkerBox,
    MinecraftBlockTypes.CyanShulkerBox,
    MinecraftBlockTypes.GrayShulkerBox,
    MinecraftBlockTypes.LimeShulkerBox,
    MinecraftBlockTypes.PinkShulkerBox,
    MinecraftBlockTypes.BlackShulkerBox,
    MinecraftBlockTypes.BrownShulkerBox,
    MinecraftBlockTypes.GreenShulkerBox,
    MinecraftBlockTypes.WhiteShulkerBox,
    MinecraftBlockTypes.OrangeShulkerBox,
    MinecraftBlockTypes.PurpleShulkerBox,
    MinecraftBlockTypes.UndyedShulkerBox,
    MinecraftBlockTypes.YellowShulkerBox,
    MinecraftBlockTypes.MagentaShulkerBox,
    // Other Blocks
    MinecraftBlockTypes.Crafter,
    MinecraftBlockTypes.CraftingTable,
    MinecraftBlockTypes.Furnace,
    MinecraftBlockTypes.BlastFurnace,
    MinecraftBlockTypes.LitFurnace,
    MinecraftBlockTypes.LitBlastFurnace,
    MinecraftBlockTypes.LitSmoker,
    MinecraftBlockTypes.Smoker,
    MinecraftBlockTypes.Hopper,
    MinecraftBlockTypes.EnchantingTable,
    MinecraftBlockTypes.Anvil,
    MinecraftBlockTypes.ChippedAnvil,
    MinecraftBlockTypes.DamagedAnvil,
    MinecraftBlockTypes.BrewingStand,
    MinecraftBlockTypes.Beacon,
    MinecraftBlockTypes.CartographyTable,
    MinecraftBlockTypes.Grindstone,
    MinecraftBlockTypes.Lectern,
    MinecraftBlockTypes.Loom,
    MinecraftBlockTypes.SmithingTable,
    MinecraftBlockTypes.StonecutterBlock,
    MinecraftBlockTypes.ChiseledBookshelf,
    MinecraftBlockTypes.Jukebox,
    // Buttons
    MinecraftBlockTypes.Lever,
    MinecraftBlockTypes.WoodenButton,
    MinecraftBlockTypes.SpruceButton,
    MinecraftBlockTypes.BirchButton,
    MinecraftBlockTypes.JungleButton,
    MinecraftBlockTypes.AcaciaButton,
    MinecraftBlockTypes.DarkOakButton,
    MinecraftBlockTypes.MangroveButton,
    MinecraftBlockTypes.CherryButton,
    MinecraftBlockTypes.PaleOakButton,
    MinecraftBlockTypes.BambooButton,
    MinecraftBlockTypes.CrimsonButton,
    MinecraftBlockTypes.WarpedButton,
    MinecraftBlockTypes.PolishedBlackstoneButton,
    MinecraftBlockTypes.StoneButton,
    // Doors
    MinecraftBlockTypes.WoodenDoor,
    MinecraftBlockTypes.SpruceDoor,
    MinecraftBlockTypes.BirchDoor,
    MinecraftBlockTypes.JungleDoor,
    MinecraftBlockTypes.AcaciaDoor,
    MinecraftBlockTypes.DarkOakDoor,
    MinecraftBlockTypes.MangroveDoor,
    MinecraftBlockTypes.CherryDoor,
    MinecraftBlockTypes.PaleOakDoor,
    MinecraftBlockTypes.BambooDoor,
    MinecraftBlockTypes.CrimsonDoor,
    MinecraftBlockTypes.WarpedDoor,
    MinecraftBlockTypes.IronDoor,
    MinecraftBlockTypes.CopperDoor,
    MinecraftBlockTypes.ExposedCopperDoor,
    MinecraftBlockTypes.WeatheredCopperDoor,
    MinecraftBlockTypes.OxidizedCopperDoor,
    MinecraftBlockTypes.WaxedCopperDoor,
    MinecraftBlockTypes.WaxedExposedCopperDoor,
    MinecraftBlockTypes.WaxedOxidizedCopperDoor,
    MinecraftBlockTypes.WaxedWeatheredCopperDoor,
    // Trapdoors
    MinecraftBlockTypes.Trapdoor,
    MinecraftBlockTypes.SpruceTrapdoor,
    MinecraftBlockTypes.BirchTrapdoor,
    MinecraftBlockTypes.JungleTrapdoor,
    MinecraftBlockTypes.AcaciaTrapdoor,
    MinecraftBlockTypes.DarkOakTrapdoor,
    MinecraftBlockTypes.MangroveTrapdoor,
    MinecraftBlockTypes.CherryTrapdoor,
    MinecraftBlockTypes.PaleOakTrapdoor,
    MinecraftBlockTypes.BambooTrapdoor,
    MinecraftBlockTypes.CrimsonTrapdoor,
    MinecraftBlockTypes.WarpedTrapdoor,
    MinecraftBlockTypes.IronTrapdoor,
    MinecraftBlockTypes.CopperTrapdoor,
    MinecraftBlockTypes.ExposedCopperTrapdoor,
    MinecraftBlockTypes.WeatheredCopperTrapdoor,
    MinecraftBlockTypes.OxidizedCopperTrapdoor,
    MinecraftBlockTypes.WaxedCopperTrapdoor,
    MinecraftBlockTypes.WaxedExposedCopperTrapdoor,
    MinecraftBlockTypes.WaxedOxidizedCopperTrapdoor,
    MinecraftBlockTypes.WaxedWeatheredCopperTrapdoor
  ];
  function blockInteraction(event) {
    const block_id = event.block.typeId;
    const block_location = [event.block.x, event.block.y, event.block.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes11.Equippable)?.getEquipment(EquipmentSlot7.Mainhand);
    const isPlacing = event.beforeItemStack?.typeId === block_id && event.itemStack?.amount !== event.beforeItemStack?.amount;
    if (!isPlacing) {
      system17.run(() => {
        const interaction = new api_default.Interaction(
          {
            thorny_id: api_default.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
            type: "use",
            coordinates: block_location,
            reference: block_id,
            mainhand: mainhand?.typeId ?? null,
            dimension: dimension.id
          }
        );
        interaction.post_interaction();
      });
    }
  }
  __name(blockInteraction, "blockInteraction");
  world15.afterEvents.playerInteractWithBlock.subscribe((event) => {
    if (LOGGABLE_BLOCKS.includes(event.block.typeId)) {
      blockInteraction(event);
    }
  });
}
__name(blockInteract, "blockInteract");

// behaviour_pack/scripts-dev/features/interactions/block-break.ts
import { EntityComponentTypes as EntityComponentTypes12, EquipmentSlot as EquipmentSlot8, system as system18, world as world16 } from "@minecraft/server";
function blockBreak() {
  world16.beforeEvents.playerBreakBlock.subscribe(async (event) => {
    const block_id = event.block.typeId;
    const block_location = [event.block.x, event.block.y, event.block.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes12.Equippable)?.getEquipment(EquipmentSlot8.Mainhand);
    const thorny_user = api_default.ThornyUser.fetch_user(event.player.name);
    system18.run(() => {
      const interaction = new api_default.Interaction(
        {
          thorny_id: thorny_user?.thorny_id ?? 0,
          type: "mine",
          coordinates: block_location,
          reference: block_id,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      interaction.post_interaction();
    });
  });
}
__name(blockBreak, "blockBreak");

// behaviour_pack/scripts-dev/features/interactions/block-place.ts
import { EntityComponentTypes as EntityComponentTypes13, EquipmentSlot as EquipmentSlot9, system as system19, world as world17 } from "@minecraft/server";
function blockPlace() {
  world17.afterEvents.playerPlaceBlock.subscribe((event) => {
    const block_id = event.block.typeId;
    const block_location = [event.block.x, event.block.y, event.block.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes13.Equippable)?.getEquipment(EquipmentSlot9.Mainhand);
    system19.run(() => {
      const interaction = new api_default.Interaction(
        {
          thorny_id: api_default.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
          type: "place",
          coordinates: block_location,
          reference: block_id,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      interaction.post_interaction();
    });
  });
}
__name(blockPlace, "blockPlace");

// behaviour_pack/scripts-dev/features/interactions/entity-interact.ts
import { EntityComponentTypes as EntityComponentTypes14, EquipmentSlot as EquipmentSlot10, system as system20, world as world18 } from "@minecraft/server";
function entityInteract() {
  const LOGGABLE_ENTITIES = [
    // Villagers
    MinecraftEntityTypes.VillagerV2,
    MinecraftEntityTypes.WanderingTrader,
    // Rideable Entities
    MinecraftEntityTypes.Horse,
    MinecraftEntityTypes.Donkey,
    MinecraftEntityTypes.Mule,
    MinecraftEntityTypes.Minecart,
    MinecraftEntityTypes.Strider,
    MinecraftEntityTypes.Pig,
    MinecraftEntityTypes.Boat,
    MinecraftEntityTypes.Camel,
    MinecraftEntityTypes.ZombieHorse,
    MinecraftEntityTypes.SkeletonHorse,
    MinecraftEntityTypes.Nautilus,
    MinecraftEntityTypes.ZombieNautilus,
    MinecraftEntityTypes.CamelHusk,
    MinecraftEntityTypes.HappyGhast,
    MinecraftEntityTypes.Llama,
    MinecraftEntityTypes.TraderLlama,
    // Entity Containers
    MinecraftEntityTypes.ChestBoat,
    MinecraftEntityTypes.ChestMinecart,
    MinecraftEntityTypes.HopperMinecart,
    // Amethyst Entities
    "amethyst:james_collector"
  ];
  function entityInteraction(event) {
    const entity_id = event.target.typeId;
    const entity_location = [event.target.location.x, event.target.location.y, event.target.location.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes14.Equippable)?.getEquipment(EquipmentSlot10.Mainhand);
    system20.run(() => {
      const interaction = new api_default.Interaction(
        {
          thorny_id: api_default.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
          type: "use",
          coordinates: entity_location,
          reference: entity_id,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      interaction.post_interaction();
    });
  }
  __name(entityInteraction, "entityInteraction");
  world18.afterEvents.playerInteractWithEntity.subscribe((event) => {
    if (LOGGABLE_ENTITIES.includes(event.target.typeId)) {
      entityInteraction(event);
    }
  });
}
__name(entityInteract, "entityInteract");

// behaviour_pack/scripts-dev/features/interactions/entity-die.ts
import { world as world19 } from "@minecraft/server";
import { EntityComponentTypes as EntityComponentTypes15, EquipmentSlot as EquipmentSlot11, Player as Player13 } from "@minecraft/server";
function entityDie() {
  async function playerKillEntity(player, entity) {
    const dimension = player.dimension;
    const mainhand = player.getComponent(EntityComponentTypes15.Equippable)?.getEquipment(EquipmentSlot11.Mainhand);
    const thorny_user = api_default.ThornyUser.fetch_user(player.name);
    const interaction = new api_default.Interaction(
      {
        thorny_id: thorny_user?.thorny_id ?? 0,
        type: "kill",
        coordinates: [entity.location.x, entity.location.y, entity.location.z],
        reference: entity.typeId,
        mainhand: mainhand?.typeId ?? null,
        dimension: dimension.id
      }
    );
    await interaction.post_interaction();
  }
  __name(playerKillEntity, "playerKillEntity");
  async function playerDieByPlayer(killer_player, dead_player) {
    const dimension = killer_player.dimension;
    const entity_mainhand = dead_player.getComponent(EntityComponentTypes15.Equippable)?.getEquipment(EquipmentSlot11.Mainhand);
    const dead_thorny_user = api_default.ThornyUser.fetch_user(dead_player.name);
    const death_interaction = new api_default.Interaction(
      {
        thorny_id: dead_thorny_user?.thorny_id ?? 0,
        type: "die",
        coordinates: [dead_player.location.x, dead_player.location.y, dead_player.location.z],
        reference: killer_player.name,
        mainhand: entity_mainhand?.typeId ?? null,
        dimension: dimension.id
      }
    );
    await death_interaction.post_interaction();
    api_default.Relay.event(utils_default.DeathMessage.random_pvp(killer_player.name, dead_player.name), "", "other");
  }
  __name(playerDieByPlayer, "playerDieByPlayer");
  async function playerDieByEntity(player, entity) {
    const dimension = player.dimension;
    const mainhand = player.getComponent(EntityComponentTypes15.Equippable)?.getEquipment(EquipmentSlot11.Mainhand);
    const thorny_user = api_default.ThornyUser.fetch_user(player.name);
    const death_interaction = new api_default.Interaction(
      {
        thorny_id: thorny_user?.thorny_id ?? 0,
        type: "die",
        coordinates: [player.location.x, player.location.y, player.location.z],
        reference: entity.typeId,
        mainhand: mainhand?.typeId ?? null,
        dimension: dimension.id
      }
    );
    await death_interaction.post_interaction();
    api_default.Relay.event(utils_default.DeathMessage.random_pve(player.name, entity.typeId), "", "other");
  }
  __name(playerDieByEntity, "playerDieByEntity");
  async function playerDieByOther(player, damageCause) {
    const dimension = player.dimension;
    const mainhand = player.getComponent(EntityComponentTypes15.Equippable)?.getEquipment(EquipmentSlot11.Mainhand);
    const thorny_user = api_default.ThornyUser.fetch_user(player.name);
    const death_interaction = new api_default.Interaction(
      {
        thorny_id: thorny_user?.thorny_id ?? 0,
        type: "die",
        coordinates: [player.location.x, player.location.y, player.location.z],
        reference: damageCause,
        mainhand: mainhand?.typeId ?? null,
        dimension: dimension.id
      }
    );
    await death_interaction.post_interaction();
    api_default.Relay.event(utils_default.DeathMessage.random_suicide(player.name, damageCause), "", "other");
  }
  __name(playerDieByOther, "playerDieByOther");
  world19.afterEvents.entityDie.subscribe(async (event) => {
    const damage_cause = event.damageSource.cause;
    const damaging_entity = event.damageSource.damagingEntity;
    const dead_entity = event.deadEntity;
    if (damaging_entity instanceof Player13) {
      await playerKillEntity(damaging_entity, dead_entity);
      if (dead_entity instanceof Player13) {
        await playerDieByPlayer(damaging_entity, dead_entity);
      }
    } else if (dead_entity instanceof Player13 && damaging_entity) {
      await playerDieByEntity(dead_entity, damaging_entity);
    } else if (dead_entity instanceof Player13 && !damaging_entity) {
      await playerDieByOther(dead_entity, damage_cause);
    }
  });
}
__name(entityDie, "entityDie");

// behaviour_pack/scripts-dev/features/interactions/index.ts
function loadInteractionHandlers() {
  blockInteract();
  blockBreak();
  blockPlace();
  entityInteract();
  entityDie();
}
__name(loadInteractionHandlers, "loadInteractionHandlers");

// behaviour_pack/scripts-dev/features/connections.ts
import { world as world20 } from "@minecraft/server";
function loadConnectionsFeature() {
  world20.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
    if (spawn_event.initialSpawn) {
      try {
        const thorny_user = api_default.ThornyUser.fetch_user(spawn_event.player.name);
        await thorny_user.send_connect_event("connect");
        api_default.Relay.event(`${spawn_event.player.name} has joined the server`, "", "join");
        utils_default.send_motd(spawn_event.player);
        if (thorny_user.patron) {
          spawn_event.player.nameTag = `\xA7l\xA7c${spawn_event.player.nameTag}\xA7r`;
        }
      } catch (e) {
        api_default.Relay.event(`${spawn_event.player.name} has joined the server`, "API Issue Detected", "join");
        console.error(e);
      }
    }
  });
  world20.afterEvents.playerLeave.subscribe(async (leave_event) => {
    const thorny_user = api_default.ThornyUser.fetch_user(leave_event.playerName);
    await thorny_user?.send_connect_event("disconnect");
    api_default.Relay.event(`${leave_event.playerName} has left the server`, "", "leave");
  });
}
__name(loadConnectionsFeature, "loadConnectionsFeature");

// behaviour_pack/scripts-dev/features/location-logger.ts
import { EntityComponentTypes as EntityComponentTypes16, EquipmentSlot as EquipmentSlot12, system as system22, world as world21, TicksPerSecond as TicksPerSecond8 } from "@minecraft/server";
var HEAD_GEAR = [
  MinecraftItemTypes.SkeletonSkull,
  MinecraftItemTypes.WitherSkeletonSkull,
  MinecraftItemTypes.CarvedPumpkin,
  MinecraftItemTypes.PlayerHead,
  MinecraftItemTypes.PiglinHead,
  MinecraftItemTypes.CreeperHead,
  MinecraftItemTypes.ZombieHead,
  MinecraftItemTypes.DragonHead
];
function location_log(player) {
  const head_gear = player.getComponent(EntityComponentTypes16.Equippable)?.getEquipment(EquipmentSlot12.Head);
  let hidden = (head_gear?.typeId ? HEAD_GEAR.includes(head_gear.typeId) : false) || player.isSneaking;
  const location = [Math.round(player.location.x), Math.round(player.location.y), Math.round(player.location.z)];
  const thorny_user = api_default.ThornyUser.fetch_user(player.name);
  if (thorny_user) {
    thorny_user.location = location;
    thorny_user.dimension = player.dimension.id;
    thorny_user.hidden = hidden;
    thorny_user.update().then();
  }
}
__name(location_log, "location_log");
function loadLocationLogger() {
  system22.runInterval(() => {
    let playerlist = world21.getPlayers();
    playerlist.forEach((player) => {
      location_log(player);
    });
  }, TicksPerSecond8 * 5);
}
__name(loadLocationLogger, "loadLocationLogger");

// behaviour_pack/scripts-dev/features/quests/progress-cache.ts
import { system as system28, TicksPerSecond as TicksPerSecond12, world as world27 } from "@minecraft/server";

// behaviour_pack/scripts-dev/features/quests/quest-cache.ts
import { system as system23, TicksPerSecond as TicksPerSecond9 } from "@minecraft/server";

// behaviour_pack/scripts-dev/api/nexuscore/quests/quests.ts
var getListQuestsV1GuildsMeQuestsGetUrl = /* @__PURE__ */ __name((params) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    const arrayFormatParameters = ["creator_thorny_ids", "quest_types"];
    if (Array.isArray(value) && arrayFormatParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? "null" : String(v));
      });
      return;
    }
    if (value !== void 0) {
      normalizedParams.append(key, value === null ? "null" : String(value));
    }
  });
  const stringifiedParams = normalizedParams.toString();
  return stringifiedParams.length > 0 ? `/v1/guilds/me/quests?${stringifiedParams}` : `/v1/guilds/me/quests`;
}, "getListQuestsV1GuildsMeQuestsGetUrl");
var listQuestsV1GuildsMeQuestsGet = /* @__PURE__ */ __name(async (params, options) => {
  return minecraftFetch(
    getListQuestsV1GuildsMeQuestsGetUrl(params),
    {
      ...options,
      method: "GET"
    }
  );
}, "listQuestsV1GuildsMeQuestsGet");
var getGetActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGetUrl = /* @__PURE__ */ __name((thornyId) => {
  return `/v1/guilds/me/quests/progress/user/${thornyId}/active`;
}, "getGetActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGetUrl");
var getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet = /* @__PURE__ */ __name(async (thornyId, options) => {
  return minecraftFetch(
    getGetActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGetUrl(thornyId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet");
var getPartialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPutUrl = /* @__PURE__ */ __name((progressId) => {
  return `/v1/guilds/me/quests/progress/${progressId}`;
}, "getPartialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPutUrl");
var partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut = /* @__PURE__ */ __name(async (progressId, questProgressUpdate, options) => {
  return minecraftFetch(
    getPartialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPutUrl(progressId),
    {
      ...options,
      method: "PUT",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(questProgressUpdate)
    }
  );
}, "partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut");

// behaviour_pack/scripts-dev/features/quests/quest-cache.ts
var QUEST_CACHE = /* @__PURE__ */ new Map();
async function reload_quest_cache() {
  const quests_list = await listQuestsV1GuildsMeQuestsGet({ active: true });
  QUEST_CACHE.clear();
  quests_list.forEach((quest) => QUEST_CACHE.set(quest.quest_id, quest));
}
__name(reload_quest_cache, "reload_quest_cache");
function loadQuestCache() {
  system23.run(async () => {
    await reload_quest_cache();
  });
  system23.runInterval(async () => {
    await reload_quest_cache();
  }, TicksPerSecond9 * 60 * 5);
}
__name(loadQuestCache, "loadQuestCache");

// behaviour_pack/scripts-dev/features/quests/core/fetch.ts
async function get_quest_progress(thorny_id) {
  let quest_progress_response;
  try {
    quest_progress_response = await getActiveQuestProgressV1GuildsMeQuestsProgressUserThornyIdActiveGet(thorny_id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null;
    }
    throw error;
  }
  return quest_progress_response;
}
__name(get_quest_progress, "get_quest_progress");

// behaviour_pack/scripts-dev/api/nexuscore/model/objectiveOutLogic.ts
var ObjectiveOutLogic = {
  and: "and",
  or: "or",
  sequential: "sequential"
};

// behaviour_pack/scripts-dev/api/nexuscore/model/objectiveProgressOutStatus.ts
var ObjectiveProgressOutStatus = {
  active: "active",
  pending: "pending",
  completed: "completed",
  failed: "failed"
};

// behaviour_pack/scripts-dev/api/nexuscore/model/questProgressOutStatus.ts
var QuestProgressOutStatus = {
  active: "active",
  pending: "pending",
  completed: "completed",
  failed: "failed"
};

// behaviour_pack/scripts-dev/features/quests/processors/mine-target-processor.ts
import { EquipmentSlot as EquipmentSlot13, world as world22 } from "@minecraft/server";

// behaviour_pack/scripts-dev/features/quests/core/action-dispatch.ts
var questProcessor;
function processGameAction(player, action) {
  questProcessor ??= new QuestProcessor();
  const thorny_user = ThornyUser.fetch_user(player.name);
  if (!thorny_user) return;
  const questProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id);
  if (!questProgress) return;
  const quest = QUEST_CACHE.get(questProgress.quest_id);
  if (!quest) return;
  questProcessor.process(action, player, quest, questProgress);
}
__name(processGameAction, "processGameAction");

// behaviour_pack/scripts-dev/features/quests/processors/mine-target-processor.ts
var MineTargetProcessor = class {
  constructor() {
    this.subscriptions = /* @__PURE__ */ new Map();
  }
  static {
    __name(this, "MineTargetProcessor");
  }
  onActivate(player, _objective, _objectiveProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    const blockTypes = _objective.targets.filter((t) => t.target_type === "mine").map((t) => t.block);
    const handler = /* @__PURE__ */ __name(async (event) => {
      if (event.player.id !== player.id) return;
      const mainhand = event.player.getComponent("minecraft:equippable")?.getEquipment(EquipmentSlot13.Mainhand)?.typeId ?? null;
      const interactions = await listInteractionsV1GuildsMeInteractionsGet({
        coordinates: [event.block.x, event.block.y, event.block.z]
      });
      const action = {
        type: "mine",
        time: /* @__PURE__ */ new Date(),
        player: event.player,
        coordinates: event.block.location,
        dimension: event.dimension.id,
        mainhand,
        block_id: event.brokenBlockPermutation.type.id,
        naturally_mined: interactions.length <= 1
      };
      processGameAction(event.player, action);
    }, "handler");
    world22.afterEvents.playerBreakBlock.subscribe(handler, { blockTypes });
    this.subscriptions.set(thorny_id, () => world22.afterEvents.playerBreakBlock.unsubscribe(handler));
  }
  onDeactivate(player, _objective, _objectiveProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    this.subscriptions.get(thorny_id)?.();
    this.subscriptions.delete(thorny_id);
  }
  evaluate(action, objective, targetProgress) {
    if (action.type !== "mine") return 0;
    if (targetProgress.target_type !== "mine") return 0;
    const mine = action;
    const target = objective.targets.find(
      (t) => t.target_type === "mine" && t.target_uuid === targetProgress.target_uuid
    );
    if (!target) return 0;
    if (!this.matchesBlock(mine.block_id, target.block)) return 0;
    return 1;
  }
  matchesBlock(actual, pattern) {
    if (pattern.endsWith(":*")) {
      const namespace = pattern.slice(0, -2);
      return actual.startsWith(namespace + ":");
    }
    return actual === pattern;
  }
};

// behaviour_pack/scripts-dev/features/quests/processors/kill-target-processor.ts
import { EquipmentSlot as EquipmentSlot14, world as world23 } from "@minecraft/server";
var KillTargetProcessor = class {
  constructor() {
    this.subscriptions = /* @__PURE__ */ new Map();
  }
  static {
    __name(this, "KillTargetProcessor");
  }
  onActivate(player, _objective, _objectiveProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    const entityTypes = _objective.targets.filter((t) => t.target_type === "kill").map((t) => t.entity);
    const handler = /* @__PURE__ */ __name((event) => {
      const killer = event.damageSource.damagingEntity;
      if (!killer || killer.id !== player.id) return;
      const mainhand = killer.getComponent("minecraft:equippable")?.getEquipment(EquipmentSlot14.Mainhand)?.typeId ?? null;
      const action = {
        type: "kill",
        time: /* @__PURE__ */ new Date(),
        player: killer,
        coordinates: event.deadEntity.location,
        dimension: event.deadEntity.dimension.id,
        mainhand,
        entity_id: event.deadEntity.typeId
      };
      processGameAction(player, action);
    }, "handler");
    world23.afterEvents.entityDie.subscribe(handler, { entityTypes });
    this.subscriptions.set(thorny_id, () => world23.afterEvents.entityDie.unsubscribe(handler));
  }
  onDeactivate(player, _objective, _objectiveProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    this.subscriptions.get(thorny_id)?.();
    this.subscriptions.delete(thorny_id);
  }
  evaluate(action, objective, targetProgress) {
    if (action.type !== "kill") return 0;
    if (targetProgress.target_type !== "kill") return 0;
    const kill = action;
    const target = objective.targets.find(
      (t) => t.target_type === "kill" && t.target_uuid === targetProgress.target_uuid
    );
    if (!target) return 0;
    if (!this.matchesEntity(kill.entity_id, target.entity)) return 0;
    return 1;
  }
  matchesEntity(actual, pattern) {
    if (pattern.endsWith(":*")) {
      const namespace = pattern.slice(0, -2);
      return actual.startsWith(namespace + ":");
    }
    return actual === pattern;
  }
};

// behaviour_pack/scripts-dev/features/quests/core/notify.ts
import { system as system24, world as world24 } from "@minecraft/server";

// behaviour_pack/scripts-dev/features/quests/core/objective/objective-display.ts
var SECTION = "\xA78\xA7m                              \xA7r";
var DIVIDER = "\xA78- - - - - - - - - - - - - - - -\xA7r";
function targetId(target) {
  switch (target.target_type) {
    case "mine":
      return target.block;
    case "kill":
      return target.entity;
    default:
      return "unknown";
  }
}
__name(targetId, "targetId");
function logicVerb(type) {
  switch (type) {
    case "mine":
      return "Mine";
    case "kill":
      return "Kill";
    default:
      return "Complete";
  }
}
__name(logicVerb, "logicVerb");
function rewardsLine(rewards) {
  if (rewards.length === 0) return "\xA77None\xA7r";
  const parts = rewards.map((r) => {
    if (r.display_name)
      return `\xA7e${r.display_name}\xA7r`;
    if (r.item !== null && r.count !== null)
      return `\xA7f${r.count} \xA7e${utils_default.clean_id(r.item)}\xA7r`;
    if (r.balance !== null)
      return `\xA76${r.balance}${utils_default.emojis.NUGS}\xA7r`;
    return "\xA77???\xA7r";
  });
  return parts.join("\xA77, \xA7r");
}
__name(rewardsLine, "rewardsLine");
function taskLine(objective) {
  if (objective.display) return `\xA7b${objective.display}\xA7r`;
  const verb = logicVerb(objective.objective_type);
  const targets = objective.targets;
  if (targets.length === 0) return `\xA7b${verb}...\xA7r`;
  if (objective.logic === ObjectiveOutLogic.or && objective.target_count !== null && objective.target_count !== void 0) {
    const names = targets.map((t) => `\xA7f${utils_default.clean_id(targetId(t))}\xA7r`).join("\xA77/\xA7r");
    return `\xA7b${verb}\xA7r \xA77any \xA7f${objective.target_count}\xA77 of\xA7r ${names}\xA7r`;
  }
  const targetParts = targets.map((t) => {
    const name = utils_default.clean_id(targetId(t));
    return `\xA7f${t.count} ${name}\xA7r`;
  });
  switch (objective.logic) {
    case ObjectiveOutLogic.and:
      return buildSentence(verb, targetParts, "and");
    case ObjectiveOutLogic.sequential:
      return buildSentence(verb, targetParts, "then") + " \xA77(in order)\xA7r";
    case ObjectiveOutLogic.or:
    default:
      return buildSentence(verb, targetParts, "or");
  }
}
__name(taskLine, "taskLine");
function buildSentence(verb, parts, conjunction) {
  if (parts.length === 1) return `\xA7b${verb}\xA7r ${parts[0]}`;
  const init = parts.slice(0, -1).join("\xA77, \xA7r");
  const last = parts[parts.length - 1];
  return `\xA7b${verb}\xA7r ${init} \xA77${conjunction}\xA7r ${last}`;
}
__name(buildSentence, "buildSentence");
function requirementLines(objective) {
  const c = objective.customizations;
  const lines = [];
  const failables = [];
  if (c.natural_block && objective.objective_type === "mine")
    lines.push(`\xA77- \xA7fNatural blocks only\xA7r`);
  if (c.mainhand)
    lines.push(`\xA77- Using \xA7f${utils_default.clean_id(c.mainhand.item)}\xA7r`);
  if (c.location) {
    const [x, y, z] = c.location.coordinates;
    const { horizontal_radius: h, vertical_radius: v } = c.location;
    const coords = v > 0 ? `${x}, ${y}, ${z}` : `${x}, ${z}`;
    const radiusText = v > 0 ? `Radius: ${h}, Height: ${v}` : `Radius: ${h}`;
    lines.push(`\xA77- Near \xA7f${coords} \xA77(${radiusText})\xA7r`);
  }
  if (c.timer) {
    const skull = c.timer.fail ? ` \xA7c!!!\xA7r` : "";
    lines.push(`\xA77-${skull} Time limit: \xA7f${utils_default.convert_seconds_to_hms(c.timer.seconds)}\xA7r`);
    if (c.timer.fail) failables.push("Exceeding time limit");
  }
  if (c.maximum_deaths) {
    const skull = c.maximum_deaths.fail ? ` \xA7c!!!\xA7r` : "";
    lines.push(`\xA77-${skull} Die no more than \xA7f${c.maximum_deaths.deaths}\xA7r times`);
    if (c.maximum_deaths.fail) failables.push("Exceeding death limit");
  }
  if (failables.length > 0)
    lines.push(`\xA7c- Failing these will fail the entire quest: \xA7f${failables.join("\xA7c, \xA7f")}\xA7r`);
  return lines;
}
__name(requirementLines, "requirementLines");
function generateObjectiveDisplayString(objective, objectiveIndex, totalObjectives, questTitle) {
  const header = `\xA7a\xA7l[ ${questTitle} ]\xA7r
\xA77Objective ${objectiveIndex} of ${totalObjectives}\xA7r`;
  const description = objective.description ? `\xA77${objective.description}\xA7r` : null;
  const task = `\xA7aTask:\xA7r ${taskLine(objective)}`;
  const rewards = `\xA76Rewards:\xA7r ${rewardsLine(objective.rewards)}`;
  const reqLines = requirementLines(objective);
  const requirements = reqLines.length > 0 ? `${DIVIDER}
\xA7eRequirements:\xA7r
${reqLines.join("\n")}` : null;
  const parts = [
    SECTION,
    header,
    DIVIDER,
    ...description ? [description] : [],
    task,
    rewards,
    ...requirements ? [requirements] : [],
    SECTION
  ];
  return parts.join("\n");
}
__name(generateObjectiveDisplayString, "generateObjectiveDisplayString");

// behaviour_pack/scripts-dev/features/quests/core/notify.ts
function showProgressTick(player, target, current, goal) {
  let label = "Progress";
  switch (target?.target_type) {
    case "mine":
      label = utils_default.clean_id(target.block);
      break;
    case "kill":
      label = utils_default.clean_id(target.entity);
      break;
  }
  player.playSound(
    "quest.objective.progress",
    { volume: 100, location: player.location }
  );
  player.onScreenDisplay.setActionBar(`\xA7l\xA7s${label}:\xA7r \xA77${current}\xA7r/${goal}`);
}
__name(showProgressTick, "showProgressTick");
function notifyOfQuestUpdate(player, message) {
  player.playSound(
    "quest.notify",
    { volume: 100, location: player.location }
  );
  player.sendMessage(message);
}
__name(notifyOfQuestUpdate, "notifyOfQuestUpdate");
function notifyQuestProgress(player, objective, objectiveIndex, totalObjectives, questTitle) {
  player.playSound(
    "quest.objective.complete",
    { volume: 100, location: player.location }
  );
  player.sendMessage(generateObjectiveDisplayString(objective, objectiveIndex, totalObjectives, questTitle));
}
__name(notifyQuestProgress, "notifyQuestProgress");
function notifyQuestComplete(player, questTitle) {
  world24.sendMessage(
    `\xA7l\xA7a[ \xA7l\xA7eQ\xA7du\xA7se\xA7as\xA7tt \xA7uC\xA7io\xA7mm\xA7pp\xA79l\xA7ee\xA7nt\xA7be\xA7f!\xA7a ]\xA7r
${player.name} has just completed \xA7l\xA7n${questTitle}\xA7r!
Run \xA75/quests view\xA7r on Discord to start it!`
  );
  api_default.Relay.event(
    "Quest Complete!",
    `${player.name} has just completed **${questTitle}**!
Run \`/quests view\` to try your luck with it!`,
    "other"
  );
  player.onScreenDisplay.setTitle(`\xA7l\xA7eQ\xA7du\xA7se\xA7as\xA7tt \xA7uC\xA7io\xA7mm\xA7pp\xA79l\xA7ee\xA7nt\xA7be!`);
  player.dimension.playSound(
    "quest.complete",
    player.location,
    { volume: 1e4 }
  );
  for (let i = 0; i < 5; i++) {
    system24.runTimeout(() => {
      player.runCommand(`particle minecraft:totem_particle ~ ~2 ~`);
    }, 10);
  }
}
__name(notifyQuestComplete, "notifyQuestComplete");
function notifyQuestFailure(player, questTitle) {
  world24.sendMessage(
    `\xA7l\xA7c[ Quest Failed :( ]\xA7r
${player.name} has failed \xA7l\xA7n${questTitle}\xA7r.
Think you can do better? Run \xA75/quests view\xA7r on Discord to try your luck with it.`
  );
  api_default.Relay.event(
    "Quest Failed :(",
    `${player.name} has failed **${questTitle}**.
Think you can do better? Run \`/quests view\` to try your luck with it.`,
    "other"
  );
  player.onScreenDisplay.setTitle(`\xA7l\xA7cQuest Failed :(`);
  player.dimension.playSound(
    "quest.fail",
    player.location,
    { volume: 1e4 }
  );
}
__name(notifyQuestFailure, "notifyQuestFailure");
function showTimer(player, remaining_seconds) {
  const minutes = Math.floor(remaining_seconds / 60);
  const seconds = Math.floor(remaining_seconds % 60);
  const formatted = minutes > 0 ? `${minutes}m ${seconds.toString().padStart(2, "0")}s` : `${seconds}s`;
  const color = remaining_seconds <= 10 ? "\xA7c" : remaining_seconds <= 30 ? "\xA7e" : "\xA7a";
  player.playSound(
    "note.hat",
    { volume: 100, location: player.location }
  );
  player.onScreenDisplay.setActionBar(`${color}${formatted}`);
}
__name(showTimer, "showTimer");

// behaviour_pack/scripts-dev/features/quests/customizations/death-plugin.ts
import { world as world25 } from "@minecraft/server";

// behaviour_pack/scripts-dev/features/quests/write-back.ts
import { system as system25, TicksPerSecond as TicksPerSecond10 } from "@minecraft/server";
var DIRTY = /* @__PURE__ */ new Map();
function markDirty(thorny_id) {
  const progress = QUEST_PROGRESS_CACHE.get(thorny_id);
  if (progress) DIRTY.set(thorny_id, progress);
}
__name(markDirty, "markDirty");
function buildUpdate(progress) {
  return {
    status: progress.status,
    start_time: progress.start_time,
    end_time: progress.end_time,
    objectives: progress.objectives.map((obj) => ({
      progress_id: obj.progress_id,
      objective_id: obj.objective_id,
      status: obj.status,
      start_time: obj.start_time,
      end_time: obj.end_time,
      target_progress: obj.target_progress,
      customization_progress: obj.customization_progress
    }))
  };
}
__name(buildUpdate, "buildUpdate");
async function flush() {
  if (DIRTY.size === 0) return;
  for (const [thorny_id, progress] of DIRTY) {
    try {
      await partialUpdateQuestProgressV1GuildsMeQuestsProgressProgressIdPut(
        progress.progress_id,
        buildUpdate(progress)
      );
      DIRTY.delete(thorny_id);
    } catch (error) {
      console.error(`[write-back] Failed to flush progress for thorny_id ${thorny_id}:`, error);
    }
  }
}
__name(flush, "flush");
function loadWriteBackLoop() {
  system25.runInterval(async () => {
    await flush();
  }, TicksPerSecond10 * 5);
}
__name(loadWriteBackLoop, "loadWriteBackLoop");

// behaviour_pack/scripts-dev/features/quests/customizations/death-plugin.ts
var DeathPlugin = class {
  constructor() {
    this.exceeded = false;
    this.shouldFail = false;
  }
  static {
    __name(this, "DeathPlugin");
  }
  onActivate(player, objective, progress) {
    const c = objective.customizations.maximum_deaths;
    if (!c) return;
    this.exceeded = false;
    this.shouldFail = c.fail ?? false;
    const thornyUser = ThornyUser.fetch_user(player.name);
    let deaths = progress.customization_progress.maximum_deaths?.deaths ?? 0;
    const handler = /* @__PURE__ */ __name((event) => {
      if (event.deadEntity.id !== player.id) return;
      deaths++;
      if (!progress.customization_progress.maximum_deaths) {
        progress.customization_progress.maximum_deaths = { deaths: 0 };
      }
      progress.customization_progress.maximum_deaths.deaths = deaths;
      markDirty(thornyUser.thorny_id);
      if (deaths >= c.deaths) this.exceeded = true;
    }, "handler");
    world25.afterEvents.entityDie.subscribe(handler);
    this.unsubscribe = () => world25.afterEvents.entityDie.unsubscribe(handler);
  }
  onDeactivate(_player, _objective, _progress) {
    this.unsubscribe?.();
    this.unsubscribe = void 0;
    this.exceeded = false;
  }
  onTick(_player, _objective, _progress) {
    if (!this.exceeded) return;
    return this.shouldFail ? "fail" : "skip";
  }
};

// behaviour_pack/scripts-dev/features/quests/customizations/location-plugin.ts
var LocationPlugin = class {
  static {
    __name(this, "LocationPlugin");
  }
  passes(action, objective, _progress) {
    const loc = objective.customizations.location;
    if (!loc) return true;
    const dx = Math.abs(action.coordinates.x - loc.coordinates[0]);
    const dy = Math.abs(action.coordinates.y - loc.coordinates[1]);
    const dz = Math.abs(action.coordinates.z - loc.coordinates[2]);
    const horizontalOk = dx <= loc.horizontal_radius && dz <= loc.horizontal_radius;
    const verticalOk = loc.vertical_radius <= 0 || dy <= loc.vertical_radius;
    return horizontalOk && verticalOk;
  }
};

// behaviour_pack/scripts-dev/features/quests/customizations/mainhand-plugin.ts
var MainhandPlugin = class {
  static {
    __name(this, "MainhandPlugin");
  }
  passes(action, objective, _progress) {
    const c = objective.customizations.mainhand;
    if (!c) return true;
    return action.mainhand === c.item;
  }
};

// behaviour_pack/scripts-dev/features/quests/customizations/natural-block-plugin.ts
var NaturalBlockPlugin = class {
  static {
    __name(this, "NaturalBlockPlugin");
  }
  passes(action, objective, _progress) {
    const c = objective.customizations.natural_block;
    if (!c) return true;
    return action.type === "mine" && action.naturally_mined;
  }
};

// behaviour_pack/scripts-dev/features/quests/customizations/timer-plugin.ts
import { system as system26, TicksPerSecond as TicksPerSecond11 } from "@minecraft/server";
var TimerPlugin = class {
  constructor() {
    this.expired = false;
    this.shouldFail = false;
    this.remaining_seconds = 0;
  }
  static {
    __name(this, "TimerPlugin");
  }
  onActivate(player, objective, progress) {
    const c = objective.customizations.timer;
    if (!c) return;
    this.shouldFail = c.fail ?? false;
    this.expired = false;
    const startedAt = progress.start_time ? new Date(progress.start_time).getTime() : Date.now();
    const elapsedSeconds = (Date.now() - startedAt) / 1e3;
    this.remaining_seconds = Math.max(0, c.seconds - elapsedSeconds);
    if (this.remaining_seconds === 0) {
      this.expired = true;
      return;
    }
    this.runId = system26.runTimeout(() => {
      this.expired = true;
    }, Math.ceil(this.remaining_seconds) * TicksPerSecond11);
  }
  onDeactivate(_player, _objective, _progress) {
    if (this.runId !== void 0) {
      system26.clearRun(this.runId);
      this.runId = void 0;
    }
    this.expired = false;
  }
  onTick(_player, _objective, _progress) {
    this.remaining_seconds -= 1;
    showTimer(_player, this.remaining_seconds);
    if (!this.expired) return;
    return this.shouldFail ? "fail" : "skip";
  }
};

// behaviour_pack/scripts-dev/features/quests/core/objective/objective-lifecycle.ts
var CUSTOMIZATION_PLUGINS = {
  location: LocationPlugin,
  mainhand: MainhandPlugin,
  natural_block: NaturalBlockPlugin,
  timer: TimerPlugin,
  maximum_deaths: DeathPlugin
};
var ACTIVE_PLUGINS = /* @__PURE__ */ new Map();
function activateObjective(player, thorny_id, objective, objectiveProgress) {
  const processor = TARGET_PROCESSORS[objective.objective_type];
  processor?.onActivate?.(player, objective, objectiveProgress);
  const plugins = [];
  for (const [key, value] of Object.entries(objective.customizations)) {
    if (value === null) continue;
    const PluginClass = CUSTOMIZATION_PLUGINS[key];
    if (!PluginClass) continue;
    const plugin = new PluginClass();
    plugin.onActivate?.(player, objective, objectiveProgress);
    plugins.push(plugin);
  }
  ACTIVE_PLUGINS.set(thorny_id, plugins);
}
__name(activateObjective, "activateObjective");
function deactivateObjective(player, thorny_id, objective, objectiveProgress) {
  const processor = TARGET_PROCESSORS[objective.objective_type];
  processor?.onDeactivate?.(player, objective, objectiveProgress);
  const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? [];
  for (const plugin of plugins) {
    plugin.onDeactivate?.(player, objective, objectiveProgress);
  }
  ACTIVE_PLUGINS.delete(thorny_id);
}
__name(deactivateObjective, "deactivateObjective");

// behaviour_pack/scripts-dev/features/quests/processors/scriptevent-target-processor.ts
import { EquipmentSlot as EquipmentSlot15, system as system27 } from "@minecraft/server";
var ScripteventTargetProcessor = class {
  constructor() {
    this.subscriptions = /* @__PURE__ */ new Map();
  }
  static {
    __name(this, "ScripteventTargetProcessor");
  }
  onActivate(player, _objective, _objectiveProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    const handler = /* @__PURE__ */ __name((event) => {
      if (event.message !== player.name) return;
      const mainhand = player.getComponent("minecraft:equippable")?.getEquipment(EquipmentSlot15.Mainhand)?.typeId ?? null;
      const action = {
        type: "scriptevent",
        time: /* @__PURE__ */ new Date(),
        player,
        coordinates: player.location,
        dimension: player.dimension.id,
        mainhand,
        script_id: event.id
      };
      processGameAction(player, action);
    }, "handler");
    system27.afterEvents.scriptEventReceive.subscribe(handler);
    this.subscriptions.set(thorny_id, () => system27.afterEvents.scriptEventReceive.unsubscribe(handler));
  }
  onDeactivate(player, _objective, _objectiveProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    this.subscriptions.get(thorny_id)?.();
    this.subscriptions.delete(thorny_id);
  }
  evaluate(action, objective, targetProgress) {
    if (action.type !== "scriptevent") return 0;
    if (targetProgress.target_type !== "scriptevent") return 0;
    const scriptevent = action;
    const target = objective.targets.find(
      (t) => t.target_type === "scriptevent" && t.target_uuid === targetProgress.target_uuid
    );
    if (!target) return 0;
    if (!this.matchesEntity(scriptevent.script_id, target.script_id)) return 0;
    return 1;
  }
  matchesEntity(actual, pattern) {
    if (pattern.endsWith(":*")) {
      const namespace = pattern.slice(0, -2);
      return actual.startsWith(namespace + ":");
    }
    return actual === pattern;
  }
};

// behaviour_pack/scripts-dev/features/quests/processors/objective-processor.ts
var TARGET_PROCESSORS = {
  mine: new MineTargetProcessor(),
  kill: new KillTargetProcessor(),
  scriptevent: new ScripteventTargetProcessor()
};
function targetCount(target) {
  return target.count ?? 1;
}
__name(targetCount, "targetCount");
var ObjectiveProcessor = class {
  static {
    __name(this, "ObjectiveProcessor");
  }
  /**
   * Processes an objective against the given action.
   * @param action
   * @param player
   * @param thorny_id
   * @param objective
   * @param objectiveProgress
   * @returns true if the objective is complete, false otherwise
   */
  process(action, player, thorny_id, objective, objectiveProgress) {
    if (objectiveProgress.status === ObjectiveProgressOutStatus.completed) return false;
    if (!this.passesCustomizations(action, thorny_id, objective, objectiveProgress)) return false;
    const processor = TARGET_PROCESSORS[objective.objective_type];
    if (!processor) return false;
    switch (objective.logic) {
      case ObjectiveOutLogic.or:
        return this.processOr(action, objective, objectiveProgress, processor, player);
      case ObjectiveOutLogic.and:
        return this.processAnd(action, objective, objectiveProgress, processor, player);
      case ObjectiveOutLogic.sequential:
        return this.processSequential(action, objective, objectiveProgress, processor, player);
    }
  }
  complete(progress) {
    progress.status = ObjectiveProgressOutStatus.completed;
    progress.end_time = (/* @__PURE__ */ new Date()).toISOString();
    return true;
  }
  /**
   * Iterates the passes() hook of every active plugin for this player.
   * Returns false as soon as any plugin blocks the action.
   */
  passesCustomizations(action, thorny_id, objective, progress) {
    const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? [];
    for (const plugin of plugins) {
      if (plugin.passes?.(action, objective, progress) === false) return false;
    }
    return true;
  }
  processOr(action, objective, progress, processor, player) {
    const sharedPool = objective.target_count ?? null;
    for (const targetProgress of progress.target_progress) {
      const increment = processor.evaluate(action, objective, targetProgress);
      if (increment === 0) continue;
      targetProgress.count = (targetProgress.count ?? 0) + increment;
      const targetDef = objective.targets.find((t) => t.target_uuid === targetProgress.target_uuid);
      if (sharedPool !== null) {
        const total = progress.target_progress.reduce((sum, tp) => sum + (tp.count ?? 0), 0);
        showProgressTick(player, targetDef, total, sharedPool);
        if (total >= sharedPool) return this.complete(progress);
      } else {
        const required = targetDef ? targetCount(targetDef) : 1;
        showProgressTick(player, targetDef, targetProgress.count, required);
        if (targetProgress.count >= required) return this.complete(progress);
      }
    }
    return false;
  }
  processAnd(action, objective, progress, processor, player) {
    for (const targetProgress of progress.target_progress) {
      const targetDef = objective.targets.find((t) => t.target_uuid === targetProgress.target_uuid);
      if (!targetDef) continue;
      if ((targetProgress.count ?? 0) >= targetCount(targetDef)) continue;
      const increment = processor.evaluate(action, objective, targetProgress);
      if (increment > 0) {
        targetProgress.count = (targetProgress.count ?? 0) + increment;
        showProgressTick(player, targetDef, targetProgress.count, targetCount(targetDef));
      }
    }
    const allDone = progress.target_progress.every((tp) => {
      const def = objective.targets.find((t) => t.target_uuid === tp.target_uuid);
      return def ? (tp.count ?? 0) >= targetCount(def) : false;
    });
    return allDone ? this.complete(progress) : false;
  }
  processSequential(action, objective, progress, processor, player) {
    const currentTarget = progress.target_progress.find((tp) => {
      const def2 = objective.targets.find((t) => t.target_uuid === tp.target_uuid);
      return def2 ? (tp.count ?? 0) < targetCount(def2) : false;
    });
    if (!currentTarget) return this.complete(progress);
    const increment = processor.evaluate(action, objective, currentTarget);
    if (increment === 0) return false;
    currentTarget.count = (currentTarget.count ?? 0) + increment;
    const def = objective.targets.find((t) => t.target_uuid === currentTarget.target_uuid);
    const required = def ? targetCount(def) : 1;
    if (def) showProgressTick(player, def, currentTarget.count, required);
    const allDone = progress.target_progress.every((tp) => {
      const def2 = objective.targets.find((t) => t.target_uuid === tp.target_uuid);
      return def2 ? (tp.count ?? 0) >= targetCount(def2) : false;
    });
    return allDone ? this.complete(progress) : false;
  }
};

// behaviour_pack/scripts-dev/features/quests/core/objective/objective-lookup.ts
function findActiveObjectiveProgress(questProgress) {
  return questProgress.objectives.find((o) => o.status === ObjectiveProgressOutStatus.active);
}
__name(findActiveObjectiveProgress, "findActiveObjectiveProgress");
function getActiveObjective(quest, questProgress) {
  const quest_progress = findActiveObjectiveProgress(questProgress);
  if (!quest_progress) return void 0;
  const quest_def = quest.objectives.find((o) => o.objective_id === quest_progress.objective_id);
  if (!quest_def) return void 0;
  return { obj_def: quest_def, obj_progress: quest_progress };
}
__name(getActiveObjective, "getActiveObjective");

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/enchantment-metadata.ts
import { ItemComponentTypes as ItemComponentTypes4, EnchantmentTypes } from "@minecraft/server";
var EnchantmentMetadata = class {
  constructor() {
    this.metadata_type = "enchantment";
  }
  static {
    __name(this, "EnchantmentMetadata");
  }
  applyToItem(item, data) {
    const enchants = item.getComponent(ItemComponentTypes4.Enchantable);
    enchants?.addEnchantment({
      type: EnchantmentTypes.get(data.enchantment_id),
      level: data.enchantment_level
    });
    return item;
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/random-enchantment-metadata.ts
import { ItemComponentTypes as ItemComponentTypes5, EnchantmentTypes as EnchantmentTypes2 } from "@minecraft/server";
var ENCHANTABILITY = {
  "minecraft:leather_helmet": 15,
  "minecraft:leather_chestplate": 15,
  "minecraft:leather_leggings": 15,
  "minecraft:leather_boots": 15,
  "minecraft:chainmail_helmet": 12,
  "minecraft:chainmail_chestplate": 12,
  "minecraft:chainmail_leggings": 12,
  "minecraft:chainmail_boots": 12,
  "minecraft:iron_helmet": 9,
  "minecraft:iron_chestplate": 9,
  "minecraft:iron_leggings": 9,
  "minecraft:iron_boots": 9,
  "minecraft:diamond_helmet": 10,
  "minecraft:diamond_chestplate": 10,
  "minecraft:diamond_leggings": 10,
  "minecraft:diamond_boots": 10,
  "minecraft:golden_helmet": 25,
  "minecraft:golden_chestplate": 25,
  "minecraft:golden_leggings": 25,
  "minecraft:golden_boots": 25,
  "minecraft:netherite_helmet": 15,
  "minecraft:netherite_chestplate": 15,
  "minecraft:netherite_leggings": 15,
  "minecraft:netherite_boots": 15,
  "minecraft:wooden_sword": 15,
  "minecraft:wooden_pickaxe": 15,
  "minecraft:wooden_axe": 15,
  "minecraft:wooden_shovel": 15,
  "minecraft:wooden_hoe": 15,
  "minecraft:stone_sword": 5,
  "minecraft:stone_pickaxe": 5,
  "minecraft:stone_axe": 5,
  "minecraft:stone_shovel": 5,
  "minecraft:stone_hoe": 5,
  "minecraft:iron_sword": 9,
  "minecraft:iron_pickaxe": 9,
  "minecraft:iron_axe": 9,
  "minecraft:iron_shovel": 9,
  "minecraft:iron_hoe": 9,
  "minecraft:diamond_sword": 10,
  "minecraft:diamond_pickaxe": 10,
  "minecraft:diamond_axe": 10,
  "minecraft:diamond_shovel": 10,
  "minecraft:diamond_hoe": 10,
  "minecraft:golden_sword": 25,
  "minecraft:golden_pickaxe": 25,
  "minecraft:golden_axe": 25,
  "minecraft:golden_shovel": 25,
  "minecraft:golden_hoe": 25,
  "minecraft:netherite_sword": 15,
  "minecraft:netherite_pickaxe": 15,
  "minecraft:netherite_axe": 15,
  "minecraft:netherite_shovel": 15,
  "minecraft:netherite_hoe": 15,
  "minecraft:bow": 1,
  "minecraft:book": 1,
  "minecraft:crossbow": 1,
  "minecraft:trident": 9,
  "minecraft:fishing_rod": 1
};
var DEFAULT_ENCHANTABILITY = 1;
var TREASURE_ENCHANTS = /* @__PURE__ */ new Set([
  MinecraftEnchantmentTypes.Mending,
  MinecraftEnchantmentTypes.FrostWalker,
  MinecraftEnchantmentTypes.SoulSpeed,
  MinecraftEnchantmentTypes.SwiftSneak,
  MinecraftEnchantmentTypes.WindBurst,
  MinecraftEnchantmentTypes.Density,
  MinecraftEnchantmentTypes.Breach,
  MinecraftEnchantmentTypes.Binding,
  MinecraftEnchantmentTypes.Vanishing
]);
function triangleRand(max) {
  return Math.floor(Math.random() * (Math.floor(max / 2) + 1)) + Math.floor(Math.random() * (Math.floor(max / 2) + 1));
}
__name(triangleRand, "triangleRand");
var RandomEnchantmentMetadata = class {
  constructor() {
    this.metadata_type = "enchantment_random";
  }
  static {
    __name(this, "RandomEnchantmentMetadata");
  }
  applyToItem(item, data) {
    const enchants = item.getComponent(ItemComponentTypes5.Enchantable);
    if (!enchants) return item;
    const xpLevel = data.level_min + Math.floor(Math.random() * (data.level_max - data.level_min + 1));
    const enchantability = ENCHANTABILITY[item.typeId] ?? DEFAULT_ENCHANTABILITY;
    const modifiedLevel = Math.round(
      (xpLevel + triangleRand(enchantability) + 1) * (0.85 + Math.random() * 0.3)
    );
    const pool = EnchantmentTypes2.getAll().filter(
      (e) => (data.treasure || !TREASURE_ENCHANTS.has(e.id)) && enchants.canAddEnchantment({ type: e, level: 1 })
    );
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    let currentLevel = modifiedLevel;
    do {
      const pick = pool.shift();
      if (!pick) break;
      const power = Math.min(Math.max(1, Math.round(currentLevel / 10)), pick.maxLevel);
      if (enchants.canAddEnchantment({ type: pick, level: power })) {
        enchants.addEnchantment({ type: pick, level: power });
      }
      currentLevel = Math.floor(currentLevel / 2);
    } while (Math.random() < (currentLevel + 1) / 50);
    return item;
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/potion-metadata.ts
import { Potions } from "@minecraft/server";
var PotionMetadata = class {
  constructor() {
    this.metadata_type = "potion";
  }
  static {
    __name(this, "PotionMetadata");
  }
  applyToItem(item, data) {
    return Potions.resolve(
      data.potion_effect,
      data.potion_delivery
    );
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/name-metadata.ts
var NameMetadata = class {
  constructor() {
    this.metadata_type = "name";
  }
  static {
    __name(this, "NameMetadata");
  }
  applyToItem(item, data) {
    item.nameTag = data.item_name;
    return item;
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/lore-metadata.ts
var LoreMetadata = class {
  constructor() {
    this.metadata_type = "lore";
  }
  static {
    __name(this, "LoreMetadata");
  }
  applyToItem(item, data) {
    item.setLore(data.item_lore);
    return item;
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/damage-metadata.ts
import { ItemComponentTypes as ItemComponentTypes7 } from "@minecraft/server";
var DamageMetadata = class {
  constructor() {
    this.metadata_type = "damage";
  }
  static {
    __name(this, "DamageMetadata");
  }
  applyToItem(item, data) {
    const durability = item.getComponent(ItemComponentTypes7.Durability);
    if (durability) {
      durability.damage = Math.floor(durability.maxDurability * data.damage_percentage / 100);
    }
    return item;
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/metadata/registry.ts
var REWARD_METADATA_REGISTRY = /* @__PURE__ */ new Map([
  ["enchantment", new EnchantmentMetadata()],
  ["enchantment_random", new RandomEnchantmentMetadata()],
  ["potion", new PotionMetadata()],
  ["name", new NameMetadata()],
  ["lore", new LoreMetadata()],
  ["damage", new DamageMetadata()]
  // ['random_count', new RandomCountMetadata()],
  // ['timed', new TimedMetadata()],
  // ['first', new FirstMetadata()],
]);

// behaviour_pack/scripts-dev/features/quests/rewards/balance-reward.ts
var BalanceReward = class {
  static {
    __name(this, "BalanceReward");
  }
  canHandle(reward) {
    return reward.balance !== null;
  }
  async grant(player, thorny_id, reward) {
    await partialUpdateUserV1GuildsMeUsersThornyIdPatch(thorny_id, {
      balance: reward.balance
    });
    utils_default.commands.send_message(
      player.dimension.id,
      player.name,
      `\xA7l[\xA7aQuests\xA7f]\xA7r You received \xA76${reward.balance}${utils_default.emojis.NUGS}\xA7r!`
    );
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/item-reward.ts
import { ItemStack as ItemStack6 } from "@minecraft/server";
var ItemReward = class {
  static {
    __name(this, "ItemReward");
  }
  canHandle(reward) {
    return reward.item !== null && reward.count !== null;
  }
  async grant(player, _thorny_id, reward) {
    const item = this.buildItemStack(reward);
    utils_default.commands.give_item(player.name, reward.count, item);
    const label = reward.display_name ?? `${reward.count}x ${utils_default.clean_id(reward.item)}`;
    utils_default.commands.send_message(
      player.dimension.id,
      player.name,
      `\xA7l[\xA7aQuests\xA7f]\xA7r You received \xA7f${label}\xA7r!`
    );
  }
  buildItemStack(reward) {
    let item = new ItemStack6(reward.item, 1);
    for (const m of reward.item_metadata) {
      const handler = REWARD_METADATA_REGISTRY.get(m.metadata_type);
      if (handler?.applyToItem) {
        item = handler.applyToItem(item, m);
      }
    }
    return item;
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/effect-reward.ts
var EffectReward = class {
  static {
    __name(this, "EffectReward");
  }
  canHandle(reward) {
    return reward.effect !== null && reward.effect !== void 0;
  }
  async grant(player, _thorny_id, reward) {
    const e = reward.effect;
    player.addEffect(e.effect_id, e.duration_ticks, { amplifier: e.amplifier ?? 0 });
    const label = reward.display_name ?? utils_default.clean_id(e.effect_id);
    utils_default.commands.send_message(
      player.dimension.id,
      player.name,
      `\xA7l[\xA7aQuests\xA7f]\xA7r You received \xA7d${label}\xA7r!`
    );
  }
};

// behaviour_pack/scripts-dev/features/quests/rewards/grant-rewards.ts
var GRANTERS = [
  new BalanceReward(),
  new ItemReward(),
  new EffectReward()
];
async function grantRewards(player, thorny_id, currentBalance, rewards, objectiveProgress) {
  for (const reward of rewards) {
    const granter = GRANTERS.find((g) => g.canHandle(reward));
    if (!granter) {
      console.warn(`[grantRewards] No granter registered for reward_id ${reward.reward_id}`);
      continue;
    }
    const handlers = reward.item_metadata.map((m) => ({ data: m, handler: REWARD_METADATA_REGISTRY.get(m.metadata_type) })).filter((e) => !!e.handler);
    let allow = true;
    for (const { handler } of handlers) {
      if (!handler.shouldGrant) continue;
      const permitted = await handler.shouldGrant(player, thorny_id, reward, objectiveProgress);
      if (!permitted) {
        allow = false;
        break;
      }
    }
    if (!allow) continue;
    let effectiveReward = reward;
    for (const { handler } of handlers) {
      if (handler.transform) effectiveReward = handler.transform(effectiveReward);
    }
    if (effectiveReward.balance !== null) {
      effectiveReward = { ...effectiveReward, balance: currentBalance + effectiveReward.balance };
    }
    try {
      await granter.grant(player, thorny_id, effectiveReward);
    } catch (err) {
      console.error(`[grantRewards] Failed to grant reward_id ${reward.reward_id}:`, err);
    }
  }
}
__name(grantRewards, "grantRewards");

// behaviour_pack/scripts-dev/features/quests/processors/quest-processor.ts
var objectiveProcessor = new ObjectiveProcessor();
var QuestProcessor = class {
  static {
    __name(this, "QuestProcessor");
  }
  process(action, player, quest, questProgress) {
    if (questProgress.status === QuestProgressOutStatus.completed) return false;
    if (questProgress.status === QuestProgressOutStatus.failed) return false;
    const active = getActiveObjective(quest, questProgress);
    if (!active) return false;
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    const completed = objectiveProcessor.process(action, player, thorny_id, active.obj_def, active.obj_progress);
    markDirty(thorny_id);
    if (!completed) return false;
    return this.completeObjective(player, thorny_id, quest, questProgress, active.obj_def, active.obj_progress);
  }
  /**
   * Called by the tick loop when a watcher plugin signals 'advance'
   * (e.g. a non-failing timer that has expired).
   * Skips the active objective — deactivates it and transitions onward,
   * but grants NO objective rewards, unlike a normal completion.
   */
  skipObjective(player, quest, questProgress) {
    if (questProgress.status === QuestProgressOutStatus.completed) return;
    if (questProgress.status === QuestProgressOutStatus.failed) return;
    const active = getActiveObjective(quest, questProgress);
    if (!active) return;
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    active.obj_progress.status = ObjectiveProgressOutStatus.failed;
    active.obj_progress.end_time = (/* @__PURE__ */ new Date()).toISOString();
    deactivateObjective(player, thorny_id, active.obj_def, active.obj_progress);
    this.advanceQuest(player, thorny_id, quest, questProgress);
  }
  /**
   * Called when an objective is genuinely completed via process().
   * Deactivates it, grants its rewards, then transitions onward.
   */
  completeObjective(player, thorny_id, quest, questProgress, objectiveDef, objectiveProgress) {
    deactivateObjective(player, thorny_id, objectiveDef, objectiveProgress);
    const thorny_user = ThornyUser.fetch_user_by_id(thorny_id);
    grantRewards(player, thorny_id, thorny_user.balance, objectiveDef.rewards, objectiveProgress).then();
    return this.advanceQuest(player, thorny_id, quest, questProgress);
  }
  /**
   * Shared transition logic used by both completion and skip paths.
   * Activates the next pending objective if one exists, otherwise
   * completes the quest. Grants no rewards itself — reward-granting
   * is the caller's responsibility.
   */
  advanceQuest(player, thorny_id, quest, questProgress) {
    const nextObjectiveProgress = questProgress.objectives.find(
      (o) => o.status === ObjectiveProgressOutStatus.pending
    );
    if (nextObjectiveProgress) {
      nextObjectiveProgress.status = ObjectiveProgressOutStatus.active;
      nextObjectiveProgress.start_time = (/* @__PURE__ */ new Date()).toISOString();
      const nextObjectiveDef = quest.objectives.find(
        (o) => o.objective_id === nextObjectiveProgress.objective_id
      );
      if (nextObjectiveDef) {
        activateObjective(player, thorny_id, nextObjectiveDef, nextObjectiveProgress);
      }
      markDirty(thorny_id);
      notifyQuestProgress(
        player,
        nextObjectiveDef,
        quest.objectives.indexOf(nextObjectiveDef) + 1,
        quest.objectives.length,
        quest.title
      );
      return false;
    }
    return this.onQuestComplete(player, thorny_id, quest, questProgress);
  }
  onQuestComplete(player, thorny_id, questOut, questProgress) {
    questProgress.status = QuestProgressOutStatus.completed;
    questProgress.end_time = (/* @__PURE__ */ new Date()).toISOString();
    markDirty(thorny_id);
    notifyQuestComplete(player, questOut.title);
    return true;
  }
  fail(player, quest, questProgress) {
    const thorny_id = ThornyUser.fetch_user(player.name).thorny_id;
    const active = getActiveObjective(quest, questProgress);
    if (active) {
      deactivateObjective(player, thorny_id, active.obj_def, active.obj_progress);
    }
    questProgress.status = QuestProgressOutStatus.failed;
    questProgress.end_time = (/* @__PURE__ */ new Date()).toISOString();
    for (const obj of questProgress.objectives) {
      if (obj.status !== ObjectiveProgressOutStatus.completed) {
        obj.status = ObjectiveProgressOutStatus.failed;
        obj.end_time = (/* @__PURE__ */ new Date()).toISOString();
      }
    }
    markDirty(thorny_id);
    notifyQuestFailure(player, quest.title);
  }
};

// behaviour_pack/scripts-dev/features/quests/core/objective/objective-tick.ts
function tickPlugins(player, thorny_id, objective, progress) {
  const plugins = ACTIVE_PLUGINS.get(thorny_id) ?? [];
  for (const plugin of plugins) {
    const signal = plugin.onTick?.(player, objective, progress);
    if (signal) return signal;
  }
}
__name(tickPlugins, "tickPlugins");

// behaviour_pack/scripts-dev/features/quests/progress-cache.ts
var QUEST_PROGRESS_CACHE = /* @__PURE__ */ new Map();
var questProcessor2 = new QuestProcessor();
function loadQuestProgressCache() {
  const PLAYER_LOOP_RUN_IDS = /* @__PURE__ */ new Map();
  async function new_active_quest(questProgress, thornyUser, player) {
    const quest = QUEST_CACHE.get(questProgress.quest_id);
    QUEST_PROGRESS_CACHE.set(thornyUser.thorny_id, questProgress);
    const active = getActiveObjective(quest, questProgress);
    if (questProgress.status === QuestProgressOutStatus.active) {
      if (active) {
        activateObjective(player, thornyUser.thorny_id, active.obj_def, active.obj_progress);
      }
    }
    system28.runTimeout(() => {
      notifyOfQuestUpdate(
        player,
        generateObjectiveDisplayString(
          active?.obj_def,
          quest.objectives.indexOf(active?.obj_def) + 1,
          quest.objectives.length,
          quest.title
        )
      );
    }, TicksPerSecond12 * 10);
  }
  __name(new_active_quest, "new_active_quest");
  async function dropped_quest(questProgress, thornyUser, player) {
    const cached_quest = QUEST_CACHE.get(questProgress.quest_id);
    const cached_quest_progress = QUEST_PROGRESS_CACHE.get(thornyUser.thorny_id);
    const active = getActiveObjective(cached_quest, questProgress);
    if (active) {
      deactivateObjective(player, thornyUser.thorny_id, active.obj_def, active.obj_progress);
    }
    QUEST_PROGRESS_CACHE.delete(thornyUser.thorny_id);
    if (cached_quest_progress.status !== "completed" && cached_quest_progress.status !== "failed") {
      notifyOfQuestUpdate(player, `You have dropped your quest: ${cached_quest.title}`);
    }
  }
  __name(dropped_quest, "dropped_quest");
  async function update_player_quest(player_name) {
    const player = world27.getPlayers().find((p) => p.name == player_name);
    if (!player) return;
    const thorny_user = ThornyUser.fetch_user(player_name);
    const questProgress = await get_quest_progress(thorny_user.thorny_id);
    const cachedQuestProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id);
    if (questProgress && cachedQuestProgress?.progress_id !== questProgress.progress_id) {
      await new_active_quest(questProgress, thorny_user, player);
    } else if (!questProgress && cachedQuestProgress) {
      await dropped_quest(cachedQuestProgress, thorny_user, player);
    }
  }
  __name(update_player_quest, "update_player_quest");
  async function tickQuest(player_name) {
    const player = world27.getPlayers().find((p) => p.name == player_name);
    if (!player) return;
    const thorny_user = ThornyUser.fetch_user(player_name);
    const cachedQuestProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id);
    if (!cachedQuestProgress) return;
    const quest = QUEST_CACHE.get(cachedQuestProgress.quest_id);
    if (!quest) return;
    const active = getActiveObjective(quest, cachedQuestProgress);
    if (!active) return;
    const signal = tickPlugins(player, thorny_user.thorny_id, active.obj_def, active.obj_progress);
    if (signal === "fail") {
      questProcessor2.fail(player, quest, cachedQuestProgress);
    } else if (signal === "skip") {
      questProcessor2.skipObjective(player, quest, cachedQuestProgress);
    }
  }
  __name(tickQuest, "tickQuest");
  world27.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
    if (spawn_event.initialSpawn) {
      const thorny_user = ThornyUser.fetch_user(spawn_event.player.name);
      if (thorny_user) {
        const questProgress = await get_quest_progress(thorny_user.thorny_id);
        if (questProgress) {
          await new_active_quest(questProgress, thorny_user, spawn_event.player);
        }
      }
      const cacheRunId = system28.runInterval(async () => {
        await update_player_quest(spawn_event.player.name);
      }, TicksPerSecond12 * 2);
      const tickRunId = system28.runInterval(async () => {
        await tickQuest(spawn_event.player.name);
      }, TicksPerSecond12);
      PLAYER_LOOP_RUN_IDS.set(spawn_event.player.name, [cacheRunId, tickRunId]);
    }
  });
  world27.afterEvents.playerLeave.subscribe((leave_event) => {
    const runIds = PLAYER_LOOP_RUN_IDS.get(leave_event.playerName);
    if (runIds !== void 0) {
      runIds.map((i) => system28.clearRun(i));
      PLAYER_LOOP_RUN_IDS.delete(leave_event.playerName);
    }
    const thorny_user = ThornyUser.fetch_user(leave_event.playerName);
    if (thorny_user) {
      const questProgress = QUEST_PROGRESS_CACHE.get(thorny_user.thorny_id);
      if (questProgress) {
        const quest = QUEST_CACHE.get(questProgress.quest_id);
        const active = quest ? getActiveObjective(quest, questProgress) : void 0;
        if (active) {
          const player = world27.getPlayers().find((p) => p.name === leave_event.playerName);
          if (player) {
            deactivateObjective(player, thorny_user.thorny_id, active.obj_def, active.obj_progress);
          }
        }
      }
      QUEST_PROGRESS_CACHE.delete(thorny_user.thorny_id);
    }
  });
}
__name(loadQuestProgressCache, "loadQuestProgressCache");

// behaviour_pack/scripts-dev/features/quests/index.ts
function loadQuestsFeature() {
  loadQuestCache();
  loadQuestProgressCache();
  loadWriteBackLoop();
}
__name(loadQuestsFeature, "loadQuestsFeature");

// behaviour_pack/scripts-dev/features/whitelist.ts
import { beforeEvents } from "@minecraft/server-admin";
import { world as world28 } from "@minecraft/server";
var BlockMessageMap = {
  "no_whitelist": "You are not whitelisted. Check the guidelines to see how to whitelist yourself.",
  "not_active": "WAIT! Don't go!\n\nCouldn't resist a peek, could you? We don't blame you. Let's get you back to where you belong.\n\nRejoin us at everthorn.net/apply or reach out on Discord. We'll get you right back in!",
  "only_gamertag": "Almost there! Your gamertag is set up correctly. Now, just ask a CM to add you to the whitelist and you'll be good to go!",
  "other": "You are not whitelisted."
};
async function blockJoin(join_event, reason = "other") {
  join_event.disallowJoin(BlockMessageMap[reason] || "You are not whitelisted.");
  api_default.Relay.event(
    `${join_event.name} blocked from joining`,
    BlockMessageMap[reason] || "You are not whitelisted.",
    "other"
  );
  console.log(`[Admin] ${join_event.name} blocked from joining. Reason: ${reason}`);
}
__name(blockJoin, "blockJoin");
function loadWhitelistFeature() {
  world28.afterEvents.worldLoad.subscribe(() => {
    beforeEvents.asyncPlayerJoin.subscribe(async (join_event) => {
      try {
        const thorny_user = await api_default.ThornyUser.get_user_from_api(join_event.name);
        if (!thorny_user.active) {
          await blockJoin(join_event, "not_active");
          return;
        }
        if (thorny_user.whitelist !== join_event.name) {
          await blockJoin(join_event, "only_gamertag");
          return;
        }
        join_event.allowJoin();
      } catch (e) {
        await blockJoin(join_event, "no_whitelist");
      }
    });
  });
}
__name(loadWhitelistFeature, "loadWhitelistFeature");

// behaviour_pack/scripts-dev/main.ts
function load(name, fn, ...args) {
  try {
    fn(...args);
    console.log(`[Amethyst] Loaded ${name}`);
  } catch (e) {
    console.log(`[Amethyst] Error loading ${name}: ${e}`);
  }
}
__name(load, "load");
load("Block Components", loadBlockComponents);
load("Commands", loadCommands);
load("Dragon Fight Feature", loadDragonFightFeature);
load("Interactions Logging Feature", loadInteractionHandlers);
load("Item Components", loadItemComponents);
load("Wine And Beer Update Features", loadWineAndBeerFeature);
load("World Border Feature", loadWorldBorder);
load("Chat Decoration Feature", loadChatDecorationFeature);
load("Connection Logging Feature", loadConnectionsFeature);
load("Location Logging Feature", loadLocationLogger);
load("Quests Feature", loadQuestsFeature);
load("Whitelist Feature", loadWhitelistFeature);
