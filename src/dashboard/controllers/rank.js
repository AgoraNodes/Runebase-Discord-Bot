import db from '../../models';

export const updateRank = async (
  req,
  res,
  next,
) => {
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.expNeeded) {
    throw new Error("expNeeded is required");
  }
  if (!req.body.level) {
    throw new Error("Level is required");
  }
  if (!req.body.roleId) {
    throw new Error("roleId is required");
  }
  const rank = await db.rank.findOne({
    where: {
      id: req.body.id,
    },
  });
  const updatedRank = await rank.update({
    name: req.body.name,
    level: Number(req.body.level),
    expNeeded: req.body.expNeeded,
    discordRankRoleId: req.body.roleId,
  });
  res.locals.name = 'updateRank';
  res.locals.result = await db.rank.findOne({
    where: {
      id: updatedRank.id,
    },
  });
  next();
};

export const removeRank = async (
  req,
  res,
  next,
) => {
  const rank = await db.rank.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeRank';
  res.locals.result = rank;
  rank.destroy();
  next();
};

export const fetchRanks = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['id', 'DESC'],
    ],
    where: {
      groupId: req.body.serverId,
    },
  };
  res.locals.name = 'fetchRanks';
  res.locals.count = await db.rank.count(options);
  res.locals.result = await db.rank.findAll(options);
  next();
};

export const addRank = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.expNeeded) {
    throw new Error("ExpNeeded is required");
  }
  if (!req.body.level) {
    throw new Error("Level is required");
  }
  if (!req.body.roleId) {
    throw new Error("RoleId is required");
  }
  if (!req.body.groupId) {
    throw new Error("groupId is required");
  }

  res.locals.name = 'addRank';
  res.locals.result = await db.rank.create({
    name: req.body.name,
    level: Number(req.body.level),
    expNeeded: req.body.expNeeded,
    discordRankRoleId: req.body.roleId,
    groupId: Number(req.body.groupId),
  });

  next();
};
