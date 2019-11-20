const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;
const config = require('../knexfile.js')['test'];
const knex = require('knex')(config);


chai.should();
chai.use(chaiHttp);

const route = '/api/v1/lessons/';
const itemID = 'basics3';
const data = {
  'id': 'lesson11',
  'name': 'Testing Lessons Path',
  'slug': 'testing-lesson-path',
  'description': 'Testing organization of the courses.',
  'status': 'published',
  'creator_id': 'user1'
};

const putData = {
  'name': 'PUT update works',
};

const invalidData = {
  'id': 'lesson_path10',
  'name': 'Testing Learning Path',
  'slug': 'testing-lesson-path',
  'description': 'Testing organization of the courses.',
  'status': 'draft'
};

/**
 * Test routes
 * -- lessons
 * -- activity
 * -- achievements
 * -- modules
 *
 * Seed the test database
 *
 */


describe('DATABASE SETUP', () => {
  before(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });
});

describe('LESSONS ROUTE', () => {
  // Failing tests
  it('Should throw an ERROR on POST with invalid data', done => {
    chai
      .request(server)
      .post(route)
      .set('Content-Type', 'application/json')
      .send(invalidData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('creator_id');
        done();
      });
  });
  it('Should throw an ERROR on PUT with invalid path', done => {
    chai
      .request(server)
      .put(route + itemID + '1')
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.message.should.eql('That lesson path does not exist');
        done();
      });
  });
  it('Should throw an ERROR on GET req using valid key and invalid query', done => {
    chai
      .request(server)
      .get(route + '?slug=a-something-else')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.lesson.length, 0);
        done();
      });
  });
  it('Should throw an ERROR on GET req using invalid key QUERY', done => {
    chai
      .request(server)
      .get(route + '?wishbone=a-lesson-path')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.eql('The query key does not exist');
        done();
      });
  });
  // Passing tests
  it('Should CREATE a lesson-path record on POST with valid data and return a JSON object', done => {
    chai
      .request(server)
      .post(route)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.should.have.property('lesson');
        done();
      });
  });
  it('Should list ALL lesson-paths on GET', done => {
    chai
      .request(server)
      .get(route)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.lesson[0].should.have.property('id');
        res.body.lesson[0].should.have.property('name');
        res.body.lesson[0].should.have.property('slug');
        res.body.lesson[0].should.have.property('creatorId');
        // res.body.lesson[0].should.have.property('courses');
        // res.body.lesson[0].courses[0].should.have.property('id');

        done();
      });
  });
  it('Should list ONE lesson-path item on GET using QUERY', done => {
    chai
      .request(server)
      .get(route + '?slug=a-lesson')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.lesson[0].should.have.property('id');
        res.body.lesson[0].should.have.property('name');
        res.body.lesson[0].should.have.property('slug');
        res.body.lesson[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should list ONE lesson-paths item on GET using PARAMS', done => {
    chai
      .request(server)
      .get(route + itemID)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.lesson.should.have.property('id');
        res.body.lesson.should.have.property('name');
        res.body.lesson.should.have.property('slug');
        res.body.lesson.should.have.property('creatorId');
        done();
      });
  });
  it('Should UPDATE a lesson-path record on PUT', done => {
    chai
      .request(server)
      .put(route + itemID)
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.lesson.name.should.eql('PUT update works');
        done();
      });
  });
  it('Should DELETE a lesson-path record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(route + itemID)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('lesson');
        done();
      });
  });
});

