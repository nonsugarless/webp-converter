import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import convert from "./convert";
import getConfig from "./getConfig";
import setConfig from "./setConfig";
import isExistFile from "./checkExistFile";

const WEBP_EXT = ".webp";

export default async function watch() {
  const config = await setConfig(getConfig());
  const originalDir = config.originalDir;
  const watcher = chokidar.watch(originalDir, {
    ignored: /^(.*)\.webp$/,
    awaitWriteFinish: true,
    persistent: true
  });
  const target = (filePath: string) =>
    config.originalDir === config.destDir
      ? {
          newFile: `${filePath}${WEBP_EXT}`,
          deletedFile: filePath
        }
      : {
          newFile: `${filePath.replace(
            config.originalDir,
            config.destDir
          )}${WEBP_EXT}`,
          deletedFile: `${filePath.replace(
            config.originalDir,
            config.destDir
          )}${WEBP_EXT}`
        };

  watcher.on("ready", () => {
    console.log(`wacthing on ${originalDir}`);

    watcher
      .on("add", (filePath: string) => {
        if (path.extname(filePath) === WEBP_EXT) return;
        convert(filePath, target(filePath).newFile).catch(error =>
          console.log(error)
        );
      })
      .on("change", (filePath: string) => {
        if (path.extname(filePath) === WEBP_EXT) return;
        convert(filePath, target(filePath).newFile).catch(error =>
          console.log(error)
        );
      })
      .on("unlink", (filePath: string) => {
        if (isExistFile(target(filePath).newFile)) {
          fs.unlinkSync(target(filePath).newFile);
        }
      })
      .on("error", (error: Error) => console.log(error));
  });
}
