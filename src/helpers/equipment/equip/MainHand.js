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
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        unequipOffHand = true;
      }
    }
    const unequipMainHandItem = await db.item.findOne({
      where: {
        id: equipment.mainHandId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipMainHandItem) {
      await unequipMainHandItem.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
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
