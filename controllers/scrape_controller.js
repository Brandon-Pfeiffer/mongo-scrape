var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var router = express.Router();
var axios = require('axios');

var Article = require('../models/Article.js');
var Note = require('../models/note.js');

router.get("/", function(req, res) {

    axios.get("http://www.nytimes.com")
      .then(function(error, response, html) {

        var $ = cheerio.load(html);
        var result = {};

      $("article.story")
        .each(function(error, response) {

          result.title = $(this).find("h2.story-heading").text();
          result.link = $(this).find("a").attr("href");
          result.summary = $(this).find("p.summary").text();
          result.image = $(this).find("div.thumb").children().attr("href");
          result.author = $(this).find("p.byline").text();
          
       
          db.Article
          .create(result)
          .then(function(article) {
            console.log("loaded article", article);
            return res.refresh();
          })
          .catch(function(err) {
            res.send(err);
          });
        });
      });
  });
  
router.get("/articles", function(req, res){
db.Article
.find({}, function(err, data){
    if (err){ 
        console.log(err);
    } else {
        return res.json("index", {articles: data});
    }
});

router.get("/articles/:id", function(req, res) {
    db.Article.findOne({
        '_id': req.params.id
    })
        .populate("note").then(function(article) {

        console.log("Article", article);
        res.json(article);
        })

        .catch(function(err) {
            res.send(err);
        });
    });

router.post("/articles/:id", function(req, res) {
  db.Article.findOneandUpdate({
    '_id': req.params.id
  })
    .populate("note").then(function(article) {
      console.log("Article", article);
      return res.json(article);
    })
      .catch(function(err) {
        res.send(err);
      });
});