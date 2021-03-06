/**
 * Session manager
 */

'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.managePreGameRequest = managePreGameRequest;
exports.managePostGameRequest = managePostGameRequest;

var _apiGameRoundGameRoundController = require('../../api/gameRound/gameRound.controller');

var gameRoundController = _interopRequireWildcard(_apiGameRoundGameRoundController);

var _logger = require('../logger');

var logger = _interopRequireWildcard(_logger);

function managePreGameRequest(req, res, next) {
    logger.log(0, "GameRound", "managePreGameRequest");
    if (req.Game.action === "init") {
        // todo:
        // check if there is any incomplete game round
        // respond with the last game rounf and no need to proceed further
        // bascially flag round as "isRestore" and skip different service calls accordingly
        gameRoundController.getLastIncompleteRound({ userId: req.Game.userId, game: req.Game.game }, function (err, gameRound) {
            if (err) {} else if (gameRound) {
                // there is some incomplete game round
                req.Game.restore = true;
                req.Game.lastOutcome = gameRound.outcome;
                next();
            } else {
                next();
            }
        });
    } else {
        next();
    }
}

function managePostGameRequest(req, res, next) {
    logger.log(0, "GameRound", "managePostGameRequest");
    if (req.Game.restore === true) {
        // no need to insert "init" of restoring game
        next();
    } else {
        if (req.Game.action === "init") {
            next();
        } else {
            gameRoundController.insert({ userId: req.Game.userId,
                bet: req.Game.bet,
                balance: req.Game.wallet.balance,
                currency: req.Game.wallet.currency,
                win: req.Game.win,
                game: req.Game.game,
                action: req.Game.action,
                outcome: req.Game.gameResponse,
                isOver: req.Game.roundOver
            }, function (err, gameRound) {
                if (err) {} else {
                    next();
                }
            });
        }
    }
}
//# sourceMappingURL=index.js.map
