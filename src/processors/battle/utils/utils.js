export const lifeSteal = (myDamage, lifeSteal) => (lifeSteal > 0 ? Math.round((myDamage / 100) * lifeSteal) : null);
export const manaSteal = (myDamage, manaSteal) => (manaSteal > 0 ? Math.round((myDamage / 100) * manaSteal) : null);
