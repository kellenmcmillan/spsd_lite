'use strict';
var logger = require('logfmt');

var twentySecondInterval = function(){
    logger.log({ info:'Clock Worker', message: "Another 20 seconds have gone by. What did you do in them?" });
}
setInterval(twentySecondInterval, 20000);

