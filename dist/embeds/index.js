"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnDirectMessage = exports.walletNotFoundMessage = exports.userNotFoundMessage = exports.unableToWithdrawToSelfMessage = exports.timeOutMessage = exports.skillInfoMessage = exports.skillConfirmationMessage = exports.rolledDiceMessage = exports.rollDiceTooFastMessage = exports.reviewMessage = exports.resetStatsDeclinedMessage = exports.resetStatsConfirmationMessage = exports.resetStatsCompletemessage = exports.resetSkillCompleteMessage = exports.realmNotFoundEmbed = exports.realmChangeSuccessEmbed = exports.priceMessage = exports.needToBeInDiscordRealmEmbed = exports.minimumMessage = exports.loadingSkillSelectEmbed = exports.loadingSkillAddEmbed = exports.levelUpMessage = exports.invitedNewUserRewardMessage = exports.invalidAmountMessage = exports.invalidAddressMessage = exports.insufficientBalanceMessage = exports.helpMessage = exports.healCompleteMessage = exports.grantRoleExpMessage = exports.gainVoteTopggExpMessage = exports.gainTestExpMessage = exports.gainBattleExpExpMessage = exports.gainActiveTalkerExpMessage = exports.featureDisabledServerMessage = exports.featureDisabledGlobalMessage = exports.featureDisabledChannelMessage = exports.enterWithdrawalAmount = exports.enterWithdrawalAddress = exports.discordWithdrawalConfirmedMessage = exports.discordWithdrawalAcceptedMessage = exports.discordWelcomeMessage = exports.discordUserWithdrawalRejectMessage = exports.discordUserBannedMessage = exports.discordServerBannedMessage = exports.discordLimitSpamMessage = exports.discordIncomingDepositMessage = exports.discordErrorMessage = exports.discordDepositConfirmedMessage = exports.discordChannelBannedMessage = exports.discordBotMaintenanceMessage = exports.discordBotDisabledMessage = exports.depositAddressMessage = exports.declineResetSkillsMessage = exports.declineHealMessage = exports.confirmationHealMessage = exports.coinInfoMessage = exports.cannotSendMessageUser = exports.balanceMessage = exports.alreadyVotedTopGG = exports.alreadyInRealmEmbed = exports.addingAttributeEmbed = exports.NotInDirectMessage = exports.AccountInfoMessage = void 0;

var _discord = require("discord.js");

var _settings = _interopRequireDefault(require("../config/settings"));

var _package = _interopRequireDefault(require("../../package.json"));

var _utils = require("../helpers/utils");

