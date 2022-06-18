import db from '../../../models';

export const unEquipArmor = async (
  userCurrentCharacter,
  t,
) => {
  if (userCurrentCharacter.equipment.armorId) {
    const unequipArmor = await db.item.findOne({
      where: {
        id: userCurrentCharacter.equipment.armorId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipArmor) {
      await userCurrentCharacter.equipment.update({
        armorId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await unequipArmor.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }
  }
};
