var express = require('express');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var morgan = require('morgan');



app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));



var app = express();

// app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));


app.set('view engine', 'handlebars');

var Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_dhj993d0:17u35cmnthqs38jvm4sa84mea9@ds235788.mlab.com:35788/heroku_dhj993d0");
var database = mongoose.connection;

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

if (process.env.MONGODB_URI) {

  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/mongo-scraper", {
  useMongoClient: true
});
 };

var databaseURL = 'scrapethis';
var collections = ['googleData'];

var db = mongojs(databaseURL, collections);
db.on('error', function(error) {
    console.log('Database error;', error);
});

db.once('open', function() {
    console.log('Database connections is a go');
    db.dropDatabase();
});



var routing = require('./controllers/scrape_controller.js');

app.use('/', routing);

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});