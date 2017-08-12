'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('/app/lib/app/user_model.js');
var config = require('/app/lib/config.js');

  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
  },
  function (email, password, done) {
    User.
    findOne({ 'personal_info.email': email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown email' });
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) { return done(err); }
        if(!isMatch) {
          return done(null, false, { message: 'Invalid password.' });
        }
        return done(null, user);
      });
    });
  }));
