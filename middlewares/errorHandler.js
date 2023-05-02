function errorHandler (err, req, res, next) {
    console.error(err.stack);

    // const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong!';

    res.status(200) // Whyyyy code 200 errors, freeCodeCamp? Just why? :(
        .json({ 
            error: errMsg 
        });
}

module.exports = errorHandler;