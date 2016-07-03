/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wallets              ->  index
 * POST    /api/wallets              ->  create
 * GET     /api/wallets/:id          ->  show
 * PUT     /api/wallets/:id          ->  update
 * DELETE  /api/wallets/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.getWalletOfUser = getWalletOfUser;
exports.placeBet = placeBet;
exports.addWin = addWin;
exports.createIfNotExists = createIfNotExists;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _walletModel = require('./wallet.model');

var _walletModel2 = _interopRequireDefault(_walletModel);

var _transactionModel = require('./transaction.model');

var _transactionModel2 = _interopRequireDefault(_transactionModel);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
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

// Gets a list of Wallet

function index(req, res) {
  _transactionModel2['default'].aggregateAsync([{
    $group: {
      _id: "$type",
      total: { $sum: "$amount" }
    }
  }]).then(respondWithResult(res))['catch'](handleError(res));
}

/*
function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}



// Gets a single Wallet from the DB
export function show(req, res) {
  Wallet.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wallet in the DB
export function create(req, res) {
  Wallet.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Wallet in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Wallet.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Wallet from the DB
export function destroy(req, res) {
  Wallet.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/

function getWalletOfUser(userId, callback) {
  _walletModel2['default'].findOne({ userId: userId }, callback);
}

function placeBet(obj, callback) {
  _transactionModel2['default'].create({ userId: obj.userId, amount: -1 * obj.bet, type: "BET" }, function (err, transactionLooged) {
    update(obj.userId, -1 * obj.bet, callback);
  });
}

function addWin(obj, callback) {
  _transactionModel2['default'].create({ userId: obj.userId, amount: obj.win, type: "WIN" }, function (err, transactionLooged) {
    update(obj.userId, obj.win, callback);
  });
}

function createIfNotExists(obj, callback) {
  var initObj = {
    userId: obj.userId,
    balance: obj.balance,
    locked: false,
    currency: obj.currency
  };
  _walletModel2['default'].findOneAndUpdate({ userId: obj.userId }, { $setOnInsert: initObj }, { upsert: true, 'new': true }, callback);
}

function update(userId, amtToInc, callback) {
  _walletModel2['default'].findOneAndUpdate({ userId: userId }, { $inc: { balance: amtToInc } }, { upsert: false, 'new': true }, callback);
}
//# sourceMappingURL=wallet.controller.js.map
