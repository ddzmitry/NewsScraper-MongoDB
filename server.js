var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path")
mongoose.Promise = Promise;

var PORT = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/giphyscraper";

// Connect
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Ready to serve! ");
  }
});



app.use(bodyParser.urlencoded({ extended: false }));
//Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

const routes = require("./routes/routs.js");


app.use('/', routes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});