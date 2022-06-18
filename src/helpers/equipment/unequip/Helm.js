import db from '../../../models';

export const unEquipHelm = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.helmId) {
    const unEquipHelm = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.helmId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unEquipHelm) {
      await userCurrentCharacter.equipment.update({
        helmId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unEquipHelm.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
