const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const extract = require('./helpers/unzip');

const app = express();
const router = express.Router();
const PORT = 3000;

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use(fileUpload());

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) return res.status(400).send('No files were uploaded.');

  const file = req.files.attachment;
  const fileName = file.name + '_' + Date.now();

  file.mv(__dirname + `/public/files/${fileName}`, function(err) {
    if (err) return res.status(500).send(err);

    const extracted = extract(
      fileName,
      __dirname + '/public/files/',
      __dirname + '/public/files/tmp'
    );
    res.send(extracted + ' uploaded!');
  });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server is listening on ${PORT}!`));
