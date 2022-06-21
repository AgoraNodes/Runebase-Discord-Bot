module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'UserClassSkill',
      'points',
      {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'UserClassSkill',
      'points',
    );
  },
};
