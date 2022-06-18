import db from '../../../models';

export const unEquipBelt = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.beltId) {
    const unequipBelt = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.beltId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipBelt) {
      await userCurrentCharacter.equipment.update({
        beltId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unequipBelt.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
