import { MODES } from "../global/globalVars.js";
import { ERROR_MESSAGE, LOADING_MESSAGE } from "../global/messages.js";
import { openai } from "../openai.js";

export default async function gptTalk(ctx, mode) {
  try {
    const { message_id } = await ctx.reply(LOADING_MESSAGE);
    ctx.sendChatAction("typing");

    ctx.session.messages.push({ role: "user", content: ctx.message.text });

    const answer = await openai.answerTextMessage(ctx.session.messages);
    ctx.deleteMessage(message_id);
    await ctx.reply(answer);

    if (mode === MODES.CHAT) {
      ctx.session.messages.push({ role: "assistant", content: answer });
    } else if (mode === MODES.ONELINE) {
      ctx.session.messages = [];
    } else if (mode === MODES.QUIZ) {
    }
  } catch (error) {
    await ctx.reply(ERROR_MESSAGE);
    console.log(`ошибка в gptTalk: ${error}`);
  }
}
