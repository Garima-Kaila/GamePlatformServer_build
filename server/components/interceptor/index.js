/**
 * Session manager
 */

'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.preGameRequest = preGameRequest;
exports.postGameRequest = postGameRequest;
exports.preGameResponse = preGameResponse;
exports.postGameResponse = postGameResponse;

var _logger = require('../logger');

var logger = _interopRequireWildcard(_logger);

function preGameRequest(req, res, next) {
    logger.log(0, "Interceptor", "managePreGameRequest", JSON.stringify(req.body));
    req.Game = {};
    req.Game.game = req.body.game;
    req.Game.action = req.body.action;
    req.Game.bet = req.body.bet ? parseFloat(req.body.bet) : 0;
    req.Game.betLevel = req.body.betLevel;
    req.Game.userId = req.body.userID;
    req.Game.rawReq = req.body;

    next();
}

function postGameRequest(req, res, next) {
    logger.log(0, "Interceptor", "managePostGameRequest", req.Game);

    req.GameOutcome = req.Game.gameResponse;
    req.GameOutcome.balance = req.Game.wallet.balance;
    req.GameOutcome.currency = req.Game.wallet.currency;

    if (req.Game.restore) {
        req.GameOutcome.restore = req.Game.restore;
        req.GameOutcome.lastOutcome = req.Game.lastOutcome;
    }

    delete req.Game;
    logger.log(0, "Interceptor", "managePostGameRequest", "cleanup");
    next();
}

function preGameResponse(req, res, next) {
    logger.log(0, "Interceptor", "preGameResponse");
    // todo: need to see if it is required to tell execution server that it is restore mode
    /*
    if(req.Game.restore){
        req.Game.rawReq.restore = req.Game.restore;
        req.Game.rawReq.lastOutcome = req.Game.lastOutcome;
    }
    */
    next();
}

function postGameResponse(req, res, next) {
    logger.log(0, "Interceptor", "postGameResponse");
    req.Game.win = req.Game.gameResponse.win ? parseFloat(req.Game.gameResponse.win) : 0;
    req.Game.roundOver = req.Game.gameResponse.roundOver;
    req.Game.symbols = req.Game.gameResponse.symbols;
    req.Game.betlines = req.Game.gameResponse.betlines;
    next();
}
//# sourceMappingURL=index.js.map
