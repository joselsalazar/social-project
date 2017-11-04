// Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Express
// =================================
var app = express();
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Route
app.use(express.static("public"));
// ===================================

// MongoDB Connections
// =================================
// Local Host Connection
mongoose.connect("mongodb://localhost/social-project", {
    useMongoClient: true
  });


// Remote Host Connection (Goes Below)


var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ===================================

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});