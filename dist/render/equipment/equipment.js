"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderEquipmentImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var renderEquipmentImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter) {
    var helmImage, amuletImage, mainHandImage, offHandImage, armorImage, glovesImage, ringSlotOneImage, ringSlotTwoImage, beltImage, bootsImage, equipmentBackground, canvas, ctx, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../../assets/images/equipment', "background.png"));

          case 2:
            equipmentBackground = _context.sent;
            canvas = (0, _canvas.createCanvas)(equipmentBackground.width, equipmentBackground.height);
            ctx = canvas.getContext('2d');
            ctx.drawImage(equipmentBackground, 0, 0, equipmentBackground.width, equipmentBackground.height);

            if (!userCurrentCharacter.equipment.helm) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.helm.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.helm.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.helm.itemBase.name, ".png")));

          case 9:
            helmImage = _context.sent;

          case 10:
            if (!userCurrentCharacter.equipment.armor) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.armor.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.armor.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.armor.itemBase.name, ".png")));

          case 13:
            armorImage = _context.sent;

          case 14:
            if (!userCurrentCharacter.equipment.mainHand) {
              _context.next = 18;
              break;
            }

            _context.next = 17;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.mainHand.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.mainHand.itemBase.name, ".png")));

          case 17:
            mainHandImage = _context.sent;

          case 18:
            if (!userCurrentCharacter.equipment.offHand) {
              _context.next = 22;
              break;
            }

            _context.next = 21;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.offHand.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.offHand.itemBase.name, ".png")));

          case 21:
            offHandImage = _context.sent;

          case 22:
            if (!userCurrentCharacter.equipment.boots) {
              _context.next = 26;
              break;
            }

            _context.next = 25;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.boots.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.boots.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.boots.itemBase.name, ".png")));

          case 25:
            bootsImage = _context.sent;

          case 26:
            if (!userCurrentCharacter.equipment.gloves) {
              _context.next = 30;
              break;
            }

            _context.next = 29;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.gloves.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.gloves.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.gloves.itemBase.name, ".png")));

          case 29:
            glovesImage = _context.sent;

          case 30:
            if (!userCurrentCharacter.equipment.belt) {
              _context.next = 34;
              break;
            }

            _context.next = 33;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.belt.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.belt.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.belt.itemBase.name, ".png")));

          case 33:
            beltImage = _context.sent;

          case 34:
            if (!userCurrentCharacter.equipment.amulet) {
              _context.next = 38;
              break;
            }

            _context.next = 37;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.amulet.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.amulet.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.amulet.itemBase.name, ".png")));

          case 37:
            amuletImage = _context.sent;

          case 38:
            if (!userCurrentCharacter.equipment.ringSlotOne) {
              _context.next = 42;
              break;
            }

            _context.next = 41;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.ringSlotOne.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.ringSlotOne.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.ringSlotOne.itemBase.name, ".png")));

          case 41:
            ringSlotOneImage = _context.sent;

          case 42:
            if (!userCurrentCharacter.equipment.ringSlotTwo) {
              _context.next = 46;
              break;
            }

            _context.next = 45;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/items/".concat(userCurrentCharacter.equipment.ringSlotTwo.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.ringSlotTwo.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.ringSlotTwo.itemBase.name, ".png")));

          case 45:
            ringSlotTwoImage = _context.sent;

          case 46:
            console.log(userCurrentCharacter.equipment);

            if (userCurrentCharacter.equipment.helm) {
              ctx.drawImage(helmImage, 133, // x position
              3, // y position
              helmImage.width, // width
              helmImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.armor) {
              ctx.drawImage(armorImage, 136, // x position
              80, // y position
              armorImage.width, // width
              armorImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.mainHand) {
              ctx.drawImage(mainHandImage, 32, // x position
              63, // y position
              mainHandImage.width, // width
              mainHandImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.offHand) {
              ctx.drawImage(offHandImage, 251, // x position
              77, // y position
              offHandImage.width, // width
              offHandImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.boots) {
              ctx.drawImage(bootsImage, 251, // x position
              178, // y position
              bootsImage.width, // width
              bootsImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.gloves) {
              ctx.drawImage(glovesImage, 21, // x position
              178, // y position
              glovesImage.width, // width
              glovesImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.belt) {
              ctx.drawImage(beltImage, 135, // x position
              175, // y position
              beltImage.width, // width
              beltImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.amulet) {
              ctx.drawImage(amuletImage, 207, // x position
              30, // y position
              amuletImage.width, // width
              amuletImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.ringSlotOne) {
              ctx.drawImage(ringSlotOneImage, 93, // x position
              175, // y position
              ringSlotOneImage.width, // width
              ringSlotOneImage.height // height
              );
            }

            if (userCurrentCharacter.equipment.ringSlotTwo) {
              ctx.drawImage(ringSlotTwoImage, 207, // x position
              175, // y position
              ringSlotTwoImage.width, // width
              ringSlotTwoImage.height // height
              );
            }

            console.log('after generate equipment');
            _context.next = 60;
            return canvas.toBuffer();

          case 60:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 62:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderEquipmentImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderEquipmentImage = renderEquipmentImage;