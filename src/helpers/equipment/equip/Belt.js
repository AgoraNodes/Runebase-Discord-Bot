import db from '../../../models';

export const equipBelt = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (equipment.beltId) {
    const unequipBelt = await db.item.findOne({
      where: {
        id: equipment.beltId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipBelt) {
      await unequipBelt.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
  await equipment.update({
    beltId: itemToEquip.id,
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
