# okbot

Великий Телеграм бот. Пока умеет только общаться в чате с помощью текста и голоса. Бот построен на GPT от OpenAI API.

# Общий принцип

Бот работает использует библиотеку Telegraf для обработки команд. Все команды бота находятся в папке `src/commands/`. Бот также использует два режима общения: текстовый и голосовой.

# Установка

Клонируйте репозиторий

Установите зависимости с помощью `npm install`

Создайте файлы `config/default.json` для тестового режима и `config/production.json` для прода и добавьте туда токен вашего бота, ключ от OpenAI API и Телеграм ID администратора. Пример содержимого файла:

```
  {
  "BOT_TOKEN": "123",
  "OPENAI_KEY": "456",
  "ADMIN_TG_ID": 789
  }
```

# Запуск

`npm start` для разработки или `npm run dev` для прода

# Команды

`/start`: Запускает бота

`/chat`: Переводит бота в режим чата

`/oneline`: Переводит бота в режим ответа на вопросы

`/quiz`: Переводит бота в режим квиза

`/voice`: Переводит бота в режим голосового помощника

`/clear`: Очищает историю бота

# Связаться со мной

tg: @newtyping
