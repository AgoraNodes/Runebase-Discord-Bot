import { MessageEmbed } from "discord.js";
// import moment from 'moment';
import settings from '../config/settings';
import pjson from "../../package.json";
import { capitalize } from "../helpers/utils";

export const discordUserBannedMessage = (
  user,
) => {
  const result = new MessageEmbed()
    .setColor("#C70039")
    .setTitle(`🚫     User: ${user.username} Banned     🚫`)
    .setDescription(`Reason:
${user.banMessage}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordServerBannedMessage = (
  server,
) => {
  const result = new MessageEmbed()
    .setColor(`#C70039`)
    .setTitle('🚫     Server Banned     🚫')
    .setDescription(`Reason:
${server.banMessage}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const priceMessage = (replyString) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Price')
    .setThumbnail(settings.bot.logo)
    .setDescription(replyString)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordChannelBannedMessage = (channel) => {
  const result = new MessageEmbed()
    .setColor('#FF7900')
    .setTitle('❗     Channel Restricted     ❗')
    .setDescription(`Reason:
${channel.banMessage}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const coinInfoMessage = (
  blockHeight,
  priceInfo,
  walletVersion,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Tipbot')
    .addField("Coin Info", settings.coin.description)
    .addField("\u200b", "\u200b")
    .addFields(
      { name: "Coin Name", value: settings.coin.name, inline: true },
      { name: "Ticker", value: settings.coin.ticker, inline: true },
    )
    .addField("\u200b", "\u200b")
    .addFields(
      { name: "Current block height", value: `${blockHeight}`, inline: true },
      { name: "Wallet version", value: `${walletVersion}`, inline: true },
    )
    .addField("\u200b", "\u200b")
    .addField("Website", settings.coin.website)
    .addField("Github", settings.coin.github)
    .addField("Block Explorer", settings.coin.explorer)
    .addField("Discord Server", settings.coin.discord)
    .addField("Telegram Group", settings.coin.telegram)
    .addField("Exchanges", settings.coin.exchanges.join('\n'))
    .addField("Current price", `$${priceInfo.price} (source: coinpaprika)`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordLimitSpamMessage = (userId, myFunctionName) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(myFunctionName)
    .setDescription(`🚫 Slow down! 🚫
<@${userId}>, you're using this command too fast, wait a while before using it again.`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const cannotSendMessageUser = (title, message) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${message.author.id}>, ${settings.bot.name} was unable to send you a direct message.\nPlease check your discord privacy settings.`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordErrorMessage = (title) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`Something went wrong.`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordDepositConfirmedMessage = (
  amount,
  trans,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Deposit #${trans.id}`)
    .setDescription(`Deposit Confirmed
${trans.amount / 1e8} ${settings.coin.ticker} has been credited to your wallet`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordIncomingDepositMessage = (detail) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Deposit #${detail.transaction[0].id}`)
    .setDescription(`incoming deposit detected for ${detail.amount} ${settings.coin.ticker}
Balance will be reflected in your wallet in ~${settings.confirmations}+ confirmations
${settings.coin.explorer}/tx/${detail.transaction[0].txid}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordUserWithdrawalRejectMessage = (title) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Withdraw')
    .setDescription(`Your withdrawal has been rejected`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const reviewMessage = (
  userId,
  transaction,
) => {
  const amount = ((transaction.amount / 1e8).toFixed(8)).replace(/(\.0+|0+)$/, '');
  const fee = ((transaction.feeAmount / 1e8).toFixed(8)).replace(/(\.0+|0+)$/, '');
  const total = (((transaction.amount - transaction.feeAmount) / 1e8).toFixed(8)).replace(/(\.0+|0+)$/, '');
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Withdraw #${transaction.id}`)
    .setDescription(`<@${userId}>, Your withdrawal is being reviewed

amount: **${amount} ${settings.coin.ticker}**
fee: **${fee} ${settings.coin.ticker}**
total: **${total} ${settings.coin.ticker}**`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordWithdrawalAcceptedMessage = (
  updatedTrans,
) => {
  const amount = ((updatedTrans.amount / 1e8).toFixed(8)).replace(/(\.0+|0+)$/, '');
  const fee = ((updatedTrans.feeAmount / 1e8).toFixed(8)).replace(/(\.0+|0+)$/, '');
  const total = (((updatedTrans.amount - updatedTrans.feeAmount) / 1e8).toFixed(8)).replace(/(\.0+|0+)$/, '');
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Withdraw #${updatedTrans.id}`)
    .setDescription(`Your withdrawal has been accepted

amount: **${amount} ${settings.coin.ticker}**
fee: **${fee} ${settings.coin.ticker}**
total: **${total} ${settings.coin.ticker}**${settings.coin.setting === 'Pirate' && updatedTrans.memo && updatedTrans.memo !== '' ? `\nmemo: **${updatedTrans.memo}**` : ''}

${settings.coin.explorer}/tx/${updatedTrans.txid}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordWithdrawalConfirmedMessage = (userId, trans) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Withdraw #${trans.id}`)
    .setDescription(`<@${userId}>, Your withdrawal has been complete`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const balanceMessage = (userId, user, priceInfo) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Balance')
    .setDescription(`<@${userId}>'s current available balance: ${user.wallet.available / 1e8} ${settings.coin.ticker}
<@${userId}>'s current locked balance: ${user.wallet.locked / 1e8} ${settings.coin.ticker}
Estimated value of <@${userId}>'s balance: $${(((user.wallet.available + user.wallet.locked) / 1e8) * priceInfo.price).toFixed(2)}`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const depositAddressMessage = (
  userId,
  user,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Deposit')
    .setDescription(`<@${userId}>'s deposit address:
*${user.wallet.address.address}*`)
    .setImage("attachment://qr.png")
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const walletNotFoundMessage = (message, title) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${message.author.id}>, Wallet not found`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const userNotFoundMessage = (
  message,
  title,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${message.author.id}>, User not found`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const NotInDirectMessage = (message, title) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${message.author.id}>, Can't use this command in a direct message`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordWelcomeMessage = (
  userInfo,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Bot`)
    .setDescription(`Welcome <@${userInfo.id}>, Welcome to Runebase.
Type "${settings.bot.command} help" for bot usage info`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordBotMaintenanceMessage = () => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Bot`)
    .setDescription(`Discord tipbot maintenance`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const gainTestExpMessage = (
  userId,
  amount,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`<@${userId}>, you have been rewarded ${amount} test experience`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const rolledDiceMessage = (
  userId,
  expRewarded,
  randomNumberOne,
  randomNumberTwo,
  rewardAmount,
) => {
  const isSnakeEyes = !!((randomNumberOne === 1 && randomNumberTwo === 1));
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Roll Dice')
    .setDescription(`<@${userId}>, You rolled the dice!
${isSnakeEyes ? `👁 Snake eyes 👁` : `dice: ${randomNumberOne}
dice: ${randomNumberTwo}`}

you have been rewarded ${rewardAmount / 1e8} RUNES and ${expRewarded} experience`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const rollDiceTooFastMessage = (
  userId,
  distance,
) => {
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Roll Dice')
    .setDescription(`<@${userId}>, you have to wait ${hours === 1 ? `${hours} hour` : ''}${hours > 1 ? `${hours} hours,` : ''} ${minutes === 1 ? `${minutes} minute` : ''}${minutes > 1 ? `${minutes} minutes and` : ''} ${seconds === 1 ? `${seconds} second` : ''}${seconds > 1 ? `${seconds} seconds` : ''} before you can roll the dice again (you can roll the dice every 3 hours).`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const gainActiveTalkerExpMessage = (
  userId,
  amount,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`<@${userId}>, Thank you for being so talkative in our community today!
you have been rewarded ${amount} experience`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const alreadyVotedTopGG = (
  userId,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`<@${userId}>, Thank you for your enthousiasme.
You already voted past 12h, so we could not grant you experience`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const invitedNewUserRewardMessage = (
  userId,
  joinedUserId,
  amount,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`<@${userId}>, Thank you for inviting <@${joinedUserId}> to the Runebase server.
you have been rewarded ${amount} experience`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const gainVoteTopggExpMessage = (
  userId,
  amount,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`<@${userId}>, Thank you for voting for Runebase on TopGG.
you have been rewarded ${amount} experience`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const levelUpMessage = (
  userId,
  rank,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`Congratulations <@${userId}>
You gained a level
You are now a ${rank.name} (lvl ${rank.id})`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordBotDisabledMessage = () => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`Bot`)
    .setDescription(`Discord tipbot disabled`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const warnDirectMessage = (userId, title) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${userId}>, I've sent you a direct message.`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const timeOutMessage = () => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Time out')
    .setDescription(`Operation canceled`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const enterWithdrawalAddress = () => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Withdraw')
    .setDescription(`Please enter a Runebase withdrawal address:`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const enterWithdrawalAmount = () => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Withdraw')
    .setDescription(`Please enter the amount of runes you want to withdraw:`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const invalidAmountMessage = (
  userId,
  title,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${userId}>, Invalid Amount`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const insufficientBalanceMessage = (
  userId,
  title,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${userId}>, Insufficient balance`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const minimumMessage = (
  userId,
  setting,
  type,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(type)
    .setDescription(`<@${userId}>, Minimum ${type} is ${setting.min / 1e8} ${settings.coin.ticker}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const invalidAddressMessage = (
  userId,
) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Withdraw')
    .setDescription(`<@${userId}>, Invalid ${settings.coin.name} Address`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const unableToWithdrawToSelfMessage = (message) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Tip')
    .setDescription(`<@${message.author.id}>, unable to withdraw to your own deposit address`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const AccountInfoMessage = () => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle('Account Information')
    .setDescription(`Shows discord account information`)
    .setThumbnail(settings.bot.logo)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const featureDisabledChannelMessage = (name) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(name)
    .setDescription(`This Feature has been disabled for this channel`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const featureDisabledServerMessage = (name) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(name)
    .setDescription(`This Feature has been disabled for this server`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const featureDisabledGlobalMessage = (name) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(name)
    .setDescription(`This Feature has been disabled`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const helpMessage = (withdraw) => {
  const result = new MessageEmbed()
    .setColor(settings.bot.color)
    .setTitle(`${`${settings.bot.name} v${pjson.version}`} Help`)
    .setDescription(`\`${settings.bot.command}\`
Displays this message

\`/help\`
\`${settings.bot.command} help\`
Displays this message

\`/pickclass\`
\`${settings.bot.command} pickclass\`
Select a new class

\`/myrank\`
\`${settings.bot.command} myrank\`
Displays your account information

\`/ranks\`
\`${settings.bot.command} ranks\`
Displays all the ranks

\`/leaderboard\`
\`${settings.bot.command} leaderboard\`
Displays top 10 exped users 

\`/mostactive\`
\`${settings.bot.command} mostActive\`
Displays top 10 most active chatters last month

\`/balance\`
\`${settings.bot.command} balance\`
Displays your balance

\`/deposit\`
\`${settings.bot.command} deposit\`
Displays your deposit address

\`/withdraw\`
\`${settings.bot.command} withdraw\`
starts withdrawal process`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });
  return result;
};
