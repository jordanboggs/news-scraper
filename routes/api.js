// Scraping tools
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('../models');

module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    axios.get("http://www.polygon.com")
    .then(function(response) {
      const $ = cheerio.load(response.data);

      $("a[data-analytics-link='article']").each(function(i, element) {
        let result = {};

        // Add title and link from each article
        result.title = $(this).attr("href");
        result.link = $(this).text();

        // Create a new Headline from result object
        db.Headline.create(result)
        .then(function(dbHeadline) {
          console.log(dbHeadline);
        })
        .catch(function(err) {
          return res.json(err);
        });
      });

      // If successful
      res.send("Success");
    })
  })
};
