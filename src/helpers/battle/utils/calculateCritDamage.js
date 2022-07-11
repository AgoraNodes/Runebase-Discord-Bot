const calculateCritDamage = (
  myDamage,
  critChance,
) => {
  let damage = myDamage;
  const didWeCrit = Math.random() < Number(critChance) / 100;
  if (didWeCrit) {
    damage = myDamage + ((myDamage / 100) * 75);
  }
  return damage;
};

export default calculateCritDamage;
