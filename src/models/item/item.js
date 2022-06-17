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
    durability: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    defense: {
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
    minThrowDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    maxThrowDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    strength: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    dexterity: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    vitality: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    energy: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    eDefense: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    eDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const itemModel = sequelize.define('item', modelDefinition, modelOptions);

  itemModel.associate = (model) => {
    itemModel.belongsTo(model.itemBase);
    itemModel.belongsTo(model.itemQuality);
    itemModel.belongsTo(model.inventory);

    itemModel.hasOne(model.equipment, {
      as: 'helm',
      foreignKey: 'helmId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'amulet',
      foreignKey: 'amuletId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'mainHand',
      foreignKey: 'mainHandId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'offHand',
      foreignKey: 'offHandId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'armor',
      foreignKey: 'armorId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'gloves',
      foreignKey: 'glovesId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'belt',
      foreignKey: 'beltId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'boots',
      foreignKey: 'bootsId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'ringSlotOne',
      foreignKey: 'ringSlotOneId',
    });
    itemModel.hasOne(model.equipment, {
      as: 'ringSlotTwo',
      foreignKey: 'ringSlotTwoId',
    });
  };

  return itemModel;
};
