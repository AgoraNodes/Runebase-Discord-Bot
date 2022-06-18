import db from '../../../models';

export const unEquipMainHand = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.mainHandId) {
    const unEquipMainHand = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.mainHandId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unEquipMainHand) {
      await userCurrentCharacter.equipment.update({
        mainHandId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unEquipMainHand.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
