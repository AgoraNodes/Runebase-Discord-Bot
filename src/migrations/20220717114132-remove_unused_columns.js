module.exports = {
  up: async (queryInterface, DataTypes) => {
    queryInterface.removeColumn('battle', 'UserClassId');
    queryInterface.removeColumn('buff', 'UserClassId');
    queryInterface.removeColumn('debuff', 'UserclassId');
  },
  down: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
