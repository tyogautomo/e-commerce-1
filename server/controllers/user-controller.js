const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {

    static signUp(req, res, next) {
        let newData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newData)
            .then(user => {
                let payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }

                let token = jwt.signToken(payload)
                res.status(201).json({
                    token,
                    user
                })
            })
            .catch(next)
    }

    static signIn(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let token = jwt.signToken(payload)
                        res.status(200).json({
                            token,
                            user: payload
                        })
                    } else {
                        next({
                            code: 404,
                            message: 'Invalid email / password'
                        })
                    }
                } else {
                    next({
                        code: 404,
                        message: 'Invalid email / password'
                    })
                }
            })
            .catch(next)

    }

}

module.exports = UserController