/**
 * Main application routes
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _componentsErrors = require('./components/errors');

var _componentsErrors2 = _interopRequireDefault(_componentsErrors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var swaggerJSDoc = require('swagger-jsdoc');

exports['default'] = function (app) {
  // Insert routes below
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.use('/api/things', require('./api/thing'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/gameRounds', require('./api/gameRound'));
  app.use('/api/wallet', require('./api/wallet'));

  var options = {
    swaggerDefinition: {
      info: {
        title: 'Game Server Platform', // Title (required)
        version: '1.0.0' }
    },
    // Version (required)
    apis: ['./routes.js'] };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  // Path to the API docs
  var swaggerSpec = swaggerJSDoc(options);
  app.get('/api/docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_componentsErrors2['default'][404]);

  // All other routes should redirect to the index.html
  app.route('/docs').get(function (req, res) {
    res.sendFile(_path2['default'].resolve(app.get('appPath') + '/swagger-ui/index.html'));
  });

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2['default'].resolve(app.get('appPath') + '/index.html'));
  });
};

module.exports = exports['default'];
//# sourceMappingURL=routes.js.map
