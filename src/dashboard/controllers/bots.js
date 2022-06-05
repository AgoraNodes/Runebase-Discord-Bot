import db from '../../models';

export const updateBotSettings = async (
  req,
  res,
  next,
) => {
  const settings = await db.setting.findOne({
    where: {
      id: req.body.id,
    },
  });

  if (!settings) {
    throw new Error("Settings doesn't Exists");
  }

  res.locals.name = "updateBotSettings";
  res.locals.result = await settings.update({
    enabled: req.body.enabled,
    maintenance: req.body.maintenance,
    discordHomeServerGuildId: req.body.guildId,
    expRewardChannelId: req.body.expRewardChannelId,
  });
  next();
};

export const fetchBotSettings = async (
  req,
  res,
  next,
) => {
  res.locals.name = 'botSettings';
  res.locals.count = await db.setting.count();
  res.locals.result = await db.setting.findAll();
  next();
};
