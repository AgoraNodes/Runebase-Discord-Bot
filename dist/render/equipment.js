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
    var equipmentBackground, canvas, ctx, helmImage, amuletImage, mainHandImage, offHandImage, armorImage, glovesImage, ringSlotOneImage, ringSlotTwoImage, beltImage, bootsImage, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 2:
            _context.next = 4;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images/equipment', "background.png"));

          case 4:
            equipmentBackground = _context.sent;
            canvas = (0, _canvas.createCanvas)(equipmentBackground.width, equipmentBackground.height);
            ctx = canvas.getContext('2d');
            ctx.drawImage(equipmentBackground, 0, 0, equipmentBackground.width, equipmentBackground.height);

            if (!userCurrentCharacter.equipment.helm) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.helm.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.helm.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.helm.itemBase.name, ".png")));

          case 11:
            helmImage = _context.sent;

          case 12:
            if (!userCurrentCharacter.equipment.armor) {
              _context.next = 16;
              break;
            }

            _context.next = 15;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.armor.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.armor.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.armor.itemBase.name, ".png")));

          case 15:
            armorImage = _context.sent;

          case 16:
            if (!userCurrentCharacter.equipment.mainHand) {
              _context.next = 20;
              break;
            }

            _context.next = 19;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.mainHand.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.mainHand.itemBase.name, ".png")));

          case 19:
            mainHandImage = _context.sent;

          case 20:
            if (!userCurrentCharacter.equipment.offHand) {
              _context.next = 24;
              break;
            }

            _context.next = 23;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.offHand.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.offHand.itemBase.name, ".png")));

          case 23:
            offHandImage = _context.sent;

          case 24:
            if (!userCurrentCharacter.equipment.boots) {
              _context.next = 28;
              break;
            }

            _context.next = 27;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.boots.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.boots.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.boots.itemBase.name, ".png")));

          case 27:
            bootsImage = _context.sent;

          case 28:
            if (!userCurrentCharacter.equipment.gloves) {
              _context.next = 32;
              break;
            }

            _context.next = 31;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.gloves.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.gloves.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.gloves.itemBase.name, ".png")));

          case 31:
            glovesImage = _context.sent;

          case 32:
            if (!userCurrentCharacter.equipment.belt) {
              _context.next = 36;
              break;
            }

            _context.next = 35;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.belt.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.belt.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.belt.itemBase.name, ".png")));

          case 35:
            beltImage = _context.sent;

          case 36:
            if (!userCurrentCharacter.equipment.amulet) {
              _context.next = 40;
              break;
            }

            _context.next = 39;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.amulet.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.amulet.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.amulet.itemBase.name, ".png")));

          case 39:
            amuletImage = _context.sent;

          case 40:
            if (!userCurrentCharacter.equipment.ringSlotOne) {
              _context.next = 44;
              break;
            }

            _context.next = 43;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.ringSlotOne.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.ringSlotOne.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.ringSlotOne.itemBase.name, ".png")));

          case 43:
            ringSlotOneImage = _context.sent;

          case 44:
            if (!userCurrentCharacter.equipment.ringSlotTwo) {
              _context.next = 48;
              break;
            }

            _context.next = 47;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(userCurrentCharacter.equipment.ringSlotTwo.itemBase.itemFamily.itemType.name, "/").concat(userCurrentCharacter.equipment.ringSlotTwo.itemBase.itemFamily.name), "".concat(userCurrentCharacter.equipment.ringSlotTwo.itemBase.name, ".png")));

          case 47:
            ringSlotTwoImage = _context.sent;

          case 48:
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
            _context.next = 62;
            return canvas.toBuffer();

          case 62:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 64:
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