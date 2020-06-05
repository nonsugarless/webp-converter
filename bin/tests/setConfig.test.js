"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getConfig_1 = __importDefault(require("../getConfig"));
const setConfig_1 = __importDefault(require("../setConfig"));
describe("outer", () => {
    test("valid optional config1", async () => {
        await expect(setConfig_1.default(getConfig_1.default())).resolves.toStrictEqual({
            destDir: `${path_1.default.resolve("./dest/img/")}`,
            convertedFile: `${path_1.default.resolve("./dest/img/**/*.webp")}`,
            originalDir: `${path_1.default.resolve("./htdocs/img/")}`,
            targetExt: ".+(jpg|jpeg|png|gif)",
            excludeFileNames: ["apple-touch-icon.png"],
            excludeDirNames: [],
            webpConverterOption: "-q 85",
            webpConverterGifOption: "-q 85"
        });
    });
    test("valid optional config2", async () => {
        await expect(setConfig_1.default(getConfig_1.default("src/tests/test2"))).resolves.toStrictEqual({
            destDir: `${path_1.default.resolve("./htdocs/img/")}`,
            convertedFile: `${path_1.default.resolve("./htdocs/img/**/*.webp")}`,
            originalDir: `${path_1.default.resolve("./org/img/")}`,
            targetExt: ".+(jpg|jpeg|png|gif)",
            excludeFileNames: ["apple-touch-icon.png"],
            excludeDirNames: ["ignore/test", "ignore2"],
            webpConverterOption: "-q 75",
            webpConverterGifOption: "-q 90 -m 5 -mt"
        });
    });
    test("valid optional config3", async () => {
        await expect(setConfig_1.default(getConfig_1.default("src/tests/test"))).resolves.toStrictEqual({
            destDir: `${path_1.default.resolve("./test/img/")}`,
            convertedFile: `${path_1.default.resolve("./test/img/**/*.webp")}`,
            originalDir: `${path_1.default.resolve("./test2/img/")}`,
            targetExt: ".+(jpg|png|gif)",
            excludeFileNames: [],
            excludeDirNames: [],
            webpConverterOption: "-q 85",
            webpConverterGifOption: "-q 85"
        });
    });
    test("invalid config filename", async () => {
        await expect(setConfig_1.default(getConfig_1.default("noexistsfilename"))).resolves.toStrictEqual({
            destDir: `${path_1.default.resolve("./htdocs/img/")}`,
            convertedFile: `${path_1.default.resolve("./htdocs/img/**/*.webp")}`,
            originalDir: `${path_1.default.resolve("./htdocs/img/")}`,
            targetExt: ".+(jpg|jpeg|png|gif)",
            excludeFileNames: ["apple-touch-icon.png"],
            excludeDirNames: [],
            webpConverterOption: "-q 85",
            webpConverterGifOption: "-q 85"
        });
    });
});
//# sourceMappingURL=setConfig.test.js.map