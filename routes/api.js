// Require all models
const db = require('../models');
const scrape = require('../scripts/scrape');

module.exports = function(app) {
  // Scrape Polygon.com
  app.get("/scrape", function(req, res) {
    scrape(req, res);
    res.json("Scrape successful.");
  });

  // Populate page with Headlines
  app.get("/headlines", function(req, res) {
    db.Headline.find({})
    .then((dbHeadline) => res.json(dbHeadline))
    .catch((err) => res.json(err));
  });

  // Route for grabbing specific Headline by id, populate with its note
  app.get("/headlines/:id", function(req, res) {
    db.Headline.find({
      _id: req.params.id
    })
    .populate("note")
    .then((dbHeadline) => res.json(dbHeadline))
    .catch((err) => res.json(err));
  });
};
