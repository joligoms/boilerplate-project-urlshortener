const express = require('express');
const bodyParser = require('body-parser');
const validURL = require('../middlewares/validURL');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', validURL, (req, res) => {
    const { url } = req.body;

    res.json({
        original_url: url,
        short_url: 123,
    });
});

router.get('/:urlId', (req, res, next) => {
    //
});

module.exports = router;