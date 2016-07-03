'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GamesSchema = new mongoose.Schema({
  name: String,
  gameId: String,
  variant: String,
  active: Boolean
});

exports['default'] = mongoose.model('Game', GamesSchema);
module.exports = exports['default'];
//# sourceMappingURL=game.model.js.map
