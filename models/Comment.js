const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    body: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    trailId: String,
    dateCreated: String
});

module.exports = mongoose.model("Comment", CommentSchema);