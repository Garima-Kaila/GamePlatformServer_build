/**
 * Session manager
 */

'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSession = getSession;
exports.managePreGameRequest = managePreGameRequest;
exports.managePostGameRequest = managePostGameRequest;

var _nodeUuid = require('node-uuid');

var uuid = _interopRequireWildcard(_nodeUuid);

var _logger = require('../logger');

var logger = _interopRequireWildcard(_logger);

function getSession(req, res, next) {
    logger.log(0, "Session", "getSession", req.user);
    var userId = req.user && req.user._id ? req.user._id : req.session.user;
    if (!userId && req.Game.action === "init") {
        userId = req.Game.userId ? req.Game.userId : "DEMO-" + uuid.v1();
    } else {
        // log execption "Invalid Request"
    }
    req.Game.userId = userId;
    req.session.user = userId;

    logger.log(1, "Session", "getSession", req.Game.userId);
    next();
}

function managePreGameRequest(req, res, next) {
    logger.log(0, "Session", "managePreGameRequest");

    next();
}

function managePostGameRequest(req, res, next) {
    logger.log(0, "Session", "managePostGameRequest");

    next();
}
//# sourceMappingURL=index.js.map
