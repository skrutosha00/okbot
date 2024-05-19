const MODES = {
  DEFAULT: "default",
  VOICE: "voice",
  ONELINE: "oneline",
  CHAT: "chat",
  QUIZ: "quiz"
};

const INITIAL_SESSION = {
  mode: MODES.DEFAULT,
  messages: []
};

export { MODES, INITIAL_SESSION };
