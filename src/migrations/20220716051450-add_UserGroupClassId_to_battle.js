module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.addColumn(
        'battle',
        'UserGroupClassId',
        {
          type: DataTypes.BIGINT,
          references: {
            model: 'UserGroupClass', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.removeColumn(
        'UserGroupClassId',
        'battle',
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
