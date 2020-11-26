const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const tokens = require('./_tokens');

chai.should();
chai.use(chaiHttp);

const reactionRoute = '/api/v1/reactions/';
const reactionData = {
  reaction: {
    'chapterId': 'chapter2',
    'reaction': 'like'
  }
};

describe('REACTIONS ROUTE', () => {
  describe('On POST', () => {
    it('Should record a reactions', done => {
      chai
        .request(server)
        .post(reactionRoute)
        .set(tokens.headersSuperAdmin1)
        .set('Content-Type', 'application/json')
        .send(reactionData)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.reaction.should.have.property('id');
          res.body.reaction.should.have.property('reaction');
          done();
        });
    });
  });
});