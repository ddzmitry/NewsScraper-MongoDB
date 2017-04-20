const express = require("express");
const cheerio = require("cheerio");
const request = require("request");



let ScrapeFunction = (cb) =>  {
    // First, we grab the body of the html with request
    request("https://news.google.com/", function(error, response, html) {
        // we grab our html from google
        let articlesTotal = [];
        let $ = cheerio.load(html);
        //find our news article
        $('div .blended-wrapper').each(function(){

                    // console.log($(this).find('h2').text())
                    // console.log($(this).find('h2').children('a').attr('href'))
                    // console.log($(this).find('.esc-lead-snippet-wrapper').text())


            //create object that !IMPORTANT KEYS Are exact like in Article Model , so when we generate data
            //we keep it consistent that point it is easier to interract with it on the controller side!
            let articleBody ={
                        headline : $(this).find('h2').text(),
                        link : $(this).find('h2').children('a').attr('href'),
                        snippet : $(this).find('.esc-lead-snippet-wrapper').text()
            };
            articlesTotal.push(articleBody)
        });

        //send all array of data via callback function!
        cb(articlesTotal);
    });
}

module.exports = ScrapeFunction;



