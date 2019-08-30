if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const {
    errorHandler
} = require('./middlewares/errorHandler')
mongoose.connect('mongodb://localhost/e-commerce-2-testing', {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('CONNECTED TO MONGOOSE DATABASE')
}).catch(console.log);

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const routes = require('./routes/index-route')

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to CUBES Server!'
    })
})
app.use('/', routes)

app.use(errorHandler)

module.exports = app