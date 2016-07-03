'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WalletSchema = new mongoose.Schema({
    userId: { type: String, index: { unique: true } },
    balance: Number,
    locked: Boolean,
    currency: String
}, { timestamps: true });

exports['default'] = mongoose.model('Wallet', WalletSchema);
module.exports = exports['default'];
//# sourceMappingURL=wallet.model.js.map
