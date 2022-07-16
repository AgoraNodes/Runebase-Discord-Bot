/* eslint-disable import/prefer-default-export */
import {
  Transaction,
  Op,
} from "sequelize";
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
  MessageEmbed,
} from 'discord.js';
import {
  levelUpMessage,
} from '../../messages';
import db from '../../models';
import logger from "../logger";

const onUserJoinRealm = async (
  discordClient,
  member,
) => {
  console.log('onUserJoinRealm 1');
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    console.log(member);
    const myUser = await db.user.findOne({
      where: {
        user_id: member.user.id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    console.log('onUserJoinRealm 2');
    const findRealmRecord = await db.group.findOne({
      where: {
        groupId: member.guild.id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (findRealmRecord && myUser) {
      let findUserGroup = await db.UserGroup.findOne({
        where: {
          groupId: findRealmRecord.id,
          userId: myUser.id,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!findUserGroup) {
        findUserGroup = await db.UserGroup.create({
          groupId: findRealmRecord.id,
          userId: myUser.id,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
      console.log('onUserJoinRealm 4');
      const currentRank = await db.rank.findOne({
        where: {
          expNeeded: {
            [Op.lte]: findUserGroup.exp,
          },
          groupId: findRealmRecord.id,
        },
        order: [
          ['id', 'DESC'],
        ],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      const allRanks = await db.rank.findAll({
        where: {
          groupId: findRealmRecord.id,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      console.log('onUserJoinRealm 6');
      if (currentRank) {
        console.log('onUserJoinRealm 7');
        console.log(currentRank);
        console.log(myUser);
        console.log(findRealmRecord);
        const discordChannel = await discordClient.channels.cache.get(findRealmRecord.expRewardChannelId);
        const guild = await discordClient.guilds.cache.get(findRealmRecord.groupId);
        const member = await guild.members.cache.get(myUser.user_id);
        console.log(member);
        console.log('888');
        console.log(currentRank.discordRankRoleId);
        if (!member.roles.cache.has(currentRank.discordRankRoleId)) {
          console.log('huh');
          await member.roles.add(currentRank.discordRankRoleId);
          console.log('hah');
          await discordChannel.send({
            embeds: [
              levelUpMessage(
                myUser.user_id,
                currentRank,
              ),
            ],
          });
        }
        console.log('onUserJoinRealm 10');
        // eslint-disable-next-line no-restricted-syntax
        for (const rank of allRanks) {
          if (currentRank.id !== rank.id) {
            if (member.roles.cache.has(rank.discordRankRoleId)) {
              // eslint-disable-next-line no-await-in-loop
              await member.roles.remove(rank.discordRankRoleId);
            }
          }
        }
        const userGroupRankRecord = await db.UserGroupRank.findOne({
          where: {
            UserGroupId: findUserGroup.id,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (!userGroupRankRecord) {
          await db.UserGroupRank.create({
            UserGroupId: findUserGroup.id,
            rankId: currentRank.id,
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
        } else if (currentRank.id !== userGroupRankRecord.rankId) {
          await userGroupRankRecord.update({
            rankId: currentRank.id,
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
        }
      }
    }
    console.log('done onUserJoinRealm');
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'help',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
  });
};
export default onUserJoinRealm;
