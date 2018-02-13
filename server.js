var express = require('express');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');

var app = express();

var databaseURL = 'scrapethis';
var collections = ['googleData'];

var db = mongojs(databaseURL, collections);
db.on('error', function(error) {
    console.log('Database error;', error);
});

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, function() {
    console.log('App running on port 3000!');
});