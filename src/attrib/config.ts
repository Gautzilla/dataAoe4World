import path from "path";
import { ITEM_TYPES } from "../lib/config";
import { CivSlug } from "../sdk/utils";

export const SOURCE_FOLDER = path.join(__dirname, "../../source/");
export const ATTRIB_FOLDER = path.join(SOURCE_FOLDER, "/attrib");
export const ICON_FOLDER = path.join(SOURCE_FOLDER, "/icons");
export const LOCALES_FOLDER = path.join(SOURCE_FOLDER, "/locale");
export const ESSENCE_FOLDER = path.join(SOURCE_FOLDER, "/essence/attrib");

// Unit files not discovered by sync.ts
export const hardcodedDiscovery = {
  rus: [
    "sbps/races/rus/unit_militia_2_rus",
    "upgrade/races/rus/units/upgrade_militia_3",
    "upgrade/races/rus/units/upgrade_militia_4",
    "abilities/always_on_abilities/rus/saints_blessing_rus",//misses auto discovery ; how to handle upgrades
    // "abilities/always_on_abilities/rus/high_armory_production_aura_rus",
    "abilities/always_on_abilities/rus/streltsy_static_deployment_ability_rus", //misses auto discovery
    "abilities/timed_abilities/rus/horse_archer_mounted_training_gallop_rus", //misses auto discovery
  ],
  mongols: [
    "sbps/races/mongol/unit_khan_2_mon",
    "sbps/races/mongol/unit_khan_3_mon", 
    "sbps/races/mongol/unit_khan_4_mon",
    "abilities/always_on_abilities/mongol/lancer_healing_mon", //misses auto discovery
    // "abilities/always_on_abilities/mongol/kurultai_healing_aura_mon",
    "abilities/timed_abilities/mongol/khan_attack_speed_signal_arrow_mon", //khan-1 is discovered in starting army, so khan abilities miss auto discovery
    "abilities/timed_abilities/mongol/khan_defensive_signal_arrow_mon",
    "abilities/timed_abilities/mongol/khan_maneuver_signal_arrow_mon", //whistling arrow is an ability upgrade; how do techs upgrade an ability
    // "abilities/always_on_abilities/mongol/ortoo_outpost_speed_aura_mon",
    "info/buff_info/races/mongol/outpost_speed_improved_mon",
  ],
  ottomans: [
    "upgrade/races/ottoman/research/upgrade_anatolian_hills_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_blacksmith_stockpile_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_janissary_company_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_manned_siege_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_mehter_drums_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_military_campus_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_military_training_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_monk_formation_ott",
    "upgrade/races/ottoman/research/upgrade_imperial_trader_capacity_ott",
    "abilities/toggle_abilities/ottoman/mehter_attack_buff_ott", //misses auto discovery
    "abilities/toggle_abilities/ottoman/mehter_melee_armor_buff_ott", //misses auto discovery
    "abilities/toggle_abilities/ottoman/mehter_ranged_armor_buff_ott", //misses auto discovery
    "info/buff_info/races/ottoman/mehter_default_formation_ott",
    // "abilities/always_on_abilities/ottoman/university_blacksmith_influence_ott", //need another way to handle the progression by age
    "abilities/timed_abilities/ottoman/sipahi_stamina_ott", //misses auto discovery; activation recharge starts after ability ends, or +10 to recharge time; are others like this? pavise is not
  ],
  english: [
    "upgrade/races/english/units/upgrade_abbey_king_castle_1",
    "upgrade/races/english/units/upgrade_abbey_king_imp_2",
    "/sbps/races/english/unit_ranger_wynguard_4_eng",
    "/sbps/races/english/unit_footman_wynguard_4_eng",
    "abilities/timed_abilities/english/longbow_rate_of_fire_ability", //misses auto discovery; range is weird but does it matter? //convert to ability from tech
    // "abilities/always_on_abilities/english/tower_outpost_alert_aura_eng",  //how to handle upgrade,  tower outpost has context to upgrade to citadels or tech has the context to upgrade buff or do a workaround 
  ],
  chinese: [
    "info/buff_info/races/chinese/great_wall_buff_chi",//needs trigger/standing on a wall?
    "abilities/always_on_abilities/chinese/spirit_way",//misses auto discovery with no link; needs trigger/unitDeath?        does not stack, but timer resets upon next death
  ],
  abbasid: [
    "abilities/always_on_abilities/abbasid/camel_support_aura_abb", //misses auto discovery; camel support tech needs both ranged and melee armor, so handling this here, and it can be modified when interfacing techs that unlock abilities
    //"abilities/always_on_abilities/abbasid/mamluke_anti_cavalry_aura_abb", //determine how to handle debuff
  ],
  french: [
    "info/buff_info/races/french/lancer_charge_bonus_damage",
    // "abilities/always_on_abilities/french/keep_influence_fre",
    "abilities/modal_abilities/french/deploy_pavise_fre",  //misses auto discovery 
  ],
  hre: [
    "abilities/always_on_abilities/hre/inspired_infantry_hre", //misses auto discovery; convert to ability from tech
  ],
  malians: [
    //"abilities/always_on_abilities/malian/sofa_speed_aura_mal", //convert to ability from tech
    "info/buff_info/races/malian/gbeto_ambush_buff_mal",
    "abilities/timed_abilities/malian/activate_stealth_mal",  //misses auto discovery
    // "abilities/always_on_abilities/malian/stealth_landmark_aura_mal", // unknown property
    //"abilities/always_on_abilities/malian/passives/donso_javelin_throw_mal //charge may be entirely a property of unit
    //"info/buff_info/races/malian/archer_poisoned_arrow_mal" //handle as debuff, found no upper limit
  ],
  delhi: [
    "abilities/timed_abilities/sultanate/infantry_forced_march_sul",  //misses auto discovery with no link
    "abilities/always_on_abilities/sultanate/district_effects/tower_of_victory_aura_sul", //misses auto discovery with no link
    //zeal? //convert to ability from tech
  ],
  
  
};

