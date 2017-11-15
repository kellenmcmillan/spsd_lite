'use strict';
var logger = require('logfmt');

var twentySecondInterval = function(){
    logger.log({ info:'Clock Worker', message: "Another hour has gone by. What did you do with it?" });
}
setInterval(twentySecondInterval, 600000);

