import db from '../../../models';

export const equipGloves = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (equipment.glovesId) {
    const unequipGloves = await db.item.findOne({
      where: {
        id: equipment.glovesId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipGloves) {
      await unequipGloves.update({
        inventoryId: userCurrentCharacter.inventoryId,
      });
    }
  }
  await equipment.update({
    glovesId: itemToEquip.id,
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
