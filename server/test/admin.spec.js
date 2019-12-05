const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');
const knex = require('../db/db');

chai.should();
chai.use(chaiHttp);

const routeCourse = '/api/v1/courses/';
const routeCourseData = {
  id: 'course6',
  name: 'A Course 6',
  slug: 'a-course-6',
  description: 'Contains Modules.',
  status: 'published',
  creator_id: 'user1',
};

const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQHdpa29ubmVjdC5vcmciLCJ1c2VybmFtZSI6InVzZXIxIiwibGFzdFNlZW4iOiIyMDE3LTEyLTIwIDE5OjE3OjEwIiwibGFzdElwIjoiMjQ1LjE5LjIyNS41NSIsIm1ldGFkYXRhIjpudWxsLCJjcmVhdGVkQXQiOiIyMDE3LTEyLTIwVDE2OjE3OjEwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE3LTEyLTIwVDE2OjE3OjEwLjAwMFoifSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNTc2MTUyMDE5LCJpYXQiOjE1NzU1NDcyMTl9.DL2I4ha4ZyF-JRKuH6L50GCqsWTwxMSwe6s01MV-Ar4'
};

describe('COURSE ROUTE WITH PRIVILEGES', () => {

  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex.seed.run();
  });

  it('Should create course with user as author', done => {
    chai
      .request(server)
      .post(routeCourse)
      .set('Content-Type', 'application/json')
      .set(headers)
      .send(routeCourseData)
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });
  it('Should return { edit:true, delete:true, update:true} if user == author', done => { done(); });
  it('Should return { edit:false, delete:false, update:false} if user != author', done => { done(); });
});
