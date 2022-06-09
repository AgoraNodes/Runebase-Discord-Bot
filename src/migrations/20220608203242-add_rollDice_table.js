module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('rollDice', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      diceOne: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      diceTwo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      payout: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      expRewarded: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'user', // name of Source model
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
    await queryInterface.dropTable('rollDice');
  },
};
