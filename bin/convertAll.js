"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const getConfig_1 = __importDefault(require("./getConfig"));
const setConfig_1 = __importDefault(require("./setConfig"));
const convert_1 = __importDefault(require("./convert"));
const WEBP_EXT = ".webp";
async function converAll() {
    const config = await setConfig_1.default(getConfig_1.default());
    const filePath = `${config.originalDir}/**/*${config.targetExt}`;
    glob_1.default(filePath, (error, files) => {
        if (error) {
            console.log(error);
        }
        for (const file of files) {
            const newFile = config.originalDir === config.destDir
                ? `${file}${WEBP_EXT}`
                : `${path_1.default
                    .resolve(file)
                    .replace(config.originalDir, config.destDir)}${WEBP_EXT}`;
            convert_1.default(file, newFile).catch(e => console.log(e));
        }
    });
}
exports.default = converAll;
//# sourceMappingURL=convertAll.js.map