import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";

const MODULE_PATH = path.dirname(url.fileURLToPath(import.meta.url));
const REPO_ROOT_PATH = path.resolve(MODULE_PATH, "..");

/**
 *
 * @param {fs.Stats | string | null | undefined} pathname
 * @returns
 */
export async function isDirectory(pathname) {
	if (!pathname) return false;
	try {
		let stats =
			typeof pathname === "string"
				? await fs.promises.stat(pathname)
				: pathname;
		return stats.isDirectory();
	} catch (err) {
		return false;
	}
}

/**
 *
 * @param {fs.Stats | string | null | undefined} pathname
 * @returns
 */
export async function isFile(pathname) {
	if (!pathname) return false;
	try {
		let stats =
			typeof pathname === "string"
				? await fs.promises.stat(pathname)
				: pathname;
		return stats.isFile();
	} catch (err) {
		return false;
	}
}

/**
 * @param {fs.Stats | string | null | undefined} pathname
 * @returns {Promise<boolean>}
 */
export async function pathExists(pathname) {
	if (!pathname) return false;
	try {
		let stats =
			typeof pathname === "string"
				? await fs.promises.stat(pathname)
				: pathname;
		return stats.isFile() || stats.isDirectory();
	} catch (err) {
		return false;
	}
}

/**
 * @param {string} rootPath
 * @param {{ recursive?: string }} [opts]
 * @returns {Promise<string[]>}
 */
export async function getSubDirectories(rootPath, opts = {}) {
	let recursive = opts?.recursive || false;
	let contents = await fs.promises.readdir(rootPath, { withFileTypes: true });
	/** @type {string[]} */
	let paths = [];
	for (let stat of contents) {
		if (!stat.isDirectory()) continue;
		let fullPath = path.resolve(rootPath, stat.name);
		paths.push(fullPath);
		if (recursive) {
			let subdirs = await getSubDirectories(fullPath, opts);
			paths.push(...subdirs);
		}
	}
	return paths;
}

/**
 * @returns {Promise<string[]>}
 */
export async function getExercisePaths() {
	return await getSubDirectories(path.join(REPO_ROOT_PATH, "exercise"));
}

/**
 * @returns {Promise<string[]>}
 */
export async function getFinalPaths() {
	return await getSubDirectories(path.join(REPO_ROOT_PATH, "final"));
}

/**
 * @returns {Promise<string[]>}
 */
export async function getAppPaths() {
	let dirs = await Promise.all([getExercisePaths(), getFinalPaths()]);
	return dirs.flat();
}

/**
 * @param {string} pathStart
 * @returns {Promise<string|undefined>}
 */
export async function resolveAppPath(pathStart) {
	return (await getAppPaths()).find((dir) =>
		path.resolve(dir).startsWith(path.resolve(pathStart))
	);
}

/**
 * @param {string} pathname
 */
export async function ensureDir(pathname) {
	if (!(await isDirectory(pathname))) {
		await fs.promises.mkdir(pathname, { recursive: true });
	}
}
