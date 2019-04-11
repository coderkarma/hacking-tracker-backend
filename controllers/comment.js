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

    updateComment: (req, res) => {
        let userId = req.params.id;
        console.log(req.body)
        db.Comment.findOneAndUpdate({
                _id: userId
            },
            req.body, {
                new: true
            },
            (err, updatedComment) => {
                if (err) {
                    console.log(err);
                }
                res.json(updatedComment);
            }
        );
    },
}