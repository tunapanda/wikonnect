const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;
const tokens = require('./_tokens');



chai.should();
chai.use(chaiHttp);

const route = '/api/v1/paths/';
const itemID = 'learning_path10';
const data = {
  learningPath: {
    'id': itemID,
    'name': 'Testing Learning Path',
    'slug': 'testing-learning-path',
    'description': 'Testing organization of the courses.',
    'status': 'published',
    'creatorId': 'user3'
  }
};

const putData = {
  learningPath: {
    'name': 'PUT update works',
  }
};

const invalidPutData ={
  learningPath:{
    creator_id : 'pub'
  }
};
const invalidData = {
  learningPath: {
    'id': 'learning_path11',
    'name': 'Testing Learning Path',
    'slug': 'testing-learning-path',
    'description': 'Testing organization of the courses.',
    'status': 'draft'
  }
};

/**
 *
 */

describe('LEARNING PATH ROUTE', () => {
  // Failing tests

  // Passing tests
  it('Should CREATE a learning-path record on POST with valid data and return a JSON object', done => {
    chai
      .request(server)
      .post(route)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(data)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.should.have.property('learningpath');
        done();
      });
  });
  it('Should list ALL learning-paths on GET', done => {
    chai
      .request(server)
      .get(route)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.learningpath[0].should.have.property('id');
        res.body.learningpath[0].should.have.property('name');
        res.body.learningpath[0].should.have.property('slug');
        res.body.learningpath[0].should.have.property('creatorId');
        res.body.learningpath[0].should.have.property('courses');
        res.body.learningpath[0].courses[0].should.have.property('id');

        done();
      });
  });
  it('Should list ONE learning-paths item on GET using QUERY', done => {
    chai
      .request(server)
      .get(route + '?slug=a-learning-path')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.learningpath[0].should.have.property('id');
        res.body.learningpath[0].should.have.property('name');
        res.body.learningpath[0].should.have.property('slug');
        res.body.learningpath[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should list ONE learning-paths item on GET using PARAMS', done => {
    chai
      .request(server)
      .get(route + itemID)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.learningpath.should.have.property('id');
        res.body.learningpath.should.have.property('name');
        res.body.learningpath.should.have.property('slug');
        res.body.learningpath.should.have.property('creatorId');
        done();
      });
  });
  it('Should UPDATE a learning-path record on PUT', done => {
    chai
      .request(server)
      .put(route + itemID)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.learningpath.name.should.eql('PUT update works');
        done();
      });
  });
  it('Should throw an ERROR on POST with invalid data', done => {
    chai
      .request(server)
      .post(route)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(invalidData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.errors[0].should.eql('Bad Request');
        done();
      });
  });
  it('Should throw an ERROR on PUT with invalid path', done => {
    chai
      .request(server)
      .put(route + 'learning-pathrr')
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(invalidPutData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.errors[0].should.eql('That learning path does not exist');
        done();
      });
  });
  it('Should throw an ERROR on GET req using valid key and invalid query', done => {
    chai
      .request(server)
      .get(route + '?slug=a-learning')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.learningpath.length, 0);
        done();
      });
  });
  it('Should throw an ERROR on GET req using invalid key QUERY', done => {
    chai
      .request(server)
      .get(route + '?wishabone=a-learning-path')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.eql('The query key does not exist');
        done();
      });
  });
  it('Should DELETE a learning-path record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(route + itemID)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('learningpath');
        done();
      });
  });
});
