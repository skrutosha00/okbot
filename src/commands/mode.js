export default async function mode(ctx) {
  await ctx.reply(`Текущий режим ${ctx.session.mode}`);
}
