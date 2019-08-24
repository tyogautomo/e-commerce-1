const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    paymentStatus: Boolean,
    deliveryStatus: Boolean
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;