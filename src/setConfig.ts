import path from "path";
import { ConfigType } from "./configType";
import defaultConfig from "./defaultConfig";

export default async function setConfig(
  config: Promise<void | {
    config: any;
    filepath: string;
    isEmpty?: boolean | undefined;
  } | null>
) {
  const result = await config;
  const mergedConfig: ConfigType =
    result && !result.isEmpty
      ? { ...defaultConfig, ...result.config }
      : defaultConfig;

  return {
    ...mergedConfig,
    destDir: path.resolve(mergedConfig.destDir),
    originalDir: path.resolve(`${mergedConfig.originalDir}`),
    convertedFile: path.resolve(`${mergedConfig.destDir}**/*.webp`)
  };
}
