"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const defaultConfig_1 = __importDefault(require("./defaultConfig"));
async function setConfig(config) {
    const result = await config;
    const mergedConfig = result && !result.isEmpty
        ? { ...defaultConfig_1.default, ...result.config }
        : defaultConfig_1.default;
    return {
        ...mergedConfig,
        destDir: path_1.default.resolve(mergedConfig.destDir),
        originalDir: path_1.default.resolve(`${mergedConfig.originalDir}`),
        convertedFile: path_1.default.resolve(`${mergedConfig.destDir}**/*.webp`)
    };
}
exports.default = setConfig;
//# sourceMappingURL=setConfig.js.map