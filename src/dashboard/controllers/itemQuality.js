import db from '../../models';

export const fetchItemQuality = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['id', 'ASC'],
    ],
  };
  res.locals.name = 'itemQuality';
  res.locals.count = await db.itemQuality.count(options);
  res.locals.result = await db.itemQuality.findAll(options);
  next();
};
