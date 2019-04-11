const express = require('express');
const router = express.Router();
const db = require('../models')

module.exports = {
    createComment: (req, res) => {
        let newComment = {
            body: req.body.body,
            userId: req.body.user_id,
            trailId: req.body.trailId,
            dateCreated: req.body.dateCreated

        }
        db.Comment.create(newComment, (err, newCommentCreated) => {
            if (err) return err;
            res.json(newCommentCreated)
        })
    },

    getComment: (req, res) => {
        console.log("getting all comment")
        db.Comment.find({}, (err, newComment) => {
            if (err) return err;
            res.json(newComment)
        })
    },
}