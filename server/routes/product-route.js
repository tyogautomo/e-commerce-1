const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    multer,
    sendUploadToGCS
} = require("../middlewares/images")

const ProductController = require('../controllers/product-controller')

router.get('/', ProductController.getAll)
router.post('/', auth.authorizationAdmin, multer.single('image'), sendUploadToGCS, ProductController.create)
router.get('/:productId', ProductController.getOne)
router.put('/:productId', auth.authorizationAdmin, multer.single('image'), sendUploadToGCS, ProductController.update)
router.delete('/:productId', auth.authorizationAdmin, ProductController.delete)

module.exports = router