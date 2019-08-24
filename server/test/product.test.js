const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const fs = require('fs')
chai.use(chaiHttp)

let tokenJono = ''
let tokenBono = ''
let tokenAdmin = ''
let createdProduct = {}
let updatedProduct = {}
describe('Product Testing', function () {

    // register jono
    before(function (done) {
        let jono = {
            username: 'jono',
            email: 'jono@mail.com',
            password: '12345'
        }

        chai
            .request(app)
            .post('/users/signup')
            .send(jono)
            .end(function (err, res) {

                tokenJono = res.body.token
                done()
            })
    })

    // register bono
    before(function (done) {
        let bono = {
            username: 'bono',
            email: 'bono@mail.com',
            password: '12345'
        }

        chai
            .request(app)
            .post('/users/signup')
            .send(bono)
            .end(function (err, res) {

                tokenBono = res.body.token
                done()
            })
    })

    // register admin
    before(function (done) {
        let admin = {
            username: 'admin',
            email: 'admin@mail.com',
            password: '12345'
        }

        chai
            .request(app)
            .post('/users/signup')
            .send(admin)
            .end(function (err, res) {

                tokenAdmin = res.body.token
                done()
            })
    })

    describe('GET /products', function () {

        it('should return empty array', function (done) {

            chai
                .request(app)
                .get('/products')
                .set('token', tokenJono)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.be.empty
                    expect(res.body.length).to.equal(0)
                    done()
                })
        })

        it('should failed to get products: invalid token', function (done) {

            chai
                .request(app)
                .get('/products')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.keys(['code', 'message'])
                    expect(res.body.message).to.equal('Invalid token.')
                    done()
                })
        })

    })

    describe('POST /products', function () {

        it('should error: Invalid token when add product with status 401', function (done) {
            let product1 = {
                name: 'product-1',
                description: 'description of product 1',
                price: 1200000,
                amount: 100,
                featured_image: 'exist'
            }

            chai
                .request(app)
                .post('/products')
                .send(product1)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(401)
                    expect(res.body.message).to.equal('Invalid token.')
                    done()
                })
        })

        // NEED ATTENTION ===========================
        it('should success: add a product with status 201', function (done) {
            let product1 = {
                name: 'product-1',
                description: 'description of product 1',
                price: 1200000,
                amount: 100,
            }

            chai
                .request(app)
                .post('/products')
                .set('token', tokenAdmin)
                // .attach('image', fs.readFileSync('./test-image.jpg'), 'test-image.jpg')
                .field('name', product1.name)
                .field('description', product1.description)
                .field('price', product1.price)
                .field('amount', product1.amount)
                .end(function (err, res) {
                    createdProduct = res.body
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.all.keys(['_id', 'name', 'description', 'amount', 'price', 'featured_image'])
                    expect(res.body.name).to.equal(product1.name)
                    expect(res.body.description).to.equal(product1.description)
                    expect(res.body.price).to.equal(product1.price)
                    expect(res.body.amount).to.equal(product1.amount)
                    done()

                })
        })

        it('should error: Unauthorized process; not authecticated as an admin', function (done) {
            let product1 = {
                name: 'product-1',
                description: 'description of product 1',
                price: 1200000,
                amount: 100,
                featured_image: 'exist'
            }

            chai
                .request(app)
                .post('/products')
                .set('token', tokenBono)
                .send(product1)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(401)
                    expect(res.body.message).to.equal('Unauthorized process.')
                    done()

                })
        })

        it('should error: One of field is empty when created', function (done) {
            let product1 = {
                description: 'description of product 1',
                price: 1200000,
                amount: 100,
            }

            chai
                .request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send(product1)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.equal('Product validation failed: name: Path `name` is required.')
                    done()

                })
        })

        it('should error: Price cannot < 0 when created', function (done) {

            let product1 = {
                name: 'product1',
                description: 'description of product 1',
                price: -1,
                amount: 100,
            }

            chai
                .request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send(product1)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.equal('Product validation failed: price: Price cannot less than 0.')
                    done()

                })

        })

        it('should error: Amount cannot < 0 when created', function (done) {

            let product1 = {
                name: 'product1',
                description: 'description of product 1',
                price: 1231231,
                amount: -1,
            }

            chai
                .request(app)
                .post('/products')
                .set('token', tokenAdmin)
                .send(product1)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.equal('Product validation failed: amount: This product is out of stock.')
                    done()

                })

        })
    })

    describe('PUT /products', function () {

        it('should success updating a product', function (done) {
            // console.log(createdProduct)
            let update = {
                name: 'product-1-edit'
            }
            chai
                .request(app)
                .put(`/products/${createdProduct._id}`)
                .set('token', tokenAdmin)
                .send(update)
                .end(function (err, res) {
                    updatedProduct = res.body
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['_id', 'name', 'description', 'price', 'amount', 'featured_image'])
                    expect(res.body.name).to.not.equal(createdProduct.name)
                    expect(res.body.name).to.equal(update.name)
                    expect(res.body.description).to.equal(createdProduct.description)
                    expect(res.body.price).to.equal(createdProduct.price)
                    expect(res.body.amount).to.equal(createdProduct.amount)
                    expect(res.body.featured_image).to.equal(createdProduct.featured_image)
                    done()
                })
        })

        it('should error updating a product: Unauthorized process', function (done) {
            // console.log(createdProduct)
            let update = {
                name: 'product-1-edit'
            }
            chai
                .request(app)
                .put(`/products/${createdProduct._id}`)
                .set('token', tokenBono)
                .send(update)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(401)
                    expect(res.body.message).to.equal('Unauthorized process.')
                    done()
                })
        })

        it('should error updating a product: Price cannot be less than 0', function (done) {
            // console.log(createdProduct)
            let update = {
                price: -1
            }
            chai
                .request(app)
                .put(`/products/${createdProduct._id}`)
                .set('token', tokenAdmin)
                .send(update)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.equal('Validation failed: price: Price cannot less than 0.')
                    done()
                })
        })

        it('should error updating a product: Amount cannot be less than 0', function (done) {
            // console.log(createdProduct)
            let update = {
                amount: -1
            }
            chai
                .request(app)
                .put(`/products/${createdProduct._id}`)
                .set('token', tokenAdmin)
                .send(update)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.equal('Validation failed: amount: This product is out of stock.')
                    done()
                })
        })

        it('should success updating even if fields filled empty', function (done) {
            // console.log(createdProduct)
            let update = {
                name: "",
                description: ""
            }
            chai
                .request(app)
                .put(`/products/${createdProduct._id}`)
                .set('token', tokenAdmin)
                .send(update)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys(['_id', 'name', 'description', 'price', 'amount', 'featured_image'])
                    expect(res.body.name).to.equal(updatedProduct.name)
                    expect(res.body.description).to.equal(createdProduct.description)
                    expect(res.body.price).to.equal(createdProduct.price)
                    expect(res.body.amount).to.equal(createdProduct.amount)
                    expect(res.body.featured_image).to.equal(createdProduct.featured_image)
                    done()
                })
        })

    })

    describe('DELETE /products/:productId', function () {

        it('should error delete product: Invalid token.; No Authenticated User', function (done) {

            chai
                .request(app)
                .delete(`/products/${createdProduct}`)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.be.a('number')
                    expect(res.body.code).to.equal(401)
                    expect(res.body.message).to.be.a('string')
                    expect(res.body.message).to.equal('Invalid token.')
                    done()
                })
        })

        it('should error delete product: Unauthorized process.; Not an admin', function (done) {

            chai
                .request(app)
                .delete(`/products/${createdProduct}`)
                .set('token', tokenJono)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.all.keys(['code', 'message'])
                    expect(res.body.code).to.be.a('number')
                    expect(res.body.code).to.equal(401)
                    expect(res.body.message).to.be.a('string')
                    expect(res.body.message).to.equal('Unauthorized process.')
                    done()
                })
        })

        it('should success delete product', function (done) {

            chai
                .request(app)
                .delete(`/products/${createdProduct._id}`)
                .set('token', tokenAdmin)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.all.keys(['_id', 'name', 'description', 'price', 'amount', 'featured_image'])
                    expect(res).to.have.status(200)
                    done()

                })


        })

    })

})