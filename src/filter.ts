import path from "path";
import { ConfigType } from "./configType";

export const isTargetFile = async (filePath: string, config: ConfigType) => {
  const hitFileBlackListItems = config.excludeFileNames.filter(
    str => str.length !== 0 && filePath.includes(str)
  );
  const isPassedFileBlackList = !hitFileBlackListItems.length;

  const excludeDirPath = (str: string) => path.join(config.originalDir, str);

  const hitDirBlackListItems = config.excludeDirNames.filter(
    str =>
      str.length !== 0 &&
      path.resolve(path.dirname(filePath)).includes(excludeDirPath(str))
  );
  const isPassedDirBlackList = !hitDirBlackListItems.length;

  return (
    !filePath.includes(".webp") &&
    RegExp(config.targetExt).test(filePath) &&
    isPassedFileBlackList &&
    isPassedDirBlackList
  );
};
