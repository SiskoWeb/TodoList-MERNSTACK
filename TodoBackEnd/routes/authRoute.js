const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const { createAuthalidator, LoginAuthalidator } = require('../utils/validators/authValidator')

const { signup, login, testo } = require('../services/authService')




router.route('/signup').post(createAuthalidator, signup)
router.route('/login').post(LoginAuthalidator, login)


module.exports = router

