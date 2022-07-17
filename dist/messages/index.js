"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playingOnRealmMessage = exports.notSelectedClassYetMessage = void 0;

var playingOnRealmMessage = function playingOnRealmMessage(userCurrentCharacter) {
  return "You are playing on realm: ".concat(userCurrentCharacter.UserGroup.group.groupName, "\n<@").concat(userCurrentCharacter.UserGroup.user.user_id, ">");
};

exports.playingOnRealmMessage = playingOnRealmMessage;

var notSelectedClassYetMessage = function notSelectedClassYetMessage() {
  return 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`';
};

exports.notSelectedClassYetMessage = notSelectedClassYetMessage;