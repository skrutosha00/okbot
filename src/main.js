import config from "config";
import { Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";

import { ogg } from "./ogg.js";
import { openai } from "./openai.js";
import { COMMANDS } from "./commands/index.js";
import { INITIAL_SESSION } from "./global/globalVars.js";
import { EXIT_MESSAGE, LOADING_MESSAGE } from "./global/messages.js";

const bot = new Telegraf(config.get("BOT_TOKEN"));
bot.use(
  session({
    defaultSession: () => INITIAL_SESSION
  })
);

Object.keys(COMMANDS).forEach((command) => {
  COMMANDS[command](bot);
});

bot.on(message("text"), async (ctx) => {
  if (ctx.session.mode !== "chat") {
    ctx.reply("режим не чат");
    return;
  }

  try {
    ctx.reply(LOADING_MESSAGE);

    ctx.session.messages.push({ role: "user", content: ctx.message.text });

    const answer = await openai.answerTextMessage(ctx.session.messages);
    await ctx.reply(answer);
    ctx.session.messages.push({ role: "assistant", content: answer });
  } catch (error) {
    await ctx.reply("ошибка!!");
    console.error(`ошибка!! ${error}`);
  }
});

bot.on(message("voice"), async (ctx) => {
  if (ctx.session.mode !== "voice") {
    ctx.reply("режим не войс");
    return;
  }

  ctx.reply(LOADING_MESSAGE);

  try {
    const userId = String(ctx.message.from.id);
    const filename = `${userId}_${ctx.message.message_id}`;
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);

    const oggPath = await ogg.create(link, filename);
    const mp3 = await ogg.toMp3(oggPath, filename);

    const text = await openai.transcription(mp3);
    await ctx.reply(code(`Ваш запрос: ${text}`));
    ctx.session.messages.push({ role: "user", content: text });

    const answer = await openai.answerTextMessage(ctx.session.messages);
    await ctx.reply(answer);
    ctx.session.messages.push({ role: "assistant", content: answer });
  } catch (error) {
    console.error(`ошибка!! ${error}`);
  }
});

bot.launch();

process.once("SIGINT", () => {
  bot.telegram.sendMessage(config.get("ADMIN_TG_ID"), EXIT_MESSAGE);
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.telegram.sendMessage(config.get("ADMIN_TG_ID"), EXIT_MESSAGE);
  bot.stop("SIGTERM");
});
