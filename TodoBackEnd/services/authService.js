const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs');



const asyncHandler = require('express-async-handler')

const userModele = require('../models/userModel')
const ApiError = require('../utils/apiError');

// Desc make sure key legnth  between 32 & 50
const SECRET_KEY_JWT = 'Yassine.info'

// @DESC create token by passing id user
const createToken = (payload) =>
    jwt.sign({ userId: payload }, SECRET_KEY_JWT, {
        expiresIn: '90d'
    })




// @DESC SIGNUP
// @ROUTE GET /API/V1/AUTH/SIGNUP
// @DACCESS PUBLIC
exports.signup = asyncHandler(async (req, res, next) => {
    //  1- create user

    const user = await userModele.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    // 2 - create token
    const token = createToken(user._id)
    res.status(201).json({ data: user, token })
})

// @DESC LOGIN
// @ROUTE GET /API/V1/AUTH/LOGIN
// @DACCESS PUBLIC
exports.login = asyncHandler(async (req, res, next) => {

    //  1- check if login true

    const user = await userModele.findOne({ email: req.body.email })



    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError(`email or passowrd uncourrect`, 404));
    }

    // 2 - match token

    const token = createToken(user._id)

    res.status(200).json({ data: user, token })
})




// @DESC middleware  to  make sure user is logged in
exports.protect = asyncHandler(async (req, res, next) => {

    //1)  check if token exist m if exist get it
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

    }
    if (!token) {
        return next(new ApiError('you are not login , please login to get access this route', 401))
    }



    // 2) verify token ( get id user from token)

    const decoded = jwt.verify(token, SECRET_KEY_JWT)


    // 3)  check if user exist 
    const currentUser = await userModele.findById(decoded.userId)

    if (!currentUser) {
        return next(new ApiError('the user that belong to this token does no longer exist', 401))
    }

    // @Desc add data of user to reqist
    req.user = currentUser
    next()
})


// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
  });


  exports.getUserById = asyncHandler(async (req, res, next) => {

    const { id } = req.params

    const User = await userModele.findById(id)

    if (!User) {
        return next(new ApiError(`no user for this token : ${id}`, 404))
    }
    res.status(201).json({ data: User })
})