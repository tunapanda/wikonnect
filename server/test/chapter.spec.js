const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');
const server = require('../index');
const tokens = require('./_tokens');
const knex = require('../db/db');

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
    'creatorId': 'user3',
    'tags': '{"H5P","user1"}',
    'createdAt': '2017-12-20T16:17:10.000Z',
    'updatedAt': '2017-12-20T16:17:10.000Z',
    'contentType': 'h5p',
    'contentUri': '/uploads/h5p/chapter1',
    'imageUrl': null,
    'contentId': null,
    'approved': false,
    'tags': 'primary'
  }
};

const putData = {
  chapter: {
    'name': 'PUT update works',
    'approved': true
  }
};

const invalidData = {
  'chapter': {
    'id': 'chapter778',
    'name': 'Testing Chapter Route',
    'slug': 'testing-chapter-route',
    'description': 'Testing chapter route',
    'status': 'draft',
    'approved': true
  }
};

const userComment = {
  'comment': {
    'creatorId': 'user3',
    'comment': 'testing comment',
    'metadata': '',
    'chapterId': 'chapter778'
  }
};

describe('CHAPTER ROUTE', () => {
  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return await knex.seed.run();
  });

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
  it('Should POST a chapter on POST /comments and return a JSON object', done => {
    chai
      .request(server)
      .post('/api/v1/comments')
      .set(tokens.headerAdminUser)
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
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.chapter[0].should.have.property('id');
        res.body.chapter[0].should.have.property('name');
        res.body.chapter[0].should.have.property('slug');
        res.body.chapter[0].should.have.property('creatorId');
        done();
      });
  });
  it('Should list ONE chapter item on GET with id query', done => {
    chai
      .request(server)
      .get(route + itemID)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.chapter[0].should.have.property('id');
        res.body.chapter[0].should.have.property('name');
        res.body.chapter[0].should.have.property('slug');
        res.body.chapter[0].should.have.property('creatorId');
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
        res.body.chapter[0].should.have.property('tags');
        res.body.chapter[0].tags.should.eql('{"H5P","user1"}');
        done();
      });
  });

  it('Should list ONE chapter item on GET with slug query', done => {
    chai
      .request(server)
      .get(route + '?slug=testing-chapter-path')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.chapter[0].should.have.property('id');
        res.body.chapter[0].should.have.property('name');
        res.body.chapter[0].should.have.property('slug');
        res.body.chapter[0].should.have.property('creatorId');
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
        res.body.chapter.name.should.eql('PUT update works');
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
        res.body.errors[0].should.eql('Bad Request');
        done();
      });
  });
  it('Should throw an ERROR on PUT with invalid path', done => {
    chai
      .request(server)
      .put(route + 'chapter778')
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .send(putData)
      .end((err, res) => {
        res.status.should.eql(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.eql(['Bad Request']);
        done();
      });
  });
  it('Should throw an ERROR on GET req using invalid query', done => {
    chai
      .request(server)
      .get(route + '?slug=a-learning')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.chapter.length, 0);
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
        res.body.should.have.property('chapter');
        done();
      });
  });
});
