/**
 * Wallet manager
 */

'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.managePreGameRequest = managePreGameRequest;
exports.managePostGameRequest = managePostGameRequest;

var _apiWalletWalletController = require('../../api/wallet/wallet.controller');

var walletController = _interopRequireWildcard(_apiWalletWalletController);

var _constants = require('../../constants');

var _constants2 = _interopRequireDefault(_constants);

var _logger = require('../logger');

var logger = _interopRequireWildcard(_logger);

function managePreGameRequest(req, res, next) {
    logger.log(0, "Wallet", "managePreGameRequest");

    // if game request is triggered first time then load initial balance and currency
    if (req.Game.action === "init") {
        walletController.createIfNotExists({
            userId: req.Game.userId,
            balance: parseInt(GLOBAL.config[_constants2['default'].configurationKeys.defaultBalanceForDemoPlay]),
            currency: GLOBAL.config[_constants2['default'].configurationKeys.defaultCurrency]
        }, function (err, walletResponse) {
            if (err) {} else {
                if (!req.Game.wallet) {
                    req.Game.wallet = {};
                    req.Game.wallet.balance = walletResponse.balance;
                    req.Game.wallet.currency = walletResponse.currency;
                }
                next();
            }
        });
    }
    if (req.Game.action === "spin" || req.Game.action === "deal") {
        walletController.placeBet({
            userId: req.Game.userId,
            bet: req.Game.bet
        }, function (err, walletResponse) {
            if (err) {} else {
                if (!req.Game.wallet) {
                    req.Game.wallet = {};
                    req.Game.wallet.balance = walletResponse.balance;
                    req.Game.wallet.currency = walletResponse.currency;
                }
                next();
            }
        });
    }
    if (req.Game.action === "draw") {
        walletController.getWalletOfUser(req.Game.userId, function (err, walletResponse) {
            if (err) {} else {
                if (!req.Game.wallet) {
                    req.Game.wallet = {};
                    req.Game.wallet.balance = walletResponse.balance;
                    req.Game.wallet.currency = walletResponse.currency;
                }
                next();
            }
        });
    }
}

function managePostGameRequest(req, res, next) {
    logger.log(0, "Wallet", "managePostGameRequest");
    walletController.addWin({
        userId: req.Game.userId,
        win: req.Game.win
    }, function (err, walletResponse) {
        if (err) {} else {
            if (!req.Game.wallet) {
                req.Game.wallet = {};
                req.Game.wallet.balance = walletResponse.balance;
                req.Game.wallet.currency = walletResponse.currency;
            }
            next();
        }
    });

    // next();
}
//# sourceMappingURL=index.js.map
