const express = require('express');
const router = express.Router();
const db = require('../models')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This is just a Home route")
});

router.get('/testing', function (req, res, next) {

  db.User.find({}, (err, allUsers) => {
    if (err) return err;
    res.json(allUsers)
  })
  // res.send("This is testing route")
});



module.exports = router;