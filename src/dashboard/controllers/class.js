import db from '../../models';

export const updateClass = async (
  req,
  res,
  next,
) => {
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.description) {
    throw new Error("description is required");
  }

  if (!req.body.strength) {
    throw new Error("strength is required");
  }
  if (!req.body.dexterity) {
    throw new Error("dexterity is required");
  }
  if (!req.body.vitality) {
    throw new Error("vitality is required");
  }
  if (!req.body.energy) {
    throw new Error("energy is required");
  }
  if (!req.body.life) {
    throw new Error("energy is required");
  }
  if (!req.body.mana) {
    throw new Error("energy is required");
  }
  if (!req.body.stamina) {
    throw new Error("energy is required");
  }
  if (!req.body.description) {
    throw new Error("energy is required");
  }

  const classChar = await db.class.findOne({
    where: {
      id: req.body.id,
    },
  });
  const updatedRank = await classChar.update({
    name: req.body.name,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    vitality: req.body.vitality,
    energy: req.body.energy,
    life: req.body.life,
    mana: req.body.mana,
    stamina: req.body.stamina,
    classDescriptionId: req.body.description,
  });
  res.locals.name = 'updateChar';
  res.locals.result = await db.class.findOne({
    where: {
      id: updatedRank.id,
    },
    include: [
      {
        model: db.classDescription,
        as: 'classDescription',
        required: false,
      },
    ],
  });
  next();
};

export const removeClass = async (
  req,
  res,
  next,
) => {
  const classChar = await db.class.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeClass';
  res.locals.result = classChar;
  classChar.destroy();
  next();
};

export const fetchClasses = async (
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
        model: db.classDescription,
        as: 'classDescription',
        required: false,
      },
    ],
  };
  res.locals.name = 'fetchClass';
  res.locals.count = await db.class.count(options);
  res.locals.result = await db.class.findAll(options);
  console.log(res.locals.result);
  next();
};

export const addClass = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.strength) {
    throw new Error("strength is required");
  }
  if (!req.body.dexterity) {
    throw new Error("dexterity is required");
  }
  if (!req.body.vitality) {
    throw new Error("vitality is required");
  }
  if (!req.body.energy) {
    throw new Error("energy is required");
  }
  if (!req.body.life) {
    throw new Error("life is required");
  }
  if (!req.body.mana) {
    throw new Error("mana is required");
  }
  if (!req.body.stamina) {
    throw new Error("stamina is required");
  }
  if (!req.body.description) {
    throw new Error("description is required");
  }

  const classChar = await db.class.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (classChar) {
    throw new Error("Already Exists");
  }

  res.locals.name = 'addClass';
  res.locals.result = await db.class.create({
    name: req.body.name,
    strength: Number(req.body.strength),
    dexterity: Number(req.body.dexterity),
    vitality: Number(req.body.vitality),
    energy: Number(req.body.energy),
    life: Number(req.body.life),
    mana: Number(req.body.mana),
    stamina: Number(req.body.stamina),
    classDescriptionId: req.body.description,
  });

  next();
};
