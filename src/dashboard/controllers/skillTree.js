import db from '../../models';

export const fetchSkillTrees = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['classId', 'DESC'],
    ],
    include: [
      {
        model: db.class,
        as: 'class',
      },
    ],
  };
  console.log('skillTree');
  res.locals.name = 'skilltree';
  res.locals.count = await db.skillTree.count(options);
  res.locals.result = await db.skillTree.findAll(options);
  console.log(res.locals.result);
  next();
};

export const updateSkillTree = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  console.log('updateItemBase');
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.itemFamilyId) {
    throw new Error("itemFamily is required");
  }
  if (!req.body.itemDifficultyId) {
    throw new Error("itemDifficulty is required");
  }

  const itemBase = await db.itemBase.findOne({
    where: {
      id: req.body.id,
    },
  });
  console.log(itemBase);
  console.log(Number(req.body.levelMonster));
  console.log(Number(req.body.minDefense));
  console.log('req.body.sqdsqd');
  const updatedRank = await itemBase.update({
    name: req.body.name,
    itemFamilyId: req.body.itemFamilyId,
    itemDifficultyId: req.body.itemDifficultyId,
    levelReq: Number(req.body.levelReq),
    strengthReq: Number(req.body.strengthReq),
    dexterityReq: Number(req.body.dexterityReq),
    levelMonster: Number(req.body.levelMonster),
    durability: Number(req.body.durability),
    sockets: Number(req.body.sockets),
    minDefense: Number(req.body.minDefense),
    maxDefense: Number(req.body.maxDefense),
    minDamage: Number(req.body.minDamage),
    maxDamage: Number(req.body.maxDamage),
  });
  console.log(updatedRank);
  res.locals.name = 'updateItemBase';
  res.locals.result = await db.itemBase.findOne({
    where: {
      id: updatedRank.id,
    },
    include: [
      {
        model: db.itemFamily,
        as: 'itemFamily',
      },
      {
        model: db.itemDifficulty,
        as: 'itemDifficulty',
      },
    ],
  });

  next();
};
