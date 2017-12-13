var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
var config = require('../config.js');
var User = require('/app/lib/app/user_model.js');
var client = require('redis').createClient(config.redis_url);
// var express_sessions = require('./oAuth/sessions.js');
// var session = require('cookie-session');
var compression = require('compression');
var application = require('/app/lib/app/task');
var app_layer = application(config);

// Shared modules and middleware
var errors = require('./errors');
var logs = require('./logs');

// Routers
// var users = require('./users/router');
var api_router = require('./lightweight_app/router');

// Constants
var thirty = 1800000;

// Expose Express Served Angular Web App To HTTP Server
module.exports = function Web(app, config) {

    var web = express();
    var errs = errors(config.verbose);

  // Shared middleware
    web
    .use(compression())
    .use(bodyParser.json()) // for parsing application/json
    .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    .use(expressValidator())
    // .use(session({ secret: config.cookie_secret, maxAge: thirty }))
    // .use(express_sessions(config.redis_url, config.cookie_secret))
    // .use(passport.initialize())
    // .use(passport.session());
    
    // Passport Strategies
    // require('/app/lib/app/passport_strategies.js');
    // Passport Strategies

    // passport.serializeUser(function(user, done) {
    //   done(null, user.id);
    // });

    // passport.deserializeUser(function(id, done) {
    //   app_layer.find_by_id(id, function(err, user) {
    //     done(err, user);
    //   });
    // });

    // Routers
    web
    .use(api_router(app));

    // Shared error handling
    web
    .use(errs.notFound)
    .use(errs.log)
    .use(errs.json)
    .use(errs.html);
  return web;

};
// Expose Express Served Angular Web App To HTTP Server