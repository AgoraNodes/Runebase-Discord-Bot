"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnDirectMessage = exports.walletNotFoundMessage = exports.userNotFoundMessage = exports.unableToWithdrawToSelfMessage = exports.timeOutMessage = exports.reviewMessage = exports.ranksMessage = exports.priceMessage = exports.minimumMessage = exports.levelUpMessage = exports.invalidAmountMessage = exports.invalidAddressMessage = exports.insufficientBalanceMessage = exports.helpMessage = exports.gainVoteTopggExpMessage = exports.gainTestExpMessage = exports.featureDisabledServerMessage = exports.featureDisabledGlobalMessage = exports.featureDisabledChannelMessage = exports.enterWithdrawalAmount = exports.enterWithdrawalAddress = exports.discordWithdrawalConfirmedMessage = exports.discordWithdrawalAcceptedMessage = exports.discordWelcomeMessage = exports.discordUserWithdrawalRejectMessage = exports.discordUserBannedMessage = exports.discordServerBannedMessage = exports.discordLimitSpamMessage = exports.discordIncomingDepositMessage = exports.discordErrorMessage = exports.discordDepositConfirmedMessage = exports.discordChannelBannedMessage = exports.discordBotMaintenanceMessage = exports.discordBotDisabledMessage = exports.depositAddressMessage = exports.coinInfoMessage = exports.cannotSendMessageUser = exports.balanceMessage = exports.alreadyVotedTopGG = exports.NotInDirectMessage = exports.AccountInfoMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var ranksMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ranks) {
    var rankIdString, rankNameString, expNeededString, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rankIdString = ranks.map(function (e) {
              return e.id;
            }).join("\n");
            rankNameString = ranks.map(function (e) {
              return e.name;
            }).join("\n");
            expNeededString = ranks.map(function (e) {
              return e.expNeeded;
            }).join("\n");
            result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Ranks') // .setDescription(`<@${userId}>, you canceled unlinking your address`)
            .addFields({
              name: 'level',
              value: rankIdString,
              inline: true
            }, {
              name: 'rank',
              value: rankNameString,
              inline: true
            }, {
              name: 'exp needed',
              value: expNeededString,
              inline: true
            }).setTimestamp().setFooter({
              text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
              iconURL: _settings["default"].bot.logo
            });
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ranksMessage(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.ranksMessage = ranksMessage;

var gainTestExpMessage = function gainTestExpMessage(userId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, you have been rewarded ").concat(amount, " test experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.gainTestExpMessage = gainTestExpMessage;

var alreadyVotedTopGG = function alreadyVotedTopGG(userId) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Thank you for your enthousiasme.\nYou already voted past 12h, so we could not grant you experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.alreadyVotedTopGG = alreadyVotedTopGG;

var gainVoteTopggExpMessage = function gainVoteTopggExpMessage(userId, amount) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("<@".concat(userId, ">, Thank you for voting for Runebase on TopGG.\nyou have been rewarded ").concat(amount, " experience")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.gainVoteTopggExpMessage = gainVoteTopggExpMessage;

var levelUpMessage = function levelUpMessage(userId, rank) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle('Gain Exp').setDescription("Congratulations <@".concat(userId, ">\nYou gained a level\nYou are now a ").concat(rank.name, " (lvl ").concat(rank.id, ")")).setTimestamp().setFooter({
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

var insufficientBalanceMessage = function insufficientBalanceMessage(userId, title) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle(title).setDescription("<@".concat(userId, ">, Insufficient balance")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.insufficientBalanceMessage = insufficientBalanceMessage;

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

var helpMessage = function helpMessage(withdraw) {
  var result = new _discord.MessageEmbed().setColor(_settings["default"].bot.color).setTitle("".concat("".concat(_settings["default"].bot.name, " v").concat(_package["default"].version), " Help")).setDescription("`".concat(_settings["default"].bot.command, "`\nDisplays this message\n\n`").concat(_settings["default"].bot.command, " help`\nDisplays this message\n\n`").concat(_settings["default"].bot.command, " myrank`\nDisplays your account information\n\n`").concat(_settings["default"].bot.command, " ranks`\nDisplays all the ranks\n\n`").concat(_settings["default"].bot.command, " balance`\nDisplays your balance\n\n`").concat(_settings["default"].bot.command, " deposit`\nDisplays your deposit address\n\n`").concat(_settings["default"].bot.command, " withdraw`\nstarts withdrawal process")).setTimestamp().setFooter({
    text: "".concat(_settings["default"].bot.name, " v").concat(_package["default"].version),
    iconURL: _settings["default"].bot.logo
  });
  return result;
};

exports.helpMessage = helpMessage;