export default async function getId(ctx) {
  await ctx.reply(ctx.from.id);
}
