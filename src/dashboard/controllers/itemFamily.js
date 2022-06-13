import db from '../../models';

export const fetchItemFamilies = async (
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
        model: db.itemType,
        as: 'itemType',
      },
    ],
  };
  res.locals.name = 'priceCurrencies';
  res.locals.count = await db.itemFamily.count(options);
  res.locals.result = await db.itemFamily.findAll(options);
  next();
};

export const addItemFamily = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.itemType) {
    throw new Error("description is required");
  }

  const itemFamily = await db.itemFamily.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (itemFamily) {
    throw new Error("Already Exists");
  }

  const newItemFamily = await db.itemFamily.create({
    name: req.body.name,
    itemTypeId: req.body.itemType,
  });
  res.locals.name = 'addItemFamily';
  res.locals.result = await db.itemFamily.findOne({
    where: {
      id: newItemFamily.id,
    },
    include: [
      {
        model: db.itemType,
        as: 'itemType',
      },
    ],
  });

  next();
};

export const updateItemFamily = async (
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

  const classDescription = await db.itemFamily.findOne({
    where: {
      id: req.body.id,
    },
  });
  const updatedRank = await classDescription.update({
    name: req.body.name,
    itemTypeId: req.body.itemType,
  });
  res.locals.name = 'updateClassDescription';
  res.locals.result = await db.itemFamily.findOne({
    where: {
      id: updatedRank.id,
    },
    include: [
      {
        model: db.itemType,
        as: 'itemType',
      },
    ],
  });
  next();
};

export const removeItemFamily = async (
  req,
  res,
  next,
) => {
  const classDescription = await db.itemFamily.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeClassDescription';
  res.locals.result = classDescription;
  classDescription.destroy();
  next();
};
