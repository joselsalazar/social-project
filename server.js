// Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

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

// Remote Host Connection (Goes Below)

// ===================================

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});