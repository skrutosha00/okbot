import { code } from "telegraf/format";

import { MODES } from "./globalVars.js";

export const LOADING_MESSAGE = code("жестко думаю");

export const EXIT_MESSAGE = "жесткий дроп";

export const ERROR_MESSAGE = code(`Что-то пошло не так 🤯\nВозможно, бот умер 🤖`);

export const START_MESSAGES = ["прив", "выбери чем заняться"];

export const MODE_INIT_MESSAGE = {
  [MODES.VOICE]: "✅ Режим голосового помощника. Записывайте голосовые сообщения и получайте ответ от GPT.",
  [MODES.CHAT]: "✅ Режим чата. Бот будет запоминать контекст всего разговора. Расходует много токенов.",
  [MODES.ONELINE]:
    "✅ Режим ответа на вопросы. Бот не будет запоминать предыдущие сообщения. Экономно расходует токены.",
  [MODES.QUIZ]:
    "✅ Режим квиза. Бот будет спрашивать вопросы на различные темы и вести счёт правильных ответов. Для сброса истории вызовите команду /clear"
};
