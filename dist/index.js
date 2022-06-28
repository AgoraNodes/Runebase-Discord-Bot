"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _pQueue = _interopRequireDefault(require("p-queue"));

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _helmet = _interopRequireDefault(require("helmet"));

var _dotenv = require("dotenv");

var _passport = _interopRequireDefault(require("passport"));

var _connectRedis = _interopRequireDefault(require("connect-redis"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _redis = require("redis");

var _socket = _interopRequireDefault(require("socket.io"));

var _csurf = _interopRequireDefault(require("csurf"));

var _models = _interopRequireDefault(require("./models"));

var _router = require("./router");

var _router2 = require("./dashboard/router");

var _initDatabaseRecords = require("./helpers/initDatabaseRecords");

var _syncRunebase = require("./services/syncRunebase");

var _patcher = require("./helpers/blockchain/runebase/patcher");

var _logger = _interopRequireDefault(require("./helpers/logger"));

var _deployCommands = require("./helpers/client/deployCommands");

var _updatePrice = require("./helpers/price/updatePrice");

var _updateConversionRates = require("./helpers/price/updateConversionRates");

var _processWithdrawals = require("./services/processWithdrawals");

var _settings = _interopRequireDefault(require("./config/settings"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.freeze(Object.prototype);
(0, _dotenv.config)();

var checkCSRFRoute = function checkCSRFRoute(req) {
  console.log('Checking CSFT ROUTE');
  var hostmachine = req.headers.host.split(':')[0];

  if (req.url === '/api/rpc/blocknotify' && (hostmachine === 'localhost' || hostmachine === '127.0.0.1') || req.url === '/api/rpc/walletnotify' && (hostmachine === 'localhost' || hostmachine === '127.0.0.1') || req.url === '/api/vote/topgg') {
    return true;
  }

  return false;
};

var conditionalCSRF = function conditionalCSRF(req, res, next) {
  var shouldPass = checkCSRFRoute(req);

  if (shouldPass) {
    return next();
  }

  return (0, _csurf["default"])({
    cookie: {
      secure: true,
      maxAge: 3600
    }
  })(req, res, next);
};

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
  var queue, port, app, server, io, RedisStore, redisClient, sessionMiddleware, wrap, sockets, discordClient, replenishEveryonesStamina, schedulePatchDeposits, scheduleUpdateConversionRatesFiat, scheduleUpdateConversionRatesCrypto, schedulePriceUpdate, scheduleWithdrawal;
  return _regenerator["default"].wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          queue = new _pQueue["default"]({
            concurrency: 1,
            timeout: 1000000000
          });
          port = process.env.PORT || 8080;
          app = (0, _express["default"])();
          server = _http["default"].createServer(app);
          io = (0, _socket["default"])(server, {
            path: '/socket.io',
            cookie: false
          });
          app.use((0, _helmet["default"])());
          app.use((0, _compression["default"])());
          app.use((0, _morgan["default"])('combined'));
          app.use((0, _cors["default"])());
          app.set('trust proxy', 1);
          RedisStore = (0, _connectRedis["default"])(_expressSession["default"]);
          redisClient = (0, _redis.createClient)({
            database: 3,
            legacyMode: true
          });
          _context4.next = 14;
          return redisClient.connect();

        case 14:
          sessionMiddleware = (0, _expressSession["default"])({
            secret: process.env.SESSION_SECRET,
            key: "connect.sid",
            resave: false,
            proxy: true,
            saveUninitialized: false,
            ephemeral: false,
            store: new RedisStore({
              client: redisClient
            }),
            cookie: {
              httpOnly: true,
              secure: true,
              sameSite: 'strict'
            }
          });
          app.use((0, _cookieParser["default"])());
          app.use(_bodyParser["default"].urlencoded({
            extended: false,
            limit: '5mb'
          }));
          app.use(_bodyParser["default"].json());
          app.use(conditionalCSRF);
          app.use(function (req, res, next) {
            var shouldPass = checkCSRFRoute(req);

            if (shouldPass) {
              return next();
            }

            res.cookie('XSRF-TOKEN', req.csrfToken());
            next();
          });
          app.use(sessionMiddleware);
          app.use(_passport["default"].initialize());
          app.use(_passport["default"].session());

          wrap = function wrap(middleware) {
            return function (socket, next) {
              return middleware(socket.request, {}, next);
            };
          };

          io.use(wrap(sessionMiddleware));
          io.use(wrap(_passport["default"].initialize()));
          io.use(wrap(_passport["default"].session()));
          sockets = {};
          io.on("connection", /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(socket) {
              var userId;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      userId = socket.request.session.passport ? socket.request.session.passport.user : '';

                      if (socket.request.user && (socket.request.user.role === 4 || socket.request.user.role === 8)) {
                        socket.join('admin');
                        sockets[parseInt(userId, 10)] = socket;
                      } // console.log(Object.keys(sockets).length);


                      socket.on("disconnect", function () {
                        delete sockets[parseInt(userId, 10)];
                      });

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());
          discordClient = new _discord.Client({
            intents: [_discord.Intents.FLAGS.GUILDS, _discord.Intents.FLAGS.GUILD_MEMBERS, _discord.Intents.FLAGS.GUILD_PRESENCES, _discord.Intents.FLAGS.GUILD_MESSAGES, _discord.Intents.FLAGS.DIRECT_MESSAGES, _discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, _discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, _discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, _discord.Intents.FLAGS.GUILD_VOICE_STATES],
            partials: ['MESSAGE', 'CHANNEL', 'REACTION']
          });
          _context4.next = 32;
          return (0, _router.router)(app, discordClient, io, queue);

        case 32:
          _context4.next = 34;
          return discordClient.login(process.env.DISCORD_CLIENT_TOKEN);

        case 34:
          console.log("Logged in as ".concat(discordClient.user.tag, "!"));
          discordClient.user.setPresence({
            activities: [{
              name: "".concat(_settings["default"].bot.command),
              type: "PLAYING"
            }]
          });
          (0, _router2.dashboardRouter)(app, io, discordClient);
          _context4.next = 39;
          return (0, _initDatabaseRecords.initDatabaseRecords)(discordClient);

        case 39:
          _context4.next = 41;
          return (0, _deployCommands.deployCommands)(process.env.DISCORD_CLIENT_TOKEN, discordClient.user.id);

        case 41:
          _context4.next = 43;
          return (0, _syncRunebase.startRunebaseSync)(discordClient, io, queue);

        case 43:
          _context4.next = 45;
          return (0, _patcher.patchRunebaseDeposits)(discordClient);

        case 45:
          console.log(new Date());
          console.log('date now');
          replenishEveryonesStamina = _nodeSchedule["default"].scheduleJob('05 03 * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
            var allUserCharacters, _iterator, _step, userChar;

            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    console.log('node executed');
                    _context2.next = 3;
                    return _models["default"].UserClass.findAll({
                      include: [{
                        model: _models["default"]["class"],
                        as: 'class'
                      }, {
                        model: _models["default"].stats,
                        as: 'stats'
                      }, {
                        model: _models["default"].condition,
                        as: 'condition'
                      }]
                    });

                  case 3:
                    allUserCharacters = _context2.sent;
                    // eslint-disable-next-line no-restricted-syntax
                    _iterator = _createForOfIteratorHelper(allUserCharacters);
                    _context2.prev = 5;

                    _iterator.s();

                  case 7:
                    if ((_step = _iterator.n()).done) {
                      _context2.next = 15;
                      break;
                    }

                    userChar = _step.value;
                    console.log(userChar.condition);

                    if (!(userChar["class"].stamina + userChar.stats.stamina > userChar.condition.stamina)) {
                      _context2.next = 13;
                      break;
                    }

                    _context2.next = 13;
                    return userChar.condition.update({
                      stamina: userChar["class"].stamina + userChar.stats.stamina
                    });

                  case 13:
                    _context2.next = 7;
                    break;

                  case 15:
                    _context2.next = 20;
                    break;

                  case 17:
                    _context2.prev = 17;
                    _context2.t0 = _context2["catch"](5);

                    _iterator.e(_context2.t0);

                  case 20:
                    _context2.prev = 20;

                    _iterator.f();

                    return _context2.finish(20);

                  case 23:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[5, 17, 20, 23]]);
          })));
          schedulePatchDeposits = _nodeSchedule["default"].scheduleJob('10 */1 * * *', function () {
            (0, _patcher.patchRunebaseDeposits)(discordClient);
          });
          scheduleUpdateConversionRatesFiat = _nodeSchedule["default"].scheduleJob('0 */8 * * *', function () {
            // Update Fiat conversion rates every 8 hours
            (0, _updateConversionRates.updateConversionRatesFiat)();
          });
          (0, _updateConversionRates.updateConversionRatesCrypto)();
          scheduleUpdateConversionRatesCrypto = _nodeSchedule["default"].scheduleJob('*/10 * * * *', function () {
            // Update price every 10 minutes
            (0, _updateConversionRates.updateConversionRatesCrypto)();
          });
          (0, _updatePrice.updatePrice)();
          schedulePriceUpdate = _nodeSchedule["default"].scheduleJob('*/5 * * * *', function () {
            // Update price every 5 minutes
            (0, _updatePrice.updatePrice)();
          });
          scheduleWithdrawal = _nodeSchedule["default"].scheduleJob('*/8 * * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
            var autoWithdrawalSetting;
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _models["default"].featureSetting.findOne({
                      where: {
                        name: 'autoWithdrawal'
                      }
                    });

                  case 2:
                    autoWithdrawalSetting = _context3.sent;

                    if (autoWithdrawalSetting.enabled) {
                      (0, _processWithdrawals.processWithdrawals)(discordClient);
                    }

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));
          app.use(function (err, req, res, next) {
            res.status(500).send({
              error: err.message
            });
          });
          server.listen(port);
          console.log('server listening on:', port);

        case 58:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
}))();
process.on('unhandledRejection', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, p) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _logger["default"].error("Error Application Unhandled Rejection: ".concat(err));

            console.log(err, '\nUnhandled Rejection at Promise\n', p, '\n--------------------------------');
            console.log(err.stack);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x2, _x3) {
    return _ref5.apply(this, arguments);
  };
}());
process.on('uncaughtException', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err, p) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _logger["default"].error("Error Application Uncaught Exception: ".concat(err));

            console.log(err, '\nUnhandled Exception at Promise\n', p, '\n--------------------------------');
            console.log(err.stack);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}());