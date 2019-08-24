const User = require('../models/user')
const Product = require('../models/product')

module.exports = {
    clearDatabase(done) {
        return User.deleteMany({})
            .then(response => {
                console.log('User database cleared!')
                return Product.deleteMany({})
            })
            .then(() => {
                console.log('Poduct database cleared!')
                done()
            })
            .catch(err => {
                console.log(err)
            })
    }
}