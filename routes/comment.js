
const express = require('express');
const router = express.Router();
const axios = require('axios');
const controllers = require('../controllers')
const db = require('../models')


router.post('/comment', controllers.comment.createComment);
module.exports = router;