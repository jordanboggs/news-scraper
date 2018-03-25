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
    db.Headline.find({}).sort({created_at: -1})
    .then((dbHeadline) => res.json(dbHeadline))
    .catch((err) => res.json(err));
  });

  // Route for grabbing specific Headline by id, populate with its note
  app.get("/headlines/:id", function(req, res) {
    db.Headline.find({
      _id: req.params.id
    })
    .populate("notes")
    .then((dbHeadline) => res.json(dbHeadline))
    .catch((err) => res.json(err));
  });

  // Route for posting a Note associated with a Headline
  app.post("/headlines/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Headline.findOneAndUpdate({
        _id: req.params.id,
      }, {
        $push: {
          notes: dbNote._id
        }
      }, {
        new: true
      });
    })
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch((err) => res.json(err));
  });

  // Route for deleting a Note
  app.post("/notes/:id", function(req, res) {
    db.Note.deleteOne({
      _id: req.params.id
    })
    .then((dbNotes) => res.json(dbNotes))
    .catch((err) => res.json(err));
  });
};
