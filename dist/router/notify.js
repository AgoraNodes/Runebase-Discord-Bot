"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifyRouter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = require("dotenv");

var _models = _interopRequireDefault(require("../models"));

var _walletNotify = _interopRequireDefault(require("../helpers/blockchain/runebase/walletNotify"));

var _syncRunebase = require("../services/syncRunebase");

var _embeds = require("../embeds");

var _topggVote = require("../controllers/topggVote");

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var Topgg = require("@top-gg/sdk");

(0, _dotenv.config)();
var webhook = new Topgg.Webhook(process.env.TOPGGAUTH);

var localhostOnly = function localhostOnly(req, res, next) {
  var hostmachine = req.headers.host.split(':')[0];

  if (hostmachine !== 'localhost' && hostmachine !== '127.0.0.1') {
    return res.sendStatus(401);
  }

  next();
};

var notifyRouter = function notifyRouter(app, discordClient, io, queue) {
  app.post('/api/rpc/blocknotify', localhostOnly, function (req, res) {
    (0, _syncRunebase.startRunebaseSync)(discordClient, io, queue);
    res.sendStatus(200);
  });
  app.post('/api/rpc/walletnotify', localhostOnly, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.ticker === 'RUNES') {
                (0, _walletNotify["default"])(req, res, next);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(), /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, detail, myClient;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!res.locals.error) {
                _context2.next = 4;
                break;
              }

              console.log(res.locals.error);
              _context2.next = 44;
              break;

            case 4:
              if (!(!res.locals.error && res.locals.detail && res.locals.detail.length > 0)) {
                _context2.next = 44;
                break;
              }

              _iteratorAbruptCompletion = false;
              _didIteratorError = false;
              _context2.prev = 7;
              _iterator = _asyncIterator(res.locals.detail);

            case 9:
              _context2.next = 11;
              return _iterator.next();

            case 11:
              if (!(_iteratorAbruptCompletion = !(_step = _context2.sent).done)) {
                _context2.next = 28;
                break;
              }

              detail = _step.value;

              if (!detail.amount) {
                _context2.next = 25;
                break;
              }

              _context2.prev = 14;
              _context2.next = 17;
              return discordClient.users.fetch(detail.userId, false);

            case 17:
              myClient = _context2.sent;
              _context2.next = 20;
              return myClient.send({
                embeds: [(0, _embeds.discordIncomingDepositMessage)(detail)]
              });

            case 20:
              _context2.next = 25;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](14);
              console.log(_context2.t0);

            case 25:
              _iteratorAbruptCompletion = false;
              _context2.next = 9;
              break;

            case 28:
              _context2.next = 34;
              break;

            case 30:
              _context2.prev = 30;
              _context2.t1 = _context2["catch"](7);
              _didIteratorError = true;
              _iteratorError = _context2.t1;

            case 34:
              _context2.prev = 34;
              _context2.prev = 35;

              if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                _context2.next = 39;
                break;
              }

              _context2.next = 39;
              return _iterator["return"]();

            case 39:
              _context2.prev = 39;

              if (!_didIteratorError) {
                _context2.next = 42;
                break;
              }

              throw _iteratorError;

            case 42:
              return _context2.finish(39);

            case 43:
              return _context2.finish(34);

            case 44:
              if (res.locals.activity) {
                try {
                  io.to('admin').emit('updateActivity', {
                    activity: res.locals.activity
                  });
                } catch (e) {
                  console.log(e);
                }
              }

              res.sendStatus(200);

            case 46:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[7, 30, 34, 44], [14, 22], [35,, 39, 43]]);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.post("/api/vote/topgg", webhook.listener( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(vote) {
      var isOurGuild;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(vote);
              _context4.next = 3;
              return _models["default"].setting.findOne({
                where: {
                  discordHomeServerGuildId: vote.guild
                }
              });

            case 3:
              isOurGuild = _context4.sent;

              if (!(isOurGuild && vote.type === 'upvote')) {
                _context4.next = 7;
                break;
              }

              _context4.next = 7;
              return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                var task;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _topggVote.discordTopggVote)(discordClient, vote, io);

                      case 2:
                        task = _context3.sent;

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              })));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x6) {
      return _ref3.apply(this, arguments);
    };
  }()));
};

exports.notifyRouter = notifyRouter;