"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig_1 = require("cosmiconfig");
async function getConfig(optionFilename = "webpconverter") {
    const explorer = cosmiconfig_1.cosmiconfig(optionFilename);
    const result = await explorer.search().catch((error) => {
        console.log(error);
    });
    return result;
}
exports.default = getConfig;
//# sourceMappingURL=getConfig.js.map