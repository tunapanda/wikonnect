const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');
const server = require('../index');
const tokens = require('./_tokens');

chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();

const route = '/api/v1/chapters/';
const itemID = 'chapter19';
const data = {
  chapter: {
    'id': itemID,
    'name': 'Testing chapter Path',
    'description': 'Testing chapter route',
    'status': 'published',
    'tags': ['primary'],
    'createdAt': '2017-12-20T16:17:10.000Z',
    'updatedAt': '2017-12-20T16:17:10.000Z',
    'contentType': 'h5p',
    'contentUri': '/uploads/h5p/chapter1',
    'imageUrl': null,
    'contentId': null,
    'approved': false,
  }
};

const putData = {
  chapter: {
    'name': 'PUT update works',
    'description': 'PUT update works',
    'verified': true
  }
};

const invalidData = {
  'chapter': {
    'id': 'chapter778',
    'name': 'Testing Chapter Route',
    'slug': 'testing-chapter-route',
    'description': 'Testing chapter route',
    'status': 'draft',
    'approved': 'testing-chapter-route'
  }
};

const userComment = {
  'comment': {
    'comment': 'testing comment',
    'metadata': '',
    'chapterId': itemID
  }
};

describe('CHAPTER ROUTE', () => {

  // Passing tests
  it('Should CREATE a chapter record on POST with valid data and return a JSON object', done => {
    chai
      .request(server)
      .post(route)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.should.have.property('chapter');
        done();
      });
  });
  // comments tests
  it('Should POST a comment on POST /comments and return a JSON object', done => {
    chai
      .request(server)
      .post('/api/v1/comments')
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send(userComment)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        done();
      });
  });
  it('Should list ALL chapter on GET', done => {
    chai
      .request(server)
      .get(route)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.chapters[0].should.have.property('id');
        res.body.chapters[0].should.have.property('name');
        res.body.chapters[0].should.have.property('slug');
        res.body.chapters[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should list ONE chapter item on GET with id query', done => {
    chai
      .request(server)
      .get(`${route}?id=${itemID}`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {

        res.should.have.status(200);
        res.should.be.json;
        res.body.chapters[0].should.have.property('id');
        res.body.chapters[0].should.have.property('name');
        res.body.chapters[0].should.have.property('slug');
        res.body.chapters[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should list ONE chapter item on GET using id', done => {
    chai
      .request(server)
      .get(route + itemID)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('Should have tags object in ONE chapter item on GET', done => {
    chai
      .request(server)
      .get(route + itemID)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.chapter.should.have.property('tags');
        res.body.chapter.tags.should.eql(['primary']);
        done();
      });
  });

  it('Should list ONE chapter item on GET with slug query', done => {
    chai
      .request(server)
      .get(route + '?slug=testing-chapter-path')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.chapters[0].should.have.property('id');
        res.body.chapters[0].should.have.property('name');
        res.body.chapters[0].should.have.property('slug');
        res.body.chapters[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should UPDATE a chapter record on PUT', done => {
    chai
      .request(server)
      .put(route + itemID)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.chapter.name.should.eql(putData.chapter.name);
        done();
      });
  });
  // Failing tests
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
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
  });
  it('Should throw an ERROR on PUT with invalid path', done => {
    chai
      .request(server)
      .put(route + 'chapter774448')
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(404);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should return an empty list on GET req using invalid query', done => {
    chai
      .request(server)
      .get(route + '?slug=a-learning')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('chapters');
        done();
      });
  });
  it('Should DELETE a chapter record on DELETE /:id return deleted JSON object', done => {
    chai
      .request(server)
      .delete(route + itemID)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.status.should.eql(200);
        res.should.be.json;
        done();
      });
  });
});
