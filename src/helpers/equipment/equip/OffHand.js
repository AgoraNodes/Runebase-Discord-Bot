import db from '../../../models';

export const equipOffHand = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  let unequipMainHand = false;
  if (equipment.mainHandId) {
    if (equipment.mainHand.itemBase.itemFamily.twoHanded) {
      const unequipTwoHander = await db.item.findOne({
        where: {
          id: equipment.mainHandId,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (unequipTwoHander) {
        await unequipTwoHander.update({
          inventoryId: userCurrentCharacter.inventoryId,
        });
        unequipMainHand = true;
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
    offHandId: itemToEquip.id,
    ...(
      unequipMainHand
      && {
        mainHandId: null,
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
