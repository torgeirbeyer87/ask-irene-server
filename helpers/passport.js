const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user').User;

function configurePassport () {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    user = user ? new User(user) : null;
    done(null, user);
  });

  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(null, false, {
          message: 'Incorrect username'
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: 'Incorrect password'
        });
      }

      return next(null, user);
    });
  }));

  return passport;
}

module.exports = configurePassport;
