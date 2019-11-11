const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

const route = '/api/v1/course';
const itemID = '/course10';
const data = {
  'id': 'course10',
  'name': 'Testing Course Path',
  'slug': 'source-learning-path',
  'description': 'Colection of modules.',
  'status': 'published',
  'creator_id': 'user3'
};

const putData = {
  'name': 'PUT update works',
};

const invalidData = {
  'id': 'course10',
  'name': 'Testing Course Path',
  'slug': 'source-learning-path',
  'description': 'Colection of modules.',
  'status': 'published',
};

describe('routes: course', () => {
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
        res.body.errors.should.have.property('creator_id');
        done();
      });
  });
  it('Should throw an ERROR on PUT with invalid path', done => {
    chai
      .request(server)
      .put(route + itemID)
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.message.should.eql('That course does not exist');
        done();
      });
  });
  // Passing tests
  it('Should CREATE a learning-path record on POST with valid data and return a JSON object', done => {
    chai
      .request(server)
      .post(route)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.should.have.property('course');
        done();
      });
  });
  it('Should list ALL learning-paths on GET', done => {
    chai
      .request(server)
      .get(route)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.course[0].should.have.property('id');
        res.body.course[0].should.have.property('name');
        res.body.course[0].should.have.property('slug');
        res.body.course[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should list ONE learning-paths item on GET', done => {
    chai
      .request(server)
      .get(route + itemID)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.course[0].should.have.property('id');
        res.body.course[0].should.have.property('name');
        res.body.course[0].should.have.property('slug');
        res.body.course[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should UPDATE a learning-path record on PUT', done => {
    chai
      .request(server)
      .put(route + itemID)
      .set('Content-Type', 'application/json')
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.course.name.should.eql('PUT update works');
        done();
      });
  });
  it('Should DELETE a learning-path record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(route + itemID)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        res.body.should.have.property('course');
        done();
      });
  });
});
