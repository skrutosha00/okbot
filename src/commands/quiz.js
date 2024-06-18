import { MODES } from "../global/globalVars.js";
import { MODE_INIT_MESSAGE } from "../global/messages.js";
import Quiz from "../utils/quiz.js";

export default async function quiz(ctx) {
  ctx.session.mode = MODES.QUIZ;
  ctx.session.messages = [];
  await ctx.reply(MODE_INIT_MESSAGE[MODES.QUIZ]);

  ctx.session.quiz = new Quiz(ctx);
  ctx.session.quiz.askQuestion();
}
