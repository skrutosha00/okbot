import { Telegraf } from "telegraf";
import config from "config";
import { message } from "telegraf/filters";
import { ogg } from "./ogg.js";
import { openai } from "./openai.js";

let mode = "voice";

const bot = new Telegraf(config.get("BOT_TOKEN"));

bot.command("start", async (ctx) => await ctx.reply(`прив ${ctx.message.from.id}`));

bot.command("mode", async (ctx) => {
  await ctx.reply(`Текущий режим ${mode}`);
});

bot.command("text", async (ctx) => {
  mode = "text";
  await ctx.reply(`Режим текста включен ${mode}`);
});

bot.command("voice", async (ctx) => {
  mode = "voice";
  await ctx.reply(`Режим войса включен ${mode}`);
});

bot.on(message("text"), async (ctx) => {
  if (mode !== "text") {
    ctx.reply("режим не текст");
    return;
  }

  try {
    ctx.reply("жестко думаю");
    const answer = await openai.answerTextMessage(ctx.message.text);
    await ctx.reply(answer);
  } catch (error) {
    await ctx.reply("ошибка!!");
    console.error(`ошибка!! ${error}`);
  }
});

bot.on(message("voice"), async (ctx) => {
  if (mode !== "voice") {
    ctx.reply("режим не войс");
    return;
  }

  ctx.reply("жестко думаю");

  try {
    const userId = String(ctx.message.from.id);
    const filename = `${userId}_${ctx.message.message_id}`;
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);

    const oggPath = await ogg.create(link, filename);
    console.log("oggPath", oggPath);
    const mp3 = await ogg.toMp3(oggPath, filename);
    const text = await openai.transcription(mp3);
    await ctx.reply(text);
  } catch (error) {
    console.error(`ошибка!! ${error}`);
  }
});

bot.launch();

process.once("SIGINT", () => {
  bot.telegram.sendMessage("жесткий дроп");
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.telegram.sendMessage("жесткий дроп");
  bot.stop("SIGTERM");
});
