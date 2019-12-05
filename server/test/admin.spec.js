const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');
const knex = require('../db/db');

chai.should();
chai.use(chaiHttp);

const usersRoute = '/api/v1/users/';
const authRoute = '/api/v1/auth/';
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

const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoidXNlcjk5NiIsImVtYWlsIjoidXNlcjk5NkB3aWtvbmVjdC5jb20iLCJ1c2VybmFtZSI6InVzZXI5OTYiLCJsYXN0U2VlbiI6bnVsbCwibGFzdElwIjpudWxsLCJtZXRhZGF0YSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOS0xMS0yOFQxMToxMzowOS4yMzZaIiwidXBkYXRlZEF0IjoiMjAxOS0xMS0yOFQxMToxMzowOS4yMzZaIn0sInJvbGUiOiJiYXNpYyIsImV4cCI6MTU3NTU1MDAxMSwiaWF0IjoxNTc0OTQ1MjExfQ.9BLqsUIyPWKtyd7RUHGKCh1duHFKORuS-15qcalc390'
};

describe('AUTHENTICATION ROUTES', () => {

  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex.seed.run();
  });

  // it('Should get ALL users on GET requests', done => {
  //   chai
  //     .request(server)
  //     .get(usersRoute)
  //     .set('Content-Type', 'application/json')
  //     .set(headers)
  //     .send(registerUser)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.user[0].should.have.property('id');
  //       res.body.user[1].should.have.property('username');
  //       res.body.user[2].should.have.property('email');
  //       done();
  //     });
  // });
});
