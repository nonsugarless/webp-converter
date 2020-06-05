import getConfig from "../getConfig";
import setConfig from "../setConfig";
import { isTargetFile } from "../filter";

describe("outer", () => {
  test("valid target", async () => {
    const config = await setConfig(getConfig());
    await expect(
      await isTargetFile(
        `${config.originalDir}/**/*${config.targetExt}`,
        config
      )
    ).toBeTruthy();
  });

  test("invalid extention", async () => {
    const config = await setConfig(getConfig());
    await expect(
      await isTargetFile(`${config.originalDir}/**/*.webp`, config)
    ).toBeFalsy();
  });

  test("invalid extention", async () => {
    const config = await setConfig(getConfig());
    await expect(
      await isTargetFile(`${config.originalDir}/**/*.svg`, config)
    ).toBeFalsy();
  });

  test("hit directory blacklist", async () => {
    const config = await setConfig(getConfig("src/tests/test2"));
    await expect(
      await isTargetFile(
        `${config.originalDir}/ignore/test/*${config.targetExt}`,
        config
      )
    ).toBeFalsy();
  });

  test("hit file blacklist", async () => {
    const config = await setConfig(getConfig());
    await expect(
      await isTargetFile(
        `${config.originalDir}/**/apple-touch-icon.png`,
        config
      )
    ).toBeFalsy();
  });

  test("valid target", async () => {
    const config = await setConfig(getConfig());
    await expect(
      await isTargetFile(`${config.originalDir}/**/apple-touch-ico.png`, config)
    ).toBeTruthy();
  });
});
