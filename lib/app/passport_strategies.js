'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connections = require('./connections');
var User = require('./user_model.js');
var config = require('/app/lib/config.js');
var taskModule = require('./task');
var taskRunner = taskModule(config);

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
},
function (email, password, done) {
    taskRunner
    .signin(email, password, done);
}));
