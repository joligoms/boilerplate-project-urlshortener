function errorHandler (err, req, res, next) {
    console.error(err.stack);


    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong!';

    res.status(errStatus)
        .json({ 
            error: errMsg 
        });
}

module.exports = errorHandler;