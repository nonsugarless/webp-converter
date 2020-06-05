import path from "path";
import getConfig from "../getConfig";
import setConfig from "../setConfig";

describe("outer", () => {
  test("valid optional config1", async () => {
    await expect(setConfig(getConfig())).resolves.toStrictEqual({
      destDir: `${path.resolve("./dest/img/")}`,
      convertedFile: `${path.resolve("./dest/img/**/*.webp")}`,
      originalDir: `${path.resolve("./htdocs/img/")}`,
      targetExt: ".+(jpg|jpeg|png|gif)",
      excludeFileNames: ["apple-touch-icon.png"],
      excludeDirNames: [],
      webpConverterOption: "-q 85",
      webpConverterGifOption: "-q 85"
    });
  });

  test("valid optional config2", async () => {
    await expect(
      setConfig(getConfig("src/tests/test2"))
    ).resolves.toStrictEqual({
      destDir: `${path.resolve("./htdocs/img/")}`,
      convertedFile: `${path.resolve("./htdocs/img/**/*.webp")}`,
      originalDir: `${path.resolve("./org/img/")}`,
      targetExt: ".+(jpg|jpeg|png|gif)",
      excludeFileNames: ["apple-touch-icon.png"],
      excludeDirNames: ["ignore/test", "ignore2"],
      webpConverterOption: "-q 75",
      webpConverterGifOption: "-q 90 -m 5 -mt"
    });
  });

  test("valid optional config3", async () => {
    await expect(setConfig(getConfig("src/tests/test"))).resolves.toStrictEqual(
      {
        destDir: `${path.resolve("./test/img/")}`,
        convertedFile: `${path.resolve("./test/img/**/*.webp")}`,
        originalDir: `${path.resolve("./test2/img/")}`,
        targetExt: ".+(jpg|png|gif)",
        excludeFileNames: [],
        excludeDirNames: [],
        webpConverterOption: "-q 85",
        webpConverterGifOption: "-q 85"
      }
    );
  });

  test("invalid config filename", async () => {
    await expect(
      setConfig(getConfig("noexistsfilename"))
    ).resolves.toStrictEqual({
      destDir: `${path.resolve("./htdocs/img/")}`,
      convertedFile: `${path.resolve("./htdocs/img/**/*.webp")}`,
      originalDir: `${path.resolve("./htdocs/img/")}`,
      targetExt: ".+(jpg|jpeg|png|gif)",
      excludeFileNames: ["apple-touch-icon.png"],
      excludeDirNames: [],
      webpConverterOption: "-q 85",
      webpConverterGifOption: "-q 85"
    });
  });
});
