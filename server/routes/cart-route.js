const express = require('express')
const router = express.Router()

const CartController = require('../controllers/cart-controller')

router.get('/', CartController.getAll)
router.post('/', CartController.create)


module.exports = router