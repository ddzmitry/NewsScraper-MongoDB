// Require mongoose
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
let ArticleSchema = new Schema({
    // title is a required string
    headline: {
        type: String,
        required: true,
        unique : true
    },
    // link is a required string
    link: {
        type: String,
        required: true,
        unique : true
    },

    snippet: {
        type: String,
        required: true,
        unique : true
    },

});

// Create the Article model with the ArticleSchema
let Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
