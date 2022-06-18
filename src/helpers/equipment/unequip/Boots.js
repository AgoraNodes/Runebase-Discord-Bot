import db from '../../../models';

export const unEquipBoots = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.bootsId) {
    const unEquipBoots = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.bootsId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unEquipBoots) {
      await userCurrentCharacter.equipment.update({
        bootsId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unEquipBoots.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
