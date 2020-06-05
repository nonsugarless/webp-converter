#!/usr/bin/env node
import convertAll from "./convertAll";
import watch from "./watch";
import clean from "./clean";
import cleanAll from "./cleanAll";

const inputAction = process.argv[2];
const inputOption = process.argv[3];

const declaredOptions: {
  [key: string]: {
    action: () => Promise<any>;
    option?: { [key: string]: () => Promise<any> }[];
  };
} = {
  convert: {
    action: () => convertAll()
  },
  watch: {
    action: () => watch()
  },
  clean: {
    action: () => clean(),
    option: [{ "--all": () => cleanAll() }]
  }
};

const arrayGetKeys = (
  array:
    | {
        [key: string]: any;
      }[]
    | undefined
) => {
  if (!array) return [];
  const keys = [];
  for (let i = 0; i < array.length; i++) {
    keys.push(` '${Object.keys(array[i])}'`);
  }
  return keys;
};

if (inputOption) {
  const definedOption = () => declaredOptions[inputAction].option;

  const targetAction = definedOption()
    ? definedOption()!.filter(key => key[inputOption])
    : null;

  // when inputAction hit one of thats options
  if (targetAction && targetAction.length) {
    targetAction[0][inputOption]();
  } else {
    const message = definedOption()
      ? `There is no option '${inputOption}' in command '${inputAction}'. You can use the following options. ${arrayGetKeys(
          declaredOptions[inputAction].option
        )}`
      : `command '${inputAction}' has no options.`;
    console.log(message);
  }
} else {
  declaredOptions[inputAction].action();
}
