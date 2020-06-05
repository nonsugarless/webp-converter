import glob from "glob";
import fs from "fs";
import getConfig from "./getConfig";
import setConfig from "./setConfig";

export default async function cleanAll() {
  const config = await setConfig(getConfig());
  const filePath = config.convertedFile;

  glob(filePath, (error, files) => {
    if (error) {
      console.log(error);
    }
    for (const file of files) {
      fs.unlinkSync(file);
    }
  });
}
