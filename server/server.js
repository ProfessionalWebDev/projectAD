var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
autoIncrement = require('mongoose-auto-increment');

// Including Config File
app.config = require('./config');

app.schema= {};

// Mongoose Connection
var connection = mongoose.connect(app.config.MONGO_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// AutoIncrement Plugin Initialization
autoIncrement.initialize(db)
require('./model')(app, mongoose);


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

var routes = require('./routes')(app);

// For Demo App Files
app.demo = require('./demo/demo/demo');

// For General Files
app.general = require('./projectAD/general/generalFunc');

// For User App Files
app.userGeneral = require('./projectAD/userApp/userFunc/userGeneral');

// For Service App Files
app.servGeneral = require('./projectAD/serviceApp/servFunc/servGeneral'); 

//app.use(express.static(path.join(process.cwd(),"/../Client")));
// OPTIONAL ----->> app.use(express.static(path.join(__dirname,"/../Client")));
app.use(bodyParser.json());


app.listen(3000);
console.log("server running on port 3000");