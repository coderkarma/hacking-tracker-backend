const express = require('express');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const trailRouter = require('./routes/trails');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors())
// 1app.use(express.static(__dirname + '.'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));



app.use((req, res, next) => {
  console.log('request header or x token', req.headers['x-token'])
  // check the header of the req
  console.log('inside the check')
  if (req.headers['x-token'] === undefined) {
    res.locals.userData = null;
    next();
  } else {
    jwt.verify(req.headers['x-token'], 'waffles', function (err, decoded) {
      if (err) {
        console.log('errors')
        res.locals.userData = null;
        next();
      } else {
        console.log(decoded)
        res.locals.userData = decoded
        next();
      }

    });
  }

});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trails', trailRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log("Listening on port 3001")
);