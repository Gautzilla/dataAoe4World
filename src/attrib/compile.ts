import path from "path";
import { ITEM_TYPES, FOLDERS } from "../lib/config";
import { CIVILIZATIONS } from "../lib/config/civs";
import { getAllItems } from "../lib/files/readData";
import { writeJson } from "../lib/files/writeData";
import { optimizeItems, unifyItems } from "../lib/utils/items";

const meta = {
  __note__: "This is file is autogenerated, do not edit it manually. For more info https://data.aoe4world.com/",
  __version__: "0.0.2",
};

(async () => {
  [ITEM_TYPES.UNITS, ITEM_TYPES.TECHNOLOGIES, ITEM_TYPES.BUILDINGS, ITEM_TYPES.UPGRADES, ITEM_TYPES.ABILITIES].forEach((type) => compile(type));
})();

/** Creates index files for units */
async function compile(type: ITEM_TYPES) {
  const items = await getAllItems(type);
  if (!items) return;
  const unified = unifyItems(items);

  writeJson(path.join(FOLDERS[type].DATA, "all.json"), { ...meta, data: items });
  writeJson(path.join(FOLDERS[type].DATA, "all-unified.json"), { ...meta, data: unified });
  writeJson(path.join(FOLDERS[type].DATA, "all-optimized.json"), { ...meta, data: optimizeItems(unified) });
  unified.forEach((u) => writeJson(path.join(FOLDERS[type].DATA, `unified/${u.id}.json`), Object.assign({}, meta, u), { log: false }));

  Object.values(CIVILIZATIONS).forEach((civ) => {
    const civItems = items.filter((u) => u.civs.includes(civ.abbr));
    const unified = unifyItems(civItems);
    writeJson(path.join(FOLDERS[type].DATA, `${civ.slug}.json`), { ...meta, civ: civ, data: civItems });
    writeJson(path.join(FOLDERS[type].DATA, `${civ.slug}-unified.json`), { ...meta, civ: civ, data: unified });
    writeJson(path.join(FOLDERS[type].DATA, `${civ.slug}-optimized.json`), { ...meta, civ: civ, data: optimizeItems(unified) });
  });
}
