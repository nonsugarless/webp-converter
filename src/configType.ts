export type ConfigType = {
  destDir: string;
  originalDir: string;
  targetExt: string;
  convertedFile?: string;
  excludeFileNames: string[];
  excludeDirNames: string[];
  webpConverterOption: string;
  webpConverterGifOption: string;
};
