import { MODES } from "../global/globalVars.js";

const MODES_FOR_CLEAR = [MODES.CHAT, MODES.VOICE, MODES.QUIZ];

export default async function clear(ctx) {
  if (!MODES_FOR_CLEAR.includes(ctx.session.mode)) {
    await ctx.reply("Команда /clear недоступна в этом режиме");
    return;
  }

  ctx.session.messages = [];
  await ctx.reply("История общения очищена");
}
