"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDiscordUserIdFromMessageOrInteraction = void 0;

var fetchDiscordUserIdFromMessageOrInteraction = function fetchDiscordUserIdFromMessageOrInteraction(message) {
  var userId;

  if (message.user && message.user.id) {
    userId = message.user.id;
  } else if (message.author) {
    userId = message.author.id;
  } else {
    userId = message.user;
  }

  return userId;
};

exports.fetchDiscordUserIdFromMessageOrInteraction = fetchDiscordUserIdFromMessageOrInteraction;