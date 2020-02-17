const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const tokens = require('./_tokens');


chai.should();
chai.use(chaiHttp);

const moduleRoute = '/api/v1/modules/';
const moduleId = 'testingModule1';
const postData = {
  'module': {
    'id': moduleId,
    'name': 'A Module',
    'slug': 'a-module-1',
    'description': 'Contains Lessons.',
    'status': 'published',
    'creatorId': 'user3',
    'lessons': ['basics1', 'basics2']
  },
};

const putData = {
  'module': {
    'name': 'PUT update works',
    'lessons': ['basics3']

  },
};

// it('', done => { chai.request().post().set().send().end((err, res) => { done(); }); });

describe('modules route and function test', () => {
  it('GET all MODULES with valid token and show user progress', done => {
    chai
      .request(server)
      .get(moduleRoute)
      .set(tokens.headersSuperAdmin1)
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
        res.body.modules[0].should.have.property('creatorId');
        res.body.modules[0].should.have.property('lessons');
        done();
      });
  });

  it('POST data with correct credentials', done => {
    chai
      .request(server)
      .post(moduleRoute)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send(postData)
      .end((err, res) => {
        res.should.be.json;
        console.log(res.body, postData, moduleRoute);
        res.body.modules[0].should.have.property('creatorId');
        res.body.modules[0].should.have.property('lessons');
        done();
      });
  });
  it('PUT module data with correct credentials', done => {
    chai
      .request(server)
      .put(moduleRoute + moduleId)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(putData)
      .end((err, res) => {
        res.should.be.json;
        res.body.module.should.have.property('creatorId');
        done();
      });
  });
  it('Throw error on PUT with wrong credentials', done => {
    chai
      .request(server)
      .post(moduleRoute)
      .set('Content-Type', 'application/json')
      .send(postData)
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });
  it('Throw error on PUT with wrong credentials', done => {
    chai
      .request(server)
      .put(moduleRoute + moduleId)
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(401);
        res.body.name.should.eql('AccessControlError');
        done();
      });
  });


});
