/* eslint-disable import/prefer-default-export */
import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import { MessageAttachment } from "discord.js";
import path from 'path';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { generateRandomMagicItem } from "../helpers/items/generateRandomMagicItem";
import { generateModifierStringArray } from "../helpers/items/generateModifierStringArray";

export const discordShowCaseMagicItem = async (
  discordClient,
  message,
  io,
) => {
  const activity = [];
  const newItem = await generateRandomMagicItem();
  const modifierStringArray = await generateModifierStringArray(newItem.dataValues);
  console.log('modifierString');
  console.log(modifierStringArray);
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const [
      user,
      userActivity,
    ] = await userWalletExist(
      message,
      t,
      'myrank',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const levelReqHeight = newItem.levelReq ? 25 : 0;

    await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
    const itemImage = await loadImage(path.join(__dirname, `../assets/images/items/${newItem.itemBase.itemFamily.itemType.name}/${newItem.itemBase.itemFamily.name}`, `${newItem.itemBase.name.replaceAll(' ', '-')}.png`));
    const canvas = createCanvas(
      200,
      (itemImage.height) + 95 + (modifierStringArray.length * 25) + levelReqHeight,
    );
    const ctx = canvas.getContext('2d');

    console.log(newItem.itemBase.name);
    console.log(newItem.itemBase.itemFamily.name);
    console.log(newItem.itemBase.itemFamily.itemType.name);

    ctx.lineWidth = 1;
    ctx.fillStyle = "#3F3F3F";
    ctx.strokeStyle = "#164179";
    ctx.textAlign = "center";

    ctx.drawImage(
      itemImage,
      (canvas.width / 2) - (itemImage.width / 2),
      0,

    );

    // item name
    ctx.font = 'bold 15px "HeartWarming"';
    ctx.fillStyle = newItem.itemQuality.color;
    ctx.strokeStyle = "#164179";
    ctx.strokeText(
      newItem.name,
      100,
      (itemImage.height) + 20,
      200,
    );
    ctx.fillText(
      newItem.name,
      100,
      (itemImage.height) + 20,
      200,
    );

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.font = 'bold 15px "HeartWarming"';
    // Level Req

    if (newItem.levelReq) {
      ctx.strokeText(
        `Lvl Requirement: ${newItem.levelReq}`,
        100,
        (itemImage.height) + 45,
        200,
      );
      ctx.fillText(
        `Lvl Requirement: ${newItem.levelReq}`,
        100,
        (itemImage.height) + 45,
        200,
      );
    }

    // item defense

    ctx.strokeText(
      `Defense: ${newItem.defense}`,
      100,
      (itemImage.height) + 45 + levelReqHeight,
      200,
    );
    ctx.fillText(
      `Defense: ${newItem.defense}`,
      100,
      (itemImage.height) + 45 + levelReqHeight,
      200,
    );

    // item durability
    ctx.strokeText(
      `Durability: ${newItem.durability} of ${newItem.itemBase.durability}`,
      100,
      (itemImage.height) + 70 + levelReqHeight,
      200,
    );
    ctx.fillText(
      `Durability: ${newItem.durability} of ${newItem.itemBase.durability}`,
      100,
      (itemImage.height) + 70 + levelReqHeight,
      200,
    );

    // item modifiers
    ctx.font = 'bold 15px "HeartWarming"';
    ctx.fillStyle = newItem.itemQuality.color;
    ctx.strokeStyle = "#164179";

    for (let i = 0; i < modifierStringArray.length; i++) {
      ctx.strokeText(
        modifierStringArray[i],
        100,
        (itemImage.height) + 95 + (i * 25) + levelReqHeight,
        200,
      );
      ctx.fillText(
        modifierStringArray[i],
        100,
        (itemImage.height) + 95 + (i * 25) + levelReqHeight,
        200,
      );
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), 'item.png');

    console.log('before send');

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          files: [
            attachment,
          ],
        });
      } else {
        await discordUser.send({
          files: [
            attachment,
          ],
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          files: [
            attachment,
          ],
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          files: [
            attachment,
          ],
        });
      }
    }

    const preActivity = await db.activity.create({
      type: 'myrank_s',
      earnerId: user.id,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const finalActivity = await db.activity.findOne({
      where: {
        id: preActivity.id,
      },
      include: [
        {
          model: db.user,
          as: 'earner',
        },
      ],
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    activity.unshift(finalActivity);
  }).catch(async (err) => {
    console.log(err);
    try {
      await db.error.create({
        type: 'MyRank',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "MyRank",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      } else {
        await message.channel.send({
          embeds: [
            cannotSendMessageUser(
              "MyRank",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      }
    } else if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          discordErrorMessage(
            "MyRank",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "MyRank",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    }
  });

  if (activity.length > 0) {
    io.to('admin').emit('updateActivity', {
      activity,
    });
  }
};
