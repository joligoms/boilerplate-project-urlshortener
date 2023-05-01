const mongoose = require('mongoose');
const nanoid = require('nanoid');

const shortUrlSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(7),
    },

    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);