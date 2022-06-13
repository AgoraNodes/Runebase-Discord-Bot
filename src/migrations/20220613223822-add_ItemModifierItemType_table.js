module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ItemModifierItemType', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      itemModifierId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'itemModifier',
          key: 'id',
        },
      },
      itemTypeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'itemType',
          key: 'id',
        },
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
    await queryInterface.dropTable('ItemModifierItemType');
  },
};
