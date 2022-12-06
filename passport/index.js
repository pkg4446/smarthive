const passport  = require('passport');
const local     = require('./localStrategy');
const User      = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.EMAIL);
  });

  passport.deserializeUser((EMAIL, done) => {
    User.findOne({ where: { EMAIL } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
