/* eslint-disable no-restricted-syntax */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const discordHomeServerGuildId = await queryInterface.rawSelect(
        'setting',
        {
          transaction,
        },
        [
          'discordHomeServerGuildId',
        ],
      );
      const group = await queryInterface.rawSelect(
        'group',
        {
          where: {
            groupId: discordHomeServerGuildId,
          },
          transaction,
        },
        [
          'id',
        ],
      );
      if (group) {
        const users = await queryInterface.sequelize.query('SELECT * FROM user', {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction,
        });
        for await (const user of users) {
          await queryInterface.bulkInsert('UserGroup', [
            {
              exp: user.exp,
              userId: user.id,
              groupId: group,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        }
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    console.log('we are not providing a way back from this');
  },
};
