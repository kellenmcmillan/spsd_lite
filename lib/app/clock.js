'use strict';
var logger = require('logfmt');
//OnInterval
// var twentySecondInterval = function(){
//     console.log("Another 20 seconds have gone by. What did you do in them?");
// }
// setInterval(twentySecondInterval, 20000);

var probe_database = function() {
  logger.log({ info:'Clock Worker', message: 'Clock Process Ran Successfully' });
}

var probe = require('cron').CronJob;
new probe({
  cronTime: "* * * * * *", /* Runs every weekday and Saturday (Monday through Saturday) at 11:30:00 AM. It does not run on Sunday. */
  onTick: probe_database,
  start: true,
  timeZone: "America/Los_Angeles"
});

probe.start();