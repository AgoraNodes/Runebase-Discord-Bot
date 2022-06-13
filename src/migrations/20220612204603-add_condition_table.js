module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('condition', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      life: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      mana: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      stamina: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('condition');
  },
};
