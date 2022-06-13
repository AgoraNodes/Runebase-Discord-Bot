module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const UserClassModel = sequelize.define('UserClass', modelDefinition, modelOptions);

  UserClassModel.associate = (model) => {
    UserClassModel.belongsTo(model.stats, {
      as: 'stats',
      foreignKey: 'statsId',
    });
    UserClassModel.belongsTo(model.condition, {
      as: 'condition',
      foreignKey: 'conditionId',
    });
    UserClassModel.belongsTo(model.user, {
      foreignKey: 'userId',
    });
  };

  return UserClassModel;
};
