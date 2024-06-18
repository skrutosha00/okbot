import config from "config";
import { Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";

import { BINDED_COMMANDS, COMMANDS } from "./commands/index.js";
import { INITIAL_SESSION, MODES } from "./global/globalVars.js";
import { EXIT_MESSAGE } from "./global/messages.js";
import gptTalk from "./utils/gptTalk.js";
import voiceTalk from "./utils/voiceTalk.js";

const bot = new Telegraf(config.get("BOT_TOKEN"));

bot.use(
  session({
    defaultSession: () => INITIAL_SESSION
  })
);

Object.keys(BINDED_COMMANDS).forEach((command) => {
  BINDED_COMMANDS[command](bot);
});

bot.on(message("text"), async (ctx) => {
  const MODES_FOR_TEXT = [MODES.CHAT, MODES.ONELINE];
  const mode = ctx.session.mode;

  if (!MODES_FOR_TEXT.includes(mode)) {
    await ctx.reply(
      `Данный режим не поддерживает текстовые сообщения. Перейдите в режим /${MODES.CHAT} или /${MODES.ONELINE}`
    );
    return;
  }

  if (mode === MODES.CHAT) {
    ctx.session.messages.push({ role: "user", content: ctx.message.text });
    const answer = await gptTalk(ctx);
    await ctx.reply(answer);

    ctx.session.messages.push({ role: "assistant", content: answer });
  }

  if (mode === MODES.ONELINE) {
    ctx.session.messages.push({ role: "user", content: ctx.message.text });
    const answer = await gptTalk(ctx);
    await ctx.reply(answer);

    ctx.session.messages = [];
  }
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

    if (Object.keys(COMMANDS).includes(clickedButton)) {
      COMMANDS[clickedButton](ctx);
    }

    if (clickedButton.includes("quizCb")) {
      ctx.session.quiz.checkAnswer(ctx);
    }
  } catch (error) {
    console.log(`callback_query: ${error}`);
  }
});

bot.launch({
  dropPendingUpdates: true
});

process.once("SIGINT", () => {
  bot.telegram.sendMessage(config.get("ADMIN_TG_ID"), EXIT_MESSAGE);
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.telegram.sendMessage(config.get("ADMIN_TG_ID"), EXIT_MESSAGE);
  bot.stop("SIGTERM");
});
