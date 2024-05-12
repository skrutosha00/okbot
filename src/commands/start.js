import { INITIAL_SESSION } from "../global/globalVars.js";

const answer = `Выбери режим для общения со мной`;

export default function start(bot) {
  bot.command("start", async (ctx) => {
    ctx.session = INITIAL_SESSION;

    await ctx.reply(`прив ${ctx.message.from.id}`);
    await ctx.reply(answer);
  });
}
