"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderItemImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _generateModifierStringArray = require("../helpers/items/generateModifierStringArray");

var renderItemImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newItem) {
    var modifierStringArray, levelReqHeight, strengthReqHeight, dexterityReqHeight, shieldAndBootsDamageHeight, isWeapon, isClassSpecific, isShield, isBow, isRing, isAmulet, isJavelin, isThrowing, extraWeaponsHeight, extraShieldBlockHeight, classSpecificHeight, minusBowHeight, minusRingwHeight, minusAmuletHeight, extraThrowingJavelinHeight, totalExtraHeight, itemImage, canvas, ctx, realDefenseValue, extraDamageString, realMinDamageValue, realMaxDamageValue, realMinThrowingDamageValue, realMaxThrowingDamageValue, i, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _generateModifierStringArray.generateModifierStringArray)(newItem.dataValues);

          case 2:
            modifierStringArray = _context.sent;
            // console.log('modifierString');
            // console.log(modifierStringArray);
            levelReqHeight = newItem.levelReq ? 25 : 0;
            strengthReqHeight = newItem.itemBase.strengthReq ? 25 : 0;
            dexterityReqHeight = newItem.itemBase.dexterityReq ? 25 : 0;
            shieldAndBootsDamageHeight = (newItem.itemBase.itemFamily.itemType.name === "Shields" || newItem.itemBase.itemFamily.itemType.name === "Boots") && newItem.minDamage && newItem.maxDamage ? 25 : 0;
            isWeapon = !!(newItem.itemBase.itemFamily.itemType.name === "Axes" || newItem.itemBase.itemFamily.itemType.name === "Bows" || newItem.itemBase.itemFamily.itemType.name === "Crossbows" || newItem.itemBase.itemFamily.itemType.name === "Daggers" || newItem.itemBase.itemFamily.itemType.name === "Javelins" || newItem.itemBase.itemFamily.itemType.name === "Maces" || newItem.itemBase.itemFamily.itemType.name === "Polearms");
            isClassSpecific = !!(newItem.itemBase.itemFamily.itemType.name === "Warrior Helms" || newItem.itemBase.itemFamily.itemType.name === "Druid Pelts" || newItem.itemBase.itemFamily.itemType.name === "Necromancer Shrunken Heads" || newItem.itemBase.itemFamily.itemType.name === "Paladin Shields" || newItem.itemBase.itemFamily.itemType.name === "Amazon Weapons" || newItem.itemBase.itemFamily.itemType.name === "Sorceress Orbs" || newItem.itemBase.itemFamily.itemType.name === "Assassin Katars");
            isShield = newItem.itemBase.itemFamily.itemType.name === "Shields";
            isBow = newItem.itemBase.itemFamily.itemType.name === "Bows";
            isRing = newItem.itemBase.itemFamily.itemType.name === "Rings";
            isAmulet = newItem.itemBase.itemFamily.itemType.name === "Amulets";
            isJavelin = newItem.itemBase.itemFamily.itemType.name === "Javelins";
            isThrowing = newItem.itemBase.itemFamily.itemType.name === "Throwing";
            extraWeaponsHeight = isWeapon ? 25 : 0;
            extraShieldBlockHeight = isShield ? 25 : 0;
            classSpecificHeight = isClassSpecific ? 25 : 0;
            minusBowHeight = isBow ? -25 : 0;
            minusRingwHeight = isRing ? -25 : 0;
            minusAmuletHeight = isAmulet ? -25 : 0;
            extraThrowingJavelinHeight = isThrowing || isJavelin ? 25 : 0;
            totalExtraHeight = levelReqHeight + strengthReqHeight + dexterityReqHeight + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + minusRingwHeight + minusAmuletHeight + classSpecificHeight + extraThrowingJavelinHeight;
            _context.next = 25;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(newItem.itemBase.itemFamily.itemType.name, "/").concat(newItem.itemBase.itemFamily.name), "".concat(newItem.itemBase.name, ".png")));

          case 25:
            itemImage = _context.sent;
            canvas = (0, _canvas.createCanvas)(200, itemImage.height + 95 + modifierStringArray.length * 25 + totalExtraHeight);
            ctx = canvas.getContext('2d'); // console.log(newItem.itemBase.name);
            // console.log(newItem.itemBase.itemFamily.name);
            // console.log(newItem.itemBase.itemFamily.itemType.name);

            ctx.lineWidth = 1;
            ctx.fillStyle = "#3F3F3F";
            ctx.strokeStyle = "#164179";
            ctx.textAlign = "center";
            ctx.drawImage(itemImage, canvas.width / 2 - itemImage.width / 2, 0); // item name

            ctx.font = 'bold 15px "HeartWarming"';
            ctx.fillStyle = newItem.itemQuality.color;
            ctx.strokeStyle = "#164179";
            ctx.strokeText(newItem.name, 100, itemImage.height + 20, 200);
            ctx.fillText(newItem.name, 100, itemImage.height + 20, 200);
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'white';
            ctx.font = 'bold 15px "HeartWarming"'; // item defense

            if (newItem.defense) {
              realDefenseValue = Math.round(newItem.defense * (1 + (newItem.eDefense ? newItem.eDefense / 100 : 0)));
              ctx.strokeText("Defense: ".concat(realDefenseValue).concat(newItem.eDefense ? " (upped from ".concat(newItem.defense, ")") : ""), // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
              100, itemImage.height + 45, 200);
              ctx.fillText("Defense: ".concat(realDefenseValue).concat(newItem.eDefense ? " (upped from ".concat(newItem.defense, ")") : ""), // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
              100, itemImage.height + 45, 200);
            }

            if (isWeapon) {
              if (newItem.itemBase.itemFamily.twoHanded) {
                // item durability
                ctx.strokeText("Two-Handed", 100, itemImage.height + 45, 200);
                ctx.fillText("Two-Handed", 100, itemImage.height + 45, 200);
              } else {
                // item durability
                ctx.strokeText("One-Handed", 100, itemImage.height + 45, 200);
                ctx.fillText("One-Handed", 100, itemImage.height + 45, 200);
              }
            }

            if (isShield) {
              ctx.strokeText("Chance to Block: ".concat(newItem.itemBase.block, "%"), 100, itemImage.height + 70, 200);
              ctx.fillText("Chance to Block: ".concat(newItem.itemBase.block, "%"), 100, itemImage.height + 70, 200);
            } // item attack damage


            if (newItem.minDamage && newItem.maxDamage) {
              extraDamageString = '';

              if (newItem.itemBase.itemFamily.itemType.name === "Shields") {
                extraDamageString = 'Smite ';
              }

              if (newItem.itemBase.itemFamily.itemType.name === "Boots") {
                extraDamageString = 'Kick ';
              }

              realMinDamageValue = Math.round(newItem.minDamage * (1 + (newItem.eDamage ? newItem.eDamage / 100 : 0)));
              realMaxDamageValue = Math.round(newItem.maxDamage * (1 + (newItem.eDamage ? newItem.eDamage / 100 : 0)));
              ctx.strokeText("".concat(extraDamageString, "Damage: ").concat(realMinDamageValue, " - ").concat(realMaxDamageValue).concat(newItem.eDamage ? " (upped from ".concat(newItem.minDamage, " - ").concat(newItem.maxDamage, ")") : ""), // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
              100, itemImage.height + 45 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight, 200);
              ctx.fillText("".concat(extraDamageString, "Damage: ").concat(realMinDamageValue, " - ").concat(realMaxDamageValue).concat(newItem.eDamage ? " (upped from ".concat(newItem.minDamage, " - ").concat(newItem.maxDamage, ")") : ""), // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
              100, itemImage.height + 45 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight, 200);
            }

            if (isJavelin || isThrowing) {
              realMinThrowingDamageValue = Math.round(newItem.minThrowDamage * (1 + (newItem.eDamage ? newItem.eDamage / 100 : 0)));
              realMaxThrowingDamageValue = Math.round(newItem.maxThrowDamage * (1 + (newItem.eDamage ? newItem.eDamage / 100 : 0)));
              ctx.strokeText("Throwing Damage: ".concat(realMinThrowingDamageValue, " - ").concat(realMaxThrowingDamageValue).concat(newItem.eDamage ? " (upped from ".concat(newItem.minThrowDamage, " - ").concat(newItem.maxThrowDamage, ")") : ""), // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
              100, itemImage.height + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight, 200);
              ctx.fillText("Throwing Damage: ".concat(realMinThrowingDamageValue, " - ").concat(realMaxThrowingDamageValue).concat(newItem.eDamage ? " (upped from ".concat(newItem.minThrowDamage, " - ").concat(newItem.maxThrowDamage, ")") : ""), // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
              100, itemImage.height + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight, 200);
            } // item durability


            if (!isBow && !isRing && !isAmulet && !isJavelin && !isThrowing) {
              ctx.strokeText("Durability: ".concat(newItem.durability, " of ").concat(newItem.itemBase.durability), 100, itemImage.height + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight, 200);
              ctx.fillText("Durability: ".concat(newItem.durability, " of ").concat(newItem.itemBase.durability), 100, itemImage.height + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight, 200);
            }

            if (isJavelin || isThrowing) {
              ctx.strokeText("Stack: ".concat(newItem.stack, " of ").concat(newItem.itemBase.maxStack), 100, itemImage.height + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("Stack: ".concat(newItem.stack, " of ").concat(newItem.itemBase.maxStack), 100, itemImage.height + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Warrior Helms") {
              ctx.strokeText("(Warrior Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Warrior Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Druid Pelts") {
              ctx.strokeText("(Druid Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Druid Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Paladin Shields") {
              ctx.strokeText("(Paladin Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Paladin Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Necromancer Shrunken Heads") {
              ctx.strokeText("(Necromancer Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Necromancer Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Assassin Katars") {
              ctx.strokeText("(Assassin Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Assassin Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Amazon Weapons") {
              ctx.strokeText("(Amazon Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Amazon Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            }

            if (newItem.itemBase.itemFamily.itemType.name === "Sorceress Orbs") {
              ctx.strokeText("(Sorceress Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("(Sorceress Only)", 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + extraThrowingJavelinHeight, 200);
            } // Level Req


            if (newItem.levelReq) {
              ctx.strokeText("Lvl Requirement: ".concat(newItem.levelReq), 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("Lvl Requirement: ".concat(newItem.levelReq), 100, itemImage.height + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight + extraThrowingJavelinHeight, 200);
            } // Strength Req


            if (newItem.itemBase.strengthReq) {
              ctx.strokeText("Strength Requirement: ".concat(newItem.itemBase.strengthReq), 100, itemImage.height + 95 + levelReqHeight + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("Strength Requirement: ".concat(newItem.itemBase.strengthReq), 100, itemImage.height + 95 + levelReqHeight + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight + extraThrowingJavelinHeight, 200);
            } // Strength Req


            if (newItem.itemBase.dexterityReq) {
              ctx.strokeText("Dexterity Requirement: ".concat(newItem.itemBase.dexterityReq), 100, itemImage.height + 95 + levelReqHeight + strengthReqHeight + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight + extraThrowingJavelinHeight, 200);
              ctx.fillText("Dexterity Requirement: ".concat(newItem.itemBase.dexterityReq), 100, itemImage.height + 95 + levelReqHeight + strengthReqHeight + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight + extraThrowingJavelinHeight, 200);
            } // item modifiers


            ctx.font = 'bold 15px "HeartWarming"';
            ctx.fillStyle = newItem.itemQuality.color;
            ctx.strokeStyle = "#164179";

            for (i = 0; i < modifierStringArray.length; i++) {
              ctx.strokeText(modifierStringArray[i], 100, itemImage.height + 95 + i * 25 + totalExtraHeight, 200);
              ctx.fillText(modifierStringArray[i], 100, itemImage.height + 95 + i * 25 + totalExtraHeight, 200);
            }

            _context.next = 64;
            return canvas.toBuffer();

          case 64:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderItemImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderItemImage = renderItemImage;