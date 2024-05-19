import { MODES } from "../global/globalVars.js";
import { MODE_INIT_MESSAGE } from "../global/messages.js";

export default function oneline(bot) {
  bot.command(MODES.ONELINE, async (ctx) => {
    ctx.session.mode = MODES.ONELINE;
    ctx.session.messages = [];

    await ctx.reply(MODE_INIT_MESSAGE[MODES.ONELINE]);
  });
}
