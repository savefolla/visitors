const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./public/db');

app.use(express.static('public'));
app.use(express.json({limit: '1000000kb'}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/images', (req, res) => {
  res.send(200);
});

app.post('/images', (req, res) => {
  db.push(req.body);
  fs.writeFile('./public/db.json', JSON.stringify(db), (err) => {
    if (err) console.log('error saving');
  });
  res.send(200);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
