const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const knex = require('../db/db');
const jwt = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');


chai.should();
chai.use(chaiHttp);

const routePath = '/api/v1/paths/';
const pathId = 'learningpath5';
const routeCourseData = {
  learningPath:{
    id: pathId,
    name: 'A Path 5',
    slug: 'a-path-5',
    description: 'Contains courses.',
    status: 'published',
    creatorId: 'user1',
  }
};

const basicUser1 = {
  'user': {
    'id': 'user99',
    'username': 'user99',
    'password': 'tunapanda',
    'email': 'user99@wikonnect.com',
    'role': 'superadmin'
  }
};

const basicUser2 = {
  'user': {
    'id': 'user2',
    'username': 'user2',
    'password': 'tunapanda',
    'email': 'user99@wikonnect.com'
  }
};
const headersSuperAdmin1 = {
  'Authorization': 'Bearer ' + jwt.sign({ data: basicUser1.user}, secret, { expiresIn: '30d' })
};
const headersAdmin1 = {
  'Authorization': 'Bearer ' + jwt.sign({ data: basicUser1.user, role: 'admin' }, secret, { expiresIn: '30d' })
};
const headersAdmin2 = {
  'Authorization': 'Bearer ' + jwt.sign({ data: basicUser1.user, role: 'admin' }, secret, { expiresIn: '30d' })
};
const headerBasicUser2 = {
  'Authorization': 'Bearer ' + jwt.sign({ data: basicUser2.user, role: 'basic' }, secret, { expiresIn: '30d' })
};

describe('Learning Path with Access Control', () => {

  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex.seed.run();
  });

  it('Should create a learningPath with user as author', done => {
    chai
      .request(server)
      .post(routePath)
      .set('Content-Type', 'application/json')
      .set(headersAdmin1)
      .send(routeCourseData)
      .end((err, res) => {
        done();
      });
  });
  it('Should return { read:true, update:true, create:true, delete:false} if user == author(headersAdmin1)', done => {
    chai
      .request(server)
      .get(routePath + pathId)
      .set('Content-Type', 'application/json')
      .set(headersAdmin1)
      .end((err, res) => {
        done();
      });
  });
  it('Should return { read:true, update:false, create:false, delete:false} if user != author(headersAdmin1)', done => {
    chai
      .request(server)
      .get(routePath + pathId)
      .set('Content-Type', 'application/json')
      .set(headersAdmin2)
      .end((err, res) => {
        done();
      });
  });
  it('Should return { read:true, update:true, create:true, delete:true} if user == superAdmin', done => {
    chai
      .request(server)
      .get(routePath + pathId)
      .set('Content-Type', 'application/json')
      .set(headersSuperAdmin1)
      .end((err, res) => {
        done();
      });
  });
});
