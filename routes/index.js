const express = require('express');
const router = express.Router();
const db = require('../models')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This is just a Home route")
});

// router.get('/users', function (req, res, next) {
//   db.User.find({}, (err, allUsers) => {
//     if (err) return err;
//     res.json(allUsers)
//   })
//   // res.send("This is testing route")
// });

// router.get('/:id',
//   // TODO - check this function 
//   (req, res) => {
//     let userId = req.params.id;
//     db.User.findOne({
//       _id: userId
//     }, (err, foundUser) => {
//       if (err) {
//         console.log(err);
//       }
//       res.json(foundUser);
//     });
//   },

// )


module.exports = router;