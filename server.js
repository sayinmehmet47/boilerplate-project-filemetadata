const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded } = require('body-parser');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(console.log('connected'));
const fileanalyse = require('./api/files.js');

app.use(urlencoded({ extended: false }));
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/api/fileanalyse', fileanalyse);

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
