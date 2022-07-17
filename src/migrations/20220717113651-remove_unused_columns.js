module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.removeColumn('battle', 'UserClassId');
      queryInterface.removeColumn('buff', 'UserClassId');
      queryInterface.removeColumn('debuff', 'UserclassId');
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
        'battle',
        'UserClassId',
        {
          type: DataTypes.BIGINT,
          references: {
            model: 'UserGroup', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      );
      queryInterface.addColumn(
        'buff',
        'UserClassId',
        {
          type: DataTypes.BIGINT,
          references: {
            model: 'UserGroup', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      );
      queryInterface.addColumn(
        'debuff',
        'UserClassId',
        {
          type: DataTypes.BIGINT,
          references: {
            model: 'UserGroup', // name of Source model
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
