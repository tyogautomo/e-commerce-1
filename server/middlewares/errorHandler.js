module.exports = {
    errorHandler(err, req, res, next) {
        console.log(err, 'from error handler <<<<<<<<')
        if (err.name == 'JsonWebTokenError') {
            res.status(401).json({
                code: 401,
                message: 'Invalid token.'
            })
        } else if (err.name == "ValidationError") {
            res.status(400).json({
                code: 400,
                message: err.message
            })
        } else {
            res.status(err.code || 500).json({
                code: err.code || 500,
                message: err.message
            })
        }
    }
}