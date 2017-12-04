'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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

//Google Strategy
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        if (err) { return done(err); }
        if (user) { return done(null, user); }
        if (!user) {

            // create a new user
            user = new User();

            user.google.id = profile.id;
            user.personal_info.firstname = profile.name.givenName;
            user.personal_info.lastname = profile.name.familyName;
            user.personal_info.email = profile.emails[0].value;
            user.google.accessToken = accessToken;

            user.save(function (err) {
                if (err) { return done(err); }
                return done(null, user);
            });
        }
    });
}));
