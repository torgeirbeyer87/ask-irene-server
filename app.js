'use strict';

// REAUIRE NODE MODULES
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// OWN REQUIREMENTS
const index = require('./routes/index');

// APP
const app = express();

// CONNECT TO MONGODB
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/ask-irene', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  res.status(err.status || 404);
  console.log(err, req.path, req.method);
  res.json({error: 'not found'});
  // next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: 'unexpexted error'});
});

module.exports = app;
