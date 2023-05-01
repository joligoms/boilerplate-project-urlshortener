const dns = require('dns');

async function validURL (req, _, next) {
    const { url } = req.body;

    if (!url) {
        return next(createError('invalid URL', 400));
    }

    const { hostname } = new URL(url);

    try {
        await lookup(hostname);
        next();
    } catch (err) {
        next(createError('invalid url', 400));
    }
}

function lookup(hostname) {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = validURL;