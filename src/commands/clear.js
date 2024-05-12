export default function clear(bot) {
  bot.command("clear", async (ctx) => {
    ctx.session.messages = [];
    await ctx.reply("история общения очищена");
  });
}
