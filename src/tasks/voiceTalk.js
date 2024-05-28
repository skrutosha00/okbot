import { code } from "telegraf/format";

import { ogg } from "../ogg.js";
import { openai } from "../openai.js";
import { LOADING_MESSAGE } from "../global/messages.js";

export default async function voiceTalk(ctx) {
  try {
    const { message_id } = await ctx.reply(LOADING_MESSAGE);
    ctx.sendChatAction("typing");

    const userId = String(ctx.message.from.id);
    const filename = `${userId}_${ctx.message.message_id}`;
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);

    const oggPath = await ogg.create(link, filename);
    const mp3 = await ogg.toMp3(oggPath, filename);

    const text = await openai.transcription(mp3);
    ctx.deleteMessage(message_id);
    await ctx.reply(code(`Ваш запрос: ${text}`));
    ctx.session.messages.push({ role: "user", content: text });

    ctx.sendChatAction("typing");
    const answer = await openai.answerTextMessage(ctx.session.messages);
    await ctx.reply(answer);
    ctx.session.messages.push({ role: "assistant", content: answer });
  } catch (error) {
    console.error(`ошибка в voiceTalk: ${error}`);
  }
}
