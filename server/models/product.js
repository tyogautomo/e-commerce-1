const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot less than 0.']
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'This product is out of stock.']
    },
    featured_image: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product;