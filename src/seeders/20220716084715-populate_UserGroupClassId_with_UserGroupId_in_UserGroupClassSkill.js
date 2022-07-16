/* eslint-disable no-restricted-syntax */
module.exports = {
  up: async (
    queryInterface,
    Sequelize,
  ) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const UserGroupClassSkills = await queryInterface.sequelize.query(
        'SELECT * FROM UserGroupClassSkill',
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction,
        },
      );
      if (UserGroupClassSkills) {
        for await (const UserGroupClassSkill of UserGroupClassSkills) {
          await queryInterface.bulkUpdate('UserGroupClassSkill', {
            UserGroupClassId: UserGroupClassSkill.UserClassId,
          }, {
            id: UserGroupClassSkill.id,
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
  down: async (
    queryInterface,
    Sequelize,
  ) => {
    console.log('we are not providing a way back from this');
  },
};
