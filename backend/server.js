let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./database'),
    bodyParser = require('body-parser')

// conntect mongodb
mongoose.Promise = global.Promise
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully')
}, error => {
    console.log('Cannot connect to database : ' + error)
})

const studentAPI = require('../backend/routes/student.route')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors());

// API
app.use('/api', studentAPI)
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Connected to port ' + 4000)
})

// 404
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})