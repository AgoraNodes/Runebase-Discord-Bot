module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.removeColumn('UserGroupClassSkill', 'UserClassId');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.addColumn(
        'UserGroupClassSkill',
        'UserClassId',
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
};
