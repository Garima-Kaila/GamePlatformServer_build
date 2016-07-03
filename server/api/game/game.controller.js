/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/games              ->  index
 * POST    /api/games              ->  create
 * GET     /api/games/:id          ->  show
 * PUT     /api/games/:id          ->  update
 * DELETE  /api/games/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.fetch = fetch;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.play = play;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gameModel = require('./game.model');

var _gameModel2 = _interopRequireDefault(_gameModel);

var _constants = require('../../constants');

var _constants2 = _interopRequireDefault(_constants);

var _componentsLogger = require('../../components/logger');

var logger = _interopRequireWildcard(_componentsLogger);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2['default'].merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Games

function index(req, res) {
  _gameModel2['default'].findAsync().then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a filtered list of Games

function fetch(req, res) {
  _gameModel2['default'].findAsync(req.body.filter).then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single Game from the DB

function show(req, res) {
  _gameModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

// Creates a new Game in the DB

function create(req, res) {
  _gameModel2['default'].createAsync(req.body).then(respondWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Game in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _gameModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

// Deletes a Game from the DB

function destroy(req, res) {
  _gameModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}

function play(req, res, next) {
  logger.log(0, "game.controller", "play", req.Game);
  // todo : must have game and action in the req.Game.rawReq
  var options = {
    url: GLOBAL.config[_constants2['default'].configurationKeys.gameServerUrl] + "/api/execute",
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(req.Game.rawReq)
  };

  (0, _request2['default'])(options, function (err, httpResponse, body) {
    logger.log(0, "game.controller", "play response", body);
    req.Game.gameResponse = JSON.parse(body);
    next();
  });
}
//# sourceMappingURL=game.controller.js.map
