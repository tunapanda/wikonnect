const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');
const db = require('../db/db');

chai.use(chaiHttp);

let token;
console.log(token);
describe('Auth routes tests: /api/v1/auth/', () => {
    it('should create a table named "users"', function* () {
        yield User.up()

        return expect(db.schema.hasTable('users'))
            .to.eventually.be.true
    })

    it('should allow POST requests to the "/api/v1/auth/register" route', done => {
        chai
            .request(server)
            .post('/api/v1/auth/register')
            .send({ 'user': { 'username': 'urlencoded', 'hash': 'urlencodedurlencoded', 'email': 'mussai@gmail.com' } })
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.user.should.have.property('id');
                res.body.user.should.have.property('username');
                res.body.user.should.have.property('email');
                done();
            });
    });

    it('should return 400 for bad POST requests to the "/api/v1/auth/register" route', done => {
        chai
            .request(server)
            .post('/api/v1/auth/register')
            .send({ 'user': { 'username': 'urlencoded', 'hash': 'urlencodedurlencoded', 'name': 'mussai@gmail.com' } })
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('should return 406 for trying to register an existing user with the "/api/v1/auth/register" route', done => {
        chai
            .request(server)
            .post('/api/v1/auth/register')
            .send({ 'user': { 'username': 'urlencoded', 'hash': 'urlencodedurlencoded', 'email': 'mussai@gmail.com' } })
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(406);
                done();
            })
    });
    it('should allow POST requests to the "/api/v1/auth/login" route', done => {
        chai
            .request(server)
            .post('/api/v1/auth/login')
            .send({ 'user': { 'username': 'urlencoded', 'hash': 'urlencodedurlencoded' } })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });
    it('should return 401 for bad POST requests to the "/api/v1/auth/login" route', done => {
        chai
            .request(server)
            .post('/api/v1/auth/login')
            .send({ 'user': { 'username': 'urlencoded', 'hash': 'urlencodedurl' } })
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            })
    });
    it('should prevent GET requests to the "api/v1/hello" route without a token', done => {
        chai
            .request(server)
            .get('/api/v1/hello')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            })
    });
    it('should allow GET requests to the "api/v1/hello" route with a valid token', done => {

        chai
            .request(server)
            .get('/api/v1/hello')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                // res.should.have.property('user');
                done();
            })
    });
    it('a POST request to a private route should return "token expired" if the token has expired');
    it('a POST request to a private route should return "invalid signature" if the token signature is invalid');
    it('a POST request to a private route should return "invalid token" if the token is invalid');
    it('a POST request to a private route should return "jwt malformed" if the token is malformed');
});