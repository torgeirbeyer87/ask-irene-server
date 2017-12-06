'use strict';

// REQUIRE NODE MODULES
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// OWN REQUIREMENTS
const configurePassport = require('./helpers/passport');
const index = require('./routes/index');
const spots = require('./routes/spots');

const dotenv = require('dotenv');

// APP
const app = express();

dotenv.config();

// CONNECT TO MONGODB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- SETUP APP -- //
// CORS
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));
// SESSION
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'ask-irene',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 10000
  }
}));

// PASSPORT
const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.use('/', index);
app.use('/spots', spots);

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
