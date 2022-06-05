module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      ignoreMe: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      banMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastSeen: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      exp: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
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
    await queryInterface.dropTable('user');
  },
};
