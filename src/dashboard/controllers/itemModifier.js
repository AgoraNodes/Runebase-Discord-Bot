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
    itemQualityId: req.body.itemQuality,
    levelReq: req.body.levelReq,
    levelMonster: req.body.levelMonster,
    prefix: req.body.prefix,
    suffix: req.body.suffix,
    minStrength: req.body.minStrength,
    maxStrength: req.body.maxStrength,
    minDexterity: req.body.minDexterity,
    maxDexterity: req.body.maxDexterity,
    minVitality: req.body.minVitality,
    maxVitality: req.body.maxVitality,
    minEnergy: req.body.minEnergy,
    maxEnergy: req.body.maxEnergy,
    minEd: req.body.minEd,
    maxEd: req.body.maxEd,
  });
  res.locals.name = 'addItemFamily';
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

  const classDescription = await db.itemModifier.findOne({
    where: {
      id: req.body.id,
    },
  });
  const updatedRank = await classDescription.update({
    itemQualityId: req.body.itemQuality,
    levelReq: req.body.levelReq,
    levelMonster: req.body.levelMonster,
    prefix: req.body.prefix,
    suffix: req.body.suffix,
    minStrength: req.body.minStrength,
    maxStrength: req.body.maxStrength,
    minDexterity: req.body.minDexterity,
    maxDexterity: req.body.maxDexterity,
    minVitality: req.body.minVitality,
    maxVitality: req.body.maxVitality,
    minEnergy: req.body.minEnergy,
    maxEnergy: req.body.maxEnergy,
    minEd: req.body.minEd,
    maxEd: req.body.maxEd,
  });
  res.locals.name = 'updateClassDescription';
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
  const classDescription = await db.itemModifier.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeClassDescription';
  res.locals.result = classDescription;
  classDescription.destroy();
  next();
};
