import db from '../models';

import {
  discordBotMaintenanceMessage,
  discordBotDisabledMessage,
} from '../embeds';

export const isMaintenanceOrDisabled = async (
  message,
  side,
  client = null,
) => {
  const botSetting = await db.setting.findOne({
    where: {
      name: side,
    },
  });

  if (!botSetting.enabled) {
    await message.reply({
      embeds: [
        discordBotDisabledMessage(),
      ],
    }).catch((e) => {
      console.log(e);
    });
  } else if (botSetting.maintenance) {
    await message.reply({
      embeds: [
        discordBotMaintenanceMessage(),
      ],
    }).catch((e) => {
      console.log(e);
    });
  }
  console.log(botSetting);

  return botSetting;
};
