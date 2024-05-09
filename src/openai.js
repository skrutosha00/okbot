import OpenAI from "openai";
import config from "config";
import fs from "fs";

class MyOpenAI {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.get("OPENAI_KEY")
    });
  }

  async answerTextMessage(text) {
    try {
      const complections = await this.openai.chat.completions.create({
        messages: [{ role: "system", content: text }],
        model: "gpt-3.5-turbo"
      });

      return complections.choices[0].message.content;
    } catch (error) {
      console.error(`ошибка!! answerTextMessage ${error}`);
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(filepath),
        model: "whisper-1"
      });

      return response.text;
    } catch (error) {
      console.error(`ошибка!! transcription ${error}`);
    }
  }
}

export const openai = new MyOpenAI();
