var logger = require('logfmt');
var cpus = require('os').cpus().length;
var http = require('http');
var throng = require('throng');
var config = require('./config');
var client = require('./client');

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

	createServer();

	function createServer() {
		logger.log({ message: 'creating server' });
		var server = http.createServer(client(config));
		process.on('SIGTERM', shutdown);
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
