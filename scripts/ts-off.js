import fs from "node:fs";
import path from "node:path";
import { getAppPaths, pathExists } from "./utils.js";

main();

async function main() {
	let appPaths = await getAppPaths();
	for (let appPath of appPaths) {
		let filePath = path.resolve(appPath, "tsconfig.json");
		if (await pathExists(filePath)) {
			await fs.promises.unlink(filePath);
		}
	}
}
