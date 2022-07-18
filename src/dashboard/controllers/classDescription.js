import db from '../../models';

export const updateClassDescription = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.description) {
    throw new Error("description is required");
  }
  const classDescription = await db.classDescription.findOne({
    where: {
      id: req.body.id,
    },
  });
  const updatedRank = await classDescription.update({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });
  res.locals.name = 'updateClassDescription';
  res.locals.result = await db.classDescription.findOne({
    where: {
      id: updatedRank.id,
    },
  });
  next();
};

export const removeClassDescription = async (
  req,
  res,
  next,
) => {
  const classDescription = await db.classDescription.findOne({
    where: {
      id: req.body.id,
    },
  });
  res.locals.name = 'removeClassDescription';
  res.locals.result = classDescription;
  classDescription.destroy();
  next();
};

export const fetchClassDescriptions = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['id', 'DESC'],
    ],
  };
  res.locals.name = 'fetchClassDescriptions';
  res.locals.count = await db.classDescription.count(options);
  res.locals.result = await db.classDescription.findAll(options);
  console.log(res.locals.result);
  next();
};

export const addClassDescription = async (
  req,
  res,
  next,
) => {
  console.log(req.body);
  if (!req.body.name) {
    throw new Error("Name is required");
  }
  if (!req.body.description) {
    throw new Error("description is required");
  }

  const classDescription = await db.classDescription.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (classDescription) {
    throw new Error("Already Exists");
  }

  res.locals.name = 'addClassDescription';
  res.locals.result = await db.classDescription.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  next();
};
