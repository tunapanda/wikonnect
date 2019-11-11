const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');
const knex = require('../db/db');

chai.should();
chai.use(chaiHttp);

const userId = 'user99';
const registerUser = {
  'user': {
    'id': userId,
    'username': 'user99',
    'password': 'tunapanda',
    'email': 'user99@wikonnect.com'
  }
};

const loginUserData = {
  'username': userId,
  'email': 'user99@wikonnect.com',
  'password': 'tunapanda'
};

const badUserData = {
  'user': {
    'id': userId,
    'username': 'user99',
    'password': 'tunapanda'
  }
};

describe('authentication routes', () => {
  before(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });
  describe('Auth routes tests: /api/v1/users/', () => {

    it('Should create user on POST requests', done => {
      chai
        .request(server)
        .post('/api/v1/users/')
        .set('Content-Type', 'application/json')
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.user.should.have.property('id');
          res.body.user.should.have.property('username');
          res.body.user.should.have.property('email');
          done();
        });
    });
    it('Should get ALL userers on GET requests', done => {
      chai
        .request(server)
        .get('/api/v1/users/')
        .set('Content-Type', 'application/json')
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.user[0].should.have.property('id');
          res.body.user[1].should.have.property('username');
          res.body.user[2].should.have.property('email');
          done();
        });
    });

    it('Should throw an ERROR for POST requests with bad/malformed data', done => {
      chai
        .request(server)
        .post('/api/v1/users/')
        .send(badUserData)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.errors).to.deep.equal({ 'email': ['Email can\'t be blank'], 'phonenumber': ['Phonenumber can\'t be blank'] });
          expect(res.body.errors).to.have.property('email').with.lengthOf(1);
          expect(res.body.errors).to.have.property('phonenumber').with.lengthOf(1);
          done();
        });
    });

    it('Should throw an ERROR on POST data if user already exists', done => {
      chai
        .request(server)
        .post('/api/v1/users/')
        .send(registerUser)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(406);
          expect(res.body).to.deep.equal({ 'error': 'User exists' });
          done();
        });
    });
  });

  describe('Auth routes tests: /api/v1/auth/', () => {

    it('Should login a valid user on POST and return token', done => {
      chai
        .request(server)
        .post('/api/v1/auth/')
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
        .post('/api/v1/auth/')
        .set('Content-Type', 'application/json')
        .send({ 'username': 'urlencoded', 'hash': 'urlencodedurl' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
