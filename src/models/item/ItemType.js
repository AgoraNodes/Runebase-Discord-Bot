module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemTypeModel = sequelize.define('itemType', modelDefinition, modelOptions);

  ItemTypeModel.associate = (model) => {
    ItemTypeModel.hasOne(model.itemFamily);
  };

  return ItemTypeModel;
};
