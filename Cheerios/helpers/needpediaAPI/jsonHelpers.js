import * as fs from "fs/promises";
import { getPostDataJson } from "./fetchNeedPedia.js";

export const jsonFileMaker = async () => {
  try {
    const json = await getPostDataJson(true);
    console.log(json);
    await fs.writeFile("./data/data.json", JSON.stringify(json));
  } catch (e) {
    console.log(e);
  }
};
