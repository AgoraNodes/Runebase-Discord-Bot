import db from '../models';

export const initDatabaseRecords = async (
  discordClient,
) => {
  // ADD USD RECORD PRICEINFO
  const createUSDCurrencytRecord = await db.currency.findOrCreate({
    where: {
      id: 1,
    },
    defaults: {
      id: 1,
      currency_name: "USD",
      iso: 'USD',
      type: 'FIAT',
    },
  });
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

  // FeatureSetting
  const autoWithdrawalSetting = await db.featureSetting.findOne({
    where: {
      type: 'global',
      name: 'autoWithdrawal',
    },
  });
  if (!autoWithdrawalSetting) {
    await db.featureSetting.create({
      type: 'global',
      name: 'autoWithdrawal',
      enabled: true,
    });
  }
  const withdrawSetting = await db.featureSetting.findOne({
    where: {
      type: 'global',
      name: 'withdraw',
    },
  });
  if (!withdrawSetting) {
    await db.featureSetting.create({
      type: 'global',
      name: 'withdraw',
      enabled: true,
    });
  }
};
