"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const isExistFile = (file) => {
    try {
        fs_1.default.statSync(file);
        return true;
    }
    catch (error) {
        if (error.code === "ENOENT") {
            return false;
        }
    }
};
exports.default = isExistFile;
//# sourceMappingURL=checkExistFile.js.map