export const hardcodedDiscoveryCommon = []; //"info/buff_info/races/abbasid/camel_debuff_aura","info/buff_info/races/malian/archer_poisoned_arrow_mal"

export const ignoreForNow: (string | ((file: string) => boolean))[] = [
  "ebps/races/mongol/buildings/building_town_center_dummy_start",
  "ebps/races/mongol/units/campaign/unit_great_trebuchet_cmp_mon",

  // age I/unconstructable versions of walls and infantry buildable walls
  "palisade_bastion",
  "_wall_bastion",
  "_wall_infantry",
  "_wall_gate_infantry",
  "_wing_imperial",
  "_wing_castle",
  "_wing_feudal",

  // Field constructed versions of siege, prefer the Siege Workshop version
  "unit_mangonel_3_buildable_abb",
  "unit_mangonel_3_field_construct_mon",
  "unit_springald_3_buildable_abb",
  "unit_springald_3_field_construct_mon",
  "unit_siege_tower_3_abb",
  "ebps/dev/units/unit_siege_cart",
  "ebps/dev/units/unit_siege_cart",

  "unit_naval_scout_2_ott", // not actually available in game
  "_moving_mon", // packed version
  "_double_mon", // all double produced units
  "building_unit_religious_district_mon", // Monasteric shrines version of prayer tent

  // Research variations available at landmarks, that do not differ
  "upgrade_landmark_cavalry_cantled_saddle_fre",
  "upgrade_landmark_ranged_crossbow_drills_fre",
  "upgrade_landmark_naval_long_guns_fre",
  "upgrade_landmark_market_trickle_fre",
  (file) => file.split("/").pop()!.startsWith("upgrade_unit") && file.endsWith("farimba_mal"),
  "landmarkvariant",

  // Prefer the vanilla keep emplacement versions over landmark and outposts, except mongols
  "upgrade_barbican_cannon_chi",
  "upgrade_barbican_springald_chi",
  "upgrade_wooden_castle_springald_rus",
  "upgrade_outpost_landmark_",
  (file) => file.includes("upgrade_outpost_cannon") && !file.includes("upgrade_outpost_cannon_mon"),
  (file) => file.includes("upgrade_outpost_springald") && !file.includes("upgrade_outpost_springald_mon"),
  (file) => file.includes("unit_ram_3") && !file.includes("workshop") && !file.includes("clocktower"),
  "unit_trade_cart_chamber_of_commerce_fre",
  "unit_trade_cart_free",
  "unit_military_2_free_abb",
  "unit_military_3_free_abb",
  "unit_military_4_free_abb",
  "upgrade_landmark_siege_weapon_speed",
  "upgrade_landmark_siege_works",
  "unit_siege_tower_3_eng",
  
  //uninteresting abilities to place into data
  "military_neutralize_holy_site",
  "_abilities/civ_core/",
  "modal_abilities/core/age_up_",
  "return_to_work",
  "abilities/modal_abilities/abbasid/age_up_",
  "toggle_trade_resource",
  "proxy_placement_gristmill",
  "golden_age_passive_abb",
  "golden_age_bonus_", //ignore whichever is not as complete, the other is "golden_age_tier_"
  "medical_centers_abb",
  "tower_repair_nearby_walls_chi",
  "academy_influence_chi",
  "building_granary_aura_chi", //unknown why error: .../building_granary_aura_chi TypeError: Cannot read properties of undefined (reading 'screen_name')
  "building_generate_tax_chi",
  "toggle_spawn_hold_sul",
  "hisar_academy_sul",
  "mosque_influence_sul",
  "dock_upgrade_aura",
  "scholar_research_behavior_sul",
  "palace_of_the_sultan_elephant_spawner_toggle_on_sul",
  "palace_of_the_sultan_elephant_spawner_sul",
  "chamber_of_commerce_ability_fre",
  "guild_hall_collect_resources_fre",
  "town_center_production_age2_fre", //ability stays the same minus the formatter, and missing age 4?
  "town_center_production_age3_fre",
  "toggle_guild_hall_resource",
  "influence_elzbach_palace_hre",
  "influence_auto_repair_buff_tc_hre",
  "aachen_inspire_aoe_hre",
  "spotters_hre", //non-existent ability
  "cattle_landmark_passive_food_mal",
  "open_pit_mine_influence_gen_mal",
  "trade_cart_taxation_aura_mal",
  "toggle_pit_mine_resource",
  "khaganate_khan_aura_mon",
  "white_stupa_stone_generation_mon",
  "pack_building_mon",
  "packing_building_mon",
  "abilities/toggle_abilities/ottoman/military_school_",
  "abilities/toggle_abilities/ottoman/tophane_armory_",
  "toggle_spawn_hold_ott",
  "tophane_production_mod_ott",
  "cifte_minareli_berry_spawn_ott",
  "sultan_han_caravanseri_ott",
  "topkapi_palace_imperial_council_exp_ott",
  "istanbul_observatory_active_ott",
  "mehter_formation_ott", //inaccurate/old/changed
  "keep_trader_speed_boost_aura_ott_dummy", //dummy/duplicate
  "abilities/timed_abilities/rus/buy",
  "abilities/timed_abilities/rus/sell",
  "hunting_cabin_gold_generation",
  "wooden_fortress_influence_rus",
  "abilities/timed_abilities/rus/kremlin_levy",
];

