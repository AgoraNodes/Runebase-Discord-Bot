import db from '../../../models';

export const equipMainHand = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  let unequipOffHand = false;
  if (equipment.mainHandId) {
    if (equipment.mainHand.itemBase.itemFamily.twoHanded) {
      const unequipOffhand = await db.item.findOne({
        where: {
          id: equipment.offHandId,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (unequipOffhand) {
        await unequipOffhand.update({
          inventoryId: userCurrentCharacter.inventoryId,
        });
        unequipOffHand = true;
      }
    }
  }
  if (equipment.offHandId) {
    const unequipShieldItem = await db.item.findOne({
      where: {
        id: equipment.offHandId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipShieldItem) {
      await unequipShieldItem.update({
        inventoryId: userCurrentCharacter.inventoryId,
      });
    }
  }
  await equipment.update({
    mainHandId: itemToEquip.id,
    ...(
      unequipOffHand
      && {
        offHandId: null,
      }
    ),
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
