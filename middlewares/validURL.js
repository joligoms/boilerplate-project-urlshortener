const dns = require('dns');

async function validURL (req, _, next) {
    const { url } = req.body;
    console.log(url);

    if (!url) return next(createError('invalid url', 400))

    let urlObject;

    try {
        urlObject = new URL(url);
    } catch (err) {
        return next(createError('invalid url', 400));
    }

    const { protocol, hostname } = urlObject;
    console.log(protocol);

    if (protocol !== 'http:' && protocol !== 'https:') {
        return next(createError('invalid url', 400));
    }

    try {
        await lookup(hostname);
        console.log(`no errors for ${url}`);
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