import { Markup } from "telegraf";
import { INITIAL_SESSION, MODES } from "../global/globalVars.js";

const inlineKeyboard = [
  [Markup.button.callback("💻 Чат с Чат GPT", MODES.CHAT)],
  [Markup.button.callback("🗣 Голосовой режим", MODES.VOICE)],
  [Markup.button.callback("📱 Текстовый режим экономии токенов", MODES.ONELINE)],
  [Markup.button.callback("📚 Квиз от GPT (in progress)", MODES.QUIZ)]
];

export default function start(bot) {
  bot.command("start", async (ctx) => {
    ctx.session = INITIAL_SESSION;

    await ctx.reply(`прив ${ctx.message.from.id}`);
    await ctx.reply("выбери чем заняться", Markup.inlineKeyboard(inlineKeyboard));
  });
}
