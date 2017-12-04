var express = require('express');
var logger = require('logfmt');

module.exports = function Controller(verbose) {

  	return {
	    notFound: notFound,
	    log: logError,
	    json: jsonError,
	    html: htmlError
  	};

	function notFound(request, response, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	}

  function logError(err, request, response, next) {
    if (err.status === 404 && !verbose) {
      	return next(err);
    }
    logger.log({
      	type: 'error',
      	msg: err.message + ' - lightweight error logging' || 'middleware error',
      	err: err.stack || 'no stack trace available'
    });
    next(err);
  }

  function jsonError(err, request, response, next) {
    if (request.path.slice(-5) !== '.json') return next(err);
    if (!request.accepts('application/json')) return next(err);
    response
    .status(err.status || 500)
    .json({ message: err.message + ' - lightweight error logging' || 'Something went wrong!' });
  }

  function htmlError(err, request, response, next) {
    response
      .status(err.status || 500)
      .send(err.message + ' - lightweight error logging' || 'Something went wrong!');
  }
};
