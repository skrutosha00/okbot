import { Markup } from "telegraf";
import { INITIAL_SESSION, MODES } from "../global/globalVars.js";
import { START_MESSAGES } from "../global/messages.js";

const inlineKeyboard = [
  [Markup.button.callback("💻 Чат с Чат GPT", MODES.CHAT)],
  [Markup.button.callback("🗣 Голосовой режим", MODES.VOICE)],
  [Markup.button.callback("📱 Текстовый режим экономии токенов", MODES.ONELINE)],
  [Markup.button.callback("📚 Квиз от GPT", MODES.QUIZ)]
];

export default async function start(ctx) {
  ctx.session = INITIAL_SESSION;

  await ctx.reply(START_MESSAGES[0]);
  await ctx.reply(START_MESSAGES[1], Markup.inlineKeyboard(inlineKeyboard));
}
