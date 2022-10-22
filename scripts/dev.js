import path from "node:path";
import { pathExists, resolveAppPath } from "./utils.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const spawn = require("cross-spawn");

main(process.argv.slice(2));

async function main(args) {
	if (!args[0]) {
		console.error("You forgot to pass the exercise you want to run!");
		return;
	}
	let appDir = await resolveAppPath(args[0]);
	if (!(await pathExists(appDir))) {
		console.log(`${args[0]} is not a valid app`);
		return;
	}

	let [, category, numberAndName] = path.relative("..", appDir).split(path.sep);
	let [number] = numberAndName.split("-");
	let port = { exercise: 4000, final: 5000 }[category] + Number(number);

	spawn(`npm run dev`, {
		cwd: appDir,
		shell: true,
		stdio: "inherit",
		env: { PORT: port, ...process.env },
	});
}
