const express = require('express')
const router = express.Router()

const CartController = require('../controllers/cart-controller')

router.get('/', CartController.getOne)
router.get('/allusers', CartController.getAllUsersTransactions)
router.get('/allusers/arrived', CartController.getAllUsersArrivedTransactions)
router.get('/allusers/ongoing', CartController.getAllUsersOnGoingTransactions)
router.post('/', CartController.create)
router.put('/:cartId', CartController.increaseDecrease)
router.put('/checkout/:cartId', CartController.checkout)

module.exports = router