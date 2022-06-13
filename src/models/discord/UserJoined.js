module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rewarded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const UserJoinedModel = sequelize.define('userJoined', modelDefinition, modelOptions);

  UserJoinedModel.associate = (model) => {
    UserJoinedModel.belongsTo(model.user, {
      as: 'userJoined',
      foreignKey: 'userJoinedId',
    });
    UserJoinedModel.belongsTo(model.user, {
      as: 'userInvitedBy',
      foreignKey: 'userInvitedById',
    });
    UserJoinedModel.hasOne(model.activity);
  };

  return UserJoinedModel;
};
