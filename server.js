const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');
const mongoose   = require('mongoose');

const PORT = process.env.PORT || 3000;

// Initialize express
const app = express();

// Config middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling for submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve public folder as static directory
app.use(express.static("public"));

// Configure mongo for Heroku or dev environment
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";

// Tell mongoose to return Promises
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Require all models
var db = require("./models");

// Routes
// Include all routes
require('./routes/index')(app);

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
