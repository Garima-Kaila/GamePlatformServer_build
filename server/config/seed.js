/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _apiThingThingModel = require('../api/thing/thing.model');

var _apiThingThingModel2 = _interopRequireDefault(_apiThingThingModel);

var _apiConfigurationsConfigurationModel = require('../api/configurations/configuration.model');

var _apiConfigurationsConfigurationModel2 = _interopRequireDefault(_apiConfigurationsConfigurationModel);

var _apiGameGameModel = require('../api/game/game.model');

var _apiGameGameModel2 = _interopRequireDefault(_apiGameGameModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

var defaultConfig = require('./defaultConfig');

_apiThingThingModel2['default'].find({}).removeAsync().then(function () {
  _apiThingThingModel2['default'].create(defaultConfig.things);
});

_apiGameGameModel2['default'].find({}).removeAsync().then(function () {
  _apiGameGameModel2['default'].create(defaultConfig.games);
});

_apiConfigurationsConfigurationModel2['default'].find({}).removeAsync().then(function () {
  _apiConfigurationsConfigurationModel2['default'].create(defaultConfig.configurations, function (err, res) {
    if (err) {} else {
      _apiConfigurationsConfigurationModel2['default'].find({}).then(function (res) {
        console.log(res);
        var config = {};
        for (var idx = 0; idx < res.length; idx++) {
          var conf = res[idx];
          if (conf.active) {
            config[conf.name] = conf.value;
          }
        }
        GLOBAL.config = config;
        console.log("Config Initialized!");
      })['catch'](console.log("Error in fetching configurations"));
    }
  });
});

_apiUserUserModel2['default'].find({}).removeAsync().then(function () {
  _apiUserUserModel2['default'].createAsync(defaultConfig.users).then(function () {
    console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
