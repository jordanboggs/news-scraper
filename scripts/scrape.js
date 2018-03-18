// Scraping tools
const axios   = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('../models');

// Scrape Polygon.com to populate database with headlines and links
function scrape(req, res) {
  axios.get("http://www.polygon.com")
  .then(function(response) {
    const $ = cheerio.load(response.data);
  
    $("a[data-analytics-link='article']").each(function(i, element) {
      let result = {};
  
      // Add title and link from each article
      result.link = $(this).attr("href");
      result.title = $(this).text();
  
      // Create a new Headline from result object
      db.Headline.create(result)
      .then(function(dbHeadline) {
        console.log(dbHeadline);
      })
      .catch(function(err) {
        return res.json(err);
      });
    });
  });
}

module.exports = scrape;
