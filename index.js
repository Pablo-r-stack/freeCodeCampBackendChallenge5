var express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }


  const file = req.file;

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
