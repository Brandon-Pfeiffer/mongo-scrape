var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    image: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    summary: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }

});

var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;