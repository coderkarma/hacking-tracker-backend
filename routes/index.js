const express = require('express');
const router = express.Router();
const db = require('../models')
const path = require('path')
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('zzzzzzzzzzz');
  res.sendFile(path.join(__dirname, "../public/build", "index.html"));
});


module.exports = router;