// Map a4w slug to race id
export const racesMap: Record<CivSlug, string> = {
  abbasid: "abbasid",
  chinese: "chinese",
  delhi: "sultanate",
  english: "english",
  french: "french",
  hre: "hre",
  malians: "malian",
  mongols: "mongol",
  ottomans: "ottoman",
  rus: "rus",
};

export const attribTypes = {
  [ITEM_TYPES.BUILDINGS]: {
    location: "/ebps/races/",
    plural: "buildings",
    singular: "building",
    type: "building",
  },
  [ITEM_TYPES.UNITS]: {
    location: "/ebps/races/",
    plural: "units",
    singular: "unit",
    type: "unit",
  },
  [ITEM_TYPES.TECHNOLOGIES]: {
    location: "/upgrade/races",
    plural: "research",
    singular: "upgrade",
    type: "technology",
  },
} as Record<ITEM_TYPES, { location: string; plural: string; singular: string; type: string }>;

// Could be looked up from ebps/races/mongol/buildings/building_wonder_age3_khanbaliq_mon.xml
export const KHAGANTE_SPAWN_COUNTS = {
  "huihui-pao": 1,
  "nest-of-bees": 1,
  "warrior-monk": 2,
  knight: 3,
  "horse-archer": 5,
  magudai: 5,
  "palace-guard": 5,
};

export function attribFile(...paths: string[]) {
  paths[paths.length - 1] = paths.at(-1)?.endsWith(".xml") ? paths.at(-1)! : `${paths.at(-1)}.xml`;
  return path.join(...paths);
}
