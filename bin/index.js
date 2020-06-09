"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convertAll_1 = __importDefault(require("./convertAll"));
const watch_1 = __importDefault(require("./watch"));
const clean_1 = __importDefault(require("./clean"));
const cleanAll_1 = __importDefault(require("./cleanAll"));
module.exports = {
    convert: convertAll_1.default(),
    watch: watch_1.default(),
    clean: clean_1.default(),
    cleanAll: cleanAll_1.default(),
};
//# sourceMappingURL=index.js.map