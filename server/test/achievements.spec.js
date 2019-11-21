const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;


chai.should();
chai.use(chaiHttp);

const achievementRoute = '/api/v1/achievements/';
const achievementID = 'achievements1';
const achievementData = {
  'id': 'achievements8',
  'name': 'achievements testing record',
  'slug': 'achievements-one',
  'description': 'achievements one, achievements, achievements one',
  'activity_id': 'activity1',
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
        res.body.message.should.eql('That achievement does not exist');
        done();
      });
  });
  it('Should throw an ERROR on GET req using valid key and invalid query', done => {
    chai
      .request(server)
      .get(achievementRoute + '?activity_id=chapt')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.achievement.length, 0);
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
  it('Should CREATE an achievement record on POST with valid achievementData and return a JSON object', done => {
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
  it('Should list ALL achievement records on GET', done => {
    chai
      .request(server)
      .get(achievementRoute)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.achievement[0].should.have.property('id');
        res.body.achievement[0].should.have.property('activityId');
        res.body.achievement[0].should.have.property('description');
        done();
      });
  });
  it('Should list ONE achievement records item on GET using QUERY', done => {
    chai
      .request(server)
      .get(achievementRoute + '?activity_id=activity1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.achievement[0].should.have.property('id');
        res.body.achievement[0].should.have.property('activityId');
        res.body.achievement[0].should.have.property('description');
        done();
      });
  });
  it('Should list ONE achievement records item on GET using PARAMS', done => {
    chai
      .request(server)
      .get(achievementRoute + achievementID)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.achievement.should.have.property('id');
        res.body.achievement.should.have.property('activityId');
        res.body.achievement.should.have.property('description');
        done();
      });
  });
  it('Should UPDATE an achievement records record on PUT', done => {
    chai
      .request(server)
      .put(achievementRoute + achievementID)
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.achievement.name.should.eql('PUT update works');
        done();
      });
  });
  it('Should DELETE a achievement record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(achievementRoute + achievementID)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('achievement');
        done();
      });
  });
});