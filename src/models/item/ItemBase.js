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
    levelReq: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    strengthReq: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    dexterityReq: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    levelMonster: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    durability: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    sockets: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    minDefense: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    maxDefense: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    minDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    maxDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    block: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    maxStack: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    slots: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemBaseModel = sequelize.define('itemBase', modelDefinition, modelOptions);

  ItemBaseModel.associate = (model) => {
    ItemBaseModel.belongsTo(model.itemFamily);
    // ItemBaseModel.hasOne(model.itemCategory);
    ItemBaseModel.belongsTo(model.itemDifficulty);
  };

  return ItemBaseModel;
};
