import AdmZip from "adm-zip";
import { readFileSync, mkdirSync } from "fs";

const packageInfo = JSON.parse(readFileSync("package.json").toString());
const RELEASES_FOLDER = "releases";
const RELEASE_FILE = `${RELEASES_FOLDER}/${packageInfo.name.replace(" ", "_")}-${packageInfo.version}.zip`;

const addon = new AdmZip();

addon.addLocalFolder("addon");

try {
  mkdirSync(RELEASES_FOLDER, { recursive: true });
} catch (error) {
  if (error.errno != -4075) {
    throw error;
  }
}

addon.writeZip(RELEASE_FILE, () => console.log("Addon bundled"));
