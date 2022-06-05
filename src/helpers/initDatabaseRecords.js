import db from '../models';

export const initDatabaseRecords = async (
  discordClient,
) => {
  // Create Bot user for tagging
  const discordBotUser = await db.user.findOne({
    where: {
      user_id: `${discordClient.user.id}`,
    },
  });
  if (!discordBotUser) {
    await db.user.create({
      username: discordClient.user.username,
      user_id: `${discordClient.user.id}`,
    });
  }
  // Discord bot setting
  const discordBotSetting = await db.setting.findOne({
    where: {
      name: 'discord',
    },
  });
  if (!discordBotSetting) {
    await db.setting.create({
      name: 'discord',
    });
  }
};
