import { Telegraf, session } from "telegraf";
import config from "config";
import { message } from "telegraf/filters";
import { code } from "telegraf/format";
import { ogg } from "./ogg.js";
import { openai } from "./openai.js";
import { COMMANDS } from "./commands/index.js";
import { INITIAL_SESSION } from "./globalVars.js";

const loadingMessage = code("жестко думаю");

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
  ctx.session ??= INITIAL_SESSION;

  if (ctx.session.mode !== "chat") {
    ctx.reply("режим не чат");
    return;
  }

  try {
    ctx.reply(loadingMessage);

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
  ctx.session ??= INITIAL_SESSION;

  if (ctx.session.mode !== "voice") {
    ctx.reply("режим не войс");
    return;
  }

  ctx.reply(loadingMessage);

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
  bot.telegram.sendMessage(431152718, "жесткий дроп");
  console.log("жесткий дроп");
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.telegram.sendMessage(431152718, "жесткий дроп");
  console.log("жесткий дроп");
  bot.stop("SIGTERM");
});

export default bot;
