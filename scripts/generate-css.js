import fs from "node:fs";
import path from "node:path";
import * as url from "node:url";
import { ensureDir, getAppPaths } from "./utils.js";

const MODULE_PATH = path.dirname(url.fileURLToPath(import.meta.url));

main();

async function main() {
	let cssSourcePath = path.join(MODULE_PATH, "css");
	let appPaths = await getAppPaths();
	let cssFiles = (await fs.promises.readdir(cssSourcePath))
		.map((file) => path.resolve(cssSourcePath, file))
		.filter((file) => path.extname(file) === ".css");
	for (let appPath of appPaths) {
		let publicDir = path.resolve(appPath, "public");
		await ensureDir(publicDir);
		for (let cssFile of cssFiles) {
			let filePath = path.resolve(publicDir, path.basename(cssFile));
			await fs.promises.copyFile(cssFile, filePath);
		}
	}
}
