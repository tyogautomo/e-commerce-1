const Product = require('../models/product')
const {
    Storage
} = require('@google-cloud/storage')
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})

class ProductController {

    static getAll(req, res, next) {
        Product.find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Product.findById(req.params.productId)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static create(req, res, next) {
        let product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            featured_image: req.file.cloudStoragePublicUrl
        }
        if (req.file) {
            product.featured_image = req.file.cloudStoragePublicUrl
        }
        console.log(product, 'masuk create controller <<<<<<<<<<<<<<<<<<<<<<')

        Product.create(product)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static async update(req, res, next) {
        try {
            let update = {}
            req.body.name && (update.name = req.body.name)
            req.body.description && (update.description = req.body.description)
            req.body.price && (update.price = req.body.price)
            req.body.amount && (update.amount = req.body.amount)
            req.file && (update.featured_image = req.file.cloudStoragePublicUrl)

            // deleting old image on gsc if updating new image
            if (req.file) {
                let willUpdated =
                    await Product.findById(req.params.productId)

                await storage
                    .bucket('ecommerce-cubes')
                    .file(willUpdated.featured_image.split('https://storage.googleapis.com/ecommerce-cubes/')[1])
                    .delete()
            }

            let updatedProduct =
                await Product.findOneAndUpdate({
                    _id: req.params.productId
                }, {
                    $set: update
                }, {
                    new: true,
                    runValidators: true
                })

            res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            let deletedProduct =
                await Product.findOneAndDelete({
                    _id: req.params.productId
                })


            await storage
                .bucket('ecommerce-cubes')
                .file(deletedProduct.featured_image.split('https://storage.googleapis.com/ecommerce-cubes/')[1])
                .delete()

            res.status(200).json(deletedProduct)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductController