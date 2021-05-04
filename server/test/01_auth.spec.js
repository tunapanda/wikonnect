const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');
const knex = require('../db/db');
const tokens = require('./_tokens');

chai.should();
chai.use(chaiHttp);

const usersRoute = '/api/v1/users/';
const authRoute = '/api/v1/auth/';
const userId = 'user9';
const registerUser = {
  'user': {
    'id': userId,
    'username': userId,
    'password': 'tunapanda',
    'email': 'user1@wikonnect.com'
  }
};

const loginUserData = {
  'username': 'user9',
  'email': 'user9@wikonnect.com',
  'password': 'tunapanda',
  'role': 'admin'
};

describe('AUTHENTICATION ROUTES', () => {

  before(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });
  describe('Auth routes tests: /api/v1/users/', () => {
    it('Should create user on POST requests', done => {
      chai
        .request(server)
        .post(usersRoute)
        .set('Content-Type', 'application/json')
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.user.should.have.property('id');
          res.body.user.should.have.property('username');
          done();
        });
    });
    it('Should throw an ERROR on POST data if user already exists', done => {
      chai
        .request(server)
        .post(usersRoute)
        .send(registerUser)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should login a valid user on POST and return token', done => {
      chai
        .request(server)
        .post(authRoute)
        .set('Content-Type', 'application/json')
        .send(loginUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
    it('Should throw an ERROR on POST with invalid user data', done => {
      chai
        .request(server)
        .post(authRoute)
        .set('Content-Type', 'application/json')
        .send({ 'username': 'urlencoded', 'hash': 'urlencodedurl' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should throw an unauthorized error on GET ALL users requests', done => {
      chai
        .request(server)
        .get(usersRoute)
        .set('Content-Type', 'application/json')
        .set(tokens.headerBasicUser2)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should get ONE user on GET requests using PARAMS', done => {
      chai
        .request(server)
        .get(usersRoute + userId)
        .set('Content-Type', 'application/json')
        .set(tokens.headersSuperAdmin1)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should throw an error is /:id does not match the stored user data', done => {
      chai
        .request(server)
        .get(usersRoute + '?id=' + userId)
        .set('Content-Type', 'application/json')
        .set(tokens.headerBasicUser2)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should return a user if the /:id matches stored user data ', done => {
      chai
        .request(server)
        .get(usersRoute + userId)
        .set('Content-Type', 'application/json')
        .set(tokens.headersSuperAdmin1)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.user).not.have.property('password');
          expect(res.body.user).not.have.property('hash');
          expect(res.body.user).to.have.property('id');
          done();
        });
    });
  });
});
