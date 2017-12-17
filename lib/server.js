var logger = require('logfmt');
var cpus = require('os').cpus().length;
var http = require('http');
var throng = require('throng');
var config = require('./config');
var app = require('./app/task');
var web = require('./web');
var passport = require('passport');
var User = require('./app/user_model.js');

// serialize user into session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// deseriallize user
passport.deserializeUser(function(id, done) {
	app.find_by_id(id, function(err, user) {
		done(err, user);
	});
}); 

http.globalAgent.maxSockets = Infinity;
throng({ workers: config.concurrency, start: start });

function start() {
	logger.log({
		type: 'info',
		message: 'starting server',
		concurrency: config.concurrency,
		thrifty: config.thrifty,
		timeout: config.timeout,
		busy_ms: config.busy_ms
	});

	var instance = app(config);
	instance.on('ready', createServer);
	instance.on('lost', abort);

	function createServer() {
		logger.log({ message: 'creating server' });
		// if (config.thrifty) instance.startScraping();
		var server = http.createServer(web(instance, config));

		process.on('SIGTERM', shutdown);

		instance
		.removeListener('lost', abort)
		.on('lost', shutdown);

		server.listen(config.port, onListen);

		function onListen() {
			logger.log({ type: 'info', message: 'listening', port: server.address().port });
		}

		function shutdown() {
			logger.log({ type: 'info', message: 'shutting down' });
			server.close(function() {
				logger.log({ type: 'info', message: 'exiting' });
				process.exit();
			});
		}
	}

	function abort() {
		logger.log({ type: 'info', message: 'shutting down', abort: true });
		process.exit();
	}
}
