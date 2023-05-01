require('dotenv').config();
require('./utils/database.js');
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.js');

// routes
const urlShortener = require('./routes/urlShortener.js');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/api/shorturl', urlShortener);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.use(errorHandler);