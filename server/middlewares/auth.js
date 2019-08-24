const jwtoken = require('../helpers/jwt')
const User = require('../models/user')

module.exports = {
    authentication(req, res, next) {
        try {
            var decoded = jwtoken.verifyToken(req.headers.token)
            req.headers.decode = decoded
            next()
        } catch (err) {
            next(err)
        }
    },
    authorizationAdmin(req, res, next) {
        User.findById(req.headers.decode.id)
            .then(user => {
                if (user.username == 'admin') {
                    next()
                } else {
                    next({
                        code: 401,
                        message: 'Unauthorized process.'
                    })
                }
            })
    }
}