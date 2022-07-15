"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _calcStrengthDexforReq = require("../../equipment/calcStrengthDexforReq");

var _canStillWearItem = _interopRequireDefault(require("./canStillWearItem"));

var calculateItemStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter, userCurrentRank, strength, dexterity, vitality, energy, defense, block) {
    var newStrength, newDexterity, newVitality, newEnergy, newDefense, newBlock, _yield$calcStrengthDe, _yield$calcStrengthDe2, strengthTotalWithItems, dexterityTotalWithItems, canWearHelm, canWearMainHand, canWearOffHand, canWearArmor, canWearGloves, canWearBelt, canWearBoots, addedEDefense, realDefenseValue, _addedEDefense, _realDefenseValue, _addedEDefense2, _realDefenseValue2, _addedEDefense3, _realDefenseValue3, _addedEDefense4, _realDefenseValue4, _addedEDefense5, _realDefenseValue5, shieldBlock, blocking, _addedEDefense6, _realDefenseValue6, _addedEDefense7, _realDefenseValue7, _addedEDefense8, _realDefenseValue8;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newStrength = strength;
            newDexterity = dexterity;
            newVitality = vitality;
            newEnergy = energy;
            newDefense = defense;
            newBlock = block;
            _context.next = 8;
            return (0, _calcStrengthDexforReq.calcStrengthDexforReq)(currentCharacter);

          case 8:
            _yield$calcStrengthDe = _context.sent;
            _yield$calcStrengthDe2 = (0, _slicedToArray2["default"])(_yield$calcStrengthDe, 2);
            strengthTotalWithItems = _yield$calcStrengthDe2[0];
            dexterityTotalWithItems = _yield$calcStrengthDe2[1];
            canWearHelm = false;
            canWearMainHand = false;
            canWearOffHand = false;
            canWearArmor = false;
            canWearGloves = false;
            canWearBelt = false;
            canWearBoots = false; // Boots

            if (currentCharacter.equipment.boots) {
              canWearBoots = (0, _canStillWearItem["default"])(currentCharacter.equipment.boots, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearBoots);
              console.log('canWearBoots');

              if (canWearBoots) {
                if (currentCharacter.equipment.boots.strength) {
                  newStrength += currentCharacter.equipment.boots.strength;
                }

                if (currentCharacter.equipment.boots.dexterity) {
                  newDexterity += currentCharacter.equipment.boots.dexterity;
                }

                if (currentCharacter.equipment.boots.vitality) {
                  newVitality += currentCharacter.equipment.boots.vitality;
                }

                if (currentCharacter.equipment.boots.energy) {
                  newEnergy += currentCharacter.equipment.boots.energy;
                }

                if (currentCharacter.equipment.boots.defense) {
                  addedEDefense = 1 + (currentCharacter.equipment.boots.eDefense ? currentCharacter.equipment.boots.eDefense / 100 : 0);
                  realDefenseValue = Math.round(currentCharacter.equipment.boots.defense * addedEDefense);
                  newDefense += realDefenseValue;
                }
              }
            } // Belt


            if (currentCharacter.equipment.belt) {
              canWearBelt = (0, _canStillWearItem["default"])(currentCharacter.equipment.belt, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearBelt);
              console.log('canWearBelt');

              if (canWearBelt) {
                if (currentCharacter.equipment.belt.strength) {
                  newStrength += currentCharacter.equipment.belt.strength;
                }

                if (currentCharacter.equipment.belt.dexterity) {
                  newDexterity += currentCharacter.equipment.belt.dexterity;
                }

                if (currentCharacter.equipment.belt.vitality) {
                  newVitality += currentCharacter.equipment.belt.vitality;
                }

                if (currentCharacter.equipment.belt.energy) {
                  newEnergy += currentCharacter.equipment.belt.energy;
                }

                if (currentCharacter.equipment.belt.defense) {
                  _addedEDefense = 1 + (currentCharacter.equipment.belt.eDefense ? currentCharacter.equipment.belt.eDefense / 100 : 0);
                  _realDefenseValue = Math.round(currentCharacter.equipment.belt.defense * _addedEDefense);
                  newDefense += _realDefenseValue;
                }
              }
            } // Gloves


            if (currentCharacter.equipment.gloves) {
              canWearGloves = (0, _canStillWearItem["default"])(currentCharacter.equipment.gloves, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearGloves);
              console.log('canWearGloves');

              if (canWearGloves) {
                if (currentCharacter.equipment.gloves.strength) {
                  newStrength += currentCharacter.equipment.gloves.strength;
                }

                if (currentCharacter.equipment.gloves.dexterity) {
                  newDexterity += currentCharacter.equipment.gloves.dexterity;
                }

                if (currentCharacter.equipment.gloves.vitality) {
                  newVitality += currentCharacter.equipment.gloves.vitality;
                }

                if (currentCharacter.equipment.gloves.energy) {
                  newEnergy += currentCharacter.equipment.gloves.energy;
                }

                if (currentCharacter.equipment.gloves.defense) {
                  _addedEDefense2 = 1 + (currentCharacter.equipment.gloves.eDefense ? currentCharacter.equipment.gloves.eDefense / 100 : 0);
                  _realDefenseValue2 = Math.round(currentCharacter.equipment.gloves.defense * _addedEDefense2);
                  newDefense += _realDefenseValue2;
                }
              }
            } // Armor


            if (currentCharacter.equipment.armor) {
              canWearArmor = (0, _canStillWearItem["default"])(currentCharacter.equipment.armor, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearArmor);
              console.log('canWearArmor');

              if (canWearArmor) {
                if (currentCharacter.equipment.armor.strength) {
                  newStrength += currentCharacter.equipment.armor.strength;
                }

                if (currentCharacter.equipment.armor.dexterity) {
                  newDexterity += currentCharacter.equipment.armor.dexterity;
                }

                if (currentCharacter.equipment.armor.vitality) {
                  newVitality += currentCharacter.equipment.armor.vitality;
                }

                if (currentCharacter.equipment.armor.energy) {
                  newEnergy += currentCharacter.equipment.armor.energy;
                }

                if (currentCharacter.equipment.armor.defense) {
                  _addedEDefense3 = 1 + (currentCharacter.equipment.armor.eDefense ? currentCharacter.equipment.armor.eDefense / 100 : 0);
                  _realDefenseValue3 = Math.round(currentCharacter.equipment.armor.defense * _addedEDefense3);
                  newDefense += _realDefenseValue3;
                }
              }
            } // Main Hand


            if (currentCharacter.equipment.mainHand) {
              canWearMainHand = (0, _canStillWearItem["default"])(currentCharacter.equipment.mainHand, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearMainHand);
              console.log('canWearMainHand');

              if (canWearMainHand) {
                if (currentCharacter.equipment.mainHand.strength) {
                  newStrength += currentCharacter.equipment.mainHand.strength;
                }

                if (currentCharacter.equipment.mainHand.dexterity) {
                  newDexterity += currentCharacter.equipment.mainHand.dexterity;
                }

                if (currentCharacter.equipment.mainHand.vitality) {
                  newVitality += currentCharacter.equipment.mainHand.vitality;
                }

                if (currentCharacter.equipment.mainHand.energy) {
                  newEnergy += currentCharacter.equipment.mainHand.energy;
                }
              }
            } // Helm


            if (currentCharacter.equipment.helm) {
              canWearHelm = (0, _canStillWearItem["default"])(currentCharacter.equipment.helm, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearHelm);
              console.log('canWearHelm');

              if (canWearHelm) {
                if (currentCharacter.equipment.helm.strength) {
                  newStrength += currentCharacter.equipment.helm.strength;
                }

                if (currentCharacter.equipment.helm.dexterity) {
                  newDexterity += currentCharacter.equipment.helm.dexterity;
                }

                if (currentCharacter.equipment.helm.vitality) {
                  newVitality += currentCharacter.equipment.helm.vitality;
                }

                if (currentCharacter.equipment.helm.energy) {
                  newEnergy += currentCharacter.equipment.helm.energy;
                }

                if (currentCharacter.equipment.helm.defense) {
                  _addedEDefense4 = 1 + (currentCharacter.equipment.helm.eDefense ? currentCharacter.equipment.helm.eDefense / 100 : 0);
                  _realDefenseValue4 = Math.round(currentCharacter.equipment.helm.defense * _addedEDefense4);
                  newDefense += _realDefenseValue4;
                }
              }
            } // OffHand


            if (currentCharacter.equipment.offHand) {
              canWearOffHand = (0, _canStillWearItem["default"])(currentCharacter.equipment.offHand, strengthTotalWithItems, dexterityTotalWithItems);
              console.log(canWearOffHand);
              console.log('canWearOffHand');

              if (canWearOffHand) {
                if (currentCharacter.equipment.offHand.strength) {
                  newStrength += currentCharacter.equipment.offHand.strength;
                }

                if (currentCharacter.equipment.offHand.dexterity) {
                  newDexterity += currentCharacter.equipment.offHand.dexterity;
                }

                if (currentCharacter.equipment.offHand.vitality) {
                  newVitality += currentCharacter.equipment.offHand.vitality;
                }

                if (currentCharacter.equipment.offHand.energy) {
                  newEnergy += currentCharacter.equipment.offHand.energy;
                }

                if (currentCharacter.equipment.offHand.defense) {
                  _addedEDefense5 = 1 + (currentCharacter.equipment.offHand.eDefense ? currentCharacter.equipment.offHand.eDefense / 100 : 0);
                  _realDefenseValue5 = Math.round(currentCharacter.equipment.offHand.defense * _addedEDefense5);
                  newDefense += _realDefenseValue5;
                }

                if (currentCharacter.equipment.offHand && currentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name === 'Shields') {
                  shieldBlock = currentCharacter.equipment.offHand.itemBase.block;
                  blocking = shieldBlock * (dexterity - 15) / (userCurrentRank.id * 2);
                  newBlock = blocking > 50 ? 50 : blocking;
                }
              }
            } // Helm


            if (currentCharacter.equipment.amulet) {
              if (currentCharacter.equipment.amulet.strength) {
                newStrength += currentCharacter.equipment.amulet.strength;
              }

              if (currentCharacter.equipment.amulet.dexterity) {
                newDexterity += currentCharacter.equipment.amulet.dexterity;
              }

              if (currentCharacter.equipment.amulet.vitality) {
                newVitality += currentCharacter.equipment.amulet.vitality;
              }

              if (currentCharacter.equipment.amulet.energy) {
                newEnergy += currentCharacter.equipment.amulet.energy;
              }

              if (currentCharacter.equipment.amulet.defense) {
                _addedEDefense6 = 1 + (currentCharacter.equipment.amulet.eDefense ? currentCharacter.equipment.amulet.eDefense / 100 : 0);
                _realDefenseValue6 = Math.round(currentCharacter.equipment.amulet.defense * _addedEDefense6);
                newDefense += _realDefenseValue6;
              }
            } // RingSlotOne


            if (currentCharacter.equipment.ringSlotOne) {
              if (currentCharacter.equipment.ringSlotOne.strength) {
                newStrength += currentCharacter.equipment.ringSlotOne.strength;
              }

              if (currentCharacter.equipment.ringSlotOne.dexterity) {
                newDexterity += currentCharacter.equipment.ringSlotOne.dexterity;
              }

              if (currentCharacter.equipment.ringSlotOne.vitality) {
                newVitality += currentCharacter.equipment.ringSlotOne.vitality;
              }

              if (currentCharacter.equipment.ringSlotOne.energy) {
                newEnergy += currentCharacter.equipment.ringSlotOne.energy;
              }

              if (currentCharacter.equipment.ringSlotOne.defense) {
                _addedEDefense7 = 1 + (currentCharacter.equipment.ringSlotOne.eDefense ? currentCharacter.equipment.ringSlotOne.eDefense / 100 : 0);
                _realDefenseValue7 = Math.round(currentCharacter.equipment.ringSlotOne.defense * _addedEDefense7);
                newDefense += _realDefenseValue7;
              }
            } // RingSlotTwo


            if (currentCharacter.equipment.RingSlotTwo) {
              if (currentCharacter.equipment.RingSlotTwo.strength) {
                newStrength += currentCharacter.equipment.RingSlotTwo.strength;
              }

              if (currentCharacter.equipment.RingSlotTwo.dexterity) {
                newDexterity += currentCharacter.equipment.RingSlotTwo.dexterity;
              }

              if (currentCharacter.equipment.RingSlotTwo.vitality) {
                newVitality += currentCharacter.equipment.RingSlotTwo.vitality;
              }

              if (currentCharacter.equipment.RingSlotTwo.energy) {
                newEnergy += currentCharacter.equipment.RingSlotTwo.energy;
              }

              if (currentCharacter.equipment.RingSlotTwo.defense) {
                _addedEDefense8 = 1 + (currentCharacter.equipment.RingSlotTwo.eDefense ? currentCharacter.equipment.RingSlotTwo.eDefense / 100 : 0);
                _realDefenseValue8 = Math.round(currentCharacter.equipment.RingSlotTwo.defense * _addedEDefense8);
                newDefense += _realDefenseValue8;
              }
            }

            return _context.abrupt("return", [newStrength, newDexterity, newVitality, newEnergy, newDefense, newBlock, canWearHelm, canWearMainHand, canWearOffHand, canWearArmor, canWearGloves, canWearBelt, canWearBoots]);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calculateItemStats(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = calculateItemStats; // Maybe loop over everything instead of doing every equipment slot 1 by 1?
// How to handle canWearItem to pass to equipment render screen?
//
// Object.keys(currentCharacter.equipment).forEach((key) => {
//   if (
//     (key === 'helm'
//       || key === 'belt'
//       || key === 'boots'
//       || key === 'gloves'
//       || key === 'armor'
//       || key === 'offHand'
//       || key === 'amulet'
//       || key === 'ringSlotTwo'
//       || key === 'ringSlotOne'
//     )
//     && currentCharacter.equipment[key]
//     && currentCharacter.equipment[key].defense
//   ) {
//     const realDefenseValue = Math.round((currentCharacter.equipment[key].defense * (1 + (currentCharacter.equipment[key].eDefense ? currentCharacter.equipment[key].eDefense / 100 : 0))));
//     defense += realDefenseValue;
//   }
// });

exports["default"] = _default;