// import moment from 'moment';
var discordUserBannedMessage = function discordUserBannedMessage(user) {
  var result = new _discord.MessageEmbed().setColor("#C70039").setTitle("\uD83D\uDEAB     User: ".concat(user.username, " Banned     \uD83D\uDEAB")).setDescription("Reason:\n".concat(user.banMessage)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordUserBannedMessage = discordUserBannedMessage;

var discordServerBannedMessage = function discordServerBannedMessage(server) {
  var result = new _discord.MessageEmbed().setColor("#C70039").setTitle('🚫     Server Banned     🚫').setDescription("Reason:\n".concat(server.banMessage)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordServerBannedMessage = discordServerBannedMessage;

var priceMessage = function priceMessage(replyString) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Price').setThumbnail(_settings["default"].bot.logo).setDescription(replyString).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.priceMessage = priceMessage;

var discordChannelBannedMessage = function discordChannelBannedMessage(channel) {
  var result = new _discord.MessageEmbed().setColor('#FF7900').setTitle('❗     Channel Restricted     ❗').setDescription("Reason:\n".concat(channel.banMessage)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordChannelBannedMessage = discordChannelBannedMessage;

var coinInfoMessage = function coinInfoMessage(blockHeight, priceInfo, walletVersion) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Tipbot').addField("Coin Info", _settings["default"].coin.description).addField("\u200B", "\u200B").addFields({
    name: "Coin Name",
    value: _settings["default"].coin.name,
    inline: true
  }, {
    name: "Ticker",
    value: _settings["default"].coin.ticker,
    inline: true
  }).addField("\u200B", "\u200B").addFields({
    name: "Current block height",
    value: "".concat(blockHeight),
    inline: true
  }, {
    name: "Wallet version",
    value: "".concat(walletVersion),
    inline: true
  }).addField("\u200B", "\u200B").addField("Website", _settings["default"].coin.website).addField("Github", _settings["default"].coin.github).addField("Block Explorer", _settings["default"].coin.explorer).addField("Discord Server", _settings["default"].coin.discord).addField("Telegram Group", _settings["default"].coin.telegram).addField("Exchanges", _settings["default"].coin.exchanges.join('\n')).addField("Current price", "$".concat(priceInfo.price, " (source: coinpaprika)")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.coinInfoMessage = coinInfoMessage;

var discordLimitSpamMessage = function discordLimitSpamMessage(userId, myFunctionName) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(myFunctionName).setDescription("\uD83D\uDEAB Slow down! \uD83D\uDEAB\n<@".concat(userId, ">, you're using this command too fast, wait a while before using it again.")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordLimitSpamMessage = discordLimitSpamMessage;

var cannotSendMessageUser = function cannotSendMessageUser(title, message) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(message.author.id, ">, ").concat(_settings["default"].bot.name, " was unable to send you a direct message.\nPlease check your discord privacy settings.")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.cannotSendMessageUser = cannotSendMessageUser;

var discordErrorMessage = function discordErrorMessage(title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("Something went wrong.").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordErrorMessage = discordErrorMessage;

var discordDepositConfirmedMessage = function discordDepositConfirmedMessage(amount, trans) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Deposit #".concat(trans.id)).setDescription("Deposit Confirmed\n".concat(trans.amount / 1e8, " ").concat(_settings["default"].coin.ticker, " has been credited to your wallet")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordDepositConfirmedMessage = discordDepositConfirmedMessage;

var discordIncomingDepositMessage = function discordIncomingDepositMessage(detail) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Deposit #".concat(detail.transaction[0].id)).setDescription("incoming deposit detected for ".concat(detail.amount, " ").concat(_settings["default"].coin.ticker, "\nBalance will be reflected in your wallet in ~").concat(_settings["default"].confirmations, "+ confirmations\n").concat(_settings["default"].coin.explorer, "/tx/").concat(detail.transaction[0].txid)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordIncomingDepositMessage = discordIncomingDepositMessage;

var discordUserWithdrawalRejectMessage = function discordUserWithdrawalRejectMessage(title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Withdraw').setDescription("Your withdrawal has been rejected").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordUserWithdrawalRejectMessage = discordUserWithdrawalRejectMessage;

var reviewMessage = function reviewMessage(userId, transaction) {
  var amount = (transaction.amount / 1e8).toFixed(8).replace(/(\.0+|0+)$/, '');
  var fee = (transaction.feeAmount / 1e8).toFixed(8).replace(/(\.0+|0+)$/, '');
  var total = ((transaction.amount - transaction.feeAmount) / 1e8).toFixed(8).replace(/(\.0+|0+)$/, '');
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Withdraw #".concat(transaction.id)).setDescription("<@".concat(userId, ">, Your withdrawal is being reviewed\n\namount: **").concat(amount, " ").concat(_settings["default"].coin.ticker, "**\nfee: **").concat(fee, " ").concat(_settings["default"].coin.ticker, "**\ntotal: **").concat(total, " ").concat(_settings["default"].coin.ticker, "**")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.reviewMessage = reviewMessage;

var discordWithdrawalAcceptedMessage = function discordWithdrawalAcceptedMessage(updatedTrans) {
  var amount = (updatedTrans.amount / 1e8).toFixed(8).replace(/(\.0+|0+)$/, '');
  var fee = (updatedTrans.feeAmount / 1e8).toFixed(8).replace(/(\.0+|0+)$/, '');
  var total = ((updatedTrans.amount - updatedTrans.feeAmount) / 1e8).toFixed(8).replace(/(\.0+|0+)$/, '');
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Withdraw #".concat(updatedTrans.id)).setDescription("Your withdrawal has been accepted\n\namount: **".concat(amount, " ").concat(_settings["default"].coin.ticker, "**\nfee: **").concat(fee, " ").concat(_settings["default"].coin.ticker, "**\ntotal: **").concat(total, " ").concat(_settings["default"].coin.ticker, "**").concat(_settings["default"].coin.setting === 'Pirate' && updatedTrans.memo && updatedTrans.memo !== '' ? "\nmemo: **".concat(updatedTrans.memo, "**") : '', "\n\n").concat(_settings["default"].coin.explorer, "/tx/").concat(updatedTrans.txid)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordWithdrawalAcceptedMessage = discordWithdrawalAcceptedMessage;

var discordWithdrawalConfirmedMessage = function discordWithdrawalConfirmedMessage(userId, trans) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Withdraw #".concat(trans.id)).setDescription("<@".concat(userId, ">, Your withdrawal has been complete")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordWithdrawalConfirmedMessage = discordWithdrawalConfirmedMessage;

var balanceMessage = function balanceMessage(userId, user, priceInfo) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Balance').setDescription("<@".concat(userId, ">'s current available balance: ").concat(user.wallet.available / 1e8, " ").concat(_settings["default"].coin.ticker, "\n<@").concat(userId, ">'s current locked balance: ").concat(user.wallet.locked / 1e8, " ").concat(_settings["default"].coin.ticker, "\nEstimated value of <@").concat(userId, ">'s balance: $").concat(((user.wallet.available + user.wallet.locked) / 1e8 * priceInfo.price).toFixed(2))).setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.balanceMessage = balanceMessage;

var depositAddressMessage = function depositAddressMessage(userId, user) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Deposit').setDescription("<@".concat(userId, ">'s deposit address:\n*").concat(user.wallet.address.address, "*")).setImage("attachment://qr.png").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.depositAddressMessage = depositAddressMessage;

var walletNotFoundMessage = function walletNotFoundMessage(message, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(message.author.id, ">, Wallet not found")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.walletNotFoundMessage = walletNotFoundMessage;

var userNotFoundMessage = function userNotFoundMessage(message, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(message.author.id, ">, User not found")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.userNotFoundMessage = userNotFoundMessage;

var NotInDirectMessage = function NotInDirectMessage(message, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(message.author.id, ">, Can't use this command in a direct message")).setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.NotInDirectMessage = NotInDirectMessage;

var discordWelcomeMessage = function discordWelcomeMessage(userInfo) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Bot").setDescription("Welcome <@".concat(userInfo.id, ">, Welcome to Runebase.\nType \"").concat(_settings["default"].bot.command, " help\" for bot usage info")).setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordWelcomeMessage = discordWelcomeMessage;

var discordBotMaintenanceMessage = function discordBotMaintenanceMessage() {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Bot").setDescription("Discord tipbot maintenance").setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordBotMaintenanceMessage = discordBotMaintenanceMessage;

var gainTestExpMessage = function gainTestExpMessage(userId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, you have been rewarded ").concat(amount, " test experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.gainTestExpMessage = gainTestExpMessage;

var rolledDiceMessage = function rolledDiceMessage(userId, expRewarded, randomNumberOne, randomNumberTwo, rewardAmount) {
  var isSnakeEyes = !!(randomNumberOne === 1 && randomNumberTwo === 1);
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Roll Dice').setDescription("<@".concat(userId, ">, You rolled the dice!\n").concat(isSnakeEyes ? "\uD83D\uDC41 Snake eyes \uD83D\uDC41" : "dice: ".concat(randomNumberOne, "\ndice: ").concat(randomNumberTwo), "\n\nyou have been rewarded ").concat(rewardAmount / 1e8, " RUNES and ").concat(expRewarded, " experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.rolledDiceMessage = rolledDiceMessage;

var rollDiceTooFastMessage = function rollDiceTooFastMessage(userId, distance) {
  var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(distance % (1000 * 60) / 1000);
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Roll Dice').setDescription("<@".concat(userId, ">, you have to wait ").concat(hours === 1 ? "".concat(hours, " hour") : '').concat(hours > 1 ? "".concat(hours, " hours,") : '', " ").concat(minutes === 1 ? "".concat(minutes, " minute") : '').concat(minutes > 1 ? "".concat(minutes, " minutes and") : '', " ").concat(seconds === 1 ? "".concat(seconds, " second") : '').concat(seconds > 1 ? "".concat(seconds, " seconds") : '', " before you can roll the dice again (you can roll the dice every 3 hours).")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.rollDiceTooFastMessage = rollDiceTooFastMessage;

var grantRoleExpMessage = function grantRoleExpMessage(userLength, role, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Grant Exp to role').setDescription("Congratulations!\nThe ".concat(userLength, " users on the ").concat(role, " role have been granted ").concat(amount, " experience each!")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.grantRoleExpMessage = grantRoleExpMessage;

var gainBattleExpExpMessage = function gainBattleExpExpMessage(userId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Congratulations!\nyou gained ").concat(amount, " experience from your battle!")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.gainBattleExpExpMessage = gainBattleExpExpMessage;

var gainActiveTalkerExpMessage = function gainActiveTalkerExpMessage(userId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Thank you for being so talkative in our community today!\nyou have been rewarded ").concat(amount, " experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.gainActiveTalkerExpMessage = gainActiveTalkerExpMessage;

var alreadyVotedTopGG = function alreadyVotedTopGG(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Thank you for your enthousiasme.\nYou already voted past 12h, so we could not grant you experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.alreadyVotedTopGG = alreadyVotedTopGG;

var invitedNewUserRewardMessage = function invitedNewUserRewardMessage(userId, joinedUserId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Thank you for inviting <@").concat(joinedUserId, "> to the Runebase server.\nyou have been rewarded ").concat(amount, " experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.invitedNewUserRewardMessage = invitedNewUserRewardMessage;

var realmChangeSuccessEmbed = function realmChangeSuccessEmbed(server) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Change Realm Success').setDescription("You are now on realm:\n".concat(server.groupName)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.realmChangeSuccessEmbed = realmChangeSuccessEmbed;

var needToBeInDiscordRealmEmbed = function needToBeInDiscordRealmEmbed(server) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Change Realm Failed').setDescription("You need to join the realm's discord server to be able to participate on this realm\n    \nInvite link:\n".concat(server.inviteLink, "\n\nOr choose another realm with \n`!runebase changerealm` \nor \n`/changerealm`")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.needToBeInDiscordRealmEmbed = needToBeInDiscordRealmEmbed;

var gainVoteTopggExpMessage = function gainVoteTopggExpMessage(userId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Thank you for voting for Runebase on TopGG.\nyou have been rewarded ").concat(amount, " experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.gainVoteTopggExpMessage = gainVoteTopggExpMessage;

var levelUpMessage = function levelUpMessage(userId, rank) {
  console.log('sending level up message');
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("Congratulations <@".concat(userId, ">\nYou gained a level\nYou are now a ").concat(rank.name, " (lvl ").concat(rank.level, ")")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.levelUpMessage = levelUpMessage;

var discordBotDisabledMessage = function discordBotDisabledMessage() {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("Bot").setDescription("Discord tipbot disabled").setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.discordBotDisabledMessage = discordBotDisabledMessage;

var warnDirectMessage = function warnDirectMessage(userId, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(userId, ">, I've sent you a direct message.")).setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.warnDirectMessage = warnDirectMessage;

var timeOutMessage = function timeOutMessage() {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Time out').setDescription("Operation canceled").setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.timeOutMessage = timeOutMessage;

var enterWithdrawalAddress = function enterWithdrawalAddress() {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Withdraw').setDescription("Please enter a Runebase withdrawal address:").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.enterWithdrawalAddress = enterWithdrawalAddress;

var enterWithdrawalAmount = function enterWithdrawalAmount() {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Withdraw').setDescription("Please enter the amount of runes you want to withdraw:").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.enterWithdrawalAmount = enterWithdrawalAmount;

var invalidAmountMessage = function invalidAmountMessage(userId, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(userId, ">, Invalid Amount")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.invalidAmountMessage = invalidAmountMessage;

var confirmationHealMessage = function confirmationHealMessage(userId, available) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Heal').setDescription("<@".concat(userId, ">, Healing costs 0.1 RUNES. \n\nAvailable Balance: **").concat(available / 1e8, " RUNES**\nTotal Cost: **0.1 RUNES**\n    \nAre you sure you want to heal?")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.confirmationHealMessage = confirmationHealMessage;

var healCompleteMessage = function healCompleteMessage(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Heal').setDescription("\uD83D\uDC8B Freyja has kissed <@".concat(userId, ">. \uD83D\uDC8B\n<@").concat(userId, "> is now Healed!")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.healCompleteMessage = healCompleteMessage;

var declineHealMessage = function declineHealMessage(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Heal').setDescription("<@".concat(userId, ">, declined heal")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.declineHealMessage = declineHealMessage;

var insufficientBalanceMessage = function insufficientBalanceMessage(userId, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(userId, ">, you have Insufficient balance")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.insufficientBalanceMessage = insufficientBalanceMessage;

var resetSkillCompleteMessage = function resetSkillCompleteMessage(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Reset Skills').setDescription("<@".concat(userId, ">, Your skills have been reset!")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.resetSkillCompleteMessage = resetSkillCompleteMessage;

var skillConfirmationMessage = function skillConfirmationMessage(userId, available, totalSkillsCost) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Reset Skills').setDescription("<@".concat(userId, ">, Resetting your skills costs 1 RUNES for each skill point.\n\nAvailable Balance: **").concat(available / 1e8, " RUNES**\nTotal cost: **").concat(totalSkillsCost, " RUNES**\n    \nAre you sure you want to reset your skills?")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.skillConfirmationMessage = skillConfirmationMessage;

var declineResetSkillsMessage = function declineResetSkillsMessage(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Reset Skills').setDescription("<@".concat(userId, ">, declined reset skills")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.declineResetSkillsMessage = declineResetSkillsMessage;

var resetStatsDeclinedMessage = function resetStatsDeclinedMessage(userId, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Reset Stats').setDescription("<@".concat(userId, ">, declined reset stats")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.resetStatsDeclinedMessage = resetStatsDeclinedMessage;

var resetStatsConfirmationMessage = function resetStatsConfirmationMessage(userId, available, totalStatsCost) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Reset Stats').setDescription("<@".concat(userId, ">, Resetting your stats costs 0.1 RUNES for each attribute.\n\nAvailable Balance: **").concat(available / 1e8, " RUNES**\nTotal cost: **").concat(totalStatsCost, " RUNES**\n    \nAre you sure you want to reset your stats?")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.resetStatsConfirmationMessage = resetStatsConfirmationMessage;

var minimumMessage = function minimumMessage(userId, setting, type) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(type).setDescription("<@".concat(userId, ">, Minimum ").concat(type, " is ").concat(setting.min / 1e8, " ").concat(_settings["default"].coin.ticker)).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.minimumMessage = minimumMessage;

var invalidAddressMessage = function invalidAddressMessage(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Withdraw').setDescription("<@".concat(userId, ">, Invalid ").concat(_settings["default"].coin.name, " Address")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.invalidAddressMessage = invalidAddressMessage;

var unableToWithdrawToSelfMessage = function unableToWithdrawToSelfMessage(message) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Tip').setDescription("<@".concat(message.author.id, ">, unable to withdraw to your own deposit address")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.unableToWithdrawToSelfMessage = unableToWithdrawToSelfMessage;

var skillInfoMessage = function skillInfoMessage(name, description) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(name || 'Skill not found').setDescription("".concat(description || 'No skill Info found')).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.skillInfoMessage = skillInfoMessage;

var loadingSkillAddEmbed = function loadingSkillAddEmbed(username) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Adding Skill Point').setDescription("".concat(username, ", Adding skill..")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.loadingSkillAddEmbed = loadingSkillAddEmbed;

var loadingSkillSelectEmbed = function loadingSkillSelectEmbed(username) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Selecting Skill').setDescription("".concat(username, ", Loading skill selection..")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.loadingSkillSelectEmbed = loadingSkillSelectEmbed;

var AccountInfoMessage = function AccountInfoMessage() {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Account Information').setDescription("Shows discord account information").setThumbnail(_settings["default"].bot.logo).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.AccountInfoMessage = AccountInfoMessage;

var featureDisabledChannelMessage = function featureDisabledChannelMessage(name) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(name).setDescription("This Feature has been disabled for this channel").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.featureDisabledChannelMessage = featureDisabledChannelMessage;

var featureDisabledServerMessage = function featureDisabledServerMessage(name) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(name).setDescription("This Feature has been disabled for this server").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.featureDisabledServerMessage = featureDisabledServerMessage;

var featureDisabledGlobalMessage = function featureDisabledGlobalMessage(name) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(name).setDescription("This Feature has been disabled").setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.featureDisabledGlobalMessage = featureDisabledGlobalMessage;

var resetStatsCompletemessage = function resetStatsCompletemessage(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Reset Stats').setDescription("<@".concat(userId, ">, Your stats have been reset!")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.resetStatsCompletemessage = resetStatsCompletemessage;

var alreadyInRealmEmbed = function alreadyInRealmEmbed(user) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Change Realm').setDescription("<@".concat(user.user_id, ">, You are already in this realm currently.")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.alreadyInRealmEmbed = alreadyInRealmEmbed;

var realmNotFoundEmbed = function realmNotFoundEmbed(user) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Change Realm').setDescription("<@".concat(user.user_id, ">, We can't find the realm you are trying to join")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.realmNotFoundEmbed = realmNotFoundEmbed;

var addingAttributeEmbed = function addingAttributeEmbed(userCurrentCharacter) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Change Realm').setDescription("<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">, Loading..")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.addingAttributeEmbed = addingAttributeEmbed;

var helpMessage = function helpMessage(withdraw) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("".concat("".concat(_settings["default"].bot.name, " v").concat(_package["default"].version), " Help")).setDescription("`".concat(_settings["default"].bot.command, "`\nDisplays this message\n\n`/help`\n`").concat(_settings["default"].bot.command, " help`\nDisplays this message\n\n`/pickclass`\n`").concat(_settings["default"].bot.command, " pickclass`\nSelect a new class\n\n`/stats`\n`").concat(_settings["default"].bot.command, " stats`\nSelect stats (attributes) for your class\n\n`/inventory`\n`").concat(_settings["default"].bot.command, " inventory`\nIventory management\n\n`/equipment`\n`").concat(_settings["default"].bot.command, " equipment`\nEquipment management\n\n`/skills`\n`").concat(_settings["default"].bot.command, " skills`\nSkill management\n\n`/heal`\n`").concat(_settings["default"].bot.command, " heal`\nHeal your character\n\n`/resetskills`\n`").concat(_settings["default"].bot.command, " resetskills`\nReset your skills trees\n\n`/resetstats`\n`").concat(_settings["default"].bot.command, " resetstats`\nreset your attributes/stats\n\n`/myrank`\n`").concat(_settings["default"].bot.command, " myrank`\nDisplays your account information\n\n`/ranks`\n`").concat(_settings["default"].bot.command, " ranks`\nDisplays all the ranks\n\n`/leaderboard`\n`").concat(_settings["default"].bot.command, " leaderboard`\nDisplays top 10 exped users \n\n`/mostactive`\n`").concat(_settings["default"].bot.command, " mostActive`\nDisplays top 10 most active chatters last month\n\n`/balance`\n`").concat(_settings["default"].bot.command, " balance`\nDisplays your balance\n\n`/deposit`\n`").concat(_settings["default"].bot.command, " deposit`\nDisplays your deposit address\n\n`/withdraw`\n`").concat(_settings["default"].bot.command, " withdraw`\nstarts withdrawal process")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.helpMessage = helpMessage;