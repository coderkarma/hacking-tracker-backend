const express = require('express');
const router = express.Router();
const axios = require('axios');
const controllers = require('../controllers')
const db = require('../models')


router.post('/', controllers.comment.createComment);
router.get('/', controllers.comment.getComment);
module.exports = router;