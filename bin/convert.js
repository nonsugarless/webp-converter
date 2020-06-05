"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getConfig_1 = __importDefault(require("./getConfig"));
const setConfig_1 = __importDefault(require("./setConfig"));
const filter_1 = require("./filter");
const webp = require("webp-converter");
async function convert(input, output) {
    const config = await setConfig_1.default(getConfig_1.default());
    return new Promise(async (resolve, reject) => {
        await filter_1.isTargetFile(input, config)
            .then(result => {
            const newDir = path_1.default.dirname(output);
            if (!fs_1.default.existsSync(newDir) && result) {
                return new Promise(resolve => {
                    fs_1.default.promises
                        .mkdir(newDir, { recursive: true })
                        .then(async () => await resolve(result))
                        .catch(error => error);
                });
            }
            else {
                return new Promise(resolve => resolve(result));
            }
        })
            .then(result => {
            if (!result) {
                return reject(`${input} is ignored.`);
            }
            const ext = path_1.default.extname(input);
            const callback = (status, error) => {
                switch (status) {
                    case "100":
                        resolve(status);
                        break;
                    case "101":
                        reject(error);
                        break;
                }
            };
            if (ext === ".gif") {
                webp.gwebp(input, output, config.webpConverterGifOption, callback);
            }
            else {
                webp.cwebp(input, output, config.webpConverterOption, callback);
            }
        })
            .catch(error => console.log(error));
    });
}
exports.default = convert;
//# sourceMappingURL=convert.js.map