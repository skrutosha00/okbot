import { MODES } from "../global/globalVars.js";
import { MODE_INIT_MESSAGE } from "../global/messages.js";

export default async function oneline(ctx) {
  ctx.session.mode = MODES.ONELINE;
  ctx.session.messages = [];

  await ctx.reply(MODE_INIT_MESSAGE[MODES.ONELINE]);
}
