globalError = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    const Mode = 'developmentw'

    if (Mode === 'development') {
        sendErrorForDev(err, res)
    }
    else {
        sendErrorForProd(err, res)

    }

}


// @desc display all msg error  for backend 
const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status, // 400 or 500 ... 
        error: err,
        message: err.message,

        stack: err.stack // whr is erro happend
    })
}

// @desc display less msg error  for clints side
const sendErrorForProd = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status, // 400 or 500 ... 

        message: err.message,


    })
}

module.exports = globalError
