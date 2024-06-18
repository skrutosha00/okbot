import { Markup } from "telegraf";

import { ERROR_MESSAGE } from "../global/messages.js";
import gptTalk from "./gptTalk.js";

const preferredTopics = [];

const initGPTMessage = {
  role: "system",
  content: `Придумай несложный вопрос на общую тему и я попробую на него ответить. 
  Вопрос должен иметь 4 варианта ответа.

  ОЧЕНЬ ВАЖНО: ты должен отвечать в виде JSON объекта.
  Обязательные поля: 
  - question: текст вопроса
  - answers: массив из 4 вариантов ответа
  - correct: индекс правильного ответа (0-3)
    
  ${preferredTopics.length ? `Предпочтительные темы вопроса: ${preferredTopics.join(", ")}` : ""}`
};

export default class Quiz {
  constructor(ctx) {
    this.ctx = ctx;
  }

  correct = 0;
  total = 0;

  currentOptions;
  currentCorrect;

  async askQuestion() {
    try {
      this.ctx.session.messages = [initGPTMessage];
      const answer = await gptTalk(this.ctx);
      this.ctx.session.messages.push({ role: "assistant", content: answer });

      const answerObj = JSON.parse(answer);

      this.currentOptions = answerObj.answers;
      this.currentCorrect = answerObj.correct;

      const inlineKeyboard = answerObj.answers.map((ans, i) => [Markup.button.callback(ans, "quizCb_" + i)]);

      await this.ctx.reply(`Вопрос: ${answerObj.question}`, Markup.inlineKeyboard(inlineKeyboard));
    } catch (err) {
      this.ctx.reply(ERROR_MESSAGE);
      console.log(`askQuestion: ${err}`);
    }
  }

  async checkAnswer(ctx) {
    const answer = ctx.update.callback_query.data.split("_")[1];
    const isCorrect = Number(answer) === this.currentCorrect;

    const correctAnswerMessage = "✅ Правильно";
    const incorrectAnswerMessage = `❌ Неверно, правильный ответ: ${
      this.currentOptions[this.currentCorrect]
    }, Ваш ответ: ${this.currentOptions[answer]}`;

    if (isCorrect) {
      this.correct++;
    }
    this.total++;

    if (isCorrect) {
      await this.ctx.reply(correctAnswerMessage);
    } else {
      await this.ctx.reply(incorrectAnswerMessage);
    }

    await this.ctx.reply(`Правильных ответов: ${this.correct} из ${this.total}`);
    this.askQuestion();
  }
}
