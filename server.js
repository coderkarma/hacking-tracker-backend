const express = require('express');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
 const trailRouter = require('./routes/trails');
const cors = require('cors')
const app = express();

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




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trails', trailRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log("Listening on port 3001")
);