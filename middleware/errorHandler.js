
const errorHandler = (err, req, res, next) => {
    console.log(err); //for debugging purposes

    let statusCode = 500;
    let data = {
        message: 'Internal server error',
    }

    // mongoose validation error
    if(err.name === 'ValidationError'){
        statusCode = 422;
        data = {message : err.message}
    }

    res.status(statusCode).send({data})

}

module.exports = errorHandler;
