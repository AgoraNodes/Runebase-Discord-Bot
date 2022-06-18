export const fetchDiscordUserIdFromMessageOrInteraction = (
  message,
) => {
  let userId;
  if (message.user && message.user.id) {
    userId = message.user.id;
  } else if (message.author) {
    userId = message.author.id;
  } else {
    userId = message.user;
  }
  return userId;
};
