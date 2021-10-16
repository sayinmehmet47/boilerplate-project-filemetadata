const express = require('express');
const router = express.Router();
const multer = require('multer');
const MyFiles = require('../models/Files.js');

const storage = multer.diskStorage({
  destination: './public/data/uploads/', // use it when upload
  filename: (req, file, cb) => {
    // nameFile = file.originalname + " "+ Date.now() // --> give "video.mp4 1622180824748"
    let [filename, extension] = file.originalname.split('.');
    let nameFile = filename + '-' + Date.now() + '.' + extension; // --> give "video-1622181268053.mp4"
    cb(null, nameFile);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('upfile'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file);

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

module.exports = router;
