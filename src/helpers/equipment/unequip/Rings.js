import db from '../../../models';

export const unEquipRing = async (
  userCurrentCharacter,
  itemToUnequip,
  t,
) => {
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');
  console.log('unequip ring');

  if (userCurrentCharacter.equipment.ringSlotOneId || userCurrentCharacter.equipment.ringSlotTwoId) {
    const unEquipRing = await db.item.findOne({
      where: {
        id: itemToUnequip.id,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    console.log(unEquipRing);
    if (unEquipRing) {
      if (userCurrentCharacter.equipment.ringSlotOneId === unEquipRing.id) {
        await userCurrentCharacter.equipment.update({
          ringSlotOneId: null,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        await unEquipRing.update({
          inventoryId: userCurrentCharacter.inventoryId,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }
      if (userCurrentCharacter.equipment.ringSlotTwoId === unEquipRing.id) {
        await userCurrentCharacter.equipment.update({
          ringSlotTwoId: null,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        await unEquipRing.update({
          inventoryId: userCurrentCharacter.inventoryId,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }
    }
  }
};
