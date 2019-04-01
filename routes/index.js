const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This is just a HOME route Karma!!! peace")
});



module.exports = router;