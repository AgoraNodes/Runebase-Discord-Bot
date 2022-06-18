import db from '../../../models';

export const equipRing = async (
  userCurrentCharacter,
  equipment,
  itemToEquip,
  t,
) => {
  if (!equipment.ringSlotOneId) {
    await equipment.update({
      ringSlotOneId: itemToEquip.id,
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
  } else if (!equipment.ringSlotTwoId) {
    await equipment.update({
      ringSlotTwoId: itemToEquip.id,
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
  } else if (equipment.ringSlotOneId && equipment.ringSlotTwoId) {
    const unequipRingSlotOne = await db.item.findOne({
      where: {
        id: equipment.ringSlotOneId,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (unequipRingSlotOne) {
      await unequipRingSlotOne.update({
        inventoryId: userCurrentCharacter.inventoryId,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      await equipment.update({
        ringSlotOneId: itemToEquip.id,
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
    }
  }
};
