const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    stars: {
        type: Number,
    },
    reviewUser: {
        type: String,
    },
    reviewHeader: {
        type: String,
    },
    reviewBody: {
        type: String,
    },
    itemID: Number,

});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
