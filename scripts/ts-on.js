import fs from "node:fs";
import path from "node:path";
import * as url from "node:url";
import { getAppPaths, pathExists } from "./utils.js";

const MODULE_PATH = path.dirname(url.fileURLToPath(import.meta.url));

main();

async function main() {
	let appPaths = await getAppPaths();
	let fileContents = await fs.promises.readFile(
		path.join(MODULE_PATH, "tsconfig-template.json"),
		"utf8"
	);
	for (let appPath of appPaths) {
		let filePath = path.resolve(appPath, "tsconfig.json");
		if (!(await pathExists(filePath))) {
			await fs.promises.writeFile(filePath, fileContents);
		}
	}
}
