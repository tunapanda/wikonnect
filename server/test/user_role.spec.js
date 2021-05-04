const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');

const server = require('../index');
const tokens = require('./_tokens');

chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();

const route = '/api/v1/userRole';

describe('USER ROLE ROUTE', () => {

  it('Should grant superadmin access to all user roles', done => {
    chai
      .request(server)
      .get(route)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.user_role[0].should.have.property('userId');
        res.body.user_role[0].should.have.property('groupId');
        done();
      });
  });

  it('Should grant admin access to all user roles', done => {
    chai
      .request(server)
      .get(route)
      .set(tokens.headerAdminUser)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.user_role[0].should.have.property('userId');
        res.body.user_role[0].should.have.property('groupId');
        done();
      });
  });
  it('Should deny access for permissions that are not admin and superadmin', done => {
    chai
      .request(server)
      .get(route)
      .set(tokens.headerBasicUser2)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(400);
        res.body.errors[0].should.eq('Access denied');
        done();
      });
  });
  it('Should get logged in users details', done => {
    chai
      .request(server)
      .get(`${route}/me`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.user_role[0].should.have.property('userId');
        done();
      });
  });
  it('Should get logged in users details', done => {
    chai
      .request(server)
      .get(`${route}/current`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.user_role[0].should.have.property('userId');
        done();
      });
  });
  it('Should update user role', done => {
    chai
      .request(server)
      .put(`${route}/user1`)
      .set('Content-Type', 'application/json')
      .send({ 'user_role': { 'group_id': 'groupAdmin' }})
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.user_role[0].should.have.property('userId');
        res.body.user_role[0].groupId.should.eq('groupAdmin');
        done();
      });
  });
});