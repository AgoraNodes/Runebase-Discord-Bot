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
    twoHanded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemFamilyModel = sequelize.define('itemFamily', modelDefinition, modelOptions);

  ItemFamilyModel.associate = (model) => {
    ItemFamilyModel.belongsTo(model.itemType);
  };

  return ItemFamilyModel;
};
