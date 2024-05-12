export default function voice(bot) {
  bot.command("voice", async (ctx) => {
    ctx.session.mode = "voice";
    await ctx.reply(`Режим войса включен ${ctx.session.mode}`);
  });
}
