const express = require('express');
const bodyParser = require('body-parser');
const validURL = require('../middlewares/validURL');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

const ShortUrlModel = require('../models/shorturl.js');

router.post('/', validURL, async (req, res, next) => {
    const { url } = req.body;

    try {
        let foundURL = await ShortUrlModel.findOne({ url }).exec();

        if (!foundURL) {
            foundURL = await new ShortUrlModel({ url }).save();
        }

        res.json({
            original_url: foundURL.url,
            short_url: foundURL._id,
        });
    } catch (err) {
        next(err); 
    }
});

router.get('/:shortURL', async (req, res, next) => {
    const { shortURL: urlId } = req.params;

    try {
        let foundURL = await ShortUrlModel.findById(urlId).exec();

        if (!foundURL) {
            return next(new Error('No short URL found for the given input.'));
        }

        res.redirect(foundURL.url);
    } catch (err) {
        next(err);
    }
});

module.exports = router;