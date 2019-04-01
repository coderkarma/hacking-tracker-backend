import mongoose from 'mongoose';

const mongoose = require('mongoose');

let CommentSchema = new Schema({
    title: String,
    body: String
});

module.exports = mongoose.model("Comment", CommentSchema);