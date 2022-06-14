import db from '../../models';

export const fetchItemBases = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['id', 'DESC'],
    ],
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
  };
  res.locals.name = 'itemBase';
  res.locals.count = await db.itemBase.count(options);
  res.locals.result = await db.itemBase.findAll(options);
  console.log(res.locals.result);
  next();
};

export const addItemBase = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.itemFamily) {
    throw new Error("itemFamily is required");
  }
  if (!req.body.itemDifficulty) {
    throw new Error("itemDifficulty is required");
  }

  const itemBase = await db.itemBase.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (itemBase) {
    throw new Error("Already Exists");
  }
  if (
    itemBase && itemBase.itemFamilyId === req.body.itemFamily
    && itemBase && itemBase.itemDifficultyId === req.body.itemDifficulty
  ) {
    throw new Error("Already Exists");
  }

  const newItemFamily = await db.itemBase.create({
    name: req.body.name,
    itemFamilyId: req.body.itemFamily,
    itemDifficultyId: req.body.itemDifficulty,
    levelReq: Number(req.body.levelReq),
    levelMonster: Number(req.body.levelMonster),
    minDefense: Number(req.body.minDefense),
    maxDefense: Number(req.body.maxDefense),
    minDamage: Number(req.body.minDamage),
    maxDamage: Number(req.body.maxDamage),
  });
  res.locals.name = 'addItemBase';
  res.locals.result = await db.itemBase.findOne({
    where: {
      id: newItemFamily.id,
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

export const updateItemBase = async (
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
    itemFamilyId: req.body.itemFamily,
    itemDifficultyId: req.body.itemDifficulty,
    levelReq: Number(req.body.levelReq),
    levelMonster: Number(req.body.levelMonster),
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

export const removeItemBase = async (
  req,
  res,
  next,
) => {
  const itemBase = await db.itemBase.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeItemBase';
  res.locals.result = itemBase;
  itemBase.destroy();
  next();
};
