const calculateCritDamage = (
  myDamage,
  critChance,
) => {
  let damage = myDamage;
  const didWeCrit = Math.random() < Number(critChance) / 100;
  if (didWeCrit) {
    damage = myDamage + Math.round(((myDamage / 100) * 75));
  }
  return [
    didWeCrit,
    damage,
  ];
};

export default calculateCritDamage;
