import { MODES } from "../global/globalVars.js";
import chat from "./chat.js";
import mode from "./mode.js";
import start from "./start.js";
import oneline from "./oneline.js";
import voice from "./voice.js";
import quiz from "./quiz.js";
import clear from "./clear.js";

export const COMMANDS = {
  start,
  mode,
  oneline,
  chat,
  voice,
  clear,
  quiz
};

export const BINDED_COMMANDS = {
  start: (bot) => bot.command("start", start),
  mode: (bot) => bot.command("mode", mode),
  oneline: (bot) => bot.command(MODES.ONELINE, oneline),
  chat: (bot) => bot.command(MODES.CHAT, chat),
  voice: (bot) => bot.command(MODES.VOICE, voice),
  clear: (bot) => bot.command("clear", clear),
  quiz: (bot) => bot.command(MODES.QUIZ, quiz)
};
