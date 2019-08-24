const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                let check = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return check.test(value)
            },
            message: 'Not a valid email format!'
        }
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})

userSchema.pre('save', function (next) {
    return User.findOne({
            email: this.email
        })
        .then(user => {
            if (user) {
                throw new Error('Email already in used.')
            } else {
                next()
            }
        })
})

const User = mongoose.model('User', userSchema)
module.exports = User;