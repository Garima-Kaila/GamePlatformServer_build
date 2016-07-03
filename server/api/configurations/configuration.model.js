'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ConfigurationsSchema = new mongoose.Schema({
  name: String,
  description: String,
  value: String,
  active: Boolean
});

exports['default'] = mongoose.model('Configuration', ConfigurationsSchema);
module.exports = exports['default'];
//# sourceMappingURL=configuration.model.js.map
