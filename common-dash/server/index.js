const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(bodyParser.json())

const admin = require('firebase-admin');

const serviceAccount = require("../dashboard.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dashboard-livestream-yumi.firebaseio.com"
});
// admin.initializeApp();

require('dotenv').config()


//app.use(app.json())
//app.use(app.urlencoded({extended:true}))

app.use('/auth', require('./auth'))
app.use('/edition', require('./edition'))
app.use('/shows', require('./shows'))
app.use('/coordinates', require('./coordinates'))

app.use(express.static(path.join(process.cwd(), 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
