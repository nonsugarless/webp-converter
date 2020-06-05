"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const getConfig_1 = __importDefault(require("./getConfig"));
const setConfig_1 = __importDefault(require("./setConfig"));
const checkExistFile_1 = __importDefault(require("./checkExistFile"));
async function clean() {
    const config = await setConfig_1.default(getConfig_1.default());
    const filePath = config.convertedFile;
    glob_1.default(filePath, (error, files) => {
        if (error) {
            console.log(error);
        }
        for (const file of files) {
            const ext = path_1.default.extname(file);
            const originalFile = config.originalDir === config.destDir
                ? file.replace(ext, "")
                : file.replace(config.destDir, config.originalDir).replace(ext, "");
            if (!checkExistFile_1.default(originalFile)) {
                fs_1.default.unlinkSync(file);
            }
        }
    });
}
exports.default = clean;
//# sourceMappingURL=clean.js.map