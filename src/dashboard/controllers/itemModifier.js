import db from '../../models';

export const fetchItemModifiers = async (
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
        model: db.itemQuality,
        as: 'itemQuality',
      },
    ],
  };
  res.locals.name = 'itemModifiers';
  res.locals.count = await db.itemModifier.count(options);
  res.locals.result = await db.itemModifier.findAll(options);
  console.log(res.locals.result);
  next();
};

export const addItemModifier = async (
  req,
  res,
  next,
) => {
  console.log(req.body);

  if (!req.body.itemQuality) {
    throw new Error("itemQuality is required");
  }

  const newItemModifier = await db.itemModifier.create({
    itemQualityId: Number(req.body.itemQuality),
    levelReq: Number(req.body.levelReq),
    levelMonster: Number(req.body.levelMonster),
    prefix: req.body.prefix,
    suffix: req.body.suffix,
    minStrength: Number(req.body.minStrength),
    maxStrength: Number(req.body.maxStrength),
    minDexterity: Number(req.body.minDexterity),
    maxDexterity: Number(req.body.maxDexterity),
    minVitality: Number(req.body.minVitality),
    maxVitality: Number(req.body.maxVitality),
    minEnergy: Number(req.body.minEnergy),
    maxEnergy: Number(req.body.maxEnergy),
    minEdefense: Number(req.body.minEdefense),
    maxEdefense: Number(req.body.maxEdefense),
    minEdamage: Number(req.body.minEdamage),
    maxEdamage: Number(req.body.maxEdamage),
  });
  res.locals.name = 'addItemModifier';
  res.locals.result = await db.itemModifier.findOne({
    where: {
      id: newItemModifier.id,
    },
    include: [
      {
        model: db.itemQuality,
        as: 'itemQuality',
      },
    ],
  });

  next();
};

export const updateItemModifier = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.itemQuality) {
    throw new Error("itemQuality is required");
  }

  const itemModifier = await db.itemModifier.findOne({
    where: {
      id: req.body.id,
    },
  });

  const updatedRank = await itemModifier.update({
    itemQualityId: Number(req.body.itemQuality),
    levelReq: Number(req.body.levelReq),
    levelMonster: Number(req.body.levelMonster),
    prefix: req.body.prefix,
    suffix: req.body.suffix,
    minStrength: Number(req.body.minStrength),
    maxStrength: Number(req.body.maxStrength),
    minDexterity: Number(req.body.minDexterity),
    maxDexterity: Number(req.body.maxDexterity),
    minVitality: Number(req.body.minVitality),
    maxVitality: Number(req.body.maxVitality),
    minEnergy: Number(req.body.minEnergy),
    maxEnergy: Number(req.body.maxEnergy),
    minEdefense: Number(req.body.minEdefense),
    maxEdefense: Number(req.body.maxEdefense),
    minEdamage: Number(req.body.minEdamage),
    maxEdamage: Number(req.body.maxEdamage),
  });
  res.locals.name = 'updateItemModifier';
  res.locals.result = await db.itemModifier.findOne({
    where: {
      id: updatedRank.id,
    },
    include: [
      {
        model: db.itemQuality,
        as: 'itemQuality',
      },
    ],
  });
  next();
};

export const removeItemModifier = async (
  req,
  res,
  next,
) => {
  const itemModifier = await db.itemModifier.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeItemModifier';
  res.locals.result = itemModifier;
  itemModifier.destroy();
  next();
};
