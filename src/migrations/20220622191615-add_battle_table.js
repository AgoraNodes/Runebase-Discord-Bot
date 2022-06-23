module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('battle', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      complete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      UserClassId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'UserClass', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('battle');
  },
};
