import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { JSDOM } from "jsdom";
import { join } from "path";
import { optimize } from "svgo";

const RAW_FOLDER = "kanji_svg/raw/";
const PROCESSED_FOLDER = "kanji_svg/processed/";

// We use every kanji considered "simple" that isn't a variant (such as Kaisho or Hyougai)
// const joyoList = readFileSync("addon/kanji_list.txt").toString();
const files = readdirSync(RAW_FOLDER).filter(value => /^[0-9a-z]{5}\.svg$/.test(value)) // .filter(value => joyoList.includes(String.fromCharCode(parseInt(value, 16))));

const baseHTMLFile = "resources/svg-process.html";

const { window } = await JSDOM.fromFile(baseHTMLFile, { resources: "usable", runScripts: "dangerously" });

function getSVG(raw) {
  return window.eval(`getSVG(\`${raw}\`)`);
}

export const replaceKVGAttrs = (str) => {
  const kvgAttrs = [
    "type",
    "element",
    "variant",
    "partial",
    "original",
    "number",
    "tradForm",
    "radicalForm",
    "position",
    "radical",
    "part",
    "phon",
  ];

  for (const kvgAttr of kvgAttrs) {
    str = str.replace(new RegExp(`kvg:${kvgAttr}="[^"]*"`, "g"), "");
  }

  return str;
};

try {
  mkdirSync(PROCESSED_FOLDER, { recursive: true });
} catch (error) {
  if (error.errno != -4075) {
    throw error;
  }
}

window.onModulesLoaded = () => {
  let i = 0;
  for (const file of files) {
    // @ts-ignore
    writeFileSync(join(PROCESSED_FOLDER, file), optimize(replaceKVGAttrs(getSVG(readFileSync(join(RAW_FOLDER, file)).toString()))).data);
    console.log(file);
  }
  console.log("PROCESSING COMPLETED");
  window.close();
};
