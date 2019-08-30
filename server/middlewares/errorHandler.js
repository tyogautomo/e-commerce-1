module.exports = {
    errorHandler(err, req, res, next) {
        if (err.name == 'JsonWebTokenError') {
            res.status(401).json({
                code: 401,
                message: 'Invalid token.'
            })
        } else if (err.name == "ValidationError") {
            let errors = null
            if (err.message.split(' ')[0] == 'User') {
                errors = err.message.split('User validation failed: ').slice(1)[0].split(',')
            } else if (err.message.split(' ')[0] == 'Product') {
                errors = err.message.split('Product validation failed: ').slice(1)[0].split(',')
            } else {
                errors = err.message.split('Validation failed: ').slice(1)[0].split(',')
            }
            let formatted = ``
            for (const error of errors) {
                formatted += `<p>${error.split(':')[1]}</p>`
            }
            res.status(400).json({
                code: 400,
                message: formatted
            })
        } else {
            res.status(err.code || 500).json({
                code: err.code || 500,
                message: err.message
            })
        }
    }
}