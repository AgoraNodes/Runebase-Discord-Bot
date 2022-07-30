import db from '../../models';
import {
  userNotFoundMessage,
} from '../../embeds';

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export const userWalletExist = async (
  message,
  functionName,
  t = false,
) => {
  let activity;
  let userId;
  if (message.user && message.user.id) {
    userId = message.user.id;
  } else if (message.author) {
    userId = message.author.id;
  } else {
    userId = message.user;
  }

  const user = await db.user.findOne({
    where: {
      user_id: `${userId}`,
    },
    include: [
      {
        model: db.wallet,
        as: 'wallet',
        required: true,
        include: [
          {
            model: db.address,
            as: 'address',
            required: true,
          },
        ],
      },
    ],
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });
  if (!user) {
    activity = await db.activity.create({
      type: `${functionName}_f`,
    }, {
      ...(t && [
        {
          lock: t.LOCK.UPDATE,
          transaction: t,
        }]
      ),
    });
    if (
      (message.user && message.user.id)
      || (message.author && message.author.id)
    ) {
      await message.reply({
        embeds: [
          userNotFoundMessage(
            message,
            capitalize(functionName),
          ),
        ],
      });
    }
  }
  return [
    user,
    activity,
  ];
};
