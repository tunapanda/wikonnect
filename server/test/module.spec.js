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
    'lessons': ['basics3', 'basics4']
  },
};

// it('', done => { chai.request().post().set().send().end((err, res) => { done(); }); });

describe('MODULES route', () => {
  it('should GET all MODULES with valid token and show user progress', done => {
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
  it('Should GET all MODULES as anonymous user', done => {
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

  it('should POST data with correct credentials', done => {
    chai
      .request(server)
      .post(moduleRoute)
      .set(tokens.headerAdminUser)
      .set('Content-Type', 'application/json')
      .send(postData)
      .end((err, res) => {
        res.should.be.json;
        res.body.modules.should.have.property('creatorId');
        res.body.modules.should.have.property('slug');
        res.body.modules.id.should.eql(moduleId);
        done();
      });
  });
  it('should Throw error on PUT with missing token', done => {
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
  it('should Throw error on PUT with broken token', done => {
    chai
      .request(server)
      .put(moduleRoute + moduleId)
      .set('Content-Type', 'application/json')
      .set(tokens.brokenToken)
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.body.errors[0].should.eql('Bad Request');
        done();
      });
  });
  it('should PUT module data with correct credentials', done => {
    chai
      .request(server)
      .put(moduleRoute + moduleId)
      .set('Content-Type', 'application/json')
      .set(tokens.headerAdminUser)
      .send(putData)
      .end((err, res) => {
        res.should.be.json;
        res.body.modules.should.have.property('creatorId');
        res.body.modules.should.have.property('permissions');
        done();
      });
  });
  it('Should throw an error on delete using wrong id param on route', done => {
    chai
      .request(server)
      .delete(moduleRoute + 'testingModule2')
      .set('Content-Type', 'application/json')
      .set(tokens.headerAdminUser)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.errors[0].should.eql('Bad Request');
        done();
      });
  });

  it('Should DELETE and return deleted module record on DELETE /:id', done => {
    chai
      .request(server)
      .delete(moduleRoute + moduleId)
      .set('Content-Type', 'application/json')
      .set(tokens.headerAdminUser)
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.modules.should.have.property('creatorId');
        res.body.modules.should.have.property('description');
        done();
      });
  });
});
