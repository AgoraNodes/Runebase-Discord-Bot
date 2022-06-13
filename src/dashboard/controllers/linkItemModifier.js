import db from '../../models';

export const fetchItemModifierLinks = async (
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
        model: db.itemModifier,
        as: 'itemModifier',
      },
      {
        model: db.itemType,
        as: 'itemType',
      },
    ],
  };
  res.locals.name = 'priceCurrencies';
  res.locals.count = await db.ItemModifierItemType.count(options);
  res.locals.result = await db.ItemModifierItemType.findAll(options);
  next();
};

export const addItemModifierLink = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.itemModifier) {
    throw new Error("itemModifier is required");
  }
  if (!req.body.itemType) {
    throw new Error("itemType is required");
  }

  const itemFamily = await db.ItemModifierItemType.findOne({
    where: {
      itemModifierId: req.body.itemModifier,
      itemTypeId: req.body.itemType,
    },
  });

  if (itemFamily) {
    throw new Error("Already Exists");
  }

  const newItemFamily = await db.ItemModifierItemType.create({
    itemModifierId: req.body.itemModifier,
    itemTypeId: req.body.itemType,
  });
  res.locals.name = 'addItemFamily';
  res.locals.result = await db.ItemModifierItemType.findOne({
    where: {
      id: newItemFamily.id,
    },
    include: [
      {
        model: db.itemModifier,
        as: 'itemModifier',
      },
      {
        model: db.itemType,
        as: 'itemType',
      },
    ],
  });

  next();
};

export const updateItemModifierLink = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.itemType) {
    throw new Error("itemType is required");
  }

  const classDescription = await db.ItemModifierItemType.findOne({
    where: {
      id: req.body.id,
    },
  });
  const updatedRank = await classDescription.update({
    itemModifierId: req.body.itemModifier,
    itemTypeId: req.body.itemTypeId,
  });
  res.locals.name = 'updateClassDescription';
  res.locals.result = await db.ItemModifierItemType.findOne({
    where: {
      id: updatedRank.id,
    },
    include: [
      {
        model: db.itemModifier,
        as: 'itemModifier',
      },
      {
        model: db.itemType,
        as: 'itemType',
      },
    ],
  });
  next();
};

export const removeItemModifierLink = async (
  req,
  res,
  next,
) => {
  const classDescription = await db.ItemModifierItemType.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeClassDescription';
  res.locals.result = classDescription;
  classDescription.destroy();
  next();
};
