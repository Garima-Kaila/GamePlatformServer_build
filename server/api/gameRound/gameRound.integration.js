'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var app = require('../..');

var newGameRound;

describe('GameRound API:', function () {

  describe('GET /api/gameRounds', function () {
    var gameRounds;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/gameRounds').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        gameRounds = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(gameRounds).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/gameRounds', function () {
    beforeEach(function (done) {
      (0, _supertest2['default'])(app).post('/api/gameRounds').send({
        name: 'New GameRound',
        info: 'This is the brand new thing!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newGameRound = res.body;
        done();
      });
    });

    it('should respond with the newly created thing', function () {
      expect(newGameRound.name).to.equal('New GameRound');
      expect(newGameRound.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/gameRounds/:id', function () {
    var thing;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/gameRounds/' + newGameRound._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
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
      expect(thing.name).to.equal('New GameRound');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/gameRounds/:id', function () {
    var updatedGameRound;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).put('/api/gameRounds/' + newGameRound._id).send({
        name: 'Updated GameRound',
        info: 'This is the updated thing!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedGameRound = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedGameRound = {};
    });

    it('should respond with the updated thing', function () {
      expect(updatedGameRound.name).to.equal('Updated GameRound');
      expect(updatedGameRound.info).to.equal('This is the updated thing!!!');
    });
  });

  describe('DELETE /api/gameRounds/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/gameRounds/' + newGameRound._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when thing does not exist', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/gameRounds/' + newGameRound._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=gameRound.integration.js.map
