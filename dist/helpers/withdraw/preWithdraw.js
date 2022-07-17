"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preWithdraw = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _rclient = require("../../services/rclient");

var _logger = _interopRequireDefault(require("../logger"));

var _models = _interopRequireDefault(require("../../models"));

var _embeds = require("../../embeds");

var preWithdraw = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(discordClient, message) {
    var userId, filteredMessage, collectedAddress, collectedAmount, msgFilter;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            filteredMessage = [];

            if (message.user && message.user.id) {
              userId = message.user.id;
            } else {
              userId = message.author.id;
            }

            msgFilter = function msgFilter(m) {
              var filtered = m.author.id === userId;
              return filtered;
            };

            _context19.next = 5;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(t) {
                var discordUser, discordChannel, isValidAddress, _discordUser, _discordChannel, _discordUser2, _discordChannel2;

                return _regenerator["default"].wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context17.next = 21;
                          break;
                        }

                        _context17.next = 3;
                        return discordClient.users.cache.get(message.user.id);

                      case 3:
                        discordUser = _context17.sent;

                        if (!message.guildId) {
                          _context17.next = 14;
                          break;
                        }

                        _context17.next = 7;
                        return discordClient.channels.cache.get(message.channelId);

                      case 7:
                        discordChannel = _context17.sent;
                        _context17.next = 10;
                        return discordChannel.send({
                          embeds: [(0, _embeds.enterWithdrawalAddress)()]
                        });

                      case 10:
                        _context17.next = 12;
                        return discordChannel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(collected) {
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    collectedAddress = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x4) {
                            return _ref3.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(collected) {
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    console.log(collected);
                                    _context2.next = 3;
                                    return discordChannel.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x5) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 12:
                        _context17.next = 19;
                        break;

                      case 14:
                        _context17.next = 16;
                        return discordUser.send({
                          embeds: [(0, _embeds.enterWithdrawalAddress)()]
                        });

                      case 16:
                        console.log('picked user await channel');
                        _context17.next = 19;
                        return discordUser.dmChannel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(collected) {
                            return _regenerator["default"].wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    collectedAddress = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3);
                          }));

                          return function (_x6) {
                            return _ref5.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(collected) {
                            return _regenerator["default"].wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    console.log(collected);
                                    _context4.next = 3;
                                    return discordUser.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context4.stop();
                                }
                              }
                            }, _callee4);
                          }));

                          return function (_x7) {
                            return _ref6.apply(this, arguments);
                          };
                        }());

                      case 19:
                        _context17.next = 31;
                        break;

                      case 21:
                        if (!(message.channel.type === 'DM')) {
                          _context17.next = 26;
                          break;
                        }

                        _context17.next = 24;
                        return message.author.send({
                          embeds: [(0, _embeds.enterWithdrawalAddress)()]
                        });

                      case 24:
                        _context17.next = 26;
                        return message.author.dmChannel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(collected) {
                            return _regenerator["default"].wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    collectedAddress = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5);
                          }));

                          return function (_x8) {
                            return _ref7.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(collected) {
                            return _regenerator["default"].wrap(function _callee6$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:
                                    console.log(collected);
                                    _context6.next = 3;
                                    return message.author.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context6.stop();
                                }
                              }
                            }, _callee6);
                          }));

                          return function (_x9) {
                            return _ref8.apply(this, arguments);
                          };
                        }());

                      case 26:
                        if (!(message.channel.type === 'GUILD_TEXT')) {
                          _context17.next = 31;
                          break;
                        }

                        _context17.next = 29;
                        return message.channel.send({
                          embeds: [(0, _embeds.enterWithdrawalAddress)()]
                        });

                      case 29:
                        _context17.next = 31;
                        return message.channel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(collected) {
                            return _regenerator["default"].wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:
                                    collectedAddress = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context7.stop();
                                }
                              }
                            }, _callee7);
                          }));

                          return function (_x10) {
                            return _ref9.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(collected) {
                            return _regenerator["default"].wrap(function _callee8$(_context8) {
                              while (1) {
                                switch (_context8.prev = _context8.next) {
                                  case 0:
                                    console.log(collected);
                                    _context8.next = 3;
                                    return message.channel.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context8.stop();
                                }
                              }
                            }, _callee8);
                          }));

                          return function (_x11) {
                            return _ref10.apply(this, arguments);
                          };
                        }());

                      case 31:
                        console.log('before collect message');

                        if (collectedAddress) {
                          _context17.next = 34;
                          break;
                        }

                        return _context17.abrupt("return", [false, false]);

                      case 34:
                        _context17.prev = 34;
                        _context17.next = 37;
                        return (0, _rclient.getInstance)().validateAddress(collectedAddress);

                      case 37:
                        isValidAddress = _context17.sent;
                        _context17.next = 44;
                        break;

                      case 40:
                        _context17.prev = 40;
                        _context17.t0 = _context17["catch"](34);
                        console.log(_context17.t0);
                        isValidAddress = false;

                      case 44:
                        console.log('isValidAddress');
                        console.log(isValidAddress);

                        if (!(!isValidAddress || !isValidAddress.isvalid)) {
                          _context17.next = 70;
                          break;
                        }

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context17.next = 63;
                          break;
                        }

                        _context17.next = 50;
                        return discordClient.users.cache.get(message.user.id);

                      case 50:
                        _discordUser = _context17.sent;

                        if (!message.guildId) {
                          _context17.next = 59;
                          break;
                        }

                        _context17.next = 54;
                        return discordClient.channels.cache.get(message.channelId);

                      case 54:
                        _discordChannel = _context17.sent;
                        _context17.next = 57;
                        return _discordChannel.send({
                          embeds: [(0, _embeds.invalidAddressMessage)(userId)]
                        });

                      case 57:
                        _context17.next = 61;
                        break;

                      case 59:
                        _context17.next = 61;
                        return _discordUser.send({
                          embeds: [(0, _embeds.invalidAddressMessage)(userId)]
                        });

                      case 61:
                        _context17.next = 69;
                        break;

                      case 63:
                        if (!(message.channel.type === 'DM')) {
                          _context17.next = 66;
                          break;
                        }

                        _context17.next = 66;
                        return message.author.send({
                          embeds: [(0, _embeds.invalidAddressMessage)(userId)]
                        });

                      case 66:
                        if (!(message.channel.type === 'GUILD_TEXT')) {
                          _context17.next = 69;
                          break;
                        }

                        _context17.next = 69;
                        return message.channel.send({
                          embeds: [(0, _embeds.invalidAddressMessage)(userId)]
                        });

                      case 69:
                        return _context17.abrupt("return", [false, false]);

                      case 70:
                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context17.next = 91;
                          break;
                        }

                        _context17.next = 73;
                        return discordClient.users.cache.get(message.user.id);

                      case 73:
                        _discordUser2 = _context17.sent;

                        if (!message.guildId) {
                          _context17.next = 84;
                          break;
                        }

                        _context17.next = 77;
                        return discordClient.channels.cache.get(message.channelId);

                      case 77:
                        _discordChannel2 = _context17.sent;
                        _context17.next = 80;
                        return _discordChannel2.send({
                          embeds: [(0, _embeds.enterWithdrawalAmount)()]
                        });

                      case 80:
                        _context17.next = 82;
                        return _discordChannel2.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(collected) {
                            return _regenerator["default"].wrap(function _callee9$(_context9) {
                              while (1) {
                                switch (_context9.prev = _context9.next) {
                                  case 0:
                                    collectedAmount = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context9.stop();
                                }
                              }
                            }, _callee9);
                          }));

                          return function (_x12) {
                            return _ref11.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(collected) {
                            return _regenerator["default"].wrap(function _callee10$(_context10) {
                              while (1) {
                                switch (_context10.prev = _context10.next) {
                                  case 0:
                                    console.log(collected);
                                    _context10.next = 3;
                                    return _discordChannel2.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context10.stop();
                                }
                              }
                            }, _callee10);
                          }));

                          return function (_x13) {
                            return _ref12.apply(this, arguments);
                          };
                        }());

                      case 82:
                        _context17.next = 89;
                        break;

                      case 84:
                        _context17.next = 86;
                        return _discordUser2.send({
                          embeds: [(0, _embeds.enterWithdrawalAmount)()]
                        });

                      case 86:
                        console.log('picked user await channel');
                        _context17.next = 89;
                        return _discordUser2.dmChannel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(collected) {
                            return _regenerator["default"].wrap(function _callee11$(_context11) {
                              while (1) {
                                switch (_context11.prev = _context11.next) {
                                  case 0:
                                    collectedAmount = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context11.stop();
                                }
                              }
                            }, _callee11);
                          }));

                          return function (_x14) {
                            return _ref13.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(collected) {
                            return _regenerator["default"].wrap(function _callee12$(_context12) {
                              while (1) {
                                switch (_context12.prev = _context12.next) {
                                  case 0:
                                    console.log(collected);
                                    _context12.next = 3;
                                    return _discordUser2.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context12.stop();
                                }
                              }
                            }, _callee12);
                          }));

                          return function (_x15) {
                            return _ref14.apply(this, arguments);
                          };
                        }());

                      case 89:
                        _context17.next = 101;
                        break;

                      case 91:
                        if (!(message.channel.type === 'DM')) {
                          _context17.next = 96;
                          break;
                        }

                        _context17.next = 94;
                        return message.author.send({
                          embeds: [(0, _embeds.enterWithdrawalAmount)()]
                        });

                      case 94:
                        _context17.next = 96;
                        return message.author.dmChannel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(collected) {
                            return _regenerator["default"].wrap(function _callee13$(_context13) {
                              while (1) {
                                switch (_context13.prev = _context13.next) {
                                  case 0:
                                    collectedAmount = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context13.stop();
                                }
                              }
                            }, _callee13);
                          }));

                          return function (_x16) {
                            return _ref15.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(collected) {
                            return _regenerator["default"].wrap(function _callee14$(_context14) {
                              while (1) {
                                switch (_context14.prev = _context14.next) {
                                  case 0:
                                    console.log(collected);
                                    _context14.next = 3;
                                    return message.author.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context14.stop();
                                }
                              }
                            }, _callee14);
                          }));

                          return function (_x17) {
                            return _ref16.apply(this, arguments);
                          };
                        }());

                      case 96:
                        if (!(message.channel.type === 'GUILD_TEXT')) {
                          _context17.next = 101;
                          break;
                        }

                        _context17.next = 99;
                        return message.channel.send({
                          embeds: [(0, _embeds.enterWithdrawalAmount)()]
                        });

                      case 99:
                        _context17.next = 101;
                        return message.channel.awaitMessages({
                          filter: msgFilter,
                          max: 1,
                          time: 60000,
                          errors: ['time']
                        }).then( /*#__PURE__*/function () {
                          var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(collected) {
                            return _regenerator["default"].wrap(function _callee15$(_context15) {
                              while (1) {
                                switch (_context15.prev = _context15.next) {
                                  case 0:
                                    collectedAmount = collected.first().content;

                                  case 1:
                                  case "end":
                                    return _context15.stop();
                                }
                              }
                            }, _callee15);
                          }));

                          return function (_x18) {
                            return _ref17.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(collected) {
                            return _regenerator["default"].wrap(function _callee16$(_context16) {
                              while (1) {
                                switch (_context16.prev = _context16.next) {
                                  case 0:
                                    console.log(collected);
                                    _context16.next = 3;
                                    return message.channel.send({
                                      embeds: [(0, _embeds.timeOutMessage)()]
                                    });

                                  case 3:
                                  case "end":
                                    return _context16.stop();
                                }
                              }
                            }, _callee16);
                          }));

                          return function (_x19) {
                            return _ref18.apply(this, arguments);
                          };
                        }());

                      case 101:
                        if (collectedAmount) {
                          _context17.next = 103;
                          break;
                        }

                        return _context17.abrupt("return", [false, false]);

                      case 103:
                        //
                        filteredMessage = ['!runebase', 'withdraw', collectedAddress, collectedAmount];
                        console.log(filteredMessage);
                        console.log('filteredMessage');
                        console.log('filteredMessage');
                        console.log('filteredMessage');
                        console.log('filteredMessage');
                        console.log('filteredMessage');
                        console.log('filteredMessage');
                        console.log('filteredMessage');

                      case 112:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17, null, [[34, 40]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"]( /*#__PURE__*/function () {
              var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(err) {
                var discordChannel, _discordChannel3;

                return _regenerator["default"].wrap(function _callee18$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.prev = 0;
                        _context18.next = 3;
                        return _models["default"].error.create({
                          type: 'withdraw',
                          error: "".concat(err)
                        });

                      case 3:
                        _context18.next = 8;
                        break;

                      case 5:
                        _context18.prev = 5;
                        _context18.t0 = _context18["catch"](0);

                        _logger["default"].error("Error Discord: ".concat(_context18.t0));

                      case 8:
                        _logger["default"].error("Error Discord Withdraw Requested by: ".concat(message.author.id, "-").concat(message.author.username, "#").concat(message.author.discriminator, " - ").concat(err));

                        if (!(err.code && err.code === 50007)) {
                          _context18.next = 22;
                          break;
                        }

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context18.next = 18;
                          break;
                        }

                        _context18.next = 13;
                        return discordClient.channels.cache.get(message.channelId);

                      case 13:
                        discordChannel = _context18.sent;
                        _context18.next = 16;
                        return discordChannel.send({
                          embeds: [(0, _embeds.cannotSendMessageUser)("Withdraw", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context18.next = 20;
                        break;

                      case 18:
                        _context18.next = 20;
                        return message.channel.send({
                          embeds: [(0, _embeds.cannotSendMessageUser)("Withdraw", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 20:
                        _context18.next = 32;
                        break;

                      case 22:
                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context18.next = 30;
                          break;
                        }

                        _context18.next = 25;
                        return discordClient.channels.cache.get(message.channelId);

                      case 25:
                        _discordChannel3 = _context18.sent;
                        _context18.next = 28;
                        return _discordChannel3.send({
                          embeds: [(0, _embeds.discordErrorMessage)("Withdraw")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context18.next = 32;
                        break;

                      case 30:
                        _context18.next = 32;
                        return message.channel.send({
                          embeds: [(0, _embeds.discordErrorMessage)("Withdraw")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 32:
                      case "end":
                        return _context18.stop();
                    }
                  }
                }, _callee18, null, [[0, 5]]);
              }));

              return function (_x20) {
                return _ref19.apply(this, arguments);
              };
            }());

          case 5:
            return _context19.abrupt("return", [true, filteredMessage]);

          case 6:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));

  return function preWithdraw(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.preWithdraw = preWithdraw;