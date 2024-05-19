import config from "config";
import { Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";

import { COMMANDS } from "./commands/index.js";
import { INITIAL_SESSION, MODES } from "./global/globalVars.js";
import { EXIT_MESSAGE, MODE_INIT_MESSAGE } from "./global/messages.js";
import gptTalk from "./tasks/gptTalk.js";
import voiceTalk from "./tasks/voiceTalk.js";

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
  const mode = ctx.session.mode;

  if (mode !== MODES.CHAT && mode !== MODES.ONELINE) {
    await ctx.reply(`Перейдите в режим /${MODES.CHAT} или /${MODES.ONELINE}`);
    return;
  }

  gptTalk(ctx, mode);
});

bot.on(message("voice"), async (ctx) => {
  if (ctx.session.mode !== MODES.VOICE) {
    ctx.reply(`Выберите режим /${MODES.VOICE} для голосового чата`);
    return;
  }

  voiceTalk(ctx);
});

bot.on("callback_query", async (ctx) => {
  try {
    const clickedButton = ctx.callbackQuery.data;

    ctx.answerCbQuery(undefined, {
      show_alert: false
    });

    for (let mode of Object.values(MODES)) {
      if (clickedButton === mode) {
        ctx.session.mode = mode;
        await ctx.reply(MODE_INIT_MESSAGE[mode]);
        break;
      }
    }
  } catch (error) {
    console.log(`ошибка в callback_query: ${error}`);
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
