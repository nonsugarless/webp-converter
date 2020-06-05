import fs from "fs";

const isExistFile = (file: string) => {
  try {
    fs.statSync(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
  }
};

export default isExistFile;
