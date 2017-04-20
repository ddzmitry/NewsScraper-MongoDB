// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
const Schema = mongoose.Schema;

// Create the Note schema
let NoteSchema = new Schema({

    _ArticleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    // Just a string
    title: {
        type: String
    },
    // Just a string
    body: {
        type: String
    },
    // ref to article
    date: {
        type: String
    }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
let Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;

