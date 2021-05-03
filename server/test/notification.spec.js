const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');

const server = require('../index');
const tokens = require('./_tokens');
const knex = require('../db/db');

chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();

const route = '/api/v1/notifications';

const sample ={
  title: 'You have a new chapter comment',
  body: 'Your recently approved chapter has received a comment!',
  itemId: 'I3lchuEAA80',
  eventType: 'chapter-comment',
  model: 'chapter',
  recipientId: 'user2',
  creatorId: 'user1',
  read: false,
  metadata:{sendEmail: false},
};

describe('NOTIFICATIONS ROUTE', () => {

  it('Should fetch existing notifications', done => {
    chai
      .request(server)
      .get(route)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.notifications[0].should.have.property('id');
        res.body.notifications[0].should.have.property('recipientId');

        done();
      });
  });

  it('Should query existing notifications', done => {
    chai
      .request(server)
      .get(`${route}?model=chapter`)
      .set(tokens.headersSuperAdmin1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.notifications[0].should.have.property('id');
        res.body.notifications[0].should.have.property('model');
        res.body.notifications[0].should.have.property('recipientId');
        done();
      });
  });

  it('Should create a notification', async () => {
    return chai
      .request(server)
      .post(route)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send({notification: sample})
      .then((res) => {
        res.status.should.eql(201);
        res.should.be.json;
        res.body.should.have.property('notification');
        res.body.notification.body.should.eql(sample.body);

      });
  });

  it('Should get existing notification', async () => {

    const notification = (await knex('notifications').select().limit(1))[0];

    return chai
      .request(server)
      .get(`${route}/${notification.id}`)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.notification.should.have.property('id');
        res.body.notification.should.have.property('title');
      });
  });

  it('Should update existing notification', async () => {

    const notification = (await knex('notifications').select().limit(1))[0];

    return chai
      .request(server)
      .put(`${route}/${notification.id}`)
      .set(tokens.headersSuperAdmin1)
      .set('Content-Type', 'application/json')
      .send({ notification: sample })
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.notification.should.have.property('id');
        res.body.notification.should.have.property('title');
        res.body.notification.title.should.eql(sample.title);
        res.body.notification.body.should.eql(sample.body);
      });
  });

  it('Should delete a notification', async () => {
    const notification = (await knex('notifications').select().limit(1))[0];

    return chai
      .request(server)
      .delete(`${route}/${notification.id}`)
      .set(tokens.headersSuperAdmin1)
      .then((res) => {
        res.status.should.eql(200);
      });
  });
});
