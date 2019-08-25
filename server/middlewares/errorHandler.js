module.exports = {
    errorHandler(err, req, res, next) {
        if (err.name == 'JsonWebTokenError') {
            res.status(401).json({
                code: 401,
                message: 'Invalid token.'
            })
        } else if (err.name == "ValidationError") {
            let errors = err.message.split('User validation failed: ').slice(1)[0].split(',')
            let formatted = ``
            for (const error of errors) {
                formatted += `<p>${error.split(':')[1] }</p>`
            }
            console.log(formatted, 'from error handler <<<<<<<<')
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