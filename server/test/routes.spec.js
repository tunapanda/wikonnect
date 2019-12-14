const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;

chai.should();
chai.use(chaiHttp);

const lessonRoute = '/api/v1/lessons/';
const lessonID = 'basics3';
const lessonData = {
  lesson: {
    'id': 'lesson11',
    'name': 'Testing Lessons Path',
    'slug': 'testing-lesson-path',
    'description': 'Testing organization of the courses.',
    'status': 'published',
    'creatorId': 'user1'
  }
};

const putData = {
  lesson: {
    'name': 'PUT update works',
  }
};

const invalidData = {
  lesson: {
    'id': 'lesson_path10',
    'name': 'Testing Learning Path',
    'slug': 'testing-lesson-path',
    'description': 'Testing organization of the courses.',
    'status': 'draft'
  }
};


const activityRoute = '/api/v1/activity/';
const activityID = 'activity1';
const activityData = {
  activity: {
    'id': 'activity44',
    'userId': 'user1',
    'chapterId': 'chapter1',
    'status': 'active',
    'progress': '54'
  }
};
/**
 * Test lessonRoutes
 * -- lessons
 * -- activity
 * -- achievements
 * -- modules
 *
 * Seed the test lessonDatabase
 *
 */

describe('LESSONS ROUTE', () => {
  // Failing tests
  it('Should throw an ERROR on POST with invalid lessonData', done => {
    chai
      .request(server)
      .post(lessonRoute)
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
      .put(lessonRoute + lessonID + '1')
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
      .get(lessonRoute + '?slug=a-something-else')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.lesson.length, 0);
        done();
      });
  });
  it('Should throw an ERROR on GET req using invalid key QUERY', done => {
    chai
      .request(server)
      .get(lessonRoute + '?wishbone=a-lesson-path')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.eql('The query key does not exist');
        done();
      });
  });
  // Passing tests
  it('Should CREATE a lesson-path record on POST with valid lessonData and return a JSON object', done => {
    chai
      .request(server)
      .post(lessonRoute)
      .set('Content-Type', 'application/json')
      .send(lessonData)
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
      .get(lessonRoute)
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
  it('Should list ONE lesson-path item on GET using QUERY', done => {
    chai
      .request(server)
      .get(lessonRoute + '?slug=a-lesson')
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
      .get(lessonRoute + lessonID)
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
      .put(lessonRoute + lessonID)
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
      .delete(lessonRoute + lessonID)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('lesson');
        done();
      });
  });
});





/**
 * ACTIVITY ROUTES TESTS
 */
describe('ACTIVITY ROUTE', () => {
  // Failing tests
  it('Should throw an ERROR on POST with invalid activityData', done => {
    chai
      .request(server)
      .post(activityRoute)
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
      .put(activityRoute + activityID + '1')
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
      .get(activityRoute + '?chapterId=chapt')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.activity.length, 0);
        done();
      });
  });
  it('Should throw an ERROR on GET req using invalid key QUERY', done => {
    chai
      .request(server)
      .get(activityRoute + '?wishbone=a-lesson-path')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.eql('The query key does not exist');
        done();
      });
  });
  // Passing tests
  it('Should CREATE an activity record on POST with valid activityData and return a JSON object', done => {
    chai
      .request(server)
      .post(activityRoute)
      .set('Content-Type', 'application/json')
      .send(activityData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        done();
      });
  });
  it('Should list ALL activity records on GET', done => {
    chai
      .request(server)
      .get(activityRoute)
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
      .get(activityRoute + '?chapterId=chapter1')
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
      .get(activityRoute + activityID)
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
      .put(activityRoute + activityID)
      .set('Content-Type', 'application/json')
      .send({ activity: { 'userId': 'user3' } })
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.activity.userId.should.eql('user3');
        done();
      });
  });
  it('Should DELETE a activity record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(activityRoute + activityID)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('activity');
        done();
      });
  });
});
