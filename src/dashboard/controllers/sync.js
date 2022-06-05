import settings from '../../config/settings';
import { startRunebaseSync } from "../../services/syncRunebase";

export const startSyncBlocks = async (
  req,
  res,
  next,
) => {
  startRunebaseSync();

  res.locals.name = 'sync';
  res.locals.result = 'TRUE';
  next();
};
