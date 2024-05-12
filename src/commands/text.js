export default function text(bot) {
  bot.command("text", async (ctx) => {
    ctx.session.mode = "text";
    await ctx.reply(`Режим текста включен ${ctx.session.mode}`);
  });
}
