import glob from "glob";
import fs from "fs";
import getConfig from "./getConfig";
import setConfig from "./setConfig";
import checkExsitFile from "./checkExistFile";

export default async function cleanAll() {
  const config = await setConfig(getConfig());
  const filePath = config.convertedFile;

  glob(filePath, (error, files) => {
    for (const file of files) {
      if (!checkExsitFile(file)) return;
      fs.unlinkSync(file);
    }
  });
}
