'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _authAuthService = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_authAuthService);

var _constants = require('../../constants');

var _constants2 = _interopRequireDefault(_constants);

var express = require('express');
var gameController = require('./game.controller');
var sessionManager = require('../../components/session');
var walletManager = require('../../components/wallet');
var gameRoundManager = require('../../components/gameRound');
var interceptor = require('../../components/interceptor');

var router = express.Router();

router.get('/', gameController.index);
router.get('/:id', gameController.show);

router.post('/play', interceptor.preGameRequest, auth.getUserIdentity(), sessionManager.getSession, sessionManager.managePreGameRequest, walletManager.managePreGameRequest, gameRoundManager.managePreGameRequest, interceptor.preGameResponse, gameController.play, interceptor.postGameResponse, gameRoundManager.managePostGameRequest, walletManager.managePostGameRequest, sessionManager.managePostGameRequest, interceptor.postGameRequest, respond);

router.post('/', gameController.fetch);
router.put('/:id', gameController.update);
router.patch('/:id', gameController.update);
router['delete']('/:id', gameController.destroy);

module.exports = router;

function respond(req, res, next) {
        res.status(200).json(req.GameOutcome);
}
//# sourceMappingURL=index.js.map
