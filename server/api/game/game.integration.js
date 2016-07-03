'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var app = require('../..');

var newGame;

describe('Game API:', function () {

  describe('GET /api/games', function () {
    var games;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/games').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        games = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(games).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/games', function () {
    beforeEach(function (done) {
      (0, _supertest2['default'])(app).post('/api/games').send({
        name: 'New Game',
        info: 'This is the brand new thing!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newGame = res.body;
        done();
      });
    });

    it('should respond with the newly created thing', function () {
      expect(newGame.name).to.equal('New Game');
      expect(newGame.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/games/:id', function () {
    var thing;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/games/' + newGame._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        thing = res.body;
        done();
      });
    });

    afterEach(function () {
      thing = {};
    });

    it('should respond with the requested thing', function () {
      expect(thing.name).to.equal('New Game');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/games/:id', function () {
    var updatedGame;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).put('/api/games/' + newGame._id).send({
        name: 'Updated Game',
        info: 'This is the updated thing!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedGame = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedGame = {};
    });

    it('should respond with the updated thing', function () {
      expect(updatedGame.name).to.equal('Updated Game');
      expect(updatedGame.info).to.equal('This is the updated thing!!!');
    });
  });

  describe('DELETE /api/games/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/games/' + newGame._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when thing does not exist', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/games/' + newGame._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=game.integration.js.map
