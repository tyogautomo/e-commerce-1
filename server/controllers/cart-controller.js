const Cart = require('../models/cart')
const Product = require('../models/product')

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

    static getOne(req, res, next) {
        Cart.findOne({
                userId: req.headers.decode.id,
                paymentStatus: false
            })
            .populate('products')
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static getAllUsersTransactions(req, res, next) {
        Cart.find({
                paymentStatus: true
            })
            .populate('products')
            .populate('userId')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static getAllUsersArrivedTransactions(req, res, next) {
        Cart.find({
                paymentStatus: true,
                deliveryStatus: true
            })
            .populate('products')
            .populate('userId')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static getAllUsersOnGoingTransactions(req, res, next) {
        Cart.find({
                paymentStatus: true,
                deliveryStatus: false
            })
            .populate('products')
            .populate('userId')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static async increaseDecrease(req, res, next) {
        try {
            if (req.body.type == 'decrease') {
                let findCart = await Cart.findById(req.params.cartId)
                let products = findCart.products
                for (let [index, item] of products.entries()) {
                    if (item == req.body.productId) {
                        products.splice(index, 1)
                        break;
                    }
                }

                let updated =
                    await Cart.findOneAndUpdate({
                        _id: req.params.cartId
                    }, {
                        $set: {
                            products: products
                        }
                    }, {
                        new: true
                    })

                res.status(200).json(updated)
            } else {
                let updated =
                    await Cart.findOneAndUpdate({
                        _id: req.params.cartId
                    }, {
                        $push: {
                            products: req.body.productId
                        }
                    }, {
                        new: true
                    })

                res.status(200).json(updated)
            }
        } catch (error) {
            next(error)
        }
    }

    static async checkout(req, res, next) {

        try {
            // decrease product quantity
            for (const product of req.body.products) {
                let findProduct = await Product.findById(product.id)
                if (findProduct.quantity >= product.amount) {
                    await Product.updateOne({
                        _id: product.id
                    }, {
                        $set: {
                            quantity: findProduct.quantity - product.amount
                        }
                    })
                } else {
                    next({
                        code: 400,
                        message: 'Product is out of stock, check for product left quantity.'
                    })
                }
            }

            // update cart payment to true
            let updatedCart =
                await Cart.findOneAndUpdate({
                    _id: req.params.cartId
                }, {
                    paymentStatus: true
                }, {
                    new: true
                })

            res.status(200).json(updatedCart)
        } catch (error) {
            next(error)
        }


    }

    static getAll(req, res, next) {
        Cart.find({
                userId: req.headers.decode.id,
                paymentStatus: true
            })
            .populate('products')
            .sort({
                updatedAt: -1
            })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static verify(req, res, next) {
        Cart.findOneAndUpdate({
                _id: req.params.cartId
            }, {
                $set: {
                    deliveryStatus: true
                }
            }, {
                new: true
            })
            .then(updatedCart => {
                res.status(200).json(updatedCart)
            })
            .catch(next)
    }
}

module.exports = CartController