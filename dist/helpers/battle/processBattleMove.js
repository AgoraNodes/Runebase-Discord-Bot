"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processBattleMove = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _calculateCharacterStats = require("../stats/calculateCharacterStats");

var _selectedSkills = require("../character/selectedSkills");

var _calculateSkillDamage = require("../skills/calculateSkillDamage");

var _utils = require("../utils");

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var processBattleMove = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, battle, currentSelectedMonster, attackUsed, io, queue, t) {
    var sumExp, unitUsedMove, _yield$calculateChara, attackOne, attackTwo, regularAttack, block, useAttack, randomAttackDamage, monsterToUpdate, updatedMonster, newUserMp, monsterInfo, createBattleLog, allRemainingBattleMonster, battleInfoArray, currentUserHp, totalDamageByMonsters, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, remainingMonster, randomMonsterAttackDamage, updatedBattle;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sumExp = battle.BattleMonsters.reduce(function (accumulator, object) {
              return accumulator + object.monster.exp;
            }, 0); // const isAnyMobAlive = battle.BattleMonsters.find((element) => element.currentHp > 0);

            console.log('1');
            unitUsedMove = "Attack";
            _context.next = 5;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 5:
            _yield$calculateChara = _context.sent;
            attackOne = _yield$calculateChara.attackOne;
            attackTwo = _yield$calculateChara.attackTwo;
            regularAttack = _yield$calculateChara.regularAttack;
            block = _yield$calculateChara.block;

            if (attackUsed === 'main') {
              if (userCurrentCharacter.condition.mana >= attackOne.cost) {
                useAttack = attackOne;
              } else {
                useAttack = regularAttack;
              }
            }

            if (attackUsed === 'secondary') {
              if (userCurrentCharacter.condition.mana >= attackTwo.cost) {
                useAttack = attackTwo;
              } else {
                useAttack = regularAttack;
              }
            }

            randomAttackDamage = (0, _utils.randomIntFromInterval)(useAttack.min, useAttack.max);
            monsterToUpdate = battle.BattleMonsters.find(function (element) {
              return element.id === currentSelectedMonster.id;
            });
            _context.next = 16;
            return monsterToUpdate.decrement('currentHp', {
              by: randomAttackDamage,
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 16:
            updatedMonster = _context.sent;
            newUserMp = userCurrentCharacter.condition.mana - useAttack.cost;
            _context.next = 20;
            return userCurrentCharacter.condition.update({
              mana: newUserMp
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 20:
            console.log('2');
            monsterInfo = [];
            _context.next = 24;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(userCurrentCharacter.user.username, " used ").concat(useAttack.name, " on ").concat(monsterToUpdate.monster.name, " for ").concat(randomAttackDamage, " damage")
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 24:
            createBattleLog = _context.sent;

            if (!(updatedMonster.currentHp > 0)) {
              _context.next = 29;
              break;
            }

            monsterInfo.push({
              monsterId: updatedMonster.id,
              userDamage: randomAttackDamage,
              currentMonsterHp: monsterToUpdate.currentHp - randomAttackDamage,
              currentUserMp: newUserMp,
              died: false
            });
            _context.next = 32;
            break;

          case 29:
            _context.next = 31;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(userCurrentCharacter.user.username, " killed ").concat(monsterToUpdate.monster.name)
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 31:
            monsterInfo.push({
              monsterId: updatedMonster.id,
              userDamage: randomAttackDamage,
              currentMonsterHp: monsterToUpdate.currentHp - randomAttackDamage,
              currentMp: newUserMp,
              died: true
            });

          case 32:
            _context.next = 34;
            return _models["default"].BattleMonster.findAll({
              where: {
                battleId: battle.id,
                currentHp: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, 0)
              },
              include: [{
                model: _models["default"].monster,
                as: 'monster'
              }],
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 34:
            allRemainingBattleMonster = _context.sent;
            console.log(allRemainingBattleMonster);
            console.log('allRemainingBattleMonster');

            if (!(!allRemainingBattleMonster || allRemainingBattleMonster.length < 1)) {
              _context.next = 40;
              break;
            }

            _context.next = 40;
            return battle.update({
              complete: true
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 40:
            console.log('3');
            battleInfoArray = [];

            if (!allRemainingBattleMonster) {
              _context.next = 84;
              break;
            }

            currentUserHp = userCurrentCharacter.condition.life;
            totalDamageByMonsters = 0; // eslint-disable-next-line no-restricted-syntax

            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 47;
            _iterator = _asyncIterator(allRemainingBattleMonster);

          case 49:
            _context.next = 51;
            return _iterator.next();

          case 51:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 66;
              break;
            }

            remainingMonster = _step.value;

            if (!(currentUserHp > 0)) {
              _context.next = 63;
              break;
            }

            randomMonsterAttackDamage = (0, _utils.randomIntFromInterval)(remainingMonster.monster.minDamage, remainingMonster.monster.maxDamage);
            battleInfoArray.push({
              monsterId: remainingMonster.id,
              damage: randomMonsterAttackDamage,
              currentHp: currentUserHp - randomMonsterAttackDamage
            });
            totalDamageByMonsters += randomMonsterAttackDamage;
            currentUserHp -= randomMonsterAttackDamage;
            _context.next = 60;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(remainingMonster.monster.name, " used attack on ").concat(userCurrentCharacter.user.username, " for ").concat(randomMonsterAttackDamage, " damage")
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 60:
            if (!(currentUserHp < 1)) {
              _context.next = 63;
              break;
            }

            _context.next = 63;
            return _models["default"].battleLog.create({
              battleId: battle.id,
              log: "".concat(remainingMonster.monster.name, " killed ").concat(userCurrentCharacter.user.username)
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 63:
            _iteratorAbruptCompletion = false;
            _context.next = 49;
            break;

          case 66:
            _context.next = 72;
            break;

          case 68:
            _context.prev = 68;
            _context.t0 = _context["catch"](47);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 72:
            _context.prev = 72;
            _context.prev = 73;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 77;
              break;
            }

            _context.next = 77;
            return _iterator["return"]();

          case 77:
            _context.prev = 77;

            if (!_didIteratorError) {
              _context.next = 80;
              break;
            }

            throw _iteratorError;

          case 80:
            return _context.finish(77);

          case 81:
            return _context.finish(72);

          case 82:
            _context.next = 84;
            return userCurrentCharacter.condition.update({
              life: userCurrentCharacter.condition.life - totalDamageByMonsters
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 84:
            console.log('4');
            _context.next = 87;
            return _models["default"].battle.findOne({
              where: {
                id: battle.id
              },
              order: [[_models["default"].battleLog, 'id', 'DESC'], [_models["default"].BattleMonster, 'id', 'DESC']],
              include: [{
                model: _models["default"].battleLog,
                as: 'battleLogs',
                required: false
              }, {
                model: _models["default"].BattleMonster,
                as: 'BattleMonsters',
                include: [{
                  model: _models["default"].monster,
                  as: 'monster'
                }]
              }],
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 87:
            updatedBattle = _context.sent;
            console.log('done processing battle moves');
            return _context.abrupt("return", [userCurrentCharacter, updatedBattle, battleInfoArray, monsterInfo, sumExp]);

          case 90:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[47, 68, 72, 82], [73,, 77, 81]]);
  }));

  return function processBattleMove(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

exports.processBattleMove = processBattleMove;