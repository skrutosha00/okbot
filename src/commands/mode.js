export default function mode(bot) {
  bot.command("mode", async (ctx) => {
    await ctx.reply(`Текущий режим ${ctx.session.mode}`);
  });
}
