// Scraping tools
const axios   = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('../models');

// Scrape waypoint.vice.com to populate database with headlines, descriptions
// and links
function scrape(req, res) {
  axios.get("https://waypoint.vice.com/en_us")
  .then(function(response) {
    // Set up Cheerio
    const $ = cheerio.load(response.data);
    $("a.grid__wrapper__card").each(function(i, element) {
      let result = {};
      
      // Populate result object
      result.link       = "https://waypoint.vice.com" + $(element).attr("href");
      result.title      = $(element).find("h2").text();
      result.description = $(element).find(".grid__wrapper__card__text__summary").text();

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
