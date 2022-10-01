// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const UserController = require('../controllers/users/UserController')

router.use('/users', UserController)


module.exports = router
