"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const getConfig_1 = __importDefault(require("./getConfig"));
const setConfig_1 = __importDefault(require("./setConfig"));
async function cleanAll() {
    const config = await setConfig_1.default(getConfig_1.default());
    const filePath = config.convertedFile;
    glob_1.default(filePath, (error, files) => {
        if (error) {
            console.log(error);
        }
        for (const file of files) {
            fs_1.default.unlinkSync(file);
        }
    });
}
exports.default = cleanAll;
//# sourceMappingURL=cleanAll.js.map