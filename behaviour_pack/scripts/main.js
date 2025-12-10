// behaviour_pack/scripts-dev/components/fungus_spread.ts
import {
  system,
  TicksPerSecond
} from "@minecraft/server";

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
var MinecraftBlockTypes = ((MinecraftBlockTypes22) => {
  MinecraftBlockTypes22["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftBlockTypes22["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftBlockTypes22["AcaciaDoubleSlab"] = "minecraft:acacia_double_slab";
  MinecraftBlockTypes22["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftBlockTypes22["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftBlockTypes22["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftBlockTypes22["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftBlockTypes22["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftBlockTypes22["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftBlockTypes22["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftBlockTypes22["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftBlockTypes22["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftBlockTypes22["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftBlockTypes22["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftBlockTypes22["AcaciaStandingSign"] = "minecraft:acacia_standing_sign";
  MinecraftBlockTypes22["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftBlockTypes22["AcaciaWallSign"] = "minecraft:acacia_wall_sign";
  MinecraftBlockTypes22["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftBlockTypes22["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftBlockTypes22["Air"] = "minecraft:air";
  MinecraftBlockTypes22["Allium"] = "minecraft:allium";
  MinecraftBlockTypes22["Allow"] = "minecraft:allow";
  MinecraftBlockTypes22["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftBlockTypes22["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftBlockTypes22["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftBlockTypes22["Andesite"] = "minecraft:andesite";
  MinecraftBlockTypes22["AndesiteDoubleSlab"] = "minecraft:andesite_double_slab";
  MinecraftBlockTypes22["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftBlockTypes22["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftBlockTypes22["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftBlockTypes22["Anvil"] = "minecraft:anvil";
  MinecraftBlockTypes22["Azalea"] = "minecraft:azalea";
  MinecraftBlockTypes22["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftBlockTypes22["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftBlockTypes22["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftBlockTypes22["Bamboo"] = "minecraft:bamboo";
  MinecraftBlockTypes22["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftBlockTypes22["BambooButton"] = "minecraft:bamboo_button";
  MinecraftBlockTypes22["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftBlockTypes22["BambooDoubleSlab"] = "minecraft:bamboo_double_slab";
  MinecraftBlockTypes22["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftBlockTypes22["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftBlockTypes22["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftBlockTypes22["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftBlockTypes22["BambooMosaicDoubleSlab"] = "minecraft:bamboo_mosaic_double_slab";
  MinecraftBlockTypes22["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftBlockTypes22["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftBlockTypes22["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftBlockTypes22["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftBlockTypes22["BambooSapling"] = "minecraft:bamboo_sapling";
  MinecraftBlockTypes22["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftBlockTypes22["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftBlockTypes22["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftBlockTypes22["BambooStandingSign"] = "minecraft:bamboo_standing_sign";
  MinecraftBlockTypes22["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftBlockTypes22["BambooWallSign"] = "minecraft:bamboo_wall_sign";
  MinecraftBlockTypes22["Barrel"] = "minecraft:barrel";
  MinecraftBlockTypes22["Barrier"] = "minecraft:barrier";
  MinecraftBlockTypes22["Basalt"] = "minecraft:basalt";
  MinecraftBlockTypes22["Beacon"] = "minecraft:beacon";
  MinecraftBlockTypes22["Bed"] = "minecraft:bed";
  MinecraftBlockTypes22["Bedrock"] = "minecraft:bedrock";
  MinecraftBlockTypes22["BeeNest"] = "minecraft:bee_nest";
  MinecraftBlockTypes22["Beehive"] = "minecraft:beehive";
  MinecraftBlockTypes22["Beetroot"] = "minecraft:beetroot";
  MinecraftBlockTypes22["Bell"] = "minecraft:bell";
  MinecraftBlockTypes22["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftBlockTypes22["BirchButton"] = "minecraft:birch_button";
  MinecraftBlockTypes22["BirchDoor"] = "minecraft:birch_door";
  MinecraftBlockTypes22["BirchDoubleSlab"] = "minecraft:birch_double_slab";
  MinecraftBlockTypes22["BirchFence"] = "minecraft:birch_fence";
  MinecraftBlockTypes22["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftBlockTypes22["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftBlockTypes22["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftBlockTypes22["BirchLog"] = "minecraft:birch_log";
  MinecraftBlockTypes22["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftBlockTypes22["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftBlockTypes22["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftBlockTypes22["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftBlockTypes22["BirchSlab"] = "minecraft:birch_slab";
  MinecraftBlockTypes22["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftBlockTypes22["BirchStandingSign"] = "minecraft:birch_standing_sign";
  MinecraftBlockTypes22["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftBlockTypes22["BirchWallSign"] = "minecraft:birch_wall_sign";
  MinecraftBlockTypes22["BirchWood"] = "minecraft:birch_wood";
  MinecraftBlockTypes22["BlackCandle"] = "minecraft:black_candle";
  MinecraftBlockTypes22["BlackCandleCake"] = "minecraft:black_candle_cake";
  MinecraftBlockTypes22["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftBlockTypes22["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftBlockTypes22["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftBlockTypes22["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftBlockTypes22["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftBlockTypes22["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftBlockTypes22["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftBlockTypes22["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftBlockTypes22["BlackWool"] = "minecraft:black_wool";
  MinecraftBlockTypes22["Blackstone"] = "minecraft:blackstone";
  MinecraftBlockTypes22["BlackstoneDoubleSlab"] = "minecraft:blackstone_double_slab";
  MinecraftBlockTypes22["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftBlockTypes22["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftBlockTypes22["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftBlockTypes22["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftBlockTypes22["BlueCandle"] = "minecraft:blue_candle";
  MinecraftBlockTypes22["BlueCandleCake"] = "minecraft:blue_candle_cake";
  MinecraftBlockTypes22["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftBlockTypes22["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftBlockTypes22["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftBlockTypes22["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftBlockTypes22["BlueIce"] = "minecraft:blue_ice";
  MinecraftBlockTypes22["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftBlockTypes22["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftBlockTypes22["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftBlockTypes22["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftBlockTypes22["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftBlockTypes22["BlueWool"] = "minecraft:blue_wool";
  MinecraftBlockTypes22["BoneBlock"] = "minecraft:bone_block";
  MinecraftBlockTypes22["Bookshelf"] = "minecraft:bookshelf";
  MinecraftBlockTypes22["BorderBlock"] = "minecraft:border_block";
  MinecraftBlockTypes22["BrainCoral"] = "minecraft:brain_coral";
  MinecraftBlockTypes22["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftBlockTypes22["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftBlockTypes22["BrainCoralWallFan"] = "minecraft:brain_coral_wall_fan";
  MinecraftBlockTypes22["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftBlockTypes22["BrickBlock"] = "minecraft:brick_block";
  MinecraftBlockTypes22["BrickDoubleSlab"] = "minecraft:brick_double_slab";
  MinecraftBlockTypes22["BrickSlab"] = "minecraft:brick_slab";
  MinecraftBlockTypes22["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftBlockTypes22["BrickWall"] = "minecraft:brick_wall";
  MinecraftBlockTypes22["BrownCandle"] = "minecraft:brown_candle";
  MinecraftBlockTypes22["BrownCandleCake"] = "minecraft:brown_candle_cake";
  MinecraftBlockTypes22["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftBlockTypes22["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftBlockTypes22["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftBlockTypes22["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftBlockTypes22["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftBlockTypes22["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftBlockTypes22["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftBlockTypes22["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftBlockTypes22["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftBlockTypes22["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftBlockTypes22["BrownWool"] = "minecraft:brown_wool";
  MinecraftBlockTypes22["BubbleColumn"] = "minecraft:bubble_column";
  MinecraftBlockTypes22["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftBlockTypes22["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftBlockTypes22["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftBlockTypes22["BubbleCoralWallFan"] = "minecraft:bubble_coral_wall_fan";
  MinecraftBlockTypes22["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftBlockTypes22["Bush"] = "minecraft:bush";
  MinecraftBlockTypes22["Cactus"] = "minecraft:cactus";
  MinecraftBlockTypes22["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftBlockTypes22["Cake"] = "minecraft:cake";
  MinecraftBlockTypes22["Calcite"] = "minecraft:calcite";
  MinecraftBlockTypes22["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftBlockTypes22["Camera"] = "minecraft:camera";
  MinecraftBlockTypes22["Campfire"] = "minecraft:campfire";
  MinecraftBlockTypes22["Candle"] = "minecraft:candle";
  MinecraftBlockTypes22["CandleCake"] = "minecraft:candle_cake";
  MinecraftBlockTypes22["Carrots"] = "minecraft:carrots";
  MinecraftBlockTypes22["CartographyTable"] = "minecraft:cartography_table";
  MinecraftBlockTypes22["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftBlockTypes22["Cauldron"] = "minecraft:cauldron";
  MinecraftBlockTypes22["CaveVines"] = "minecraft:cave_vines";
  MinecraftBlockTypes22["CaveVinesBodyWithBerries"] = "minecraft:cave_vines_body_with_berries";
  MinecraftBlockTypes22["CaveVinesHeadWithBerries"] = "minecraft:cave_vines_head_with_berries";
  MinecraftBlockTypes22["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftBlockTypes22["ChemicalHeat"] = "minecraft:chemical_heat";
  MinecraftBlockTypes22["CherryButton"] = "minecraft:cherry_button";
  MinecraftBlockTypes22["CherryDoor"] = "minecraft:cherry_door";
  MinecraftBlockTypes22["CherryDoubleSlab"] = "minecraft:cherry_double_slab";
  MinecraftBlockTypes22["CherryFence"] = "minecraft:cherry_fence";
  MinecraftBlockTypes22["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftBlockTypes22["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftBlockTypes22["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftBlockTypes22["CherryLog"] = "minecraft:cherry_log";
  MinecraftBlockTypes22["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftBlockTypes22["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftBlockTypes22["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftBlockTypes22["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftBlockTypes22["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftBlockTypes22["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftBlockTypes22["CherryStandingSign"] = "minecraft:cherry_standing_sign";
  MinecraftBlockTypes22["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftBlockTypes22["CherryWallSign"] = "minecraft:cherry_wall_sign";
  MinecraftBlockTypes22["CherryWood"] = "minecraft:cherry_wood";
  MinecraftBlockTypes22["Chest"] = "minecraft:chest";
  MinecraftBlockTypes22["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftBlockTypes22["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftBlockTypes22["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftBlockTypes22["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftBlockTypes22["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftBlockTypes22["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftBlockTypes22["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftBlockTypes22["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftBlockTypes22["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftBlockTypes22["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftBlockTypes22["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftBlockTypes22["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftBlockTypes22["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftBlockTypes22["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftBlockTypes22["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftBlockTypes22["Clay"] = "minecraft:clay";
  MinecraftBlockTypes22["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftBlockTypes22["CoalBlock"] = "minecraft:coal_block";
  MinecraftBlockTypes22["CoalOre"] = "minecraft:coal_ore";
  MinecraftBlockTypes22["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftBlockTypes22["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftBlockTypes22["CobbledDeepslateDoubleSlab"] = "minecraft:cobbled_deepslate_double_slab";
  MinecraftBlockTypes22["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftBlockTypes22["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftBlockTypes22["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftBlockTypes22["Cobblestone"] = "minecraft:cobblestone";
  MinecraftBlockTypes22["CobblestoneDoubleSlab"] = "minecraft:cobblestone_double_slab";
  MinecraftBlockTypes22["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftBlockTypes22["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftBlockTypes22["Cocoa"] = "minecraft:cocoa";
  MinecraftBlockTypes22["ColoredTorchBlue"] = "minecraft:colored_torch_blue";
  MinecraftBlockTypes22["ColoredTorchGreen"] = "minecraft:colored_torch_green";
  MinecraftBlockTypes22["ColoredTorchPurple"] = "minecraft:colored_torch_purple";
  MinecraftBlockTypes22["ColoredTorchRed"] = "minecraft:colored_torch_red";
  MinecraftBlockTypes22["CommandBlock"] = "minecraft:command_block";
  MinecraftBlockTypes22["Composter"] = "minecraft:composter";
  MinecraftBlockTypes22["CompoundCreator"] = "minecraft:compound_creator";
  MinecraftBlockTypes22["Conduit"] = "minecraft:conduit";
  MinecraftBlockTypes22["CopperBars"] = "minecraft:copper_bars";
  MinecraftBlockTypes22["CopperBlock"] = "minecraft:copper_block";
  MinecraftBlockTypes22["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftBlockTypes22["CopperChain"] = "minecraft:copper_chain";
  MinecraftBlockTypes22["CopperChest"] = "minecraft:copper_chest";
  MinecraftBlockTypes22["CopperDoor"] = "minecraft:copper_door";
  MinecraftBlockTypes22["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftBlockTypes22["CopperGrate"] = "minecraft:copper_grate";
  MinecraftBlockTypes22["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftBlockTypes22["CopperOre"] = "minecraft:copper_ore";
  MinecraftBlockTypes22["CopperTorch"] = "minecraft:copper_torch";
  MinecraftBlockTypes22["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftBlockTypes22["Cornflower"] = "minecraft:cornflower";
  MinecraftBlockTypes22["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftBlockTypes22["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftBlockTypes22["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftBlockTypes22["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftBlockTypes22["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftBlockTypes22["Crafter"] = "minecraft:crafter";
  MinecraftBlockTypes22["CraftingTable"] = "minecraft:crafting_table";
  MinecraftBlockTypes22["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftBlockTypes22["CreeperHead"] = "minecraft:creeper_head";
  MinecraftBlockTypes22["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftBlockTypes22["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftBlockTypes22["CrimsonDoubleSlab"] = "minecraft:crimson_double_slab";
  MinecraftBlockTypes22["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftBlockTypes22["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftBlockTypes22["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftBlockTypes22["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftBlockTypes22["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftBlockTypes22["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftBlockTypes22["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftBlockTypes22["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftBlockTypes22["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftBlockTypes22["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftBlockTypes22["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftBlockTypes22["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftBlockTypes22["CrimsonStandingSign"] = "minecraft:crimson_standing_sign";
  MinecraftBlockTypes22["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftBlockTypes22["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftBlockTypes22["CrimsonWallSign"] = "minecraft:crimson_wall_sign";
  MinecraftBlockTypes22["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftBlockTypes22["CutCopper"] = "minecraft:cut_copper";
  MinecraftBlockTypes22["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftBlockTypes22["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftBlockTypes22["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftBlockTypes22["CutRedSandstoneDoubleSlab"] = "minecraft:cut_red_sandstone_double_slab";
  MinecraftBlockTypes22["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftBlockTypes22["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftBlockTypes22["CutSandstoneDoubleSlab"] = "minecraft:cut_sandstone_double_slab";
  MinecraftBlockTypes22["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftBlockTypes22["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftBlockTypes22["CyanCandleCake"] = "minecraft:cyan_candle_cake";
  MinecraftBlockTypes22["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftBlockTypes22["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftBlockTypes22["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftBlockTypes22["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftBlockTypes22["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftBlockTypes22["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftBlockTypes22["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftBlockTypes22["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftBlockTypes22["CyanWool"] = "minecraft:cyan_wool";
  MinecraftBlockTypes22["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftBlockTypes22["Dandelion"] = "minecraft:dandelion";
  MinecraftBlockTypes22["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftBlockTypes22["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftBlockTypes22["DarkOakDoubleSlab"] = "minecraft:dark_oak_double_slab";
  MinecraftBlockTypes22["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftBlockTypes22["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftBlockTypes22["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftBlockTypes22["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftBlockTypes22["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftBlockTypes22["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftBlockTypes22["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftBlockTypes22["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftBlockTypes22["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftBlockTypes22["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftBlockTypes22["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftBlockTypes22["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftBlockTypes22["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftBlockTypes22["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftBlockTypes22["DarkPrismarineDoubleSlab"] = "minecraft:dark_prismarine_double_slab";
  MinecraftBlockTypes22["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftBlockTypes22["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftBlockTypes22["DarkoakStandingSign"] = "minecraft:darkoak_standing_sign";
  MinecraftBlockTypes22["DarkoakWallSign"] = "minecraft:darkoak_wall_sign";
  MinecraftBlockTypes22["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftBlockTypes22["DaylightDetectorInverted"] = "minecraft:daylight_detector_inverted";
  MinecraftBlockTypes22["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftBlockTypes22["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftBlockTypes22["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftBlockTypes22["DeadBrainCoralWallFan"] = "minecraft:dead_brain_coral_wall_fan";
  MinecraftBlockTypes22["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftBlockTypes22["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftBlockTypes22["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftBlockTypes22["DeadBubbleCoralWallFan"] = "minecraft:dead_bubble_coral_wall_fan";
  MinecraftBlockTypes22["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftBlockTypes22["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftBlockTypes22["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftBlockTypes22["DeadFireCoralWallFan"] = "minecraft:dead_fire_coral_wall_fan";
  MinecraftBlockTypes22["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftBlockTypes22["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftBlockTypes22["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftBlockTypes22["DeadHornCoralWallFan"] = "minecraft:dead_horn_coral_wall_fan";
  MinecraftBlockTypes22["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftBlockTypes22["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftBlockTypes22["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftBlockTypes22["DeadTubeCoralWallFan"] = "minecraft:dead_tube_coral_wall_fan";
  MinecraftBlockTypes22["Deadbush"] = "minecraft:deadbush";
  MinecraftBlockTypes22["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftBlockTypes22["Deepslate"] = "minecraft:deepslate";
  MinecraftBlockTypes22["DeepslateBrickDoubleSlab"] = "minecraft:deepslate_brick_double_slab";
  MinecraftBlockTypes22["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftBlockTypes22["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftBlockTypes22["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftBlockTypes22["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftBlockTypes22["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftBlockTypes22["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftBlockTypes22["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftBlockTypes22["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftBlockTypes22["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftBlockTypes22["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftBlockTypes22["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftBlockTypes22["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftBlockTypes22["DeepslateTileDoubleSlab"] = "minecraft:deepslate_tile_double_slab";
  MinecraftBlockTypes22["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftBlockTypes22["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftBlockTypes22["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftBlockTypes22["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftBlockTypes22["Deny"] = "minecraft:deny";
  MinecraftBlockTypes22["DetectorRail"] = "minecraft:detector_rail";
  MinecraftBlockTypes22["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftBlockTypes22["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftBlockTypes22["Diorite"] = "minecraft:diorite";
  MinecraftBlockTypes22["DioriteDoubleSlab"] = "minecraft:diorite_double_slab";
  MinecraftBlockTypes22["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftBlockTypes22["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftBlockTypes22["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftBlockTypes22["Dirt"] = "minecraft:dirt";
  MinecraftBlockTypes22["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftBlockTypes22["Dispenser"] = "minecraft:dispenser";
  MinecraftBlockTypes22["DoubleCutCopperSlab"] = "minecraft:double_cut_copper_slab";
  MinecraftBlockTypes22["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftBlockTypes22["DragonHead"] = "minecraft:dragon_head";
  MinecraftBlockTypes22["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftBlockTypes22["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftBlockTypes22["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftBlockTypes22["Dropper"] = "minecraft:dropper";
  MinecraftBlockTypes22["Element0"] = "minecraft:element_0";
  MinecraftBlockTypes22["Element1"] = "minecraft:element_1";
  MinecraftBlockTypes22["Element10"] = "minecraft:element_10";
  MinecraftBlockTypes22["Element100"] = "minecraft:element_100";
  MinecraftBlockTypes22["Element101"] = "minecraft:element_101";
  MinecraftBlockTypes22["Element102"] = "minecraft:element_102";
  MinecraftBlockTypes22["Element103"] = "minecraft:element_103";
  MinecraftBlockTypes22["Element104"] = "minecraft:element_104";
  MinecraftBlockTypes22["Element105"] = "minecraft:element_105";
  MinecraftBlockTypes22["Element106"] = "minecraft:element_106";
  MinecraftBlockTypes22["Element107"] = "minecraft:element_107";
  MinecraftBlockTypes22["Element108"] = "minecraft:element_108";
  MinecraftBlockTypes22["Element109"] = "minecraft:element_109";
  MinecraftBlockTypes22["Element11"] = "minecraft:element_11";
  MinecraftBlockTypes22["Element110"] = "minecraft:element_110";
  MinecraftBlockTypes22["Element111"] = "minecraft:element_111";
  MinecraftBlockTypes22["Element112"] = "minecraft:element_112";
  MinecraftBlockTypes22["Element113"] = "minecraft:element_113";
  MinecraftBlockTypes22["Element114"] = "minecraft:element_114";
  MinecraftBlockTypes22["Element115"] = "minecraft:element_115";
  MinecraftBlockTypes22["Element116"] = "minecraft:element_116";
  MinecraftBlockTypes22["Element117"] = "minecraft:element_117";
  MinecraftBlockTypes22["Element118"] = "minecraft:element_118";
  MinecraftBlockTypes22["Element12"] = "minecraft:element_12";
  MinecraftBlockTypes22["Element13"] = "minecraft:element_13";
  MinecraftBlockTypes22["Element14"] = "minecraft:element_14";
  MinecraftBlockTypes22["Element15"] = "minecraft:element_15";
  MinecraftBlockTypes22["Element16"] = "minecraft:element_16";
  MinecraftBlockTypes22["Element17"] = "minecraft:element_17";
  MinecraftBlockTypes22["Element18"] = "minecraft:element_18";
  MinecraftBlockTypes22["Element19"] = "minecraft:element_19";
  MinecraftBlockTypes22["Element2"] = "minecraft:element_2";
  MinecraftBlockTypes22["Element20"] = "minecraft:element_20";
  MinecraftBlockTypes22["Element21"] = "minecraft:element_21";
  MinecraftBlockTypes22["Element22"] = "minecraft:element_22";
  MinecraftBlockTypes22["Element23"] = "minecraft:element_23";
  MinecraftBlockTypes22["Element24"] = "minecraft:element_24";
  MinecraftBlockTypes22["Element25"] = "minecraft:element_25";
  MinecraftBlockTypes22["Element26"] = "minecraft:element_26";
  MinecraftBlockTypes22["Element27"] = "minecraft:element_27";
  MinecraftBlockTypes22["Element28"] = "minecraft:element_28";
  MinecraftBlockTypes22["Element29"] = "minecraft:element_29";
  MinecraftBlockTypes22["Element3"] = "minecraft:element_3";
  MinecraftBlockTypes22["Element30"] = "minecraft:element_30";
  MinecraftBlockTypes22["Element31"] = "minecraft:element_31";
  MinecraftBlockTypes22["Element32"] = "minecraft:element_32";
  MinecraftBlockTypes22["Element33"] = "minecraft:element_33";
  MinecraftBlockTypes22["Element34"] = "minecraft:element_34";
  MinecraftBlockTypes22["Element35"] = "minecraft:element_35";
  MinecraftBlockTypes22["Element36"] = "minecraft:element_36";
  MinecraftBlockTypes22["Element37"] = "minecraft:element_37";
  MinecraftBlockTypes22["Element38"] = "minecraft:element_38";
  MinecraftBlockTypes22["Element39"] = "minecraft:element_39";
  MinecraftBlockTypes22["Element4"] = "minecraft:element_4";
  MinecraftBlockTypes22["Element40"] = "minecraft:element_40";
  MinecraftBlockTypes22["Element41"] = "minecraft:element_41";
  MinecraftBlockTypes22["Element42"] = "minecraft:element_42";
  MinecraftBlockTypes22["Element43"] = "minecraft:element_43";
  MinecraftBlockTypes22["Element44"] = "minecraft:element_44";
  MinecraftBlockTypes22["Element45"] = "minecraft:element_45";
  MinecraftBlockTypes22["Element46"] = "minecraft:element_46";
  MinecraftBlockTypes22["Element47"] = "minecraft:element_47";
  MinecraftBlockTypes22["Element48"] = "minecraft:element_48";
  MinecraftBlockTypes22["Element49"] = "minecraft:element_49";
  MinecraftBlockTypes22["Element5"] = "minecraft:element_5";
  MinecraftBlockTypes22["Element50"] = "minecraft:element_50";
  MinecraftBlockTypes22["Element51"] = "minecraft:element_51";
  MinecraftBlockTypes22["Element52"] = "minecraft:element_52";
  MinecraftBlockTypes22["Element53"] = "minecraft:element_53";
  MinecraftBlockTypes22["Element54"] = "minecraft:element_54";
  MinecraftBlockTypes22["Element55"] = "minecraft:element_55";
  MinecraftBlockTypes22["Element56"] = "minecraft:element_56";
  MinecraftBlockTypes22["Element57"] = "minecraft:element_57";
  MinecraftBlockTypes22["Element58"] = "minecraft:element_58";
  MinecraftBlockTypes22["Element59"] = "minecraft:element_59";
  MinecraftBlockTypes22["Element6"] = "minecraft:element_6";
  MinecraftBlockTypes22["Element60"] = "minecraft:element_60";
  MinecraftBlockTypes22["Element61"] = "minecraft:element_61";
  MinecraftBlockTypes22["Element62"] = "minecraft:element_62";
  MinecraftBlockTypes22["Element63"] = "minecraft:element_63";
  MinecraftBlockTypes22["Element64"] = "minecraft:element_64";
  MinecraftBlockTypes22["Element65"] = "minecraft:element_65";
  MinecraftBlockTypes22["Element66"] = "minecraft:element_66";
  MinecraftBlockTypes22["Element67"] = "minecraft:element_67";
  MinecraftBlockTypes22["Element68"] = "minecraft:element_68";
  MinecraftBlockTypes22["Element69"] = "minecraft:element_69";
  MinecraftBlockTypes22["Element7"] = "minecraft:element_7";
  MinecraftBlockTypes22["Element70"] = "minecraft:element_70";
  MinecraftBlockTypes22["Element71"] = "minecraft:element_71";
  MinecraftBlockTypes22["Element72"] = "minecraft:element_72";
  MinecraftBlockTypes22["Element73"] = "minecraft:element_73";
  MinecraftBlockTypes22["Element74"] = "minecraft:element_74";
  MinecraftBlockTypes22["Element75"] = "minecraft:element_75";
  MinecraftBlockTypes22["Element76"] = "minecraft:element_76";
  MinecraftBlockTypes22["Element77"] = "minecraft:element_77";
  MinecraftBlockTypes22["Element78"] = "minecraft:element_78";
  MinecraftBlockTypes22["Element79"] = "minecraft:element_79";
  MinecraftBlockTypes22["Element8"] = "minecraft:element_8";
  MinecraftBlockTypes22["Element80"] = "minecraft:element_80";
  MinecraftBlockTypes22["Element81"] = "minecraft:element_81";
  MinecraftBlockTypes22["Element82"] = "minecraft:element_82";
  MinecraftBlockTypes22["Element83"] = "minecraft:element_83";
  MinecraftBlockTypes22["Element84"] = "minecraft:element_84";
  MinecraftBlockTypes22["Element85"] = "minecraft:element_85";
  MinecraftBlockTypes22["Element86"] = "minecraft:element_86";
  MinecraftBlockTypes22["Element87"] = "minecraft:element_87";
  MinecraftBlockTypes22["Element88"] = "minecraft:element_88";
  MinecraftBlockTypes22["Element89"] = "minecraft:element_89";
  MinecraftBlockTypes22["Element9"] = "minecraft:element_9";
  MinecraftBlockTypes22["Element90"] = "minecraft:element_90";
  MinecraftBlockTypes22["Element91"] = "minecraft:element_91";
  MinecraftBlockTypes22["Element92"] = "minecraft:element_92";
  MinecraftBlockTypes22["Element93"] = "minecraft:element_93";
  MinecraftBlockTypes22["Element94"] = "minecraft:element_94";
  MinecraftBlockTypes22["Element95"] = "minecraft:element_95";
  MinecraftBlockTypes22["Element96"] = "minecraft:element_96";
  MinecraftBlockTypes22["Element97"] = "minecraft:element_97";
  MinecraftBlockTypes22["Element98"] = "minecraft:element_98";
  MinecraftBlockTypes22["Element99"] = "minecraft:element_99";
  MinecraftBlockTypes22["ElementConstructor"] = "minecraft:element_constructor";
  MinecraftBlockTypes22["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftBlockTypes22["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftBlockTypes22["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftBlockTypes22["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftBlockTypes22["EndBricks"] = "minecraft:end_bricks";
  MinecraftBlockTypes22["EndPortal"] = "minecraft:end_portal";
  MinecraftBlockTypes22["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftBlockTypes22["EndRod"] = "minecraft:end_rod";
  MinecraftBlockTypes22["EndStone"] = "minecraft:end_stone";
  MinecraftBlockTypes22["EndStoneBrickDoubleSlab"] = "minecraft:end_stone_brick_double_slab";
  MinecraftBlockTypes22["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftBlockTypes22["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftBlockTypes22["EnderChest"] = "minecraft:ender_chest";
  MinecraftBlockTypes22["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftBlockTypes22["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftBlockTypes22["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftBlockTypes22["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftBlockTypes22["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftBlockTypes22["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftBlockTypes22["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftBlockTypes22["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftBlockTypes22["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftBlockTypes22["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftBlockTypes22["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftBlockTypes22["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftBlockTypes22["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftBlockTypes22["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftBlockTypes22["ExposedDoubleCutCopperSlab"] = "minecraft:exposed_double_cut_copper_slab";
  MinecraftBlockTypes22["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftBlockTypes22["Farmland"] = "minecraft:farmland";
  MinecraftBlockTypes22["FenceGate"] = "minecraft:fence_gate";
  MinecraftBlockTypes22["Fern"] = "minecraft:fern";
  MinecraftBlockTypes22["Fire"] = "minecraft:fire";
  MinecraftBlockTypes22["FireCoral"] = "minecraft:fire_coral";
  MinecraftBlockTypes22["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftBlockTypes22["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftBlockTypes22["FireCoralWallFan"] = "minecraft:fire_coral_wall_fan";
  MinecraftBlockTypes22["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftBlockTypes22["FletchingTable"] = "minecraft:fletching_table";
  MinecraftBlockTypes22["FlowerPot"] = "minecraft:flower_pot";
  MinecraftBlockTypes22["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftBlockTypes22["FlowingLava"] = "minecraft:flowing_lava";
  MinecraftBlockTypes22["FlowingWater"] = "minecraft:flowing_water";
  MinecraftBlockTypes22["Frame"] = "minecraft:frame";
  MinecraftBlockTypes22["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftBlockTypes22["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftBlockTypes22["Furnace"] = "minecraft:furnace";
  MinecraftBlockTypes22["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftBlockTypes22["Glass"] = "minecraft:glass";
  MinecraftBlockTypes22["GlassPane"] = "minecraft:glass_pane";
  MinecraftBlockTypes22["GlowFrame"] = "minecraft:glow_frame";
  MinecraftBlockTypes22["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftBlockTypes22["Glowstone"] = "minecraft:glowstone";
  MinecraftBlockTypes22["GoldBlock"] = "minecraft:gold_block";
  MinecraftBlockTypes22["GoldOre"] = "minecraft:gold_ore";
  MinecraftBlockTypes22["GoldenRail"] = "minecraft:golden_rail";
  MinecraftBlockTypes22["Granite"] = "minecraft:granite";
  MinecraftBlockTypes22["GraniteDoubleSlab"] = "minecraft:granite_double_slab";
  MinecraftBlockTypes22["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftBlockTypes22["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftBlockTypes22["GraniteWall"] = "minecraft:granite_wall";
  MinecraftBlockTypes22["GrassBlock"] = "minecraft:grass_block";
  MinecraftBlockTypes22["GrassPath"] = "minecraft:grass_path";
  MinecraftBlockTypes22["Gravel"] = "minecraft:gravel";
  MinecraftBlockTypes22["GrayCandle"] = "minecraft:gray_candle";
  MinecraftBlockTypes22["GrayCandleCake"] = "minecraft:gray_candle_cake";
  MinecraftBlockTypes22["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftBlockTypes22["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftBlockTypes22["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftBlockTypes22["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftBlockTypes22["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftBlockTypes22["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftBlockTypes22["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftBlockTypes22["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftBlockTypes22["GrayWool"] = "minecraft:gray_wool";
  MinecraftBlockTypes22["GreenCandle"] = "minecraft:green_candle";
  MinecraftBlockTypes22["GreenCandleCake"] = "minecraft:green_candle_cake";
  MinecraftBlockTypes22["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftBlockTypes22["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftBlockTypes22["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftBlockTypes22["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftBlockTypes22["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftBlockTypes22["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftBlockTypes22["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftBlockTypes22["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftBlockTypes22["GreenWool"] = "minecraft:green_wool";
  MinecraftBlockTypes22["Grindstone"] = "minecraft:grindstone";
  MinecraftBlockTypes22["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftBlockTypes22["HardBlackStainedGlass"] = "minecraft:hard_black_stained_glass";
  MinecraftBlockTypes22["HardBlackStainedGlassPane"] = "minecraft:hard_black_stained_glass_pane";
  MinecraftBlockTypes22["HardBlueStainedGlass"] = "minecraft:hard_blue_stained_glass";
  MinecraftBlockTypes22["HardBlueStainedGlassPane"] = "minecraft:hard_blue_stained_glass_pane";
  MinecraftBlockTypes22["HardBrownStainedGlass"] = "minecraft:hard_brown_stained_glass";
  MinecraftBlockTypes22["HardBrownStainedGlassPane"] = "minecraft:hard_brown_stained_glass_pane";
  MinecraftBlockTypes22["HardCyanStainedGlass"] = "minecraft:hard_cyan_stained_glass";
  MinecraftBlockTypes22["HardCyanStainedGlassPane"] = "minecraft:hard_cyan_stained_glass_pane";
  MinecraftBlockTypes22["HardGlass"] = "minecraft:hard_glass";
  MinecraftBlockTypes22["HardGlassPane"] = "minecraft:hard_glass_pane";
  MinecraftBlockTypes22["HardGrayStainedGlass"] = "minecraft:hard_gray_stained_glass";
  MinecraftBlockTypes22["HardGrayStainedGlassPane"] = "minecraft:hard_gray_stained_glass_pane";
  MinecraftBlockTypes22["HardGreenStainedGlass"] = "minecraft:hard_green_stained_glass";
  MinecraftBlockTypes22["HardGreenStainedGlassPane"] = "minecraft:hard_green_stained_glass_pane";
  MinecraftBlockTypes22["HardLightBlueStainedGlass"] = "minecraft:hard_light_blue_stained_glass";
  MinecraftBlockTypes22["HardLightBlueStainedGlassPane"] = "minecraft:hard_light_blue_stained_glass_pane";
  MinecraftBlockTypes22["HardLightGrayStainedGlass"] = "minecraft:hard_light_gray_stained_glass";
  MinecraftBlockTypes22["HardLightGrayStainedGlassPane"] = "minecraft:hard_light_gray_stained_glass_pane";
  MinecraftBlockTypes22["HardLimeStainedGlass"] = "minecraft:hard_lime_stained_glass";
  MinecraftBlockTypes22["HardLimeStainedGlassPane"] = "minecraft:hard_lime_stained_glass_pane";
  MinecraftBlockTypes22["HardMagentaStainedGlass"] = "minecraft:hard_magenta_stained_glass";
  MinecraftBlockTypes22["HardMagentaStainedGlassPane"] = "minecraft:hard_magenta_stained_glass_pane";
  MinecraftBlockTypes22["HardOrangeStainedGlass"] = "minecraft:hard_orange_stained_glass";
  MinecraftBlockTypes22["HardOrangeStainedGlassPane"] = "minecraft:hard_orange_stained_glass_pane";
  MinecraftBlockTypes22["HardPinkStainedGlass"] = "minecraft:hard_pink_stained_glass";
  MinecraftBlockTypes22["HardPinkStainedGlassPane"] = "minecraft:hard_pink_stained_glass_pane";
  MinecraftBlockTypes22["HardPurpleStainedGlass"] = "minecraft:hard_purple_stained_glass";
  MinecraftBlockTypes22["HardPurpleStainedGlassPane"] = "minecraft:hard_purple_stained_glass_pane";
  MinecraftBlockTypes22["HardRedStainedGlass"] = "minecraft:hard_red_stained_glass";
  MinecraftBlockTypes22["HardRedStainedGlassPane"] = "minecraft:hard_red_stained_glass_pane";
  MinecraftBlockTypes22["HardWhiteStainedGlass"] = "minecraft:hard_white_stained_glass";
  MinecraftBlockTypes22["HardWhiteStainedGlassPane"] = "minecraft:hard_white_stained_glass_pane";
  MinecraftBlockTypes22["HardYellowStainedGlass"] = "minecraft:hard_yellow_stained_glass";
  MinecraftBlockTypes22["HardYellowStainedGlassPane"] = "minecraft:hard_yellow_stained_glass_pane";
  MinecraftBlockTypes22["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftBlockTypes22["HayBlock"] = "minecraft:hay_block";
  MinecraftBlockTypes22["HeavyCore"] = "minecraft:heavy_core";
  MinecraftBlockTypes22["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftBlockTypes22["HoneyBlock"] = "minecraft:honey_block";
  MinecraftBlockTypes22["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftBlockTypes22["Hopper"] = "minecraft:hopper";
  MinecraftBlockTypes22["HornCoral"] = "minecraft:horn_coral";
  MinecraftBlockTypes22["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftBlockTypes22["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftBlockTypes22["HornCoralWallFan"] = "minecraft:horn_coral_wall_fan";
  MinecraftBlockTypes22["Ice"] = "minecraft:ice";
  MinecraftBlockTypes22["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftBlockTypes22["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftBlockTypes22["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftBlockTypes22["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftBlockTypes22["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftBlockTypes22["InfestedStone"] = "minecraft:infested_stone";
  MinecraftBlockTypes22["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftBlockTypes22["IronBars"] = "minecraft:iron_bars";
  MinecraftBlockTypes22["IronBlock"] = "minecraft:iron_block";
  MinecraftBlockTypes22["IronChain"] = "minecraft:iron_chain";
  MinecraftBlockTypes22["IronDoor"] = "minecraft:iron_door";
  MinecraftBlockTypes22["IronOre"] = "minecraft:iron_ore";
  MinecraftBlockTypes22["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftBlockTypes22["Jigsaw"] = "minecraft:jigsaw";
  MinecraftBlockTypes22["Jukebox"] = "minecraft:jukebox";
  MinecraftBlockTypes22["JungleButton"] = "minecraft:jungle_button";
  MinecraftBlockTypes22["JungleDoor"] = "minecraft:jungle_door";
  MinecraftBlockTypes22["JungleDoubleSlab"] = "minecraft:jungle_double_slab";
  MinecraftBlockTypes22["JungleFence"] = "minecraft:jungle_fence";
  MinecraftBlockTypes22["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftBlockTypes22["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftBlockTypes22["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftBlockTypes22["JungleLog"] = "minecraft:jungle_log";
  MinecraftBlockTypes22["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftBlockTypes22["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftBlockTypes22["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftBlockTypes22["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftBlockTypes22["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftBlockTypes22["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftBlockTypes22["JungleStandingSign"] = "minecraft:jungle_standing_sign";
  MinecraftBlockTypes22["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftBlockTypes22["JungleWallSign"] = "minecraft:jungle_wall_sign";
  MinecraftBlockTypes22["JungleWood"] = "minecraft:jungle_wood";
  MinecraftBlockTypes22["Kelp"] = "minecraft:kelp";
  MinecraftBlockTypes22["LabTable"] = "minecraft:lab_table";
  MinecraftBlockTypes22["Ladder"] = "minecraft:ladder";
  MinecraftBlockTypes22["Lantern"] = "minecraft:lantern";
  MinecraftBlockTypes22["LapisBlock"] = "minecraft:lapis_block";
  MinecraftBlockTypes22["LapisOre"] = "minecraft:lapis_ore";
  MinecraftBlockTypes22["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftBlockTypes22["LargeFern"] = "minecraft:large_fern";
  MinecraftBlockTypes22["Lava"] = "minecraft:lava";
  MinecraftBlockTypes22["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftBlockTypes22["Lectern"] = "minecraft:lectern";
  MinecraftBlockTypes22["Lever"] = "minecraft:lever";
  MinecraftBlockTypes22["LightBlock0"] = "minecraft:light_block_0";
  MinecraftBlockTypes22["LightBlock1"] = "minecraft:light_block_1";
  MinecraftBlockTypes22["LightBlock10"] = "minecraft:light_block_10";
  MinecraftBlockTypes22["LightBlock11"] = "minecraft:light_block_11";
  MinecraftBlockTypes22["LightBlock12"] = "minecraft:light_block_12";
  MinecraftBlockTypes22["LightBlock13"] = "minecraft:light_block_13";
  MinecraftBlockTypes22["LightBlock14"] = "minecraft:light_block_14";
  MinecraftBlockTypes22["LightBlock15"] = "minecraft:light_block_15";
  MinecraftBlockTypes22["LightBlock2"] = "minecraft:light_block_2";
  MinecraftBlockTypes22["LightBlock3"] = "minecraft:light_block_3";
  MinecraftBlockTypes22["LightBlock4"] = "minecraft:light_block_4";
  MinecraftBlockTypes22["LightBlock5"] = "minecraft:light_block_5";
  MinecraftBlockTypes22["LightBlock6"] = "minecraft:light_block_6";
  MinecraftBlockTypes22["LightBlock7"] = "minecraft:light_block_7";
  MinecraftBlockTypes22["LightBlock8"] = "minecraft:light_block_8";
  MinecraftBlockTypes22["LightBlock9"] = "minecraft:light_block_9";
  MinecraftBlockTypes22["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftBlockTypes22["LightBlueCandleCake"] = "minecraft:light_blue_candle_cake";
  MinecraftBlockTypes22["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftBlockTypes22["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftBlockTypes22["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftBlockTypes22["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftBlockTypes22["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftBlockTypes22["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftBlockTypes22["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftBlockTypes22["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftBlockTypes22["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftBlockTypes22["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftBlockTypes22["LightGrayCandleCake"] = "minecraft:light_gray_candle_cake";
  MinecraftBlockTypes22["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftBlockTypes22["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftBlockTypes22["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftBlockTypes22["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftBlockTypes22["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftBlockTypes22["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftBlockTypes22["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftBlockTypes22["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftBlockTypes22["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftBlockTypes22["LightningRod"] = "minecraft:lightning_rod";
  MinecraftBlockTypes22["Lilac"] = "minecraft:lilac";
  MinecraftBlockTypes22["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftBlockTypes22["LimeCandle"] = "minecraft:lime_candle";
  MinecraftBlockTypes22["LimeCandleCake"] = "minecraft:lime_candle_cake";
  MinecraftBlockTypes22["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftBlockTypes22["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftBlockTypes22["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftBlockTypes22["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftBlockTypes22["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftBlockTypes22["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftBlockTypes22["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftBlockTypes22["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftBlockTypes22["LimeWool"] = "minecraft:lime_wool";
  MinecraftBlockTypes22["LitBlastFurnace"] = "minecraft:lit_blast_furnace";
  MinecraftBlockTypes22["LitDeepslateRedstoneOre"] = "minecraft:lit_deepslate_redstone_ore";
  MinecraftBlockTypes22["LitFurnace"] = "minecraft:lit_furnace";
  MinecraftBlockTypes22["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftBlockTypes22["LitRedstoneLamp"] = "minecraft:lit_redstone_lamp";
  MinecraftBlockTypes22["LitRedstoneOre"] = "minecraft:lit_redstone_ore";
  MinecraftBlockTypes22["LitSmoker"] = "minecraft:lit_smoker";
  MinecraftBlockTypes22["Lodestone"] = "minecraft:lodestone";
  MinecraftBlockTypes22["Loom"] = "minecraft:loom";
  MinecraftBlockTypes22["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftBlockTypes22["MagentaCandleCake"] = "minecraft:magenta_candle_cake";
  MinecraftBlockTypes22["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftBlockTypes22["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftBlockTypes22["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftBlockTypes22["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftBlockTypes22["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftBlockTypes22["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftBlockTypes22["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftBlockTypes22["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftBlockTypes22["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftBlockTypes22["Magma"] = "minecraft:magma";
  MinecraftBlockTypes22["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftBlockTypes22["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftBlockTypes22["MangroveDoubleSlab"] = "minecraft:mangrove_double_slab";
  MinecraftBlockTypes22["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftBlockTypes22["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftBlockTypes22["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftBlockTypes22["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftBlockTypes22["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftBlockTypes22["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftBlockTypes22["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftBlockTypes22["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftBlockTypes22["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftBlockTypes22["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftBlockTypes22["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftBlockTypes22["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftBlockTypes22["MangroveStandingSign"] = "minecraft:mangrove_standing_sign";
  MinecraftBlockTypes22["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftBlockTypes22["MangroveWallSign"] = "minecraft:mangrove_wall_sign";
  MinecraftBlockTypes22["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftBlockTypes22["MaterialReducer"] = "minecraft:material_reducer";
  MinecraftBlockTypes22["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftBlockTypes22["MelonBlock"] = "minecraft:melon_block";
  MinecraftBlockTypes22["MelonStem"] = "minecraft:melon_stem";
  MinecraftBlockTypes22["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftBlockTypes22["MossBlock"] = "minecraft:moss_block";
  MinecraftBlockTypes22["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftBlockTypes22["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftBlockTypes22["MossyCobblestoneDoubleSlab"] = "minecraft:mossy_cobblestone_double_slab";
  MinecraftBlockTypes22["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftBlockTypes22["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftBlockTypes22["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftBlockTypes22["MossyStoneBrickDoubleSlab"] = "minecraft:mossy_stone_brick_double_slab";
  MinecraftBlockTypes22["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftBlockTypes22["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftBlockTypes22["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftBlockTypes22["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftBlockTypes22["Mud"] = "minecraft:mud";
  MinecraftBlockTypes22["MudBrickDoubleSlab"] = "minecraft:mud_brick_double_slab";
  MinecraftBlockTypes22["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftBlockTypes22["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftBlockTypes22["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftBlockTypes22["MudBricks"] = "minecraft:mud_bricks";
  MinecraftBlockTypes22["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftBlockTypes22["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftBlockTypes22["Mycelium"] = "minecraft:mycelium";
  MinecraftBlockTypes22["NetherBrick"] = "minecraft:nether_brick";
  MinecraftBlockTypes22["NetherBrickDoubleSlab"] = "minecraft:nether_brick_double_slab";
  MinecraftBlockTypes22["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftBlockTypes22["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftBlockTypes22["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftBlockTypes22["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftBlockTypes22["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftBlockTypes22["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftBlockTypes22["NetherWart"] = "minecraft:nether_wart";
  MinecraftBlockTypes22["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftBlockTypes22["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftBlockTypes22["Netherrack"] = "minecraft:netherrack";
  MinecraftBlockTypes22["NormalStoneDoubleSlab"] = "minecraft:normal_stone_double_slab";
  MinecraftBlockTypes22["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftBlockTypes22["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftBlockTypes22["Noteblock"] = "minecraft:noteblock";
  MinecraftBlockTypes22["OakDoubleSlab"] = "minecraft:oak_double_slab";
  MinecraftBlockTypes22["OakFence"] = "minecraft:oak_fence";
  MinecraftBlockTypes22["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftBlockTypes22["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftBlockTypes22["OakLog"] = "minecraft:oak_log";
  MinecraftBlockTypes22["OakPlanks"] = "minecraft:oak_planks";
  MinecraftBlockTypes22["OakSapling"] = "minecraft:oak_sapling";
  MinecraftBlockTypes22["OakShelf"] = "minecraft:oak_shelf";
  MinecraftBlockTypes22["OakSlab"] = "minecraft:oak_slab";
  MinecraftBlockTypes22["OakStairs"] = "minecraft:oak_stairs";
  MinecraftBlockTypes22["OakWood"] = "minecraft:oak_wood";
  MinecraftBlockTypes22["Observer"] = "minecraft:observer";
  MinecraftBlockTypes22["Obsidian"] = "minecraft:obsidian";
  MinecraftBlockTypes22["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftBlockTypes22["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftBlockTypes22["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftBlockTypes22["OrangeCandleCake"] = "minecraft:orange_candle_cake";
  MinecraftBlockTypes22["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftBlockTypes22["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftBlockTypes22["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftBlockTypes22["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftBlockTypes22["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftBlockTypes22["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftBlockTypes22["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftBlockTypes22["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftBlockTypes22["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftBlockTypes22["OrangeWool"] = "minecraft:orange_wool";
  MinecraftBlockTypes22["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftBlockTypes22["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftBlockTypes22["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftBlockTypes22["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftBlockTypes22["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftBlockTypes22["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftBlockTypes22["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftBlockTypes22["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftBlockTypes22["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftBlockTypes22["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftBlockTypes22["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftBlockTypes22["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftBlockTypes22["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftBlockTypes22["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftBlockTypes22["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftBlockTypes22["OxidizedDoubleCutCopperSlab"] = "minecraft:oxidized_double_cut_copper_slab";
  MinecraftBlockTypes22["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftBlockTypes22["PackedIce"] = "minecraft:packed_ice";
  MinecraftBlockTypes22["PackedMud"] = "minecraft:packed_mud";
  MinecraftBlockTypes22["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftBlockTypes22["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftBlockTypes22["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftBlockTypes22["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftBlockTypes22["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftBlockTypes22["PaleOakDoubleSlab"] = "minecraft:pale_oak_double_slab";
  MinecraftBlockTypes22["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftBlockTypes22["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftBlockTypes22["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftBlockTypes22["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftBlockTypes22["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftBlockTypes22["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftBlockTypes22["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftBlockTypes22["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftBlockTypes22["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftBlockTypes22["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftBlockTypes22["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftBlockTypes22["PaleOakStandingSign"] = "minecraft:pale_oak_standing_sign";
  MinecraftBlockTypes22["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftBlockTypes22["PaleOakWallSign"] = "minecraft:pale_oak_wall_sign";
  MinecraftBlockTypes22["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftBlockTypes22["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftBlockTypes22["Peony"] = "minecraft:peony";
  MinecraftBlockTypes22["PetrifiedOakDoubleSlab"] = "minecraft:petrified_oak_double_slab";
  MinecraftBlockTypes22["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftBlockTypes22["PiglinHead"] = "minecraft:piglin_head";
  MinecraftBlockTypes22["PinkCandle"] = "minecraft:pink_candle";
  MinecraftBlockTypes22["PinkCandleCake"] = "minecraft:pink_candle_cake";
  MinecraftBlockTypes22["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftBlockTypes22["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftBlockTypes22["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftBlockTypes22["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftBlockTypes22["PinkPetals"] = "minecraft:pink_petals";
  MinecraftBlockTypes22["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftBlockTypes22["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftBlockTypes22["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftBlockTypes22["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftBlockTypes22["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftBlockTypes22["PinkWool"] = "minecraft:pink_wool";
  MinecraftBlockTypes22["Piston"] = "minecraft:piston";
  MinecraftBlockTypes22["PistonArmCollision"] = "minecraft:piston_arm_collision";
  MinecraftBlockTypes22["PitcherCrop"] = "minecraft:pitcher_crop";
  MinecraftBlockTypes22["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftBlockTypes22["PlayerHead"] = "minecraft:player_head";
  MinecraftBlockTypes22["Podzol"] = "minecraft:podzol";
  MinecraftBlockTypes22["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftBlockTypes22["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftBlockTypes22["PolishedAndesiteDoubleSlab"] = "minecraft:polished_andesite_double_slab";
  MinecraftBlockTypes22["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftBlockTypes22["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftBlockTypes22["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftBlockTypes22["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftBlockTypes22["PolishedBlackstoneBrickDoubleSlab"] = "minecraft:polished_blackstone_brick_double_slab";
  MinecraftBlockTypes22["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftBlockTypes22["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftBlockTypes22["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftBlockTypes22["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftBlockTypes22["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftBlockTypes22["PolishedBlackstoneDoubleSlab"] = "minecraft:polished_blackstone_double_slab";
  MinecraftBlockTypes22["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftBlockTypes22["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftBlockTypes22["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftBlockTypes22["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftBlockTypes22["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftBlockTypes22["PolishedDeepslateDoubleSlab"] = "minecraft:polished_deepslate_double_slab";
  MinecraftBlockTypes22["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftBlockTypes22["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftBlockTypes22["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftBlockTypes22["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftBlockTypes22["PolishedDioriteDoubleSlab"] = "minecraft:polished_diorite_double_slab";
  MinecraftBlockTypes22["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftBlockTypes22["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftBlockTypes22["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftBlockTypes22["PolishedGraniteDoubleSlab"] = "minecraft:polished_granite_double_slab";
  MinecraftBlockTypes22["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftBlockTypes22["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftBlockTypes22["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftBlockTypes22["PolishedTuffDoubleSlab"] = "minecraft:polished_tuff_double_slab";
  MinecraftBlockTypes22["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftBlockTypes22["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftBlockTypes22["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftBlockTypes22["Poppy"] = "minecraft:poppy";
  MinecraftBlockTypes22["Portal"] = "minecraft:portal";
  MinecraftBlockTypes22["Potatoes"] = "minecraft:potatoes";
  MinecraftBlockTypes22["PowderSnow"] = "minecraft:powder_snow";
  MinecraftBlockTypes22["PoweredComparator"] = "minecraft:powered_comparator";
  MinecraftBlockTypes22["PoweredRepeater"] = "minecraft:powered_repeater";
  MinecraftBlockTypes22["Prismarine"] = "minecraft:prismarine";
  MinecraftBlockTypes22["PrismarineBrickDoubleSlab"] = "minecraft:prismarine_brick_double_slab";
  MinecraftBlockTypes22["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftBlockTypes22["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftBlockTypes22["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftBlockTypes22["PrismarineDoubleSlab"] = "minecraft:prismarine_double_slab";
  MinecraftBlockTypes22["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftBlockTypes22["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftBlockTypes22["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftBlockTypes22["Pumpkin"] = "minecraft:pumpkin";
  MinecraftBlockTypes22["PumpkinStem"] = "minecraft:pumpkin_stem";
  MinecraftBlockTypes22["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftBlockTypes22["PurpleCandleCake"] = "minecraft:purple_candle_cake";
  MinecraftBlockTypes22["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftBlockTypes22["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftBlockTypes22["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftBlockTypes22["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftBlockTypes22["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftBlockTypes22["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftBlockTypes22["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftBlockTypes22["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftBlockTypes22["PurpleWool"] = "minecraft:purple_wool";
  MinecraftBlockTypes22["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftBlockTypes22["PurpurDoubleSlab"] = "minecraft:purpur_double_slab";
  MinecraftBlockTypes22["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftBlockTypes22["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftBlockTypes22["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftBlockTypes22["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftBlockTypes22["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftBlockTypes22["QuartzDoubleSlab"] = "minecraft:quartz_double_slab";
  MinecraftBlockTypes22["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftBlockTypes22["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftBlockTypes22["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftBlockTypes22["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftBlockTypes22["Rail"] = "minecraft:rail";
  MinecraftBlockTypes22["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftBlockTypes22["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftBlockTypes22["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftBlockTypes22["RedCandle"] = "minecraft:red_candle";
  MinecraftBlockTypes22["RedCandleCake"] = "minecraft:red_candle_cake";
  MinecraftBlockTypes22["RedCarpet"] = "minecraft:red_carpet";
  MinecraftBlockTypes22["RedConcrete"] = "minecraft:red_concrete";
  MinecraftBlockTypes22["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftBlockTypes22["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftBlockTypes22["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftBlockTypes22["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftBlockTypes22["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftBlockTypes22["RedNetherBrickDoubleSlab"] = "minecraft:red_nether_brick_double_slab";
  MinecraftBlockTypes22["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftBlockTypes22["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftBlockTypes22["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftBlockTypes22["RedSand"] = "minecraft:red_sand";
  MinecraftBlockTypes22["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftBlockTypes22["RedSandstoneDoubleSlab"] = "minecraft:red_sandstone_double_slab";
  MinecraftBlockTypes22["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftBlockTypes22["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftBlockTypes22["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftBlockTypes22["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftBlockTypes22["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftBlockTypes22["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftBlockTypes22["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftBlockTypes22["RedTulip"] = "minecraft:red_tulip";
  MinecraftBlockTypes22["RedWool"] = "minecraft:red_wool";
  MinecraftBlockTypes22["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftBlockTypes22["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftBlockTypes22["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftBlockTypes22["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftBlockTypes22["RedstoneWire"] = "minecraft:redstone_wire";
  MinecraftBlockTypes22["Reeds"] = "minecraft:reeds";
  MinecraftBlockTypes22["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftBlockTypes22["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftBlockTypes22["ResinBlock"] = "minecraft:resin_block";
  MinecraftBlockTypes22["ResinBrickDoubleSlab"] = "minecraft:resin_brick_double_slab";
  MinecraftBlockTypes22["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftBlockTypes22["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftBlockTypes22["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftBlockTypes22["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftBlockTypes22["ResinClump"] = "minecraft:resin_clump";
  MinecraftBlockTypes22["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftBlockTypes22["RoseBush"] = "minecraft:rose_bush";
  MinecraftBlockTypes22["Sand"] = "minecraft:sand";
  MinecraftBlockTypes22["Sandstone"] = "minecraft:sandstone";
  MinecraftBlockTypes22["SandstoneDoubleSlab"] = "minecraft:sandstone_double_slab";
  MinecraftBlockTypes22["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftBlockTypes22["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftBlockTypes22["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftBlockTypes22["Scaffolding"] = "minecraft:scaffolding";
  MinecraftBlockTypes22["Sculk"] = "minecraft:sculk";
  MinecraftBlockTypes22["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftBlockTypes22["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftBlockTypes22["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftBlockTypes22["SculkVein"] = "minecraft:sculk_vein";
  MinecraftBlockTypes22["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftBlockTypes22["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftBlockTypes22["Seagrass"] = "minecraft:seagrass";
  MinecraftBlockTypes22["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftBlockTypes22["ShortGrass"] = "minecraft:short_grass";
  MinecraftBlockTypes22["Shroomlight"] = "minecraft:shroomlight";
  MinecraftBlockTypes22["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftBlockTypes22["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftBlockTypes22["Slime"] = "minecraft:slime";
  MinecraftBlockTypes22["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftBlockTypes22["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftBlockTypes22["SmithingTable"] = "minecraft:smithing_table";
  MinecraftBlockTypes22["Smoker"] = "minecraft:smoker";
  MinecraftBlockTypes22["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftBlockTypes22["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftBlockTypes22["SmoothQuartzDoubleSlab"] = "minecraft:smooth_quartz_double_slab";
  MinecraftBlockTypes22["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftBlockTypes22["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftBlockTypes22["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftBlockTypes22["SmoothRedSandstoneDoubleSlab"] = "minecraft:smooth_red_sandstone_double_slab";
  MinecraftBlockTypes22["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftBlockTypes22["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftBlockTypes22["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftBlockTypes22["SmoothSandstoneDoubleSlab"] = "minecraft:smooth_sandstone_double_slab";
  MinecraftBlockTypes22["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftBlockTypes22["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftBlockTypes22["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftBlockTypes22["SmoothStoneDoubleSlab"] = "minecraft:smooth_stone_double_slab";
  MinecraftBlockTypes22["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftBlockTypes22["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftBlockTypes22["Snow"] = "minecraft:snow";
  MinecraftBlockTypes22["SnowLayer"] = "minecraft:snow_layer";
  MinecraftBlockTypes22["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftBlockTypes22["SoulFire"] = "minecraft:soul_fire";
  MinecraftBlockTypes22["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftBlockTypes22["SoulSand"] = "minecraft:soul_sand";
  MinecraftBlockTypes22["SoulSoil"] = "minecraft:soul_soil";
  MinecraftBlockTypes22["SoulTorch"] = "minecraft:soul_torch";
  MinecraftBlockTypes22["Sponge"] = "minecraft:sponge";
  MinecraftBlockTypes22["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftBlockTypes22["SpruceButton"] = "minecraft:spruce_button";
  MinecraftBlockTypes22["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftBlockTypes22["SpruceDoubleSlab"] = "minecraft:spruce_double_slab";
  MinecraftBlockTypes22["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftBlockTypes22["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftBlockTypes22["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftBlockTypes22["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftBlockTypes22["SpruceLog"] = "minecraft:spruce_log";
  MinecraftBlockTypes22["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftBlockTypes22["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftBlockTypes22["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftBlockTypes22["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftBlockTypes22["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftBlockTypes22["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftBlockTypes22["SpruceStandingSign"] = "minecraft:spruce_standing_sign";
  MinecraftBlockTypes22["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftBlockTypes22["SpruceWallSign"] = "minecraft:spruce_wall_sign";
  MinecraftBlockTypes22["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftBlockTypes22["StandingBanner"] = "minecraft:standing_banner";
  MinecraftBlockTypes22["StandingSign"] = "minecraft:standing_sign";
  MinecraftBlockTypes22["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftBlockTypes22["StickyPistonArmCollision"] = "minecraft:sticky_piston_arm_collision";
  MinecraftBlockTypes22["Stone"] = "minecraft:stone";
  MinecraftBlockTypes22["StoneBrickDoubleSlab"] = "minecraft:stone_brick_double_slab";
  MinecraftBlockTypes22["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftBlockTypes22["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftBlockTypes22["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftBlockTypes22["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftBlockTypes22["StoneButton"] = "minecraft:stone_button";
  MinecraftBlockTypes22["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftBlockTypes22["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftBlockTypes22["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftBlockTypes22["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftBlockTypes22["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftBlockTypes22["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftBlockTypes22["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftBlockTypes22["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftBlockTypes22["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftBlockTypes22["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftBlockTypes22["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftBlockTypes22["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftBlockTypes22["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftBlockTypes22["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftBlockTypes22["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftBlockTypes22["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftBlockTypes22["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftBlockTypes22["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftBlockTypes22["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftBlockTypes22["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftBlockTypes22["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftBlockTypes22["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftBlockTypes22["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftBlockTypes22["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftBlockTypes22["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftBlockTypes22["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftBlockTypes22["StructureBlock"] = "minecraft:structure_block";
  MinecraftBlockTypes22["StructureVoid"] = "minecraft:structure_void";
  MinecraftBlockTypes22["Sunflower"] = "minecraft:sunflower";
  MinecraftBlockTypes22["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftBlockTypes22["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftBlockTypes22["SweetBerryBush"] = "minecraft:sweet_berry_bush";
  MinecraftBlockTypes22["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftBlockTypes22["TallGrass"] = "minecraft:tall_grass";
  MinecraftBlockTypes22["Target"] = "minecraft:target";
  MinecraftBlockTypes22["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftBlockTypes22["Tnt"] = "minecraft:tnt";
  MinecraftBlockTypes22["Torch"] = "minecraft:torch";
  MinecraftBlockTypes22["Torchflower"] = "minecraft:torchflower";
  MinecraftBlockTypes22["TorchflowerCrop"] = "minecraft:torchflower_crop";
  MinecraftBlockTypes22["Trapdoor"] = "minecraft:trapdoor";
  MinecraftBlockTypes22["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftBlockTypes22["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftBlockTypes22["TripWire"] = "minecraft:trip_wire";
  MinecraftBlockTypes22["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftBlockTypes22["TubeCoral"] = "minecraft:tube_coral";
  MinecraftBlockTypes22["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftBlockTypes22["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftBlockTypes22["TubeCoralWallFan"] = "minecraft:tube_coral_wall_fan";
  MinecraftBlockTypes22["Tuff"] = "minecraft:tuff";
  MinecraftBlockTypes22["TuffBrickDoubleSlab"] = "minecraft:tuff_brick_double_slab";
  MinecraftBlockTypes22["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftBlockTypes22["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftBlockTypes22["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftBlockTypes22["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftBlockTypes22["TuffDoubleSlab"] = "minecraft:tuff_double_slab";
  MinecraftBlockTypes22["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftBlockTypes22["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftBlockTypes22["TuffWall"] = "minecraft:tuff_wall";
  MinecraftBlockTypes22["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftBlockTypes22["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftBlockTypes22["UnderwaterTnt"] = "minecraft:underwater_tnt";
  MinecraftBlockTypes22["UnderwaterTorch"] = "minecraft:underwater_torch";
  MinecraftBlockTypes22["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftBlockTypes22["Unknown"] = "minecraft:unknown";
  MinecraftBlockTypes22["UnlitRedstoneTorch"] = "minecraft:unlit_redstone_torch";
  MinecraftBlockTypes22["UnpoweredComparator"] = "minecraft:unpowered_comparator";
  MinecraftBlockTypes22["UnpoweredRepeater"] = "minecraft:unpowered_repeater";
  MinecraftBlockTypes22["Vault"] = "minecraft:vault";
  MinecraftBlockTypes22["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftBlockTypes22["Vine"] = "minecraft:vine";
  MinecraftBlockTypes22["WallBanner"] = "minecraft:wall_banner";
  MinecraftBlockTypes22["WallSign"] = "minecraft:wall_sign";
  MinecraftBlockTypes22["WarpedButton"] = "minecraft:warped_button";
  MinecraftBlockTypes22["WarpedDoor"] = "minecraft:warped_door";
  MinecraftBlockTypes22["WarpedDoubleSlab"] = "minecraft:warped_double_slab";
  MinecraftBlockTypes22["WarpedFence"] = "minecraft:warped_fence";
  MinecraftBlockTypes22["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftBlockTypes22["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftBlockTypes22["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftBlockTypes22["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftBlockTypes22["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftBlockTypes22["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftBlockTypes22["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftBlockTypes22["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftBlockTypes22["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftBlockTypes22["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftBlockTypes22["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftBlockTypes22["WarpedStandingSign"] = "minecraft:warped_standing_sign";
  MinecraftBlockTypes22["WarpedStem"] = "minecraft:warped_stem";
  MinecraftBlockTypes22["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftBlockTypes22["WarpedWallSign"] = "minecraft:warped_wall_sign";
  MinecraftBlockTypes22["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftBlockTypes22["Water"] = "minecraft:water";
  MinecraftBlockTypes22["Waterlily"] = "minecraft:waterlily";
  MinecraftBlockTypes22["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftBlockTypes22["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftBlockTypes22["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftBlockTypes22["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftBlockTypes22["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftBlockTypes22["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftBlockTypes22["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftBlockTypes22["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftBlockTypes22["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftBlockTypes22["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftBlockTypes22["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftBlockTypes22["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftBlockTypes22["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftBlockTypes22["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftBlockTypes22["WaxedDoubleCutCopperSlab"] = "minecraft:waxed_double_cut_copper_slab";
  MinecraftBlockTypes22["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftBlockTypes22["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftBlockTypes22["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftBlockTypes22["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftBlockTypes22["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftBlockTypes22["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftBlockTypes22["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftBlockTypes22["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftBlockTypes22["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftBlockTypes22["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftBlockTypes22["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftBlockTypes22["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftBlockTypes22["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftBlockTypes22["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftBlockTypes22["WaxedExposedDoubleCutCopperSlab"] = "minecraft:waxed_exposed_double_cut_copper_slab";
  MinecraftBlockTypes22["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftBlockTypes22["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftBlockTypes22["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftBlockTypes22["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftBlockTypes22["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftBlockTypes22["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftBlockTypes22["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftBlockTypes22["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftBlockTypes22["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftBlockTypes22["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftBlockTypes22["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftBlockTypes22["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftBlockTypes22["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftBlockTypes22["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftBlockTypes22["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftBlockTypes22["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftBlockTypes22["WaxedOxidizedDoubleCutCopperSlab"] = "minecraft:waxed_oxidized_double_cut_copper_slab";
  MinecraftBlockTypes22["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftBlockTypes22["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftBlockTypes22["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftBlockTypes22["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftBlockTypes22["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftBlockTypes22["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftBlockTypes22["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftBlockTypes22["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftBlockTypes22["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftBlockTypes22["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftBlockTypes22["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftBlockTypes22["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftBlockTypes22["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftBlockTypes22["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftBlockTypes22["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftBlockTypes22["WaxedWeatheredDoubleCutCopperSlab"] = "minecraft:waxed_weathered_double_cut_copper_slab";
  MinecraftBlockTypes22["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftBlockTypes22["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftBlockTypes22["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftBlockTypes22["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftBlockTypes22["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftBlockTypes22["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftBlockTypes22["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftBlockTypes22["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftBlockTypes22["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftBlockTypes22["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftBlockTypes22["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftBlockTypes22["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftBlockTypes22["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftBlockTypes22["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftBlockTypes22["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftBlockTypes22["WeatheredDoubleCutCopperSlab"] = "minecraft:weathered_double_cut_copper_slab";
  MinecraftBlockTypes22["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftBlockTypes22["Web"] = "minecraft:web";
  MinecraftBlockTypes22["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftBlockTypes22["WetSponge"] = "minecraft:wet_sponge";
  MinecraftBlockTypes22["Wheat"] = "minecraft:wheat";
  MinecraftBlockTypes22["WhiteCandle"] = "minecraft:white_candle";
  MinecraftBlockTypes22["WhiteCandleCake"] = "minecraft:white_candle_cake";
  MinecraftBlockTypes22["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftBlockTypes22["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftBlockTypes22["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftBlockTypes22["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftBlockTypes22["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftBlockTypes22["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftBlockTypes22["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftBlockTypes22["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftBlockTypes22["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftBlockTypes22["WhiteWool"] = "minecraft:white_wool";
  MinecraftBlockTypes22["Wildflowers"] = "minecraft:wildflowers";
  MinecraftBlockTypes22["WitherRose"] = "minecraft:wither_rose";
  MinecraftBlockTypes22["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftBlockTypes22["WoodenButton"] = "minecraft:wooden_button";
  MinecraftBlockTypes22["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftBlockTypes22["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftBlockTypes22["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftBlockTypes22["YellowCandleCake"] = "minecraft:yellow_candle_cake";
  MinecraftBlockTypes22["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftBlockTypes22["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftBlockTypes22["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftBlockTypes22["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftBlockTypes22["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftBlockTypes22["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftBlockTypes22["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftBlockTypes22["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftBlockTypes22["YellowWool"] = "minecraft:yellow_wool";
  MinecraftBlockTypes22["ZombieHead"] = "minecraft:zombie_head";
  return MinecraftBlockTypes22;
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
var MinecraftEffectTypes = ((MinecraftEffectTypes22) => {
  MinecraftEffectTypes22["Absorption"] = "minecraft:absorption";
  MinecraftEffectTypes22["BadOmen"] = "minecraft:bad_omen";
  MinecraftEffectTypes22["Blindness"] = "minecraft:blindness";
  MinecraftEffectTypes22["BreathOfTheNautilus"] = "minecraft:breath_of_the_nautilus";
  MinecraftEffectTypes22["ConduitPower"] = "minecraft:conduit_power";
  MinecraftEffectTypes22["Darkness"] = "minecraft:darkness";
  MinecraftEffectTypes22["FatalPoison"] = "minecraft:fatal_poison";
  MinecraftEffectTypes22["FireResistance"] = "minecraft:fire_resistance";
  MinecraftEffectTypes22["Haste"] = "minecraft:haste";
  MinecraftEffectTypes22["HealthBoost"] = "minecraft:health_boost";
  MinecraftEffectTypes22["Hunger"] = "minecraft:hunger";
  MinecraftEffectTypes22["Infested"] = "minecraft:infested";
  MinecraftEffectTypes22["InstantDamage"] = "minecraft:instant_damage";
  MinecraftEffectTypes22["InstantHealth"] = "minecraft:instant_health";
  MinecraftEffectTypes22["Invisibility"] = "minecraft:invisibility";
  MinecraftEffectTypes22["JumpBoost"] = "minecraft:jump_boost";
  MinecraftEffectTypes22["Levitation"] = "minecraft:levitation";
  MinecraftEffectTypes22["MiningFatigue"] = "minecraft:mining_fatigue";
  MinecraftEffectTypes22["Nausea"] = "minecraft:nausea";
  MinecraftEffectTypes22["NightVision"] = "minecraft:night_vision";
  MinecraftEffectTypes22["Oozing"] = "minecraft:oozing";
  MinecraftEffectTypes22["Poison"] = "minecraft:poison";
  MinecraftEffectTypes22["RaidOmen"] = "minecraft:raid_omen";
  MinecraftEffectTypes22["Regeneration"] = "minecraft:regeneration";
  MinecraftEffectTypes22["Resistance"] = "minecraft:resistance";
  MinecraftEffectTypes22["Saturation"] = "minecraft:saturation";
  MinecraftEffectTypes22["SlowFalling"] = "minecraft:slow_falling";
  MinecraftEffectTypes22["Slowness"] = "minecraft:slowness";
  MinecraftEffectTypes22["Speed"] = "minecraft:speed";
  MinecraftEffectTypes22["Strength"] = "minecraft:strength";
  MinecraftEffectTypes22["TrialOmen"] = "minecraft:trial_omen";
  MinecraftEffectTypes22["VillageHero"] = "minecraft:village_hero";
  MinecraftEffectTypes22["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftEffectTypes22["Weakness"] = "minecraft:weakness";
  MinecraftEffectTypes22["Weaving"] = "minecraft:weaving";
  MinecraftEffectTypes22["WindCharged"] = "minecraft:wind_charged";
  MinecraftEffectTypes22["Wither"] = "minecraft:wither";
  return MinecraftEffectTypes22;
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

// behaviour_pack/scripts-dev/components/fungus_spread.ts
function load_fungus_spreading_component() {
  function fungus_spread(event) {
    if (Math.random() < 0.5) {
      const adjacent_blocks = [event.block.above(), event.block.below(), event.block.south(), event.block.west(), event.block.north(), event.block.east()];
      const random_index = Math.floor(Math.random() * adjacent_blocks.length);
      const random_adjacent_block = adjacent_blocks[random_index];
      if (random_adjacent_block?.typeId == MinecraftBlockTypes.Air) {
        random_adjacent_block.setType("amethyst:fungus_block");
      }
    }
  }
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
      system.runTimeout(() => {
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
  system.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/glitch.ts
import { system as system4 } from "@minecraft/server";

// behaviour_pack/scripts-dev/utils/death_messages.ts
var DeathMessage = class {
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
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
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

// node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}

// node_modules/date-fns/addDays.js
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
  if (!amount) return _date;
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/startOfWeek.js
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfISOWeek.js
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// node_modules/date-fns/getISOWeekYear.js
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}

// node_modules/date-fns/startOfDay.js
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/differenceInCalendarDays.js
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// node_modules/date-fns/startOfISOWeekYear.js
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/date-fns/isDate.js
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/isValid.js
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}

// node_modules/date-fns/_lib/getRoundingMethod.js
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    return result === 0 ? 0 : result;
  };
}

// node_modules/date-fns/differenceInMilliseconds.js
function differenceInMilliseconds(laterDate, earlierDate) {
  return +toDate(laterDate) - +toDate(earlierDate);
}

// node_modules/date-fns/differenceInSeconds.js
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff = differenceInMilliseconds(laterDate, earlierDate) / 1e3;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

// node_modules/date-fns/startOfYear.js
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/locale/en-US/_lib/formatLong.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/date-fns/locale/en-US/_lib/match.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/date-fns/locale/en-US.js
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/date-fns/getDayOfYear.js
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/getISOWeek.js
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/getWeekYear.js
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfWeekYear.js
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/date-fns/getWeek.js
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/getDefaultOptions.js
function getDefaultOptions2() {
  return Object.assign({}, getDefaultOptions());
}

// node_modules/date-fns/getISODay.js
function getISODay(date, options) {
  const day = toDate(date, options?.in).getDay();
  return day === 0 ? 7 : day;
}

// node_modules/date-fns/transpose.js
function transpose(date, constructor) {
  const date_ = isConstructor(constructor) ? new constructor(0) : constructFrom(constructor, 0);
  date_.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date_.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
  return date_;
}
function isConstructor(constructor) {
  return typeof constructor === "function" && constructor.prototype?.constructor === constructor;
}

// node_modules/date-fns/parse/_lib/Setter.js
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = class {
  subPriority = 0;
  validate(_utcDate, _options) {
    return true;
  }
};
var ValueSetter = class extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
};
var DateTimezoneSetter = class extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY;
  subPriority = -1;
  constructor(context, reference) {
    super();
    this.context = context || ((date) => constructFrom(reference, date));
  }
  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, this.context));
  }
};

// node_modules/date-fns/parse/_lib/Parser.js
var Parser = class {
  run(dateString, token, match2, options) {
    const result = this.parse(dateString, token, match2, options);
    if (!result) {
      return null;
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    };
  }
  validate(_utcDate, _value, _options) {
    return true;
  }
};

// node_modules/date-fns/parse/_lib/parsers/EraParser.js
var EraParser = class extends Parser {
  priority = 140;
  parse(dateString, token, match2) {
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      // A, B
      case "GGGGG":
        return match2.era(dateString, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
    }
  }
  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["R", "u", "t", "T"];
};

// node_modules/date-fns/parse/_lib/constants.js
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

// node_modules/date-fns/parse/_lib/utils.js
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/date-fns/parse/_lib/parsers/YearParser.js
var YearParser = class extends Parser {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy"
    });
    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear();
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.js
var LocalWeekYearParser = class extends Parser {
  priority = 130;
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY"
    });
    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.js
var ISOWeekYearParser = class extends Parser {
  priority = 130;
  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }
  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.js
var ExtendedYearParser = class extends Parser {
  priority = 130;
  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/QuarterParser.js
var QuarterParser = class extends Parser {
  priority = 120;
  parse(dateString, token, match2) {
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ":
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.js
var StandAloneQuarterParser = class extends Parser {
  priority = 120;
  parse(dateString, token, match2) {
    switch (token) {
      // 1, 2, 3, 4
      case "q":
      case "qq":
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/MonthParser.js
var MonthParser = class extends Parser {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
  priority = 110;
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      // 1, 2, ..., 12
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      // 01, 02, ..., 12
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      // J, F, ..., D
      case "MMMMM":
        return match2.month(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.js
var StandAloneMonthParser = class extends Parser {
  priority = 110;
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      // 01, 02, ..., 12
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      // J, F, ..., D
      case "LLLLL":
        return match2.month(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/setWeek.js
function setWeek(date, week, options) {
  const date_ = toDate(date, options?.in);
  const diff = getWeek(date_, options) - week;
  date_.setDate(date_.getDate() - diff * 7);
  return toDate(date_, options?.in);
}

// node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.js
var LocalWeekParser = class extends Parser {
  priority = 100;
  parse(dateString, token, match2) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T"
  ];
};

// node_modules/date-fns/setISOWeek.js
function setISOWeek(date, week, options) {
  const _date = toDate(date, options?.in);
  const diff = getISOWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.js
var ISOWeekParser = class extends Parser {
  priority = 100;
  parse(dateString, token, match2) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }
  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/DateParser.js
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
var DateParser = class extends Parser {
  priority = 90;
  subPriority = 1;
  parse(dateString, token, match2) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }
  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.js
var DayOfYearParser = class extends Parser {
  priority = 90;
  subpriority = 1;
  parse(dateString, token, match2) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/setDay.js
function setDay(date, day, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const date_ = toDate(date, options?.in);
  const currentDay = date_.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(date_, diff, options);
}

// node_modules/date-fns/parse/_lib/parsers/DayParser.js
var DayParser = class extends Parser {
  priority = 90;
  parse(dateString, token, match2) {
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // T
      case "EEEEE":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // Tuesday
      case "EEEE":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/LocalDayParser.js
var LocalDayParser = class extends Parser {
  priority = 90;
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      // 3
      case "e":
      case "ee":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "eo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      // Tue
      case "eee":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // T
      case "eeeee":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      // Tuesday
      case "eeee":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.js
var StandAloneLocalDayParser = class extends Parser {
  priority = 90;
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      // 3
      case "c":
      case "cc":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "co":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      // Tue
      case "ccc":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      // T
      case "ccccc":
        return match2.day(dateString, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      // Tuesday
      case "cccc":
      default:
        return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T"
  ];
};

// node_modules/date-fns/setISODay.js
function setISODay(date, day, options) {
  const date_ = toDate(date, options?.in);
  const currentDay = getISODay(date_, options);
  const diff = day - currentDay;
  return addDays(date_, diff, options);
}

// node_modules/date-fns/parse/_lib/parsers/ISODayParser.js
var ISODayParser = class extends Parser {
  priority = 90;
  parse(dateString, token, match2) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };
    switch (token) {
      // 2
      case "i":
      case "ii":
        return parseNDigits(token.length, dateString);
      // 2nd
      case "io":
        return match2.ordinalNumber(dateString, { unit: "day" });
      // Tue
      case "iii":
        return mapValue(
          match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      // T
      case "iiiii":
        return mapValue(
          match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      // Tu
      case "iiiiii":
        return mapValue(
          match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      // Tuesday
      case "iiii":
      default:
        return mapValue(
          match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7;
  }
  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T"
  ];
};

// node_modules/date-fns/parse/_lib/parsers/AMPMParser.js
var AMPMParser = class extends Parser {
  priority = 80;
  parse(dateString, token, match2) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.js
var AMPMMidnightParser = class extends Parser {
  priority = 80;
  parse(dateString, token, match2) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.js
var DayPeriodParser = class extends Parser {
  priority = 80;
  parse(dateString, token, match2) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "b", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.js
var Hour1to12Parser = class extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
  incompatibleTokens = ["H", "K", "k", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.js
var Hour0to23Parser = class extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23;
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.js
var Hour0To11Parser = class extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
  incompatibleTokens = ["h", "H", "k", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.js
var Hour1To24Parser = class extends Parser {
  priority = 70;
  parse(dateString, token, match2) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24;
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }
  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/MinuteParser.js
var MinuteParser = class extends Parser {
  priority = 60;
  parse(dateString, token, match2) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match2.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }
  incompatibleTokens = ["t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/SecondParser.js
var SecondParser = class extends Parser {
  priority = 50;
  parse(dateString, token, match2) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match2.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }
  incompatibleTokens = ["t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.js
var FractionOfSecondParser = class extends Parser {
  priority = 30;
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }
  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }
  incompatibleTokens = ["t", "T"];
};

// node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.js
var ISOTimezoneWithZParser = class extends Parser {
  priority = 10;
  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
  incompatibleTokens = ["t", "T", "x"];
};

// node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.js
var ISOTimezoneParser = class extends Parser {
  priority = 10;
  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
  incompatibleTokens = ["t", "T", "X"];
};

// node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.js
var TimestampSecondsParser = class extends Parser {
  priority = 40;
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
  }
  incompatibleTokens = "*";
};

// node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.js
var TimestampMillisecondsParser = class extends Parser {
  priority = 20;
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }
  incompatibleTokens = "*";
};

// node_modules/date-fns/parse/_lib/parsers.js
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};

// node_modules/date-fns/parse.js
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  const invalidDate = () => constructFrom(options?.in || referenceDate, NaN);
  const defaultOptions2 = getDefaultOptions2();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  if (!formatStr)
    return dateStr ? invalidDate() : toDate(referenceDate, options?.in);
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateTimezoneSetter(options?.in, referenceDate)];
  const tokens = formatStr.match(longFormattingTokensRegExp2).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  const usedTokens = [];
  for (let token of tokens) {
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (!options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        );
      }
      usedTokens.push({ token: firstCharacter, fullToken: token });
      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions
      );
      if (!parseResult) {
        return invalidDate();
      }
      setters.push(parseResult.setter);
      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString2(token);
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return invalidDate();
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return invalidDate();
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate, options?.in);
  if (isNaN(+date)) return invalidDate();
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return invalidDate();
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return date;
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// behaviour_pack/scripts-dev/utils/checks.ts
function distance_check(c1, c2, radius) {
  const distance = Math.sqrt((c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2);
  return distance <= radius;
}
function timer_check(now, start, seconds) {
  return differenceInSeconds(now, start) <= seconds;
}
var checks = {
  timer_check,
  distance_check
};
var checks_default = checks;

// behaviour_pack/scripts-dev/utils/motd.ts
import { world as world2 } from "@minecraft/server";
function send_motd(player, quest) {
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
  if (quest) {
    questReminder = `\xA7l\xA7aActive Quest:\xA7r ${quest.title}
\xA7l\xA7bYour Progress:\xA7r ${quest.get_progress()}/${quest.objectives.length}
---------
`;
  }
  world2.getDimension(MinecraftDimensionTypes.Overworld).runCommand(
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

// behaviour_pack/scripts-dev/utils/commands.ts
import {
  EntityComponentTypes,
  ItemStack,
  system as system2,
  TicksPerSecond as TicksPerSecond2,
  world as world3
} from "@minecraft/server";
function send_message(dimension, target, message2) {
  const msg = { "rawtext": [{ "text": message2 }] };
  if (!target.startsWith("@")) {
    target = `"${target}"`;
  }
  world3.getDimension(dimension).runCommand(`tellraw ${target} ${JSON.stringify(msg)}`);
}
function play_quest_progress_sound(gamertag) {
  let player = world3.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.objective.progress",
    { volume: 100, location: player.location }
  );
}
function play_quest_complete_sound(gamertag) {
  let player = world3.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.complete",
    { volume: 100, location: player.location }
  );
  for (let i = 0; i < 5; i++) {
    system2.runTimeout(() => {
      player.runCommand(`particle minecraft:totem_particle ~ ~2 ~`);
    }, 10);
  }
}
function play_objective_complete_sound(gamertag) {
  let player = world3.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.objective.complete",
    { volume: 100, location: player.location }
  );
}
function play_quest_fail_sound(gamertag) {
  let player = world3.getPlayers({ name: gamertag })[0];
  player.playSound(
    "quest.fail",
    { volume: 100, location: player.location }
  );
}
function send_title(dimension, target, type, message2) {
  world3.getDimension(dimension).runCommand(`title "${target}" ${type} ${message2}`);
}
function add_or_spawn_item(player, item) {
  const player_container = player.getComponent(EntityComponentTypes.Inventory)?.container;
  if (!player_container) {
    throw new Error(`Could not get inventory container for "${player.name}"`);
  }
  if (player_container.emptySlotsCount >= 1) {
    player_container.addItem(item);
  } else {
    player.dimension.spawnItem(item, player.location);
  }
}
function give_item(gamertag, item, amount) {
  const item_stack = new ItemStack(item, 1);
  let stack_amount = Math.trunc(amount / item_stack.maxAmount);
  const player = world3.getPlayers({ name: gamertag })[0];
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
    system2.runTimeout(
      () => {
        player.playSound(noise_instance.name, noise_instance.options);
      },
      5
    );
  }
}
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
  let sysid = system2.runInterval(() => {
    if (current_entity.isValid) {
      current_entity.teleport(location);
      current_entity.getComponent(EntityComponentTypes.Health)?.resetToMaxValue();
    } else {
      system2.clearRun(sysid);
      current_entity.remove();
    }
  });
  system2.waitTicks(TicksPerSecond2 * 15).then(() => {
    system2.clearRun(sysid);
    current_entity.remove();
  });
}
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
    system2.waitTicks(TicksPerSecond2).then(() => {
      random_block.setType(MinecraftBlockTypes.Air);
    });
  }
}
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
  system2.run(
    () => {
      player.addEffect(effect, TicksPerSecond2 * 20);
    }
  );
}
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
var commands = {
  send_message,
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
    const getValueTier = () => {
      if (blockValue >= 100) return valueTierMessages.extreme;
      if (blockValue >= 30) return valueTierMessages.very;
      if (blockValue >= 10) return valueTierMessages.valuable;
      return valueTierMessages.not;
    };
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
import { world as world4 } from "@minecraft/server";
var DragonHeartMessage = class {
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
    const dimension = world4.getDimension(MinecraftDimensionTypes.TheEnd);
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
import { EntityDamageCause, TicksPerSecond as TicksPerSecond3, world as world5 } from "@minecraft/server";
var EvilActs = class {
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
    const overworld = world5.getDimension("overworld");
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
    player.applyDamage(amount, { cause: EntityDamageCause.freezing });
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
import { EntityComponentTypes as EntityComponentTypes2, system as system3, TicksPerSecond as TicksPerSecond4 } from "@minecraft/server";
var Glitches = class {
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
      system3.runTimeout(
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
      system3.runTimeout(() => {
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
    let sysid = system3.runInterval(() => {
      if (current_entity.isValid) {
        current_entity.teleport(location);
        current_entity.getComponent(EntityComponentTypes2.Health)?.resetToMaxValue();
      } else {
        system3.clearRun(sysid);
        current_entity.remove();
      }
    });
    system3.waitTicks(TicksPerSecond4 * 15).then(() => {
      system3.clearRun(sysid);
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
      system3.waitTicks(TicksPerSecond4).then(() => {
        random_block.setType(MinecraftBlockTypes.Air);
      });
    }
  }
  particleSwarmGlitch(player) {
    const location = player.location;
    for (let i = 0; i < 20; i++) {
      system3.runTimeout(() => {
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
    system3.run(() => {
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
      system3.runTimeout(() => {
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
    const message2 = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
    player.sendMessage(message2);
  }
};

// behaviour_pack/scripts-dev/utils/index.ts
function convert_seconds_to_hms(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}
function combine(list1, list2, id) {
  let combined_list = [];
  for (let item of list1) {
    combined_list.push({ ...item, ...list2.find((item2) => item2[id] === item[id]) });
  }
  return combined_list;
}
function clean_id(id) {
  return id.replace(/^[^:]+:/, "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
function normalizeDateString(datetime) {
  if (!datetime.includes(".")) {
    return `${datetime}.000000`;
  }
  return datetime.replace(/\.(\d{1,6})\d*/, (_, digits) => {
    return `.${digits.padEnd(6, "0")}`;
  });
}
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

// behaviour_pack/scripts-dev/components/glitch.ts
function load_glitch_component() {
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
  system4.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/sacrifice.ts
import {
  system as system5,
  EntityComponentTypes as EntityComponentTypes3,
  EquipmentSlot,
  TicksPerSecond as TicksPerSecond5,
  ItemComponentTypes
} from "@minecraft/server";

// behaviour_pack/scripts-dev/api/user.ts
import { HttpRequest, HttpHeader, HttpRequestMethod, http } from "@minecraft/server-net";
var ThornyUser = class _ThornyUser {
  static {
    this.thorny_user_map = {};
  }
  static {
    this.thorny_id_map = {};
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
  static async get_user_from_api(guild_id2, gamertag) {
    const response = await http.get(`http://nexuscore:8000/api/v0.2/users/guild/${guild_id2}/${gamertag.replace(" ", "%20")}`);
    const thorny_user = new _ThornyUser(JSON.parse(response.body));
    _ThornyUser.thorny_user_map[gamertag] = thorny_user;
    _ThornyUser.thorny_id_map[thorny_user.thorny_id] = thorny_user;
    thorny_user.gamertag = gamertag;
    return thorny_user;
  }
  static fetch_user(gamertag) {
    return _ThornyUser.thorny_user_map[gamertag];
  }
  static fetch_user_by_id(thorny_id) {
    return _ThornyUser.thorny_id_map[thorny_id];
  }
  /**
   * Update this user in NexusCore.
   * Currently only updates balance.
   */
  async update() {
    const request = new HttpRequest(`http://nexuscore:8000/api/v0.2/users/${this.thorny_id}`);
    request.method = HttpRequestMethod.Put;
    request.body = JSON.stringify({
      "balance": this.balance,
      "whitelist": this.whitelist || this.gamertag,
      "location": this.location,
      "dimension": this.dimension,
      "hidden": this.hidden
    });
    request.headers = [
      new HttpHeader("Content-Type", "application/json"),
      new HttpHeader("auth", "my-auth-token")
    ];
    await http.request(request);
  }
  /**
   * Send a connection event to NexusCore, either
   * connect or disconnect
   */
  send_connect_event(event_type) {
    const request = new HttpRequest(`http://nexuscore:8000/api/v0.2/events/connection`);
    request.method = HttpRequestMethod.Post;
    request.headers = [
      new HttpHeader("Content-Type", "application/json"),
      new HttpHeader("auth", "my-auth-token")
    ];
    request.body = JSON.stringify({ "type": event_type, "thorny_id": this.thorny_id, "ignored": false });
    console.log(`[CONNECTION] Sending ${event_type} to NexusCore for ThornyID ${this.thorny_id} (${this.whitelist} / ${this.gamertag})`);
    http.request(request);
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

// behaviour_pack/scripts-dev/api/relay.ts
import { HttpRequest as HttpRequest2, HttpHeader as HttpHeader2, HttpRequestMethod as HttpRequestMethod2, http as http2 } from "@minecraft/server-net";
var Relay = class {
  static message(nametag, content) {
    const request = new HttpRequest2("http://nexuscore:8000/api/v0.2/events/relay");
    request.method = HttpRequestMethod2.Post;
    request.body = JSON.stringify({
      "type": "message",
      "content": content,
      "embed_title": "",
      "embed_content": "",
      "name": nametag
    });
    request.headers = [
      new HttpHeader2("Content-Type", "application/json"),
      new HttpHeader2("auth", "my-auth-token")
    ];
    http2.request(request);
  }
  static event(title, content, event_type) {
    const request = new HttpRequest2("http://nexuscore:8000/api/v0.2/events/relay");
    request.method = HttpRequestMethod2.Post;
    request.body = JSON.stringify({
      "type": event_type,
      "content": "",
      "embed_title": title,
      "embed_content": content,
      "name": "Server"
    });
    request.headers = [
      new HttpHeader2("Content-Type", "application/json"),
      new HttpHeader2("auth", "my-auth-token")
    ];
    http2.request(request);
  }
};

// behaviour_pack/scripts-dev/api/interaction.ts
import { HttpRequest as HttpRequest3, HttpHeader as HttpHeader3, HttpRequestMethod as HttpRequestMethod3, http as http3 } from "@minecraft/server-net";
var Interaction = class _Interaction {
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
    const request = new HttpRequest3(`http://nexuscore:8000/api/v0.2/events/interaction`);
    request.method = HttpRequestMethod3.Post;
    request.body = JSON.stringify(this);
    request.headers = [
      new HttpHeader3("Content-Type", "application/json"),
      new HttpHeader3("auth", "my-auth-token")
    ];
    await http3.request(request);
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

// behaviour_pack/scripts-dev/api/quest.ts
import { http as http4 } from "@minecraft/server-net";
var Reward = class {
  constructor(data) {
    this.display_name = data.display_name;
    this.balance = data.balance;
    this.item = data.item;
    this.count = data.count;
  }
  async give_reward(interaction, thorny_user) {
    if (this.balance) {
      thorny_user.balance += this.balance;
      utils_default.commands.send_message(
        interaction.dimension,
        thorny_user.gamertag,
        `\xA7l[\xA7aQuests\xA7f]\xA7r You have received ${this.balance}${utils_default.emojis.NUGS}!`
      );
    } else if (this.item) {
      utils_default.commands.give_item(thorny_user.gamertag, this.item, this.count);
      utils_default.commands.send_message(
        interaction.dimension,
        thorny_user.gamertag,
        `\xA7l[\xA7aQuests\xA7f]\xA7r You have received ${this.count} ${utils_default.clean_id(this.item)}!`
      );
    }
  }
};
var Objective = class {
  constructor(data) {
    this.objective_id = data.objective_id;
    this.objective = data.objective;
    this.order = data.order;
    this.description = data.description;
    this.display = data.display;
    this.objective_count = data.objective_count;
    this.objective_type = data.objective_type;
    this.natural_block = data.natural_block;
    this.objective_timer = data.objective_timer;
    this.required_mainhand = data.required_mainhand;
    this.required_location = data.required_location;
    this.location_radius = data.location_radius;
    this.required_deaths = data.required_deaths;
    this.continue_on_fail = data.continue_on_fail;
    this.rewards = [];
    for (let reward of data.rewards) {
      this.rewards.push(new Reward(reward));
    }
  }
  get_clean_rewards() {
    let rewards = [];
    for (let reward of this.rewards) {
      if (reward.display_name) {
        rewards.push(`\xA77${reward.display_name}\xA7r`);
      } else if (reward.item) {
        rewards.push(`${reward.count} \xA77${utils_default.clean_id(reward.item)}\xA7r`);
      } else if (reward.balance) {
        rewards.push(`\xA7p${reward.balance}${utils_default.emojis.NUGS}\xA7r`);
      }
    }
    return rewards.join(", ");
  }
  get_clean_requirements() {
    let requirements = [];
    if (this.natural_block && this.objective_type == "mine") {
      requirements.push(`- ${utils_default.clean_id(this.objective)} must be naturally found`);
    }
    if (this.required_mainhand) {
      requirements.push(`- Using ${utils_default.clean_id(this.required_mainhand)}`);
    }
    if (this.required_location) {
      requirements.push(`- Around ${this.required_location} (Radius ${this.location_radius})`);
    }
    if (this.objective_timer) {
      requirements.push(`- Within ${utils_default.convert_seconds_to_hms(this.objective_timer)}`);
    }
    if (this.required_deaths) {
      requirements.push(`- No more than ${this.required_deaths} deaths`);
    }
    if (!this.continue_on_fail && (this.objective_timer || this.required_deaths)) {
      requirements.push(`- Failing this objective will fail the entire quest`);
    }
    return requirements.join("\n");
  }
  generate_objective_string(objective_index, total_objectives, quest_title) {
    const task_type = this.objective_type.replace(/\b\w/g, (char) => char.toUpperCase());
    const title = `\xA7a+=+=+=+=+ ${quest_title} +=+=+=+=+\xA7r
Quest Progress: ${objective_index}/${total_objectives}
`;
    const description = `\xA77${this.description}\xA7r

`;
    let full_task = `Your Task: \xA7b${task_type} \xA7l${this.objective_count} ${utils_default.clean_id(this.objective)}\xA7r
`;
    if (this.display) {
      full_task = `Your Task: \xA7b${this.display}\xA7r
`;
    }
    const rewards = `Rewards: ${this.get_clean_rewards()}
`;
    let requirements = "";
    if (this.get_clean_requirements()) {
      requirements = `\xA7u+=+=+=+=+ Requirements +=+=+=+=+\xA7r
${this.get_clean_requirements()}
`;
    }
    const final_line = `\xA7a+=+=+=+=+=+=+=+=+=+=+=+=+=+=+\xA7r`;
    return `${title}${description}${full_task}${rewards}${requirements}${final_line}`;
  }
  async check_requirements(interaction, start_time) {
    if (interaction.reference !== this.objective) {
      return { check: false, fail_objective: false };
    }
    if (this.required_mainhand && this.required_mainhand !== interaction.mainhand) {
      return { check: false, fail_objective: false };
    }
    const interaction_location = [interaction.coordinates[0], interaction.coordinates[2]];
    if (this.required_location && !utils_default.checks.distance_check(interaction_location, this.required_location, this.location_radius)) {
      return { check: false, fail_objective: false };
    }
    if (this.objective_timer && !utils_default.checks.timer_check(interaction.time, start_time, this.objective_timer)) {
      return { check: false, fail_objective: true };
    }
    if (this.objective_type == "mine" && this.natural_block) {
      return {
        check: !await this.check_if_natural(interaction.coordinates[0], interaction.coordinates[1], interaction.coordinates[2]),
        fail_objective: false
      };
    }
    return { check: true, fail_objective: false };
  }
  async check_if_natural(x, y, z) {
    const response = await http4.get(`http://nexuscore:8000/api/v0.2/events/interaction?x=${x}&y=${y}&z=${z}`);
    if (response.status !== 200) {
      return false;
    }
    return JSON.parse(response.body).length > 1;
  }
  async give_rewards(interation, thorny_user) {
    for (let reward of this.rewards) {
      await reward.give_reward(interation, thorny_user);
    }
  }
};
var Quest = class _Quest {
  constructor(data) {
    this.quest_id = data.quest_id;
    this.start_time = parse(data.start_time, "yyyy-MM-dd HH:mm:ss.SSSSSS", /* @__PURE__ */ new Date());
    this.end_time = parse(data.end_time, "yyyy-MM-dd HH:mm:ss.SSSSSS", /* @__PURE__ */ new Date());
    this.title = data.title;
    this.description = data.description;
    this.created_by = data.created_by;
    this.quest_type = data.quest_type;
    this.tags = data.tags;
    this.objectives = [];
    for (let objective of data.objectives) {
      this.objectives.push(new Objective(objective));
    }
  }
  static async get_quest(quest_id) {
    try {
      const quest_response = await http4.get(`http://nexuscore:8000/api/v0.2/quests/${quest_id}`);
      const quest_data = JSON.parse(quest_response.body);
      return new _Quest(quest_data);
    } catch (error) {
      console.error("Error fetching quest:", error);
      throw error;
    }
  }
};

// behaviour_pack/scripts-dev/api/quest_with_progress.ts
import { http as http5, HttpHeader as HttpHeader4, HttpRequest as HttpRequest4, HttpRequestMethod as HttpRequestMethod4 } from "@minecraft/server-net";
var ObjectiveWithProgress = class extends Objective {
  constructor(data, thorny_user) {
    super(data);
    this.thorny_user = thorny_user;
    this.start = data.start ? parse(utils_default.normalizeDateString(data.start), "yyyy-MM-dd HH:mm:ss.SSSSSS", /* @__PURE__ */ new Date()) : null;
    this.end = data.end ? parse(utils_default.normalizeDateString(data.end), "yyyy-MM-dd HH:mm:ss.SSSSSS", /* @__PURE__ */ new Date()) : null;
    this.completion = data.completion;
    this.status = data.status;
    this.deaths = 0;
  }
  async complete_objective(interaction, quest, failed) {
    const index = quest.objectives.indexOf(this);
    if (failed) {
      utils_default.commands.play_quest_fail_sound(this.thorny_user.gamertag);
    } else {
      utils_default.commands.play_objective_complete_sound(this.thorny_user.gamertag);
    }
    utils_default.commands.send_title(
      interaction.dimension,
      this.thorny_user.gamertag,
      "actionbar",
      `\xA7l\xA7a${quest.title} Progress:\xA7r \xA77${index + 1}\xA7r/${quest.objectives.length}`
    );
    utils_default.commands.send_message(
      interaction.dimension,
      this.thorny_user.gamertag,
      quest.objectives[index + 1].generate_objective_string(index + 1, quest.objectives.length, quest.title)
    );
  }
  async update_user_objective(quest) {
    const request = new HttpRequest4(`http://nexuscore:8000/api/v0.2/users/${this.thorny_user.thorny_id}/quest/${quest.quest_id}/${this.objective_id}`);
    request.method = HttpRequestMethod4.Put;
    request.body = JSON.stringify({
      "start": this.start ? format(this.start, "yyyy-MM-dd HH:mm:ss.SSSSSS") : null,
      "end": this.end ? format(this.end, "yyyy-MM-dd HH:mm:ss.SSSSSS") : null,
      "completion": this.completion,
      "status": this.status
    });
    request.headers = [
      new HttpHeader4("Content-Type", "application/json"),
      new HttpHeader4("auth", "my-auth-token")
    ];
    await http5.request(request);
  }
  /**
   * @returns a Boolean representing if completion was incremented
   */
  async increment_completion(interaction, quest) {
    const requirement_check = await this.check_requirements(interaction, this.start ?? /* @__PURE__ */ new Date());
    if (requirement_check.check) {
      this.completion++;
      utils_default.commands.play_quest_progress_sound(this.thorny_user.gamertag);
      utils_default.commands.send_title(
        interaction.dimension,
        this.thorny_user.gamertag,
        "actionbar",
        `\xA7l\xA7s${utils_default.clean_id(this.objective)}:\xA7r \xA77${this.completion}\xA7r/${this.objective_count}`
      );
      if (this.completion === this.objective_count) {
        this.status = "completed";
        this.end = /* @__PURE__ */ new Date();
        const index = quest.objectives.indexOf(this);
        if (index < quest.objectives.length - 1) {
          await this.complete_objective(interaction, quest, false);
        }
        await this.give_rewards(interaction, this.thorny_user);
      }
      return true;
    } else if (requirement_check.fail_objective) {
      this.status = "failed";
      this.end = /* @__PURE__ */ new Date();
    } else if (interaction.type === "die" && this.required_deaths) {
      this.deaths += 1;
      utils_default.commands.send_message(
        interaction.dimension,
        this.thorny_user.gamertag,
        `\xA7l[\xA7aQuests\xA7f]\xA7r You have died. ${this.required_deaths - this.deaths} Remaining...`
      );
      if (this.deaths > this.required_deaths) {
        this.status = "failed";
        this.end = /* @__PURE__ */ new Date();
      }
    }
    if (this.status === "failed" && this.continue_on_fail) {
      const index = quest.objectives.indexOf(this);
      if (index < quest.objectives.length - 1) {
        await this.complete_objective(interaction, quest, true);
      }
      utils_default.commands.send_message(
        interaction.dimension,
        this.thorny_user.gamertag,
        `\xA7l[\xA7aQuests\xA7f]\xA7r \xA74You have failed the previous objective, but the quest continues... You did not receive rewards for the previous objective.`
      );
    }
    return false;
  }
};
var QuestWithProgress = class _QuestWithProgress extends Quest {
  static {
    this.quest_cache = {};
  }
  constructor(data, thorny_user) {
    super(data);
    this.thorny_user = thorny_user;
    this.accepted_on = parse(utils_default.normalizeDateString(data.accepted_on), "yyyy-MM-dd HH:mm:ss.SSSSSSS", /* @__PURE__ */ new Date());
    this.started_on = data.started_on ? parse(utils_default.normalizeDateString(data.started_on), "yyyy-MM-dd HH:mm:ss.SSSSSS", /* @__PURE__ */ new Date()) : null;
    this.status = data.status;
    this.objectives = [];
    for (let objective of data.objectives) {
      this.objectives.push(new ObjectiveWithProgress(objective, thorny_user));
    }
  }
  static clear_cache(thorny_user) {
    delete this.quest_cache[thorny_user.thorny_id];
  }
  static async get_active_quest(thorny_user) {
    try {
      const active_quest = await http5.get(`http://nexuscore:8000/api/v0.2/users/${thorny_user.thorny_id}/quest/active`);
      if (active_quest.status === 200) {
        const active_quest_data = JSON.parse(active_quest.body);
        const quest_id = active_quest_data["quest_id"];
        if (this.quest_cache[thorny_user.thorny_id] && this.quest_cache[thorny_user.thorny_id].quest_id === quest_id) {
          return this.quest_cache[thorny_user.thorny_id];
        }
        const quest_response = await http5.get(`http://nexuscore:8000/api/v0.2/quests/${quest_id}`);
        const quest_json = JSON.parse(quest_response.body);
        const quest_data = {
          ...quest_json,
          ...active_quest_data,
          objectives: utils_default.combine(quest_json.objectives, active_quest_data["objectives"], "objective_id")
        };
        const quest_object = new _QuestWithProgress(quest_data, thorny_user);
        this.quest_cache[thorny_user.thorny_id] = quest_object;
        return quest_object;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching quest:", error);
      throw error;
    }
  }
  get_active_objective() {
    return this.objectives.find((objective) => objective.status === "in_progress") ?? null;
  }
  async update_user_quest() {
    const request = new HttpRequest4(`http://nexuscore:8000/api/v0.2/users/${this.thorny_user.thorny_id}/quest/${this.quest_id}`);
    request.method = HttpRequestMethod4.Put;
    request.body = JSON.stringify({
      "accepted_on": null,
      "started_on": this.started_on ? format(this.started_on, "yyyy-MM-dd HH:mm:ss.SSSSSS") : null,
      "status": this.status == "completed" ? this.status : null
    });
    request.headers = [
      new HttpHeader4("Content-Type", "application/json"),
      new HttpHeader4("auth", "my-auth-token")
    ];
    await http5.request(request);
    for (let objective of this.objectives) {
      await objective.update_user_objective(this);
    }
  }
  async fail_quest(thorny_id) {
    this.status = "failed";
    const request = new HttpRequest4(`http://nexuscore:8000/api/v0.2/users/${thorny_id}/quest/active`);
    request.method = HttpRequestMethod4.Delete;
    request.body = JSON.stringify({});
    request.headers = [
      new HttpHeader4("Content-Type", "application/json"),
      new HttpHeader4("auth", "my-auth-token")
    ];
    await http5.request(request);
  }
  get_progress() {
    return this.objectives.filter((objective) => objective.status === "completed").length;
  }
  /**
   * Increments the active objective if it exists.
   * Updates the quest and objective's start times, as well as the next objective's start time if needed.
   * @returns
   * A boolean representing if the objective has been incremented or not
   */
  async increment_active_objective(interaction) {
    const active_objective = this.get_active_objective();
    if (active_objective) {
      if (active_objective.completion == 0 && this.objectives.indexOf(active_objective) == 0) {
        this.started_on = /* @__PURE__ */ new Date();
        active_objective.start = /* @__PURE__ */ new Date();
      }
      const incremented = await active_objective.increment_completion(interaction, this);
      const next_objective = this.get_active_objective();
      if (!next_objective && active_objective.status === "completed") {
        this.status = "completed";
        this.end_time = /* @__PURE__ */ new Date();
        utils_default.commands.play_quest_complete_sound(this.thorny_user.gamertag);
        utils_default.commands.send_title(
          interaction.dimension,
          this.thorny_user.gamertag,
          "title",
          `\xA7l\xA7eQ\xA7du\xA7se\xA7as\xA7tt \xA7uC\xA7io\xA7mm\xA7pp\xA79l\xA7ee\xA7nt\xA7be!`
        );
        utils_default.commands.send_message(
          interaction.dimension,
          "@a",
          `\xA7a+=+=+=+=+=+=+ Quest Completed! +=+=+=+=+=+=+\xA7r
${this.thorny_user.gamertag} has just completed \xA7l\xA7n${this.title}\xA7r!
Run \xA75/quests view\xA7r on Discord to start it!`
        );
      } else if (next_objective && next_objective.objective_id !== active_objective.objective_id) {
        next_objective.start = /* @__PURE__ */ new Date();
      } else if (active_objective.status === "failed" && !active_objective.continue_on_fail) {
        this.status = "failed";
        this.end_time = /* @__PURE__ */ new Date();
        utils_default.commands.play_quest_fail_sound(this.thorny_user.gamertag);
        utils_default.commands.send_title(
          interaction.dimension,
          this.thorny_user.gamertag,
          "title",
          `\xA7lQuest Failed :(`
        );
        utils_default.commands.send_message(
          interaction.dimension,
          "@a",
          `\xA7c+=+=+=+=+=+=+ Quest Failed :( +=+=+=+=+=+=+\xA7r
${this.thorny_user.gamertag} has failed \xA7l\xA7n${this.title}\xA7r!
Think you can do better? Run \xA75/quests view\xA7r on Discord to start it!`
        );
      }
      return incremented;
    }
    return false;
  }
};

// behaviour_pack/scripts-dev/api/sacrifice.ts
import { http as http6, HttpHeader as HttpHeader5, HttpRequest as HttpRequest5, HttpRequestMethod as HttpRequestMethod5 } from "@minecraft/server-net";
var Item = class _Item {
  constructor(data) {
    this.item_id = data.item_id;
    this.value = data.value;
    this.max_uses = data.max_uses;
    this.depreciation = data.depreciation;
    this.current_uses = data.current_uses;
  }
  static async get_item(item_id) {
    try {
      const item_response = await http6.get(`http://nexuscore:8000/api/v0.2/server/items/${item_id}`);
      const item_data = JSON.parse(item_response.body);
      return new _Item(item_data);
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  }
  async update_item() {
    const request = new HttpRequest5(`http://nexuscore:8000/api/v0.2/server/items/${this.item_id}`);
    request.method = HttpRequestMethod5.Put;
    request.headers = [
      new HttpHeader5("Content-Type", "application/json"),
      new HttpHeader5("auth", "my-auth-token")
    ];
    request.body = JSON.stringify({
      current_uses: this.current_uses
    });
    await http6.request(request);
  }
};
var World = class _World {
  constructor(data) {
    this.guild_id = data.guild_id;
    this.overworld_border = data.overworld_border;
    this.nether_border = data.nether_border;
    this.end_border = data.end_border;
  }
  static async get_world(guild_id2) {
    try {
      const world_response = await http6.get(`http://nexuscore:8000/api/v0.2/server/world/${guild_id2}`);
      const world_data = JSON.parse(world_response.body);
      world_data.guild_id = guild_id2;
      return new _World(world_data);
    } catch (error) {
      console.error("Error fetching world:", error);
      throw error;
    }
  }
  async update_world() {
    const request = new HttpRequest5(`http://nexuscore:8000/api/v0.2/server/world/${this.guild_id}`);
    request.method = HttpRequestMethod5.Put;
    request.headers = [
      new HttpHeader5("Content-Type", "application/json"),
      new HttpHeader5("auth", "my-auth-token")
    ];
    request.body = JSON.stringify({
      overworld_border: this.overworld_border,
      nether_border: this.nether_border,
      end_border: this.end_border
    });
    await http6.request(request);
  }
};
var WorldCache = class _WorldCache {
  static async load_world(guild_id2) {
    _WorldCache.world = await World.get_world(guild_id2);
  }
};

// behaviour_pack/scripts-dev/api/index.ts
var api = {
  ThornyUser,
  Relay,
  Interaction,
  Quest,
  QuestWithProgress,
  Item,
  World
};
var api_default = api;

// behaviour_pack/scripts-dev/components/sacrifice.ts
function load_altar_component(guild_id2) {
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
      const mainhand = event.player.getComponent(EntityComponentTypes3.Equippable)?.getEquipment(EquipmentSlot.Mainhand);
      const border = WorldCache.world;
      if (mainhand && !banned_gamertags.includes(playerName)) {
        if (mainhand.amount == 1) {
          event.player.getComponent(EntityComponentTypes3.Equippable)?.setEquipment(EquipmentSlot.Mainhand);
        } else {
          mainhand.amount -= 1;
          event.player.getComponent(EntityComponentTypes3.Equippable)?.setEquipment(EquipmentSlot.Mainhand, mainhand);
        }
        event.dimension.playSound("random.pop", event.player.location, { volume: 0.5 });
        try {
          const sacrificial_item = await api_default.Item.get_item(mainhand.typeId);
          sacrificial_item.current_uses += 1;
          let modifier = 0;
          let enchantment_levels = 0;
          let enchantments = 0;
          mainhand.getComponent(ItemComponentTypes.Enchantable)?.getEnchantments().forEach((enchantment) => {
            enchantment_levels += enchantment.level;
            enchantments += 1;
          });
          modifier += enchantment_levels * enchantments * 0.3 / 100 + (mainhand.nameTag ? 0.1 : 0);
          const durability = mainhand.getComponent(ItemComponentTypes.Durability);
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
          await WorldCache.load_world(border.guild_id);
          const total_value = sacrificeTotals.get(playerName)?.val;
          const total_original_value = sacrificeTotals.get(playerName)?.orig;
          if (total_value && total_original_value) {
            sacrificeTotals.set(playerName, { val: block_value + total_value, orig: original_block_value + total_original_value });
          } else {
            sacrificeTotals.set(playerName, { val: block_value, orig: original_block_value });
          }
          if (sacrificeTimers.has(playerName)) {
            system5.clearRun(sacrificeTimers.get(playerName));
          }
          const timeoutId = system5.runTimeout(() => {
            ambient(event);
            event.dimension.playSound("altar.sacrifice", event.block.center(), { volume: 6 });
            const total_value2 = Math.round(sacrificeTotals.get(playerName)?.val);
            const total_original = Math.round(sacrificeTotals.get(playerName)?.orig);
            const message2 = utils_default.AltarMessage.random_sacrifice(total_value2, total_original);
            utils_default.commands.send_message(
              event.dimension.id,
              "@a",
              `[\xA7l\xA7aAltar\xA7r] ${message2}`
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
          const message2 = utils_default.AltarMessage.random_not_sacrificial();
          utils_default.commands.send_message(
            event.dimension.id,
            playerName,
            `[\xA7l\xA7aAltar\xA7r] ${message2}`
          );
        }
      } else {
        ambient(event);
        const message2 = utils_default.AltarMessage.random_info(Math.round(border.end_border));
        utils_default.commands.send_message(
          event.dimension.id,
          playerName,
          `[\xA7l\xA7aAltar\xA7r] ${message2}`
        );
      }
    }
  }
  function ambient(event) {
    if (event.block.isValid) {
      const location = event.block.center();
      event.dimension.playSound("altar.ambient", location, { volume: 3 });
    }
  }
  system5.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/whoop.ts
import {
  BlockPermutation,
  system as system6
} from "@minecraft/server";
function load_whoop_component() {
  function play_fart(dimension, location) {
    dimension.playSound("fart", location, { volume: 3, pitch: Math.max(0.45, Math.random() * 1.5) });
    location.y += 0.65;
    dimension.spawnParticle("minecraft:explosion_particle", location);
  }
  function on_interact(event) {
    play_fart(event.dimension, event.block.center());
  }
  function on_redstone(event) {
    const powered = event.block.permutation.getState("amethyst:powered_bit");
    if (event.block.isValid && event.block.getRedstonePower() && !powered) {
      event.block.setPermutation(BlockPermutation.resolve("amethyst:whoopee_cushion", { "amethyst:powered_bit": true }));
      play_fart(event.dimension, event.block.center());
    } else if (event.block.isValid && !event.block.getRedstonePower() && powered) {
      event.block.setPermutation(BlockPermutation.resolve("amethyst:whoopee_cushion", { "amethyst:powered_bit": false }));
    }
  }
  system6.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/reactor_activate.ts
import {
  BlockPermutation as BlockPermutation2,
  EntityComponentTypes as EntityComponentTypes4,
  EquipmentSlot as EquipmentSlot2,
  system as system7
} from "@minecraft/server";
function load_reactor_activate_component() {
  function on_interact(event) {
    const mainhand = event.player?.getComponent(EntityComponentTypes4.Equippable)?.getEquipment(EquipmentSlot2.Mainhand);
    if (mainhand?.typeId == "amethyst:glitch_core") {
      const active = event.block.permutation.getState("amethyst:reactor_active_state");
      if (event.block.isValid && !active) {
        event.block.setPermutation(BlockPermutation2.resolve("amethyst:reactor", { "amethyst:reactor_active_state": true }));
        event.player?.getComponent(EntityComponentTypes4.Equippable)?.setEquipment(EquipmentSlot2.Mainhand);
        event.dimension.playSound("beacon.activate", event.block.center());
        const glitches_type = [
          utils_default.commands.noise_glitch,
          utils_default.commands.vision_block_glitch,
          utils_default.commands.vision_entity_glitch,
          utils_default.commands.effect_glitch,
          utils_default.commands.noise_glitch,
          utils_default.commands.noise_glitch,
          utils_default.commands.noise_glitch
        ];
        event.block.dimension.getPlayers().forEach((player) => {
          glitches_type.forEach((glitch) => {
            glitch(player);
          });
        });
      }
    }
  }
  system7.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/heal_dragon.ts
import {
  system as system8,
  EntityComponentTypes as EntityComponentTypes5
} from "@minecraft/server";
function load_heal_dragon_component() {
  let mined_blocks = 0;
  function heal_dragon(event) {
    if (event.block.isValid) {
      const dragon = event.block.dimension.getEntities({ type: MinecraftEntityTypes.EnderDragon })[0];
      if (dragon && dragon.isValid) {
        dragon.getComponent(EntityComponentTypes5.Health)?.resetToMaxValue();
      }
      event.dimension.playSound("mob.warden.heartbeat", event.block.location);
    }
  }
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
    const message2 = utils_default.DragonHeartMessage.heart_mined(mined_blocks);
    utils_default.commands.send_message(
      event.dimension.id,
      "@a",
      message2
    );
  }
  system8.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/alcohol.ts
import {
  system as system9
} from "@minecraft/server";
function load_alcohol_component() {
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
  system9.beforeEvents.startup.subscribe((initEvent) => {
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

// behaviour_pack/scripts-dev/components/index.ts
function load_custom_components(guild_id2) {
  load_fungus_spreading_component();
  load_glitch_component();
  load_whoop_component();
  load_altar_component(guild_id2);
  load_reactor_activate_component();
  load_heal_dragon_component();
  load_alcohol_component();
}

// behaviour_pack/scripts-dev/loops/elytra_no_mending.ts
import { EquipmentSlot as EquipmentSlot3, world as world8, system as system10, EntityComponentTypes as EntityComponentTypes6, ItemComponentTypes as ItemComponentTypes2, EnchantmentType } from "@minecraft/server";
function elytraCheck(player) {
  const player_equipment = player.getComponent(EntityComponentTypes6.Equippable);
  const item = player_equipment?.getEquipment(EquipmentSlot3.Chest);
  if (item) {
    const enchantments = item?.getComponent(ItemComponentTypes2.Enchantable);
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
      const durability_component = item.getComponent(ItemComponentTypes2.Durability);
      if (durability_component) {
        durability_component.damage = durability_component.maxDurability;
      }
      item.setLore([`
\xA7o"My wings are cursed!"`]);
      world8.getDimension("overworld").runCommand(`title "${player.name}" actionbar \xA7o\xA7iMy Elytra feels different...`);
      player_equipment?.setEquipment(EquipmentSlot3.Chest, item);
      console.log(`[ElytraCheck] Player ${player.name} has elytra with mending. Removing Mending.`);
    }
  }
}
function load_elytra_mending_checker() {
  system10.runInterval(() => {
    let playerlist = world8.getPlayers();
    playerlist.forEach((player) => {
      elytraCheck(player);
    });
  }, 20);
  console.log("[Loops] Loaded Elytra Checker Loop");
}

// behaviour_pack/scripts-dev/loops/border.ts
import { world as world9, system as system11, EntityDamageCause as EntityDamageCause2 } from "@minecraft/server";
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
    world9.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar \xA7o\xA7iI shouldn't go any further. It's too dangerous here.`);
    world9.getDimension(dimensionID).runCommand(`effect "${player.name}" blindness 4 2`);
    player.applyDamage(1.3, { cause: EntityDamageCause2.void });
  } else if (border_size - 20 < distance_2d) {
    world9.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar \xA7o\xA7iThe Monolith's protection is wearing off. I can feel it...`);
  }
  if (border_size - 100 < distance_2d && warning_range.indexOf(player.name) == -1) {
    warning_range.push(player.name);
    world9.getDimension(dimensionID).runCommand(`title "${player.name}" actionbar \xA7o\xA7iMaybe I should start heading back now...`);
  } else if (border_size - 100 > distance_2d && warning_range.indexOf(player.name) != -1) {
    warning_range.splice(warning_range.indexOf(player.name), 1);
  }
}
function load_world_border() {
  let players_100_blocks_away = { overworld: [], nether: [], end: [] };
  let players_outside_border = { overworld: [], nether: [], end: [] };
  system11.runInterval(() => {
    let players = {
      overworld: world9.getDimension(MinecraftDimensionTypes.Overworld).getPlayers(),
      nether: world9.getDimension(MinecraftDimensionTypes.Nether).getPlayers(),
      end: world9.getDimension(MinecraftDimensionTypes.TheEnd).getPlayers()
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
  console.log("[Loops] Loaded World Border Loop");
}

// behaviour_pack/scripts-dev/loops/quests.ts
import { system as system12, world as world10 } from "@minecraft/server";
async function check_quests() {
  try {
    if (!api_default.Interaction.is_processing()) {
      api_default.Interaction.set_processing(true);
      let interaction = api_default.Interaction.dequeue();
      while (interaction) {
        let thorny_user = api_default.ThornyUser.fetch_user_by_id(interaction.thorny_id);
        let quest = await api_default.QuestWithProgress.get_active_quest(thorny_user);
        if (quest && await quest.increment_active_objective(interaction)) {
          await quest.update_user_quest();
          await thorny_user.update();
          if (quest.status == "completed") {
            api_default.Relay.event(
              `${thorny_user.gamertag} has completed *${quest.title}!*`,
              "Run `/quests view` to start it and reap the rewards!",
              "other"
            );
            api_default.QuestWithProgress.clear_cache(thorny_user);
          }
        } else if (quest && quest.status == "failed") {
          api_default.Relay.event(
            `${thorny_user.gamertag} has failed *${quest.title}!*`,
            "Better luck next time!",
            "other"
          );
          await quest.fail_quest(thorny_user.thorny_id);
          api_default.QuestWithProgress.clear_cache(thorny_user);
        }
        interaction = api_default.Interaction.dequeue();
      }
      api_default.Interaction.set_processing(false);
    }
  } catch (e) {
    api_default.Interaction.set_processing(false);
    throw e;
  }
}
async function display_timer() {
  for (let questCacheKey in api_default.QuestWithProgress.quest_cache) {
    let active_objective = api_default.QuestWithProgress.quest_cache[questCacheKey].get_active_objective();
    if (active_objective && active_objective.start && active_objective.objective_timer) {
      let elapsed_seconds = Math.floor(((/* @__PURE__ */ new Date()).getTime() - active_objective.start.getTime()) / 1e3);
      let remaining_seconds = Math.max(0, active_objective.objective_timer - elapsed_seconds);
      let minutes = Math.floor(remaining_seconds / 60);
      let seconds = remaining_seconds % 60;
      let player = world10.getPlayers({ name: active_objective.thorny_user.gamertag })[0];
      utils_default.commands.send_title(
        player.dimension.id,
        player.name,
        "actionbar",
        `\xA7l\xA7sObjective ${active_objective.order + 1}\xA7r | ${minutes.toString().padStart(2, "0")}m${seconds.toString().padStart(2, "0")}s`
      );
    }
  }
}
function load_quest_loop() {
  system12.runInterval(async () => {
    await check_quests();
  }, 1);
  system12.runInterval(async () => {
    await display_timer();
  }, 10);
  console.log("[Loops] Loaded Quests Loop");
}

// behaviour_pack/scripts-dev/loops/totem_of_togetherness.ts
import { EntityComponentTypes as EntityComponentTypes7, EquipmentSlot as EquipmentSlot4, system as system13, world as world11 } from "@minecraft/server";
var healthboost = MinecraftEffectTypes.HealthBoost;
function togetherness(player) {
  const position = player.location;
  const equippable = player.getComponent(EntityComponentTypes7.Equippable);
  const offhand = equippable?.getEquipment(EquipmentSlot4.Offhand);
  const mainhand = equippable?.getEquipment(EquipmentSlot4.Mainhand);
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
  if (offhand?.typeId === "amethyst:totem_of_togetherness" && offhand.getLore().length === 0) {
    offhand.setLore(["\n\xA7r\xA7qEverthorn Christmas 2024"]);
    equippable?.setEquipment(EquipmentSlot4.Offhand, offhand);
  } else if (mainhand?.typeId === "amethyst:totem_of_togetherness" && mainhand.getLore().length === 0) {
    mainhand.setLore(["\n\xA7r\xA7qEverthorn Christmas 2024"]);
    equippable?.setEquipment(EquipmentSlot4.Mainhand, mainhand);
  }
}
function load_totem_o_togetherness() {
  system13.runInterval(() => {
    let playerlist = world11.getPlayers();
    playerlist.forEach((player) => {
      togetherness(player);
    });
  }, 20);
  console.log("[Loops] Loaded Totem Of Togetherness Loop");
}

// behaviour_pack/scripts-dev/loops/location.ts
import { EntityComponentTypes as EntityComponentTypes8, EquipmentSlot as EquipmentSlot5, system as system14, world as world12, TicksPerSecond as TicksPerSecond8 } from "@minecraft/server";
function location_log(player) {
  const head_gear = player.getComponent(EntityComponentTypes8.Equippable)?.getEquipment(EquipmentSlot5.Head);
  const check_list = [
    MinecraftItemTypes.SkeletonSkull,
    MinecraftItemTypes.WitherSkeletonSkull,
    MinecraftItemTypes.CarvedPumpkin,
    MinecraftItemTypes.PlayerHead,
    MinecraftItemTypes.PiglinHead,
    MinecraftItemTypes.CreeperHead,
    MinecraftItemTypes.ZombieHead,
    MinecraftItemTypes.DragonHead
  ];
  let hidden = (head_gear?.typeId ? check_list.includes(head_gear.typeId) : false) || player.isSneaking;
  const location = [Math.round(player.location.x), Math.round(player.location.y), Math.round(player.location.z)];
  const thorny_user = api_default.ThornyUser.fetch_user(player.name);
  if (thorny_user) {
    thorny_user.location = location;
    thorny_user.dimension = player.dimension.id;
    thorny_user.hidden = hidden;
    thorny_user.update().then();
  }
}
function load_location_logger() {
  system14.runInterval(() => {
    let playerlist = world12.getPlayers();
    playerlist.forEach((player) => {
      location_log(player);
    });
  }, TicksPerSecond8 * 5);
  console.log("[Loops] Loaded Location Loop");
}

// behaviour_pack/scripts-dev/loops/champion_set.ts
import { EntityComponentTypes as EntityComponentTypes9, EquipmentSlot as EquipmentSlot6, MolangVariableMap, system as system15, world as world13 } from "@minecraft/server";
function champion(player) {
  const molang = new MolangVariableMap();
  molang.setColorRGB("variable.color", { red: 1, green: 0.913, blue: 0.576 });
  const position = player.location;
  const equippable = player.getComponent(EntityComponentTypes9.Equippable);
  let equipped = 0;
  equippable?.getEquipment(EquipmentSlot6.Head)?.hasTag("amethyst:champion") ? equipped++ : null;
  equippable?.getEquipment(EquipmentSlot6.Chest)?.hasTag("amethyst:champion") ? equipped++ : null;
  equippable?.getEquipment(EquipmentSlot6.Legs)?.hasTag("amethyst:champion") ? equipped++ : null;
  equippable?.getEquipment(EquipmentSlot6.Feet)?.hasTag("amethyst:champion") ? equipped++ : null;
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
function load_champion_set() {
  system15.runInterval(() => {
    let playerlist = world13.getPlayers();
    playerlist.forEach((player) => {
      champion(player);
    });
  }, 4);
  console.log("[Loops] Loaded Champion Set Loop");
}

// behaviour_pack/scripts-dev/loops/drunk.ts
import { system as system16, TicksPerSecond as TicksPerSecond9, world as world14 } from "@minecraft/server";
function sober_up(drunk_data) {
  const sober_chance = 0.08;
  if (Math.random() < sober_chance) {
    drunk_data.drinks -= 1;
  }
  return drunk_data;
}
function cumulative_drunk_effects(player, drunk_data) {
  player.addEffect(MinecraftEffectTypes.Oozing, TicksPerSecond9 * 2);
  if (drunk_data.drinks > 4) {
    player.addEffect(MinecraftEffectTypes.Hunger, TicksPerSecond9 * drunk_data.drinks);
  }
  if (drunk_data.drinks > 18) {
    player.addEffect(MinecraftEffectTypes.Slowness, TicksPerSecond9 * 2, { amplifier: 3 });
  }
  if (drunk_data.drinks > 20) {
    player.addEffect(MinecraftEffectTypes.FatalPoison, TicksPerSecond9 * 2);
  }
}
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
      player.addEffect(MinecraftEffectTypes.Nausea, 5 + TicksPerSecond9 * drunk_data.drinks);
    } else if (chosen_effect === "slowness") {
      player.addEffect(MinecraftEffectTypes.Slowness, TicksPerSecond9 * drunk_data.drinks);
    } else if (chosen_effect === "night_vision") {
      player.addEffect(MinecraftEffectTypes.NightVision, TicksPerSecond9 * drunk_data.drinks);
    } else if (chosen_effect === "speed") {
      player.addEffect(MinecraftEffectTypes.Speed, TicksPerSecond9 * drunk_data.drinks);
    }
  }
  return drunk_data;
}
function load_drunk() {
  system16.runInterval(() => {
    let playerlist = world14.getPlayers();
    playerlist.forEach((player) => {
      drunk(player);
    });
  }, TicksPerSecond9);
  world14.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
    let player = spawn_event.player;
    if (player.getDynamicProperty("amethyst:drunk_data")) {
      player.setDynamicProperty("amethyst:drunk_data", void 0);
    }
  });
  console.log("[Loops] Loaded Drunk Loop");
}

// behaviour_pack/scripts-dev/loops/index.ts
function load_loops() {
  load_elytra_mending_checker();
  load_world_border();
  load_quest_loop();
  load_totem_o_togetherness();
  load_location_logger();
  load_champion_set();
  load_drunk();
}

// behaviour_pack/scripts-dev/events/blocks.ts
import { world as world15, system as system17 } from "@minecraft/server";
import { EntityComponentTypes as EntityComponentTypes11, EquipmentSlot as EquipmentSlot8 } from "@minecraft/server";
function load_block_event_handler() {
  world15.beforeEvents.playerBreakBlock.subscribe((event) => {
    const block_id = event.block.typeId;
    const block_location = [event.block.x, event.block.y, event.block.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes11.Equippable)?.getEquipment(EquipmentSlot8.Mainhand);
    system17.run(() => {
      const interaction = new api_default.Interaction(
        {
          thorny_id: api_default.ThornyUser.fetch_user(event.player.name)?.thorny_id ?? 0,
          type: "mine",
          coordinates: block_location,
          reference: block_id,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      interaction.post_interaction();
      api_default.Interaction.enqueue(interaction);
    });
  });
  world15.afterEvents.playerPlaceBlock.subscribe((event) => {
    const block_id = event.block.typeId;
    const block_location = [event.block.x, event.block.y, event.block.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes11.Equippable)?.getEquipment(EquipmentSlot8.Mainhand);
    system17.run(() => {
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
  world15.afterEvents.playerInteractWithBlock.subscribe((event) => {
    const block_id = event.block.typeId;
    const block_location = [event.block.x, event.block.y, event.block.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes11.Equippable)?.getEquipment(EquipmentSlot8.Mainhand);
    const all_blocks = [
      // Containers
      MinecraftBlockTypes.Chest,
      MinecraftBlockTypes.Barrel,
      MinecraftBlockTypes.EnderChest,
      MinecraftBlockTypes.TrappedChest,
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
    if (all_blocks.includes(block_id) && !(event.beforeItemStack?.typeId === block_id && event.itemStack?.amount !== event.beforeItemStack?.amount)) {
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
  });
}

// behaviour_pack/scripts-dev/events/chat.ts
import { system as system18, world as world16 } from "@minecraft/server";
function load_chat_handler() {
  world16.beforeEvents.chatSend.subscribe((chat_event) => {
    const gamertag = chat_event.sender.name;
    const thorny_user = api_default.ThornyUser.fetch_user(gamertag);
    world16.sendMessage({
      rawtext: [{ text: `${thorny_user?.get_role_display()} \xA77${gamertag}:\xA7r ${chat_event.message}` }]
    });
    system18.run(() => {
      api_default.Relay.message(gamertag, chat_event.message);
    });
    chat_event.cancel = true;
  });
}

// behaviour_pack/scripts-dev/events/connections.ts
import { world as world17 } from "@minecraft/server";
function load_connections_handler(guild_id2) {
  world17.afterEvents.playerSpawn.subscribe(async (spawn_event) => {
    if (spawn_event.initialSpawn) {
      try {
        const thorny_user = await api_default.ThornyUser.get_user_from_api(guild_id2, spawn_event.player.name);
        thorny_user.send_connect_event("connect");
        api_default.Relay.event(`${spawn_event.player.name} has joined the server`, "", "join");
        const quest = await api_default.QuestWithProgress.get_active_quest(thorny_user);
        utils_default.send_motd(spawn_event.player, quest);
        if (thorny_user.patron) {
          spawn_event.player.nameTag = `\xA7l\xA7c${spawn_event.player.nameTag}\xA7r`;
        }
      } catch (e) {
        api_default.Relay.event(`${spawn_event.player.name} has joined the server`, "API Issue Detected", "join");
        console.error(e);
      }
    }
  });
  world17.afterEvents.playerLeave.subscribe((leave_event) => {
    const thorny_user = api_default.ThornyUser.fetch_user(leave_event.playerName);
    if (thorny_user) {
      api_default.QuestWithProgress.clear_cache(thorny_user);
    }
    thorny_user?.send_connect_event("disconnect");
    api_default.Relay.event(`${leave_event.playerName} has left the server`, "", "leave");
  });
}

// behaviour_pack/scripts-dev/events/entities.ts
import { system as system19, world as world18 } from "@minecraft/server";
import { EntityComponentTypes as EntityComponentTypes13, EquipmentSlot as EquipmentSlot10, Player as Player14 } from "@minecraft/server";
function load_entity_event_handler() {
  world18.afterEvents.entityDie.subscribe((event) => {
    if (event.damageSource.damagingEntity instanceof Player14) {
      const player = event.damageSource.damagingEntity;
      const dimension = player.dimension;
      const mainhand = player.getComponent(EntityComponentTypes13.Equippable)?.getEquipment(EquipmentSlot10.Mainhand);
      const interaction = new api_default.Interaction(
        {
          thorny_id: api_default.ThornyUser.fetch_user(player.name)?.thorny_id ?? 0,
          type: "kill",
          coordinates: [event.deadEntity.location.x, event.deadEntity.location.y, event.deadEntity.location.z],
          reference: event.deadEntity.typeId,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      if (event.deadEntity instanceof Player14) {
        const dead_player = event.deadEntity;
        const dead_mainhand = dead_player.getComponent(EntityComponentTypes13.Equippable)?.getEquipment(EquipmentSlot10.Mainhand);
        interaction.reference = dead_player.name;
        const death_interaction = new api_default.Interaction(
          {
            thorny_id: api_default.ThornyUser.fetch_user(dead_player.name)?.thorny_id ?? 0,
            type: "die",
            coordinates: [dead_player.location.x, dead_player.location.y, dead_player.location.z],
            reference: player.name,
            mainhand: dead_mainhand?.typeId ?? null,
            dimension: dimension.id
          }
        );
        interaction.reference = MinecraftEntityTypes.Player;
        interaction.post_interaction();
        death_interaction.post_interaction();
        api_default.Interaction.enqueue(death_interaction);
        api_default.Relay.event(utils_default.DeathMessage.random_pvp(player.name, dead_player.name), "", "other");
      } else {
        interaction.post_interaction();
      }
      api_default.Interaction.enqueue(interaction);
    } else if (event.deadEntity instanceof Player14 && event.damageSource.damagingEntity) {
      const killer = event.damageSource.damagingEntity;
      const player = event.deadEntity;
      const dimension = player.dimension;
      const mainhand = player.getComponent(EntityComponentTypes13.Equippable)?.getEquipment(EquipmentSlot10.Mainhand);
      const death_interaction = new api_default.Interaction(
        {
          thorny_id: api_default.ThornyUser.fetch_user(player.name)?.thorny_id ?? 0,
          type: "die",
          coordinates: [player.location.x, player.location.y, player.location.z],
          reference: killer.typeId,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      death_interaction.post_interaction();
      api_default.Interaction.enqueue(death_interaction);
      api_default.Relay.event(utils_default.DeathMessage.random_pve(player.name, killer.typeId), "", "other");
    } else if (event.deadEntity instanceof Player14 && !event.damageSource.damagingEntity) {
      const player = event.deadEntity;
      const dimension = player.dimension;
      const mainhand = player.getComponent(EntityComponentTypes13.Equippable)?.getEquipment(EquipmentSlot10.Mainhand);
      const death_interaction = new api_default.Interaction(
        {
          thorny_id: api_default.ThornyUser.fetch_user(player.name)?.thorny_id ?? 0,
          type: "die",
          coordinates: [player.location.x, player.location.y, player.location.z],
          reference: event.damageSource.cause,
          mainhand: mainhand?.typeId ?? null,
          dimension: dimension.id
        }
      );
      death_interaction.post_interaction();
      api_default.Interaction.enqueue(death_interaction);
      api_default.Relay.event(utils_default.DeathMessage.random_suicide(player.name, event.damageSource.cause), "", "other");
    }
  });
  world18.afterEvents.playerInteractWithEntity.subscribe((event) => {
    const entity_id = event.target.typeId;
    const entity_location = [event.target.location.x, event.target.location.y, event.target.location.z];
    const dimension = event.player.dimension;
    const mainhand = event.player.getComponent(EntityComponentTypes13.Equippable)?.getEquipment(EquipmentSlot10.Mainhand);
    const all_entities = [
      // Villagers
      MinecraftEntityTypes.Villager,
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
      // Entity Containers
      MinecraftEntityTypes.ChestBoat,
      MinecraftEntityTypes.ChestMinecart,
      MinecraftEntityTypes.HopperMinecart
    ];
    if (all_entities.includes(entity_id)) {
      system19.run(() => {
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
  });
  let first_stage = false;
  let second_stage = false;
  world18.afterEvents.entityHurt.subscribe((event) => {
    if (event.hurtEntity.typeId === MinecraftEntityTypes.EnderDragon) {
      const health_component = event.hurtEntity.getComponent(EntityComponentTypes13.Health);
      if (health_component && !first_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.75) {
        first_stage = true;
        const message2 = utils_default.DragonHeartMessage.health_stage_message(1);
        utils_default.commands.send_message(
          event.hurtEntity.dimension.id,
          "@a",
          message2
        );
        utils_default.DragonHeartMessage.summon_minions();
      } else if (health_component && !second_stage && health_component?.currentValue / health_component?.effectiveMax <= 0.25) {
        second_stage = true;
        const message2 = utils_default.DragonHeartMessage.health_stage_message(2);
        utils_default.commands.send_message(
          event.hurtEntity.dimension.id,
          "@a",
          message2
        );
        utils_default.DragonHeartMessage.summon_minions();
      }
    }
  });
}

// behaviour_pack/scripts-dev/events/script_events.ts
import { system as system20, world as world19 } from "@minecraft/server";
function load_script_event_handler() {
  system20.afterEvents.scriptEventReceive.subscribe((script_event) => {
    const thorny_user = api_default.ThornyUser.fetch_user(script_event.message);
    const player = world19.getPlayers({ name: script_event.message })[0];
    if (thorny_user) {
      const interaction = new api_default.Interaction(
        {
          thorny_id: thorny_user.thorny_id,
          type: "scriptevent",
          coordinates: [player.location.x, player.location.y, player.location.z],
          reference: script_event.id,
          mainhand: null,
          dimension: MinecraftDimensionTypes.Overworld
        }
      );
      api_default.Interaction.enqueue(interaction);
      interaction.post_interaction().then();
    }
  });
}

// behaviour_pack/scripts-dev/events/index.ts
function load_world_event_handlers(guild_id2) {
  load_block_event_handler();
  load_chat_handler();
  load_connections_handler(guild_id2);
  load_entity_event_handler();
  load_script_event_handler();
}

// behaviour_pack/scripts-dev/main.ts
import { system as system21 } from "@minecraft/server";
var guild_id = "1213827104945471538";
WorldCache.load_world(guild_id).then();
load_loops();
load_custom_components(guild_id);
load_world_event_handlers(guild_id);
system21.beforeEvents.startup.subscribe((initEvent) => {
  system21.run(() => {
    api_default.Relay.event(
      "AmethystConnect Plugin successfully loaded",
      "Don't see this on server startup? Ping a CM! It's important!",
      "start"
    );
  });
});
