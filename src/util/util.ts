import fs from "fs";
import Jimp = require("jimp");
import fetch from "node-fetch";

export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(inputURL);
      const data = await res.arrayBuffer();
      const photo = await Jimp.read(Buffer.from(data));
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256)
        .quality(60)
        .greyscale()
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
