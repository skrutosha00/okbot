export default function chat(bot) {
  bot.command("chat", async (ctx) => {
    ctx.session.mode = "chat";
    await ctx.reply(`Режим чата включен ${ctx.session.mode}`);
  });
}
