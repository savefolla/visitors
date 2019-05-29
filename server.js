const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, '' + Date.now())
  }
});
const upload = multer({storage});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/image', (req, res) => {
  const directoryPath = path.join(__dirname, 'public', 'images');
  fs.readdir(directoryPath, function (err, files) {
    res.send({url: files[Math.floor(Math.random() * files.length)]});
  });
});

app.post('/image', upload.single('image'), (req, res) => {
  res.sendStatus(200);
});

app.listen(port, function () {
  console.log(`Started on port ${port}`);
});
