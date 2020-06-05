#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convertAll_1 = __importDefault(require("./convertAll"));
const watch_1 = __importDefault(require("./watch"));
const clean_1 = __importDefault(require("./clean"));
const cleanAll_1 = __importDefault(require("./cleanAll"));
const inputAction = process.argv[2];
const inputOption = process.argv[3];
const declaredOptions = {
    convert: {
        action: () => convertAll_1.default()
    },
    watch: {
        action: () => watch_1.default()
    },
    clean: {
        action: () => clean_1.default(),
        option: [{ "--all": () => cleanAll_1.default() }]
    }
};
const arrayGetKeys = (array) => {
    if (!array)
        return [];
    const keys = [];
    for (let i = 0; i < array.length; i++) {
        keys.push(` '${Object.keys(array[i])}'`);
    }
    return keys;
};
if (inputOption) {
    const definedOption = () => declaredOptions[inputAction].option;
    const targetAction = definedOption()
        ? definedOption().filter(key => key[inputOption])
        : null;
    if (targetAction && targetAction.length) {
        targetAction[0][inputOption]();
    }
    else {
        const message = definedOption()
            ? `There is no option '${inputOption}' in command '${inputAction}'. You can use the following options. ${arrayGetKeys(declaredOptions[inputAction].option)}`
            : `command '${inputAction}' has no options.`;
        console.log(message);
    }
}
else {
    declaredOptions[inputAction].action();
}
//# sourceMappingURL=index.js.map