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
      const UserGroupClasses = await queryInterface.sequelize.query(
        'SELECT * FROM UserGroupClass',
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction,
        },
      );
      for await (const UserGroupClass of UserGroupClasses) {
        let UserGroup = false;
        UserGroup = await queryInterface.sequelize.query(
          `SELECT * FROM UserGroup WHERE groupId = ${group} AND userId = ${UserGroupClass.userId}`,
          {
            type: queryInterface.sequelize.QueryTypes.SELECT,
            transaction,
          },
        );
        if (UserGroup) {
          await queryInterface.bulkUpdate('UserGroupClass', {
            UserGroupId: UserGroup[0].id,
          }, {
            userId: UserGroup[0].userId,
          }, {
            transaction,
          });
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
