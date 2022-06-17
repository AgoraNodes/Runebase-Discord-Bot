import db from '../../../models';

export const equipHelm = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (equipment.helmId) {
    const unequipHelmItem = await db.item.findOne({
      where: {
        id: equipment.helmId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipHelmItem) {
      await unequipHelmItem.update({
        inventoryId: userCurrentCharacter.inventoryId,
      });
    }
  }
  await equipment.update({
    helmId: itemToEquip.id,
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
