const express = require('express')

const router = express.Router()
const users = require('./user')
const transaction = require('./transaction')
const middleware = require('../middlewares/authentication')


router.use(users)
router.use(middleware, transaction)





module.exports = router
