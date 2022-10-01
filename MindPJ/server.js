
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
// const constants = require('./configs/constants')
// const responseCode = require('./configs/responseCode')
const route = require('./src/routes')
const compression = require('compression')
const { response } = require('express')


const appname = "WALLA"
const port = "3000"


const app = express()
// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
mongoose.connect('mongodb+srv://WALLA:WALLA010101@cluster0.qn8ggji.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connection to db established!!!!'))

app.use(logger('combined'))
app.use(compression())
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', '*')
  next()

})

app.use(route)


app.listen(port, () => console.log(`${appname} app listening on port ${port}!`))


