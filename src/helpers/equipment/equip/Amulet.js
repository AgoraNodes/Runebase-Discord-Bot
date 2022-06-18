import db from '../../../models';

export const equipAmulet = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (equipment.amuletId) {
    const unequipAmulet = await db.item.findOne({
      where: {
        id: equipment.amuletId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipAmulet) {
      await unequipAmulet.update({
        inventoryId: userCurrentCharacter.inventoryId,
      });
    }
  }
  await equipment.update({
    amuletId: itemToEquip.id,
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
