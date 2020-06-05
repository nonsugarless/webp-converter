"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTargetFile = void 0;
const path_1 = __importDefault(require("path"));
exports.isTargetFile = async (filePath, config) => {
    const hitFileBlackListItems = config.excludeFileNames.filter(str => str.length !== 0 && filePath.includes(str));
    const isPassedFileBlackList = !hitFileBlackListItems.length;
    const excludeDirPath = (str) => path_1.default.join(config.originalDir, str);
    const hitDirBlackListItems = config.excludeDirNames.filter(str => str.length !== 0 &&
        path_1.default.resolve(path_1.default.dirname(filePath)).includes(excludeDirPath(str)));
    const isPassedDirBlackList = !hitDirBlackListItems.length;
    return (!filePath.includes(".webp") &&
        RegExp(config.targetExt).test(filePath) &&
        isPassedFileBlackList &&
        isPassedDirBlackList);
};
//# sourceMappingURL=filter.js.map