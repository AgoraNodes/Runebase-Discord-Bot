import db from '../../models';

export const fetchItemDifficulty = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['id', 'ASC'],
    ],
  };
  res.locals.name = 'itemDifficulty';
  res.locals.count = await db.itemDifficulty.count(options);
  res.locals.result = await db.itemDifficulty.findAll(options);
  next();
};
