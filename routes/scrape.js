var express = require("express");
var cheerio = require("cheerio");
const router = express.Router();
var request = require("request");
router.get("/", function(req, res) {
    // First, we grab the body of the html with request
    request("http://www.nytimes.com", function(error, response, html) {

        var articles = [];

        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        // Now, we grab every h2 within an article tag, and do the following:
        // console.log(html)

        $(' div .result').each(function(i, element) {

            //$(this).find('.jobtitle').attr('title')
            // $(this).find('.summary').text()
            console.log($(this).find('span').html())
        })

    });
    // Tell the browser that we finished scraping the text
    res.send('Poop');

});


module.exports = router;