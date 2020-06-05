import { cosmiconfig } from "cosmiconfig";

export default async function getConfig(optionFilename = "webpconverter") {
  const explorer = cosmiconfig(optionFilename);
  const result = await explorer.search().catch((error) => {
    console.log(error);
  });

  return result;
}
