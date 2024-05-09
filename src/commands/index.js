import { INITIAL_SESSION } from "../globalVars.js";

function start(bot) {
  bot.command("start", async (ctx) => {
    ctx.session = INITIAL_SESSION;

    await ctx.reply(`прив ${ctx.message.from.id}`);
    await ctx.reply(`сейчас ты в голосовом режиме ${ctx.session.mode} так что скинь голосовое пообщаемся`);
  });
}

function mode(bot) {
  bot.command("mode", async (ctx) => {
    await ctx.reply(`Текущий режим ${ctx.session.mode}`);
  });
}

function text(bot) {
  bot.command("text", async (ctx) => {
    ctx.session.mode = "text";
    await ctx.reply(`Режим текста включен ${ctx.session.mode}`);
  });
}

function chat(bot) {
  bot.command("chat", async (ctx) => {
    ctx.session.mode = "chat";
    await ctx.reply(`Режим чата включен ${ctx.session.mode}`);
  });
}

function voice(bot) {
  bot.command("voice", async (ctx) => {
    ctx.session.mode = "voice";
    await ctx.reply(`Режим войса включен ${ctx.session.mode}`);
  });
}

function clear(bot) {
  bot.command("clear", async (ctx) => {
    ctx.session.messages = [];
    await ctx.reply("история общения очищена");
  });
}

export const COMMANDS = {
  start,
  mode,
  text,
  chat,
  voice,
  clear
};
