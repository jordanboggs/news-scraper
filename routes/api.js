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
};
