'use strict';
var express = require('express');
var enforce = require('express-sslify');
var logger = require('logfmt');
var fs = require('fs');
//Load Firebase Admin SDK
var admin = require("firebase-admin");
// Fetch the service account key JSON file contents
var serviceAccount = require("../../serviceAccountKey.json");

// module.exports = function lightweightRouter(app) {
module.exports = function lightweightRouter() {

	////////////////////////////////////// Lightweight Router //////////////////////////////////////
	
	return new express.Router()

	//////////////////////// API Middleware
	.use(enforce.HTTPS({ trustProtoHeader: true }))
	.use(express.static('/app/lib/client/app'))
	//////////////////////// API Middleware

	//////////////////////// Angular App Data
	// .get('/api/router/appData', getAppData)
	//////////////////////// Angular App Data

	//////////////////////// Serve Angular App
	.get('*', function (request, response, next) {
		var options = {
			root: '/app/lib/client/app/',
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
