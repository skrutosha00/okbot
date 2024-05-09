import { createWriteStream, unlink } from "fs";
import axios from "axios";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg";

const __dirname = dirname(fileURLToPath(import.meta.url));

class OggConverter {
  constructor() {
    ffmpeg.setFfmpegPath(installer.path);
  }

  async create(url, filename) {
    try {
      const oggPath = resolve(__dirname, `../voices`, `${filename}.ogg`);

      const response = await axios({
        method: "get",
        url,
        responseType: "stream"
      });

      const stream = createWriteStream(oggPath);
      response.data.pipe(stream);

      return new Promise((resolve) => {
        stream.on("finish", () => {
          resolve(oggPath);
        });
      });
    } catch (error) {
      console.error(`ошибка!! create ${error}`);
    }
  }

  async toMp3(input, output) {
    try {
      const outputPath = resolve(dirname(input), `${output}.mp3`);

      return new Promise((resolve, reject) => {
        ffmpeg(input)
          .inputOption("-t 30")
          .output(outputPath)
          .on("end", () => {
            unlink(input, (error) => {
              reject(`ошибка!! unlink ${error}`);
            });
            resolve(outputPath);
          })
          .run();
      });
    } catch (error) {
      console.error(`ошибка!! toMp3 ${error}`);
    }
  }
}

export const ogg = new OggConverter();
