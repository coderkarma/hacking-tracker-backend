const
  express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  controllers = require('../controllers')


router.post('/signup', controllers.user.signup);
router.post('/login', controllers.user.login)

// router.use((req, res, next) => {
//   console.log('activated')
//   const bearerHeader = req.headers['authorization'];
//   console.log('triggered token check', bearerHeader)

//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     let verified = jwt.verify(req.token, 'waffles');
//     console.log('here is the verified', verified)
//     req.userId = verified._id //set user id for routes to use
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// })

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', controllers.user.index)
// router.get('/', controllers.user.show)

// Get one user
// FIXME: not able to do user by id 
router.get("/:id", controllers.user.show);
// Update a user
// FIXME: User is not able to update by id
router.put("/:id", controllers.user.update);
router.delete('/:id', controllers.user.delete)

module.exports = router;