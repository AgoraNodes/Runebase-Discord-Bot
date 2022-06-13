"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myRateLimiter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var RateLimiterFlexible = _interopRequireWildcard(require("rate-limiter-flexible"));

var _messages = require("../messages");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var errorConsumer = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 15
});
var rateLimiterHelp = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterAccount = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterMyrank = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterRanks = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterDeposit = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterBalance = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterPrice = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterWithdraw = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterRollDice = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterLeaderboard = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterMostActive = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterPickCLass = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});
var rateLimiterStats = new RateLimiterFlexible["default"].RateLimiterMemory({
  points: 2,
  duration: 30
});

var myRateLimiter = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(client, message, title) {
    var userId, discordChannelId, notError, discordChannel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (message.user) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            }

            if (message.channelId) {
              discordChannelId = message.channelId;
            }

            if (userId) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", true);

          case 5:
            _context.prev = 5;

            if (!(title.toLowerCase() === 'help')) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return rateLimiterHelp.consume(userId, 1);

          case 9:
            console.log('return false');
            return _context.abrupt("return", false);

          case 11:
            if (!(title.toLowerCase() === 'account')) {
              _context.next = 15;
              break;
            }

            _context.next = 14;
            return rateLimiterAccount.consume(userId, 1);

          case 14:
            return _context.abrupt("return", false);

          case 15:
            if (!(title.toLowerCase() === 'ranks')) {
              _context.next = 20;
              break;
            }

            console.log('consume ranks');
            _context.next = 19;
            return rateLimiterRanks.consume(userId, 1);

          case 19:
            return _context.abrupt("return", false);

          case 20:
            if (!(title.toLowerCase() === 'myrank')) {
              _context.next = 24;
              break;
            }

            _context.next = 23;
            return rateLimiterMyrank.consume(userId, 1);

          case 23:
            return _context.abrupt("return", false);

          case 24:
            if (!(title.toLowerCase() === 'mostactive')) {
              _context.next = 28;
              break;
            }

            _context.next = 27;
            return rateLimiterMostActive.consume(userId, 1);

          case 27:
            return _context.abrupt("return", false);

          case 28:
            if (!(title.toLowerCase() === 'leaderboard')) {
              _context.next = 32;
              break;
            }

            _context.next = 31;
            return rateLimiterLeaderboard.consume(userId, 1);

          case 31:
            return _context.abrupt("return", false);

          case 32:
            if (!(title.toLowerCase() === 'deposit')) {
              _context.next = 36;
              break;
            }

            _context.next = 35;
            return rateLimiterDeposit.consume(userId, 1);

          case 35:
            return _context.abrupt("return", false);

          case 36:
            if (!(title.toLowerCase() === 'withdraw')) {
              _context.next = 40;
              break;
            }

            _context.next = 39;
            return rateLimiterWithdraw.consume(userId, 1);

          case 39:
            return _context.abrupt("return", false);

          case 40:
            if (!(title.toLowerCase() === 'balance')) {
              _context.next = 44;
              break;
            }

            _context.next = 43;
            return rateLimiterBalance.consume(userId, 1);

          case 43:
            return _context.abrupt("return", false);

          case 44:
            if (!(title.toLowerCase() === 'price')) {
              _context.next = 48;
              break;
            }

            _context.next = 47;
            return rateLimiterPrice.consume(userId, 1);

          case 47:
            return _context.abrupt("return", false);

          case 48:
            if (!(title.toLowerCase() === 'rolldice')) {
              _context.next = 52;
              break;
            }

            _context.next = 51;
            return rateLimiterRollDice.consume(userId, 1);

          case 51:
            return _context.abrupt("return", false);

          case 52:
            if (!(title.toLowerCase() === 'pickclass')) {
              _context.next = 56;
              break;
            }

            _context.next = 55;
            return rateLimiterPickCLass.consume(userId, 1);

          case 55:
            return _context.abrupt("return", false);

          case 56:
            if (!(title.toLowerCase() === 'stats')) {
              _context.next = 60;
              break;
            }

            _context.next = 59;
            return rateLimiterStats.consume(userId, 1);

          case 59:
            return _context.abrupt("return", false);

          case 60:
            throw new Error("no Rate limiter could be reached");

          case 63:
            _context.prev = 63;
            _context.t0 = _context["catch"](5);
            console.log(_context.t0);
            _context.prev = 66;
            _context.next = 69;
            return errorConsumer.consume(userId, 1);

          case 69:
            notError = _context.sent;

            if (!(notError.remainingPoints > 0)) {
              _context.next = 77;
              break;
            }

            _context.next = 73;
            return client.channels.fetch(discordChannelId)["catch"](function (e) {
              console.log(e);
            });

          case 73:
            discordChannel = _context.sent;

            if (!discordChannel) {
              _context.next = 77;
              break;
            }

            _context.next = 77;
            return discordChannel.send({
              embeds: [(0, _messages.discordLimitSpamMessage)(userId, title)]
            })["catch"](function (e) {
              console.log(e);
            });

          case 77:
            return _context.abrupt("return", true);

          case 80:
            _context.prev = 80;
            _context.t1 = _context["catch"](66);
            console.log(_context.t1);
            return _context.abrupt("return", true);

          case 84:
            _context.next = 90;
            break;

          case 86:
            _context.prev = 86;
            _context.t2 = _context["catch"](0);
            console.log(_context.t2);
            return _context.abrupt("return", true);

          case 90:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 86], [5, 63], [66, 80]]);
  }));

  return function myRateLimiter(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.myRateLimiter = myRateLimiter;