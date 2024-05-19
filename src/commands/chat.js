import { MODES } from "../global/globalVars.js";
import { MODE_INIT_MESSAGE } from "../global/messages.js";

export default function chat(bot) {
  bot.command(MODES.CHAT, async (ctx) => {
    ctx.session.mode = MODES.CHAT;
    ctx.session.messages = [];

    await ctx.reply(MODE_INIT_MESSAGE[MODES.CHAT]);
  });
}
