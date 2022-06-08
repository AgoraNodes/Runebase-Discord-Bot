module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'activeTalker',
      'lastSentence',
      {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'activeTalker',
      'lastSentence',
    );
  },
};
