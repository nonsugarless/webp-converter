import path from "path";
import glob from "glob";
import fs from "fs";
import getConfig from "./getConfig";
import setConfig from "./setConfig";
import isExistFile from "./checkExistFile";

export default async function clean() {
  const config = await setConfig(getConfig());
  const filePath = config.convertedFile;

  glob(filePath, (error, files) => {
    if (error) {
      console.log(error);
    }
    for (const file of files) {
      const ext = path.extname(file);
      const originalFile =
        config.originalDir === config.destDir
          ? file.replace(ext, "")
          : file.replace(config.destDir, config.originalDir).replace(ext, "");

      if (!isExistFile(originalFile)) {
        fs.unlinkSync(file);
      }
    }
  });
}
