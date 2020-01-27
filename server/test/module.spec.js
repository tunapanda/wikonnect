const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const { headersSuperAdmin1, headerBasicUser2 } = require('./_tokens');

const expect = chai.expect;
const assert = chai.assert;

chai.should();
chai.use(chaiHttp);

const moduleRoute = '/api/v1/modules';

// it('', done => { chai.request().post().set().send().end((err, res) => { done(); }) });

describe('modules route and function test', () => {
  it('GET all MODULES with valid token and show user progress', done => {
    chai
      .request(server)
      .get(moduleRoute)
      .set(headersSuperAdmin1)
      .end((err, res) => {
        res.should.be.json;
        res.body.modules[0].should.have.property('creatorId');
        res.body.modules[0].should.have.property('progress');
        res.body.modules[0].should.have.property('lessons');
        done();
      });
  });
  it('GET all MODULES as anonymous user', done => {
    chai
      .request(server)
      .get(moduleRoute)
      .end((err, res) => {
        res.should.be.json;
        res.should.be.json;
        res.body.modules[0].should.have.property('creatorId');
        res.body.modules[0].should.have.property('lessons');
        done();
      });
  });
});
