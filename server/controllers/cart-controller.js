const Cart = require('../models/cart')

class CartController {

    static async create(req, res, next) {

        try {
            let findUserCart =
                await Cart.findOne({
                    userId: req.headers.decode.id,
                    paymentStatus: false
                })

            if (findUserCart) {
                let updatedCart =
                    await Cart.findOneAndUpdate({
                        userId: req.headers.decode.id,
                        paymentStatus: false
                    }, {
                        $push: {
                            products: req.body.productId
                        }
                    }, {
                        new: true
                    })

                res.status(200).json(updatedCart)
            } else {
                let data = {
                    userId: req.headers.decode.id,
                    paymentStatus: false,
                    deliveryStatus: false,
                    products: [req.body.productId]
                }

                let newCart = await Cart.create(data)

                res.status(201).json(newCart)
            }

        } catch (error) {
            next(error)
        }
    }

    static getAll(req, res, next) {
        Cart.findOne({
            userId: req.headers.decode.id,
            paymentStatus: false
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }
}

module.exports = CartController