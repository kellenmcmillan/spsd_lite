var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var config = require('../config.js');
var redis = require('redis').createClient(config.redis_url);
var compression = require('compression');
var errors = require('./errors');
var logs = require('./logs');

// Router
var router = require('./router/router');

// Expose Express Served Angular client App To HTTP Server
module.exports = function Client(config) {

    var client = express();
    var errs = errors(config.verbose);

    client
    .use(compression())
    .use(bodyParser.json()) // for parsing application/json
    .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    .use(expressValidator());

    // Router
    client
    // .use(router(logic));
    .use(router());

    // Shared error handling
    client
    .use(errs.notFound)
    .use(errs.log)
    .use(errs.json)
    .use(errs.html);

  return client;

};
// Expose Express Served Angular client App To HTTP Server