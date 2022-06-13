import db from '../../models';

export const fetchItemTypes = async (
  req,
  res,
  next,
) => {
  const options = {
    order: [
      ['id', 'DESC'],
    ],
  };
  res.locals.name = 'priceCurrencies';
  res.locals.count = await db.itemType.count(options);
  res.locals.result = await db.itemType.findAll(options);
  next();
};
