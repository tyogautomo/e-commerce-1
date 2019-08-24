const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const userRoute = require('./user-route')
const productRoute = require('./product-route')

router.use('/users', userRoute)

router.use(auth.authentication)

router.use('/products', productRoute)

module.exports = router