import { ERROR_MESSAGE, LOADING_MESSAGE } from "../global/messages.js";
import { openai } from "../utils/openai.js";

export default async function gptTalk(ctx) {
  try {
    const { message_id } = await ctx.reply(LOADING_MESSAGE);
    ctx.sendChatAction("typing");

    const answer = await openai.answerTextMessage(ctx.session.messages);
    ctx.deleteMessage(message_id);

    return answer;
  } catch (error) {
    await ctx.reply(ERROR_MESSAGE);
    console.log(`ошибка в gptTalk: ${error}`);
  }
}
