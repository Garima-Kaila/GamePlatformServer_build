'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TransactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  type: String
}, { timestamps: true });

exports['default'] = mongoose.model('Transaction', TransactionSchema);
module.exports = exports['default'];
//# sourceMappingURL=transaction.model.js.map
