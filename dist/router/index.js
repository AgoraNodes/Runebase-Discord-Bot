"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _discord = require("./discord");

var _notify = require("./notify");

var router = function router(app, discordClient, io, queue) {
  (0, _notify.notifyRouter)(app, discordClient, io, queue);
  (0, _discord.discordRouter)(discordClient, queue, io);
};

exports.router = router;