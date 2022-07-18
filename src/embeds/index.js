/* eslint-disable no-restricted-syntax */
import { EmbedBuilder } from "discord.js";
// import moment from 'moment';
import settings from '../config/settings';
import pjson from "../../package.json";
import { capitalize } from "../helpers/utils";

export const discordUserBannedMessage = (
  user,
) => {
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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

export const loadingBattleMoveEmbed = (
  userCurrentCharacter,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Battle')
    .setDescription(`${userCurrentCharacter.UserGroup.user.username}, Your next move is calculating..`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const battleCompleteEmbed = async (
  userCurrentCharacter,
  battle,
  expEarned,
  newLootC,
) => {
  let itemString = '';
  for await (const looot of newLootC) {
    itemString += `\n- **${looot.name}** [${looot.itemQuality.name}]`;
  }
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle(`${userCurrentCharacter.UserGroup.user.username} battle#${battle.id} results`)
    .setDescription(`Exp earned: **${expEarned}**

    ${newLootC.length > 0 ? `__found ${newLootC.length} ${newLootC.length === 1 ? `item` : `items`}__` : ``}${itemString}`)
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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

export const grantRoleExpMessage = (
  userLength,
  role,
  amount,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Grant Exp to role')
    .setDescription(`Congratulations!
The ${userLength} users on the ${role} role have been granted ${amount} experience each!`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const gainBattleExpExpMessage = (
  userId,
  amount,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`<@${userId}>, Congratulations!
you gained ${amount} experience from your battle!`)
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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

export const realmChangeSuccessEmbed = (
  server,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Change Realm Success')
    .setDescription(`You are now on realm:
${server.groupName}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const needToBeInDiscordRealmEmbed = (
  server,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Change Realm Failed')
    .setDescription(`You need to join the realm's discord server to be able to participate on this realm
    
Invite link:
${server.inviteLink}

Or choose another realm with 
\`!runebase changerealm\` 
or 
\`/changerealm\``)
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
  const result = new EmbedBuilder()
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
  console.log('sending level up message');
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Gain Exp')
    .setDescription(`Congratulations <@${userId}>
You gained a level
You are now a ${rank.name} (lvl ${rank.level})`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const discordBotDisabledMessage = () => {
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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

export const confirmationHealMessage = (
  userId,
  available,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Heal')
    .setDescription(`<@${userId}>, Healing costs 0.1 RUNES. 

Available Balance: **${available / 1e8} RUNES**
Total Cost: **0.1 RUNES**
    
Are you sure you want to heal?`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const healCompleteMessage = (
  userId,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Heal')
    .setDescription(`💋 Freyja has kissed <@${userId}>. 💋
<@${userId}> is now Healed!`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const declineHealMessage = (
  userId,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Heal')
    .setDescription(`<@${userId}>, declined heal`)
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
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle(title)
    .setDescription(`<@${userId}>, you have Insufficient balance`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const resetSkillCompleteMessage = (
  userId,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Reset Skills')
    .setDescription(`<@${userId}>, Your skills have been reset!`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const skillConfirmationMessage = (
  userId,
  available,
  totalSkillsCost,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Reset Skills')
    .setDescription(`<@${userId}>, Resetting your skills costs 1 RUNES for each skill point.

Available Balance: **${available / 1e8} RUNES**
Total cost: **${totalSkillsCost} RUNES**
    
Are you sure you want to reset your skills?`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const declineResetSkillsMessage = (
  userId,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Reset Skills')
    .setDescription(`<@${userId}>, declined reset skills`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const resetStatsDeclinedMessage = (
  userId,
  title,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Reset Stats')
    .setDescription(`<@${userId}>, declined reset stats`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const resetStatsConfirmationMessage = (
  userId,
  available,
  totalStatsCost,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Reset Stats')
    .setDescription(`<@${userId}>, Resetting your stats costs 0.1 RUNES for each attribute.

Available Balance: **${available / 1e8} RUNES**
Total cost: **${totalStatsCost} RUNES**
    
Are you sure you want to reset your stats?`)
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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

export const skillInfoMessage = (
  name,
  description,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle(name || 'Skill not found')
    .setDescription(`${description || 'No skill Info found'}`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};
export const loadingSkillAddEmbed = (
  username,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Adding Skill Point')
    .setDescription(`${username}, Adding skill..`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};
export const loadingSkillSelectEmbed = (
  username,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Selecting Skill')
    .setDescription(`${username}, Loading skill selection..`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const AccountInfoMessage = () => {
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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
  const result = new EmbedBuilder()
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

export const resetStatsCompletemessage = (
  userId,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Reset Stats')
    .setDescription(`<@${userId}>, Your stats have been reset!`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const alreadyInRealmEmbed = (
  user,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Change Realm')
    .setDescription(`<@${user.user_id}>, You are already in this realm currently.`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const realmNotFoundEmbed = (
  user,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Change Realm')
    .setDescription(`<@${user.user_id}>, We can't find the realm you are trying to join`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const addingAttributeEmbed = (
  userCurrentCharacter,
) => {
  const result = new EmbedBuilder()
    .setColor(settings.bot.color)
    .setTitle('Change Realm')
    .setDescription(`<@${userCurrentCharacter.UserGroup.user.user_id}>, Loading..`)
    .setTimestamp()
    .setFooter({
      text: `${settings.bot.name} v${pjson.version}`,
      iconURL: settings.bot.logo,
    });

  return result;
};

export const helpMessage = (withdraw) => {
  const result = new EmbedBuilder()
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

\`/stats\`
\`${settings.bot.command} stats\`
Select stats (attributes) for your class

\`/inventory\`
\`${settings.bot.command} inventory\`
Iventory management

\`/equipment\`
\`${settings.bot.command} equipment\`
Equipment management

\`/skills\`
\`${settings.bot.command} skills\`
Skill management

\`/heal\`
\`${settings.bot.command} heal\`
Heal your character

\`/resetskills\`
\`${settings.bot.command} resetskills\`
Reset your skills trees

\`/resetstats\`
\`${settings.bot.command} resetstats\`
reset your attributes/stats

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
