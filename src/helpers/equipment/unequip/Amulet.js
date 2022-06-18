import db from '../../../models';

export const unEquipAmulet = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.amuletId) {
    const unequipAmulet = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.amuletId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipAmulet) {
      await userCurrentCharacter.equipment.update({
        amuletId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unequipAmulet.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
