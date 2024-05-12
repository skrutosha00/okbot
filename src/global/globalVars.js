const MODES = {
  DEFAULT: "default",
  VOICE: "voice",
  TEXT: "text",
  CHAT: "chat"
};

const INITIAL_SESSION = {
  mode: MODES.DEFAULT,
  messages: []
};

export { MODES, INITIAL_SESSION };
