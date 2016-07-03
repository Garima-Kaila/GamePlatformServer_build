'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _constants = require('../../constants');

var _constants2 = _interopRequireDefault(_constants);

// Development specific configuration
// ==================================
module.exports = {
    things: [{
        name: 'Development',
        info: 'Its is a development environment deployment'
    }],
    configurations: [{
        name: _constants2['default'].configurationKeys.gameServerUrl,
        description: "Url of game execution server",
        value: "http://localhost:9001",
        active: true
    }, {
        name: _constants2['default'].configurationKeys.gameClientHost,
        description: "Game static content host server",
        value: "http://localhost:9080",
        active: true
    }, {
        name: _constants2['default'].configurationKeys.defaultCurrency,
        description: "Default currency of the this Casino",
        value: "EURO",
        active: true
    }, {
        name: _constants2['default'].configurationKeys.defaultBalanceForDemoPlay,
        description: "Default balance credited for demo play",
        value: 5000,
        active: true
    }],
    games: [{
        name: "Slot",
        gameId: "Slot_Server",
        variant: "desktop",
        active: true
    }, {
        name: "JackOrBetter",
        gameId: "JackOrBetter_Server",
        variant: "desktop",
        active: true
    }],
    users: [{
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin'
    }]
};
//# sourceMappingURL=development.js.map
