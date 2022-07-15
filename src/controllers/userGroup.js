import { Transaction } from "sequelize";
import db from '../models';

// Does this really need to be a transaction or await?
// Can we save on execution time skipping transaction and await?
export const findOrCreateUserGroupRecord = async (
  userId,
  groupId,
) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const [
      user,
      created,
    ] = await db.UserGroup.findOrCreate({
      where: {
        groupId,
        userId,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    t.afterCommit(async () => {
      console.log('done findOrCreate UserGroup');
    });
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'createUser',
        error: `${err}`,
      });
    } catch (e) {
      console.log(`Error Discord: ${e}`);
    }
  });
};
