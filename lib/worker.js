var http = require('http');
var logger = require('logfmt');
var throng = require('throng');
var config = require('./config');
var app = require('./app/task');

http.globalAgent.maxSockets = Infinity;
throng(start: start, { workers: config.worker_concurrency });

function start() {

  logger.log({
    type: 'info',
    message: 'starting worker process',
    concurrency: config.concurrency
  });

  var instance = app(config);
  instance.on('ready', beginWork);
  
  process.on('SIGTERM', shutdown);

  function beginWork() {
    instance.on('lost', shutdown);
    // instance.startScraping();
    logger.log({type:'info', message: 'worker started'});
  }

  function shutdown() {
    logger.log({ type: 'info', message: 'shutting worker down' });
    process.exit();
  }

}
