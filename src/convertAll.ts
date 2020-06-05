import glob from "glob";
import path from "path";
import getConfig from "./getConfig";
import setConfig from "./setConfig";
import convert from "./convert";

const WEBP_EXT = ".webp";

export default async function converAll() {
  const config = await setConfig(getConfig());
  const filePath = `${config.originalDir}/**/*${config.targetExt}`;

  glob(filePath, (error, files) => {
    if (error) {
      console.log(error);
    }
    for (const file of files) {
      const newFile =
        config.originalDir === config.destDir
          ? `${file}${WEBP_EXT}`
          : `${path
              .resolve(file)
              .replace(config.originalDir, config.destDir)}${WEBP_EXT}`;
      convert(file, newFile).catch(e => console.log(e));
    }
  });
}
