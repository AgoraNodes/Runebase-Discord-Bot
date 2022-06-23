"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processBattleMove = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _calculateCharacterStats = require("../stats/calculateCharacterStats");

var _character = require("../character/character");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var processBattleMove = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, battle, attackId, io, queue, t) {
    var previousBattleState, previousUserState, unitUsedMove, userUsedMove, _yield$calculateChara, attackOne, randomAttackDamage, randomMonsterAttackDamage, updatedMonster, createBattleLog, updatedUserCondition, updatedBattle, userInfo, monsterInfo;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            previousBattleState = battle;
            previousBattleState = JSON.stringify(previousBattleState);
            previousBattleState = JSON.parse(previousBattleState);
            previousUserState = userCurrentCharacter;
            previousUserState = JSON.stringify(previousUserState);
            previousUserState = JSON.parse(previousUserState);
            unitUsedMove = "Attack";
            userUsedMove = "Attack";
            _context.next = 10;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 10:
            _yield$calculateChara = _context.sent;
            attackOne = _yield$calculateChara.attackOne;
            randomAttackDamage = randomIntFromInterval(attackOne.min, attackOne.max);
            randomMonsterAttackDamage = randomIntFromInterval(battle.monsters[0].minDamage, battle.monsters[0].maxDamage);
            _context.next = 16;
            return battle.monsters[0].BattleMonster.update({
              currentHp: battle.monsters[0].BattleMonster.currentHp - randomAttackDamage
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 16:
            updatedMonster = _context.sent;
            _context.next = 19;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(userCurrentCharacter.user.username, " attacked ").concat(battle.monsters[0].name, " for ").concat(randomAttackDamage, " damage")
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 19:
            createBattleLog = _context.sent;

            if (!(updatedMonster.currentHp < 1)) {
              _context.next = 25;
              break;
            }

            _context.next = 23;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(userCurrentCharacter.user.username, " killed ").concat(battle.monsters[0].name)
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 23:
            _context.next = 25;
            return battle.update({
              complete: true
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 25:
            if (!(updatedMonster.currentHp > 0)) {
              _context.next = 31;
              break;
            }

            _context.next = 28;
            return userCurrentCharacter.condition.update({
              life: userCurrentCharacter.condition.life - randomMonsterAttackDamage
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 28:
            updatedUserCondition = _context.sent;
            _context.next = 31;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(battle.monsters[0].name, " attacked ").concat(userCurrentCharacter.user.username, " for ").concat(randomMonsterAttackDamage, " damage")
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 31:
            if (!(userCurrentCharacter.condition.life < 1)) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(battle.monsters[0].name, " killed ").concat(userCurrentCharacter.user.username)
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 34:
            _context.next = 36;
            return _models["default"].battle.findOne({
              where: {
                id: battle.id
              },
              order: [[_models["default"].battleLog, 'id', 'DESC']],
              include: [{
                model: _models["default"].battleLog,
                as: 'battleLogs',
                required: false
              }, {
                model: _models["default"].monster,
                as: 'monsters'
              }],
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 36:
            updatedBattle = _context.sent;
            userInfo = {
              alive: updatedUserCondition > 0,
              attackDamage: randomAttackDamage,
              attack: userUsedMove
            };
            monsterInfo = {
              alive: updatedMonster.currentHp > 0,
              attackDamage: randomMonsterAttackDamage,
              attack: unitUsedMove
            };
            return _context.abrupt("return", [userCurrentCharacter, updatedBattle, previousBattleState, previousUserState, userInfo, monsterInfo]);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function processBattleMove(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.processBattleMove = processBattleMove;