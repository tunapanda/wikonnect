const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');

const server = require('../index');
const tokens = require('./_tokens');

chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();

const route = '/api/v1/review-questions';
describe('CHAPTER REVIEW QUESTIONS ROUTE', () => {

  it('Should fetch chapter reviews questions', done => {
    chai
      .request(server)
      .get(`${route}`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.reviewQuestions[0].should.have.property('category');
        res.body.reviewQuestions[0].should.have.property('title');
        done();
      });
  });

  it('Should query chapter reviews questions by category', done => {
    chai
      .request(server)
      .get(`${route}?categories=language`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.reviewQuestions[0].should.have.property('category');
        res.body.reviewQuestions[0].should.have.property('title');
        done();
      });
  });
});