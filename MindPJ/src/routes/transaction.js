// import express from 'express'
const express = require('express')

const router = express.Router()

const TransactionController = require('../controllers/transactions/transaction')

router.use('/transaction', TransactionController)


module.exports = router
