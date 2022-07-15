const canStillWearItem = (
  item,
  strength,
  dexterity,
) => {
  let canStillWear = true;
  const {
    strengthReq,
    dexterityReq,
  } = item.itemBase;
  if (strengthReq && strengthReq > strength) {
    canStillWear = false;
  }
  if (dexterityReq && dexterityReq > dexterity) {
    canStillWear = false;
  }
  return canStillWear;
};

export default canStillWearItem;
