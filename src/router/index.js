import { discordRouter } from './discord';
import { notifyRouter } from './notify';

export const router = (
  app,
  discordClient,
  io,
  queue,
) => {
  notifyRouter(
    app,
    discordClient,
    io,
    queue,
  );
  discordRouter(
    discordClient,
    queue,
    io,
  );
};
