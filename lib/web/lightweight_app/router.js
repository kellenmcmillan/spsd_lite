'use strict';
var express = require('express');
var enforce = require('express-sslify');
var logger = require('logfmt');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function lightweightRouter(app) {
	
	return new express.Router()

	//////////////////////// API Middleware
	.use(cors())
	.use(enforce.HTTPS({ trustProtoHeader: true }))
	.use(express.static('/app/lib/web/public'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	//////////////////////// API Middleware

	//////////////////////// Serve Angular App
	.get('*', function (request, response, next) {
		var options = {
			root: '/app/lib/web/public/',
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		response.sendFile('index.html', options, function (err) {
			if (err) {next(err);}
		});
	})
	//////////////////////// Serve Angular App

};
