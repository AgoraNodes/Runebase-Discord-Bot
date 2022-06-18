"use strict";

module.exports = function (sequelize, DataTypes) {
  // 1: The model schema.
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var EquipmentModel = sequelize.define('equipment', modelDefinition, modelOptions);

  EquipmentModel.associate = function (model) {
    EquipmentModel.hasOne(model.UserClass, {
      as: 'equipment',
      foreignKey: 'equipmentId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'helm',
      foreignKey: 'helmId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'amulet',
      foreignKey: 'amuletId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'mainHand',
      foreignKey: 'mainHandId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'offHand',
      foreignKey: 'offHandId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'armor',
      foreignKey: 'armorId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'gloves',
      foreignKey: 'glovesId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'belt',
      foreignKey: 'beltId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'boots',
      foreignKey: 'bootsId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'ringSlotOne',
      foreignKey: 'ringSlotOneId'
    });
    EquipmentModel.belongsTo(model.item, {
      as: 'ringSlotTwo',
      foreignKey: 'ringSlotTwoId'
    });
  };

  return EquipmentModel;
};