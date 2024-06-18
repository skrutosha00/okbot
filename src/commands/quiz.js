import { MODES } from "../global/globalVars.js";
import { MODE_INIT_MESSAGE } from "../global/messages.js";

export default async function quiz(ctx) {
  ctx.session.mode = MODES.QUIZ;
  await ctx.reply(MODE_INIT_MESSAGE[MODES.QUIZ]);
  await ctx.replyWithQuiz(
    "Самый лучший день?",
    ["Сегодня", "Я снова маленький солнце яркое", "Будто челюсть петикантропа"],
    {
      correct_option_id: 1,
      explanation: "Потому что я снова маленький солнце яркое"
    }
  );
}
