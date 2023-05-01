const mongoose = require('mongoose');

class Database {
    constructor () {
        this.mongoURI = process.env.MONGO_URI;
        this._connect();
    }

    _connect() {
        mongoose
            .connect(this.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Database connection successful'))
            .catch((err) => console.log(`Database connection error: ${err}`));
    }
}

module.exports = new Database();