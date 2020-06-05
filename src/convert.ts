import path from "path";
import fs from "fs";
import getConfig from "./getConfig";
import setConfig from "./setConfig";
import { isTargetFile } from "./filter";

const webp = require("webp-converter");

export default async function convert(
  input: string,
  output: string
): Promise<string> {
  const config = await setConfig(getConfig());

  return new Promise(async (resolve, reject) => {
    await isTargetFile(input, config)
      .then(result => {
        const newDir = path.dirname(output);
        if (!fs.existsSync(newDir) && result) {
          return new Promise(resolve => {
            fs.promises
              .mkdir(newDir, { recursive: true })
              .then(async () => await resolve(result))
              .catch(error => error);
          });
        } else {
          return new Promise(resolve => resolve(result));
        }
      })
      .then(result => {
        if (!result) {
          return reject(`${input} is ignored.`);
        }

        const ext = path.extname(input);
        const callback = (status: string, error: Error) => {
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
        } else {
          webp.cwebp(input, output, config.webpConverterOption, callback);
        }
      })
      .catch(error => console.log(error));
  });
}
