import { MODES } from "../global/globalVars.js";

export default function quiz(bot) {
  bot.command(MODES.QUIZ, async (ctx) => {
    ctx.session.mode = MODES.QUIZ;
    await ctx.reply(`Режим квиза включен ✅`);
    await ctx.replyWithQuiz(
      "Самый лучший день?",
      ["Сегодня", "Я снова маленький солнце яркое", "Будто челюсть петикантропа"],
      {
        correct_option_id: 1,
        explanation: "Потому что я снова маленький солнце яркое"
      }
    );
  });
}
