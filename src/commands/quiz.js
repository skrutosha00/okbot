export default function quiz(bot) {
  bot.command("quiz", async (ctx) => {
    ctx.replyWithQuiz(
      "Самый лучший день?",
      ["Сегодня", "Я снова маленький солнце яркое", "Будто челюсть петикантропа"],
      {
        correct_option_id: 2,
        explanation: "Потому что я снова маленький солнце яркое"
      }
    );
  });
}
