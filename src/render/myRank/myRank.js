import {
  createCanvas,
  loadImage,
} from 'canvas';
import { InteractionType } from 'discord.js';

export const renderMyRankImage = async (
  message,
  user,
  userWithUserGroup,
  currentRank,
  monthlyChatActivity,
  totalChatActivity,
  currentRankExp,
  nextRank,
) => {
  const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
  const currentExp = userWithUserGroup.UserGroup.exp;
  const canvas = createCanvas(1000, 300);
  const ctx = canvas.getContext('2d');
  const expBarWidth = 600;

  let avatar;
  if (
    message.type
    && message.type === InteractionType.ApplicationCommand
  ) {
    avatar = await loadImage(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`);
  } else {
    avatar = await loadImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`);
  }

  // circle for avatar
  ctx.beginPath();
  ctx.arc(120, 120, 110, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.fillStyle = "#3F3F3F";

  ctx.strokeStyle = "#164179";
  ctx.fill();
  ctx.closePath();

  // XP Bar
  ctx.lineJoin = 'round';
  ctx.lineWidth = 69;
  ctx.strokeStyle = "#164179";

  // shadow of xp bar
  ctx.strokeRect(323, 239, expBarWidth, 2);

  // empty bar
  ctx.strokeStyle = 'black';
  ctx.strokeRect(325, 240, expBarWidth, 0);

  // filled bar
  const reqExp = nextRankExp - currentRankExp;
  const calculatedCurrentExp = currentExp - currentRankExp;
  let percentage = (calculatedCurrentExp / reqExp) * 100;
  if (percentage === Infinity) {
    percentage = (currentExp / nextRankExp) * 100;
  }

  ctx.strokeStyle = '#348128';
  ctx.strokeRect(
    323,
    240,
    percentage < 100 ? expBarWidth * (calculatedCurrentExp / reqExp) : expBarWidth,
    0,
  );

  // Adding text
  ctx.font = 'bold 40px "HeartWarming"';
  ctx.fillStyle = "#fe5701";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.strokeText(user.username, 120, 275, 200);
  ctx.fillText(user.username, 120, 275, 200);

  ctx.strokeText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
  ctx.fillText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
  ctx.strokeText(`${currentRank ? currentRank.level : 0}`, 900, 90, 80);
  ctx.fillText(`${currentRank ? currentRank.level : 0}`, 900, 90, 80);

  ctx.fillStyle = 'white';
  ctx.font = 'bold 25px "HeartWarming"';
  ctx.strokeText("Chat Activity Score", 450, 40, 300);
  ctx.fillText("Chat Activity Score", 450, 40, 300);
  ctx.strokeText("Rank", 720, 50, 200);
  ctx.fillText("Rank", 720, 50, 200);
  ctx.strokeText("Level", 900, 50, 200);
  ctx.fillText("Level", 900, 50, 200);
  ctx.strokeText("Current exp", 635, 160, 200);
  ctx.fillText("Current exp", 635, 160, 200);
  ctx.strokeText("prev", 345, 160, 200);
  ctx.fillText("prev", 345, 160, 200);
  ctx.strokeText("next", 905, 160, 200);
  ctx.fillText("next", 905, 160, 200);

  ctx.font = 'bold 25px "HeartWarming"';
  ctx.fillStyle = "#fe5701";
  ctx.strokeText(currentRankExp, 345, 190, 200);
  ctx.fillText(currentRankExp, 345, 190, 200);
  ctx.strokeText(nextRankExp, 905, 190, 200);
  ctx.fillText(nextRankExp, 905, 190, 200);
  ctx.strokeText(currentExp, 635, 190, 200);
  ctx.fillText(currentExp, 635, 190, 200);

  // chat scores
  ctx.strokeText(
    monthlyChatActivity ? monthlyChatActivity.count : 0,
    350,
    100,
    200,
  );
  ctx.fillText(
    monthlyChatActivity ? monthlyChatActivity.count : 0,
    350,
    100,
    200,
  );
  ctx.strokeText(
    totalChatActivity ? totalChatActivity.count : 0,
    550,
    100,
    200,
  );
  ctx.fillText(
    totalChatActivity ? totalChatActivity.count : 0,
    550,
    100,
    200,
  );

  ctx.fillStyle = 'white';
  ctx.strokeText('30 day', 350, 70, 200);
  ctx.fillText('30 day', 350, 70, 200);

  ctx.strokeText('Total', 550, 70, 200);
  ctx.fillText('Total', 550, 70, 200);

  ctx.font = 'bold 50px "HeartWarming"';
  ctx.fillStyle = "#fe5701";
  ctx.strokeText(`${percentage.toFixed(0)}%`, 640, 260, 200);
  ctx.fillText(`${percentage.toFixed(0)}%`, 640, 260, 200);
  // remove corners
  ctx.beginPath();
  ctx.arc(120, 120, 110, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();

  // Add the avatar
  ctx.drawImage(avatar, 10, 10, 220, 220);

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
