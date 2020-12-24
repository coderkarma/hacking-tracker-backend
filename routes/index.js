const express = require('express');
const router = express.Router();
const db = require('../models');
const path = require('path');

router.get('/', function (req, res, next) {
	res.json({});
});

module.exports = router;
