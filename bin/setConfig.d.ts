export default function setConfig(config: Promise<void | {
    config: any;
    filepath: string;
    isEmpty?: boolean | undefined;
} | null>): Promise<{
    destDir: string;
    originalDir: string;
    convertedFile: string;
    targetExt: string;
    excludeFileNames: string[];
    excludeDirNames: string[];
    webpConverterOption: string;
    webpConverterGifOption: string;
}>;
//# sourceMappingURL=setConfig.d.ts.map