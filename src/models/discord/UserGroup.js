module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    exp: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const UserGroupModel = sequelize.define('UserGroup', modelDefinition, modelOptions);

  UserGroupModel.associate = (model) => {
    UserGroupModel.belongsTo(model.user, {
      foreignKey: 'userId',
    });
  };

  return UserGroupModel;
};
