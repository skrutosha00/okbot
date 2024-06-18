import { MODES } from "../global/globalVars.js";
import { MODE_INIT_MESSAGE } from "../global/messages.js";

export default async function voice(ctx) {
  ctx.session.mode = MODES.VOICE;
  await ctx.reply(MODE_INIT_MESSAGE[MODES.VOICE]);
}
