const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');

const server = require('../index');
const tokens = require('./_tokens');
const knex = require('../db/db');

chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();

const route = '/api/v1/userRole';

describe('USER ROLE ROUTE', () => {
  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return await knex.seed.run();
  });

  it('Should fetch existing uer roles', done => {
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
});