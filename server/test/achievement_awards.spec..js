const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const tokens = require('./_tokens');


chai.should();
chai.use(chaiHttp);

const achievementAwardsRoute = '/api/v1/achievementAwards/';

describe('Achievement Awards route and function test', () => {
  it('Should GET all Achievement Awards with valid token', done => {
    chai
      .request(server)
      .get(achievementAwardsRoute)
      .set('Content-Type', 'application/json')
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.be.json;
        res.body.achievementAward[0].should.have.property('achievementId');
        res.body.achievementAward[0].should.have.property('userId');
        res.body.achievementAward[0].should.have.property('id');
        res.body.achievementAward[0].should.have.property('name');
        res.body.achievementAward[0].should.have.property('imageUrl');
        done();
      });
  });
});