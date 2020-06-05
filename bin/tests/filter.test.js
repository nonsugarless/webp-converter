"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig_1 = __importDefault(require("../getConfig"));
const setConfig_1 = __importDefault(require("../setConfig"));
const filter_1 = require("../filter");
describe("outer", () => {
    test("valid target", async () => {
        const config = await setConfig_1.default(getConfig_1.default());
        await expect(await filter_1.isTargetFile(`${config.originalDir}/**/*${config.targetExt}`, config)).toBeTruthy();
    });
    test("invalid extention", async () => {
        const config = await setConfig_1.default(getConfig_1.default());
        await expect(await filter_1.isTargetFile(`${config.originalDir}/**/*.webp`, config)).toBeFalsy();
    });
    test("invalid extention", async () => {
        const config = await setConfig_1.default(getConfig_1.default());
        await expect(await filter_1.isTargetFile(`${config.originalDir}/**/*.svg`, config)).toBeFalsy();
    });
    test("hit directory blacklist", async () => {
        const config = await setConfig_1.default(getConfig_1.default("src/tests/test2"));
        await expect(await filter_1.isTargetFile(`${config.originalDir}/ignore/test/*${config.targetExt}`, config)).toBeFalsy();
    });
    test("hit file blacklist", async () => {
        const config = await setConfig_1.default(getConfig_1.default());
        await expect(await filter_1.isTargetFile(`${config.originalDir}/**/apple-touch-icon.png`, config)).toBeFalsy();
    });
    test("valid target", async () => {
        const config = await setConfig_1.default(getConfig_1.default());
        await expect(await filter_1.isTargetFile(`${config.originalDir}/**/apple-touch-ico.png`, config)).toBeTruthy();
    });
});
//# sourceMappingURL=filter.test.js.map