import db from '../../../models';

export const equipBoots = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (equipment.bootsId) {
    const unequipBoots = await db.item.findOne({
      where: {
        id: equipment.bootsId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipBoots) {
      await unequipBoots.update({
        inventoryId: userCurrentCharacter.inventoryId,
      });
    }
  }
  await equipment.update({
    bootsId: itemToEquip.id,
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
