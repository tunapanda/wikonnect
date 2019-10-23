// process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');


chai.use(chaiHttp);

describe('API AUTH ROUTES', () => {
    it("should allow GET Requests to the base /api/v1/ route", done =>{
        chai.request(server).get("/api/v1/").end((err, res) =>{
            res.status.should.eql(200);
            done();
        })
    });
});

describe("routes: /api/v1/users/", () => {
    it("should return all users", done => {
        chai
            .request(server)
            .get('/api/v1/users/')
            .end((err, res) => {
                res.status.should.eql(200);
                res.request.type.should.eql("application/json");
                // res.body.user.should.have.property("username");
                // res.body.user.eql("Sending some JSON")
                done();
            });
    });
});

