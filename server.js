var express = require('express');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));



var app = express();

app.set('view engine', 'handlebars');

var Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect("");
var database = mongoose.connection;

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