const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;
const config = require('../knexfile.js')['test'];
const knex = require('knex')(config);


chai.should();
chai.use(chaiHttp);

const achievementRoute = '/api/v1/lessons/';
const achievementID = 'basics3';
const achievementData = {
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


describe('DATABASE SETUP', () => {
  before(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });
});

/**
 * ACHIEVEMENT ROUTES TESTS
 */
describe('ACHIEVEMENT ROUTE', () => {
  // Failing tests
  it('Should throw an ERROR on POST with invalid achievementData', done => {
    chai
      .request(server)
      .post(achievementRoute)
      .set('Content-Type', 'application/json')
      .send(invalidData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
  });
  it('Should throw an ERROR on PUT with invalid path', done => {
    chai
      .request(server)
      .put(achievementRoute + achievementID + '1')
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.message.should.eql('That activity path does not exist');
        done();
      });
  });
  it('Should throw an ERROR on GET req using valid key and invalid query', done => {
    chai
      .request(server)
      .get(achievementRoute + '?chapter_id=chapt')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.activity.length, 0);
        done();
      });
  });
  it('Should throw an ERROR on GET req using invalid key QUERY', done => {
    chai
      .request(server)
      .get(achievementRoute + '?wishbone=a-lesson-path')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.eql('The query key does not exist');
        done();
      });
  });
  // Passing tests
  it('Should CREATE an activity record on POST with valid achievementData and return a JSON object', done => {
    chai
      .request(server)
      .post(achievementRoute)
      .set('Content-Type', 'application/json')
      .send(achievementData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        done();
      });
  });
  it('Should list ALL activity records on GET', done => {
    chai
      .request(server)
      .get(achievementRoute)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.activity[0].should.have.property('id');
        res.body.activity[0].should.have.property('status');
        res.body.activity[0].should.have.property('progress');
        done();
      });
  });
  it('Should list ONE activity records item on GET using QUERY', done => {
    chai
      .request(server)
      .get(achievementRoute + '?chapter_id=chapter1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.activity[0].should.have.property('id');
        res.body.activity[0].should.have.property('userId');
        res.body.activity[0].should.have.property('chapterId');
        done();
      });
  });
  it('Should list ONE activity records item on GET using PARAMS', done => {
    chai
      .request(server)
      .get(achievementRoute + achievementID)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.activity.should.have.property('id');
        res.body.activity.should.have.property('userId');
        res.body.activity.should.have.property('chapterId');
        done();
      });
  });
  it('Should UPDATE a activity records record on PUT', done => {
    chai
      .request(server)
      .put(achievementRoute + achievementID)
      .set('Content-Type', 'application/json')
      .send({ 'user_id': 'user3' })
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.activity.user_id.should.eql('user3');
        done();
      });
  });
  it('Should DELETE a activity record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(achievementRoute + achievementID)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('activity');
        done();
      });
  });
});