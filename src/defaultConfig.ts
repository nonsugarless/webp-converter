import { ConfigType } from "./configType";
const DEST_DIR = "./htdocs/img/";
const TARGET_EXT = ".+(jpg|jpeg|png|gif)";

export default {
  destDir: DEST_DIR,
  originalDir: DEST_DIR,
  targetExt: TARGET_EXT,
  excludeFileNames: ["apple-touch-icon.png"],
  excludeDirNames: [],
  webpConverterOption: "-q 85",
  webpConverterGifOption: "-q 85"
} as ConfigType;
