if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}

const app = require('../app')
const port = process.env.PORT || 3000

const http = require('http')
const server = http.createServer(app)

server.listen(port, () => console.log(`Example app listening on port ${port}`))