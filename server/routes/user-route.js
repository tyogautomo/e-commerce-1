const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user-controller')
const CartController = require('../controllers/cart-controller')

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.get('/transactions', auth.authentication, CartController.getAll)
router.put('/transactions/verify/:cartId', auth.authentication, CartController.verify)

module.exports = router