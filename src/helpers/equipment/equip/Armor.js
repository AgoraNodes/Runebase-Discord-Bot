import db from '../../../models';

export const equipArmor = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (equipment.armorId) {
    const unequipArmorItem = await db.item.findOne({
      where: {
        id: equipment.armorId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipArmorItem) {
      await unequipArmorItem.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
  await equipment.update({
    armorId: itemToEquip.id,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  await itemToEquip.update({
    inventoryId: null,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
};
