"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chokidar_1 = __importDefault(require("chokidar"));
const convert_1 = __importDefault(require("./convert"));
const getConfig_1 = __importDefault(require("./getConfig"));
const setConfig_1 = __importDefault(require("./setConfig"));
const checkExistFile_1 = __importDefault(require("./checkExistFile"));
const WEBP_EXT = ".webp";
async function watch() {
    const config = await setConfig_1.default(getConfig_1.default());
    const originalDir = config.originalDir;
    const watcher = chokidar_1.default.watch(originalDir, {
        ignored: /^(.*)\.webp$/,
        awaitWriteFinish: true,
        persistent: true
    });
    const target = (filePath) => config.originalDir === config.destDir
        ? {
            newFile: `${filePath}${WEBP_EXT}`,
            deletedFile: filePath
        }
        : {
            newFile: `${filePath.replace(config.originalDir, config.destDir)}${WEBP_EXT}`,
            deletedFile: `${filePath.replace(config.originalDir, config.destDir)}${WEBP_EXT}`
        };
    watcher.on("ready", () => {
        console.log(`wacthing on ${originalDir}`);
        watcher
            .on("add", (filePath) => {
            if (path_1.default.extname(filePath) === WEBP_EXT)
                return;
            convert_1.default(filePath, target(filePath).newFile).catch(error => console.log(error));
        })
            .on("change", (filePath) => {
            if (path_1.default.extname(filePath) === WEBP_EXT)
                return;
            convert_1.default(filePath, target(filePath).newFile).catch(error => console.log(error));
        })
            .on("unlink", (filePath) => {
            if (checkExistFile_1.default(target(filePath).newFile)) {
                fs_1.default.unlinkSync(target(filePath).newFile);
            }
        })
            .on("error", (error) => console.log(error));
    });
}
exports.default = watch;
//# sourceMappingURL=watch.js.map