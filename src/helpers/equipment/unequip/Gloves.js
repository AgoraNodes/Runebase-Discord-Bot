import db from '../../../models';

export const unEquipGloves = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.glovesId) {
    const unEquipGloves = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.glovesId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unEquipGloves) {
      await userCurrentCharacter.equipment.update({
        glovesId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unEquipGloves.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
