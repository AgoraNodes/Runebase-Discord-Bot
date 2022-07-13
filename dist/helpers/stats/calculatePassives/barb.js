"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var calculatePassivesBarb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter, defense, regularAttack, kick, FR, PR, LR, CR) {
    var newDefense, newRegularAttack, newFR, newPR, newLR, newCR, newKick, thoughSkin, resistance, swordsman, axeman, maceman, polearmMaster, throwingMaster, spearman, parry, criticalHit, criticalKick, healingHit, addedPercentageDefense, amountDefenseAdded, newMinAttack, newMaxAttack, newAr, newCrit, _newMinAttack, _newMaxAttack, _newAr, _newCrit, _newMinAttack2, _newMaxAttack2, _newAr2, _newCrit2, _newMinAttack3, _newMaxAttack3, _newAr3, _newCrit3, _newMinAttack4, _newMaxAttack4, _newAr4, _newCrit4, _newMinAttack5, _newMaxAttack5, newMinThrow, newMaxThrow, _newAr5, _newCrit5, addCrit, _newCrit6, newLifeSteal, newKickLifeSteal;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newDefense = defense;
            newRegularAttack = regularAttack;
            newFR = FR;
            newPR = PR;
            newLR = LR;
            newCR = CR;
            newKick = kick;
            thoughSkin = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Though Skin';
            });
            resistance = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Resistance';
            });
            swordsman = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Swordsman';
            });
            axeman = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Axeman';
            });
            maceman = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Maceman';
            });
            polearmMaster = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Polearm Master';
            });
            throwingMaster = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Throwing Master';
            });
            spearman = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Spearman';
            });
            parry = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Parry';
            });
            criticalHit = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Critical Hit';
            });
            criticalKick = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Critical Kick';
            });
            healingHit = currentCharacter.UserClassSkills.find(function (x) {
              return x.skill.name === 'Healing Hit';
            });

            if (thoughSkin) {
              addedPercentageDefense = 30 + (thoughSkin.points - 1) * 10;
              amountDefenseAdded = addedPercentageDefense / 100 * newDefense;
              newDefense = Math.round(newDefense + amountDefenseAdded);
            }

            if (resistance) {
              newFR += resistance.points * 2;
              newPR += resistance.points * 2;
              newLR += resistance.points * 2;
              newCR += resistance.points * 2;
            }

            if (swordsman && currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Swords') {
              newMinAttack = newRegularAttack.min + newRegularAttack.min / 100 * (28 + (swordsman.points - 1) * 5);
              newMaxAttack = newRegularAttack.max + newRegularAttack.max / 100 * (28 + (swordsman.points - 1) * 5);
              newAr = newRegularAttack.ar + newRegularAttack.ar / 100 * (40 + (swordsman.points - 1) * 8);
              newCrit = newRegularAttack.crit + 5 + (swordsman.points - 1) * 4;
              newRegularAttack = {
                name: 'Attack',
                min: Math.round(newMinAttack),
                max: Math.round(newMaxAttack),
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: Math.round(newAr),
                crit: newCrit,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (axeman && currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Axes') {
              _newMinAttack = newRegularAttack.min + newRegularAttack.min / 100 * (28 + (axeman.points - 1) * 5);
              _newMaxAttack = newRegularAttack.max + newRegularAttack.max / 100 * (28 + (axeman.points - 1) * 5);
              _newAr = newRegularAttack.ar + newRegularAttack.ar / 100 * (40 + (axeman.points - 1) * 8);
              _newCrit = newRegularAttack.crit + 5 + (axeman.points - 1) * 4;
              newRegularAttack = {
                name: 'Attack',
                min: Math.round(_newMinAttack),
                max: Math.round(_newMaxAttack),
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: Math.round(_newAr),
                crit: _newCrit,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (maceman && currentCharacter.equipment.mainHand && (currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Maces' || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Scepters' || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Staves' || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Wands')) {
              _newMinAttack2 = newRegularAttack.min + newRegularAttack.min / 100 * (28 + (maceman.points - 1) * 5);
              _newMaxAttack2 = newRegularAttack.max + newRegularAttack.max / 100 * (28 + (maceman.points - 1) * 5);
              _newAr2 = newRegularAttack.ar + newRegularAttack.ar / 100 * (40 + (maceman.points - 1) * 8);
              _newCrit2 = newRegularAttack.crit + 5 + (maceman.points - 1) * 4;
              newRegularAttack = {
                name: 'Attack',
                min: Math.round(_newMinAttack2),
                max: Math.round(_newMaxAttack2),
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: Math.round(_newAr2),
                crit: _newCrit2,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (spearman && currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Spears') {
              _newMinAttack3 = newRegularAttack.min + newRegularAttack.min / 100 * (28 + (spearman.points - 1) * 5);
              _newMaxAttack3 = newRegularAttack.max + newRegularAttack.max / 100 * (28 + (spearman.points - 1) * 5);
              _newAr3 = newRegularAttack.ar + newRegularAttack.ar / 100 * (40 + (spearman.points - 1) * 8);
              _newCrit3 = newRegularAttack.crit + 5 + (spearman.points - 1) * 4;
              newRegularAttack = {
                name: 'Attack',
                min: Math.round(_newMinAttack3),
                max: Math.round(_newMaxAttack3),
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: Math.round(_newAr3),
                crit: _newCrit3,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (polearmMaster && currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Polearms') {
              _newMinAttack4 = newRegularAttack.min + newRegularAttack.min / 100 * (28 + (polearmMaster.points - 1) * 5);
              _newMaxAttack4 = newRegularAttack.max + newRegularAttack.max / 100 * (28 + (polearmMaster.points - 1) * 5);
              _newAr4 = newRegularAttack.ar + newRegularAttack.ar / 100 * (40 + (polearmMaster.points - 1) * 8);
              _newCrit4 = newRegularAttack.crit + 5 + (polearmMaster.points - 1) * 4;
              newRegularAttack = {
                name: 'Attack',
                min: Math.round(_newMinAttack4),
                max: Math.round(_newMaxAttack4),
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: Math.round(_newAr4),
                crit: _newCrit4,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (throwingMaster && currentCharacter.equipment.mainHand && (currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Javelins' || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Throwing')) {
              _newMinAttack5 = newRegularAttack.min + newRegularAttack.min / 100 * (28 + (throwingMaster.points - 1) * 5);
              _newMaxAttack5 = newRegularAttack.max + newRegularAttack.max / 100 * (28 + (throwingMaster.points - 1) * 5);
              newMinThrow = newRegularAttack.minThrow + newRegularAttack.minThrow / 100 * (28 + (throwingMaster.points - 1) * 5);
              newMaxThrow = newRegularAttack.maxThrow + newRegularAttack.maxThrow / 100 * (28 + (throwingMaster.points - 1) * 5);
              _newAr5 = newRegularAttack.ar + newRegularAttack.ar / 100 * (40 + (throwingMaster.points - 1) * 8);
              _newCrit5 = newRegularAttack.crit + 5 + (throwingMaster.points - 1) * 4;
              newRegularAttack = {
                name: 'Attack',
                min: Math.round(_newMinAttack5),
                max: Math.round(_newMaxAttack5),
                minThrow: Math.round(newMinThrow),
                maxThrow: Math.round(newMaxThrow),
                ar: Math.round(_newAr5),
                crit: _newCrit5,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (parry) {
              newRegularAttack = {
                name: 'Attack',
                min: newRegularAttack.min,
                max: newRegularAttack.max,
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: newRegularAttack.ar,
                crit: newRegularAttack.crit,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry + 5 + (parry.points - 1),
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (criticalKick) {
              addCrit = newRegularAttack.crit + 5 + criticalKick.points;
              newKick = {
                name: 'Kick',
                attackType: newKick.attackType,
                min: newKick.min,
                max: newKick.max,
                ar: newKick.ar,
                crit: newKick.crit + addCrit,
                lifeSteal: newKick.lifeSteal,
                manaSteal: newKick.manaSteal,
                cost: 0
              };
            }

            if (criticalHit) {
              _newCrit6 = newRegularAttack.crit + 5 + criticalHit.points;
              newRegularAttack = {
                name: 'Attack',
                min: newRegularAttack.min,
                max: newRegularAttack.max,
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: newRegularAttack.ar,
                crit: _newCrit6,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: newRegularAttack.lifeSteal,
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
            }

            if (healingHit) {
              newLifeSteal = newRegularAttack.lifeSteal + 1 + (healingHit.points - 1) * 0.5;
              newRegularAttack = {
                name: 'Attack',
                min: newRegularAttack.min,
                max: newRegularAttack.max,
                minThrow: newRegularAttack.minThrow,
                maxThrow: newRegularAttack.maxThrow,
                ar: newRegularAttack.ar,
                crit: newRegularAttack.crit,
                stun: newRegularAttack.stun,
                parry: newRegularAttack.parry,
                lifeSteal: Math.round(newLifeSteal),
                // lifeSteal: Math.round(50), // temp testing
                manaSteal: newRegularAttack.manaSteal,
                cost: newRegularAttack.cost
              };
              newKickLifeSteal = newRegularAttack.lifeSteal + 1 + (healingHit.points - 1) * 0.5;
              newKick = {
                name: 'Kick',
                attackType: newKick.attackType,
                min: newKick.min,
                max: newKick.max,
                ar: newKick.ar,
                crit: newKick.crit,
                // lifeSteal: Math.round(50), // temp testing
                lifeSteal: Math.round(newKickLifeSteal),
                manaSteal: newKick.manaSteal,
                cost: 0
              };
            }

            return _context.abrupt("return", [newDefense, // Defense
            newRegularAttack, // Regular Attack
            newKick, // Kick
            newFR, // Fire resistance
            newPR, // Poison Resistance
            newLR, // Lightning Resitance
            newCR // Cold Resistance
            ]);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calculatePassivesBarb(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = calculatePassivesBarb;
exports["default"] = _default;