import db from '../../../models';

export const unEquipOffHand = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.offHandId) {
    const unEquipOffHand = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.offHandId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unEquipOffHand) {
      await userCurrentCharacter.equipment.update({
        offHandId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unEquipOffHand.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
