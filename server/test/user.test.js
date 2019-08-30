const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

const {
    clearDatabase
} = require('../helpers/clearDatabase')

chai.use(chaiHttp)

after(function (done) {
    clearDatabase(done)
})

describe('User Testing', function () {

    describe('POST /users/signup', function () {

        it('should success register with status code 201', function (done) {
            let newUser = {
                username: 'yoga',
                email: 'yoga@mail.com',
                password: '12345'
            }

            chai
                .request(app)
                .post('/users/signup')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an("object")
                    expect(res.body.user.username).to.equal(newUser.username)
                    expect(res.body.user.email).to.equal(newUser.email)
                    expect(res.body.user.password).to.not.equal(newUser.password)
                    expect(res.body).to.have.keys(["token", 'user'])
                    expect(res.body.user).to.have.keys(['_id', 'username', 'email', "password"])
                    done()
                })
        })

        it('should return error with status code 400', function (done) {
            let newUser = {
                email: 'badu@mail.com',
                password: '12345'
            }

            chai
                .request(app)
                .post('/users/signup')
                .send(newUser)
                .end(function (err, res) {
                    expect(res.body).to.have.keys(['code', 'message'])
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.equal("<p> Path `username` is required.</p>")
                    expect(res).to.have.status(400)
                    done()
                })
        })

    })

    describe('POST /users/signin', function () {

        it('should success login with status 200', function (done) {

            let user = {
                email: 'yoga@mail.com',
                password: '12345'
            }

            chai
                .request(app)
                .post('/users/signin')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    expect(res.body.token)
                    done()
                })
        })

        it('should login failed: Invalid password with status 404', function (done) {

            let loginData = {
                email: 'yoga@mail.com',
                password: '1234'
            }

            chai
                .request(app)
                .post('/users/signin')
                .send(loginData)
                .end(function (err, res) {

                    expect(err).to.be.null;
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.keys(['code', 'message']);
                    expect(res.body.code).to.equal(404)
                    expect(res.body.message).to.equal('Invalid email / password')
                    done()

                })
        })

        it('should login failed: Invalid email with status 404', function (done) {

            let loginData = {
                email: 'yoga@mail.co',
                password: '1234'
            }

            chai
                .request(app)
                .post('/users/signin')
                .send(loginData)
                .end(function (err, res) {

                    expect(err).to.be.null;
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.keys(['code', 'message']);
                    expect(res.body.code).to.equal(404)
                    expect(res.body.message).to.equal('Invalid email / password')
                    done()

                })
        })
    })

})