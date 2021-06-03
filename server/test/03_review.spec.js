const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');

const server = require('../index');
const tokens = require('./_tokens');
const knex = require('../db/db');

chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();

const route = '/api/v1/reviews';

async function getSample(valid = true) {

  if (valid) {
    const chapter = (await knex('chapters')
      .select(['chapters.id'])
      .where({ approved: true })
      .limit(1))[0];

    const rating = (await knex('ratings')
      .select(['ratings.id', 'ratings.reaction'])
      .where({ isDeleted: false })
      .limit(1))[0];

    return {
      chapterId: chapter.id,
      reaction: rating.reaction,
      ratingId: rating.id,
      metadata: {
        audioQuality: 'It was good',
        contentAccuracy: ['Zero accuracy'],
        language: 'No profanity or cursing works'
      }
    };

  }
}

describe('CHAPTER REVIEWS ROUTE', () => {

  it('Should fetch existing chapter reviews', done => {
    chai
      .request(server)
      .get(route)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.reviews[0].should.have.property('id');
        done();
      });
  });

  it('Should query existing chapter reviews to include respective rating', done => {
    chai
      .request(server)
      .get(`${route}?include=rating`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.reviews[0].should.have.property('id');
        res.body.reviews[0].should.have.property('rating');
        done();
      });
  });

  it('Should create chapter review', async () => {
    //clear everything to avoid conflict
    await knex('reviews').delete();
    const data = await getSample();
    return chai
      .request(server)
      .post(route)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send({ review: data })
      .then((res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.should.have.property('review');
      });
  });

  it('Should update a chapter review', async () => {
    const review = (await knex('reviews').select().limit(1))[0];
    const data = await getSample();

    return chai
      .request(server)
      .put(`${route}/${review.id}`)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send({ review: data })
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.review.should.have.property('id');
        res.body.review.should.have.property('metadata');
        res.body.review.metadata.should.eql(data.metadata);
      });
  });

  it('Should delete a chapter review', async () => {
    const review = (await knex('reviews').select().limit(1))[0];

    return chai
      .request(server)
      .delete(`${route}/${review.id}`)
      .set(tokens.headersSuperAdmin1)
      .then((res) => {
        res.status.should.eql(200);
      });
  });
});
