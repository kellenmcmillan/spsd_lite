'use strict';

var Promise = require('bluebird');
var uuid = require('uuid');
var EventEmitter = require('events').EventEmitter;
var connections = require('./connections');
var TaskModel = require('./task_model');
var UserModel = require('./user_model');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('logfmt');
var jackrabbit = require('jackrabbit');
var CLOCK_TASK_DATABASE_QUEUE = 'jobs.clock';
var API_TASK_DATABASE_QUEUE = 'jobs.api';
var MESSAGING_QUEUE = 'jobs.messaging';
var IMAGE_PROCESSING_QUEUE = 'jobs.image_process';
var SAVE_DATA_QUEUE = 'jobs.save_data';

//App MongoDB & Rabbit.queueMQ Connection And Initialization
function App(config) {
  EventEmitter.call(this);

  this.config = config;
  this.connections = connections(config.mongo_url, config.rabbit_url);
  this.connections.once('ready', this.onConnected.bind(this));
  this.connections.once('lost', this.onLost.bind(this));
  this.User = UserModel(this.connections.db);
}
//App MongoDB & Rabbit.queueMQ Connection And Initialization


//Export App Object Available To Front-end Application Via Server And Configs
module.exports = function createApp(config) {
  return new App(config);
};
//Export App Object Available To Front-end Application Via Server And Configs


//Declare App Object
App.prototype = Object.create(EventEmitter.prototype);
//Declare App Object


//App Boot Up
App.prototype.onConnected = function(config) {

  logger.log({ info:'Queue Info', message: 'Attempting to create task queues' });
  
  var queues = 0;
  this.task_queue_exchange = jackrabbit(this.config.rabbit_url).default();
  this.Task = TaskModel(this.connections.db, this.config.mongo_cache);
  this.task_queue_exchange.queue({ name: 'IMAGE_PROCESSING_QUEUE', durable: true, prefetch: 5 });
  this.task_queue_exchange.queue({ name: 'MESSAGING_QUEUE', durable: true, prefetch: 5 });
  this.task_queue_exchange.queue({ name: 'CLOCK_TASK_DATABASE_QUEUE', durable: true, prefetch: 5 });
  this.task_queue_exchange.queue({ name: 'API_TASK_DATABASE_QUEUE', durable: true, prefetch: 5 });
  this.task_queue_exchange.queue({ name: 'SAVE_DATA_QUEUE', durable: true, prefetch: 5 });
  this.onReady();


}
//App Boot Up


//Acknowledge App Is Ready
App.prototype.onReady = function() {
  logger.log({ info:'Queue Info', message: 'Queues assumed to be created' });
  this.emit('ready');
};
//Acknowledge App Is Ready

//Acknowledge App Has Stopped
App.prototype.onLost = function() {
  this.emit('lost');
};
//Acknowledge App Has Stopped



///////////////////////////////////////////////////////////////////////////

// Clock Process has more steps because it first has to query the database to 
// find which tasks should be run. We'll need methods for:
// 1. Querying database based on conditions and store task results in an array
// 2. Determine which task.js method each task in the array should be processed with
// 3. Run each task in the array

// Add Jobs To Task Queue From clock.js clock process
App.prototype.clock_add_task_to_queue = function(task) {
  var id = uuid.v1();
  queue.publish(CLOCK_TASK_DATABASE_QUEUE, { id: id, conditions: conditions, taskName: taskName });
  return Promise.resolve(id);
};
// Add Jobs To Task Queue From clock.js

// Add Jobs To Image Processing Task Queue 
App.prototype.image_processing_task_queue = function(task) {
  var id = uuid.v1();
  queue.publish(IMAGE_PROCESSING_QUEUE, { id: id, conditions: conditions, taskName: taskName });
  return Promise.resolve(id);
};
// Add Jobs To Image Processing Task Queue

// User Sign Up Using Schema Static
App.prototype.user_signup = function(request) {
  return this.User.signup(request);
};
// User Sign Up Using Schema Static

// User Sign In Using Schema Static
App.prototype.signin = function(email, password, done) {
  return this.User.signin(email, password, done);
};
// User Sign In Using Schema Static

// Find User By ID Using Schema Static
App.prototype.find_by_id = function(id, cb) {
  return this.User.findById(id, cb);
};
// Find User By ID Using Schema Static

// Find Users Using Schema Static
App.prototype.find_users = function(conditional, opt, cb) {
  return this.User.find(conditional, opt, cb);
};
// Find Users Using Schema Static

//Queue Handles Database Task Job
App.prototype.handleClockInitiatedTasks = function() {

  this.connections.queue.handle(CLOCK_TASK_DATABASE_QUEUE, this.handleClockDatabaseQueryJob.bind(this));

  return this;

};
//Queue Handles Database Task Job

//Queue Handles Database Task Job
App.prototype.handleApiInitiatedTasks = function() {

  this.connections.queue.handle(API_TASK_DATABASE_QUEUE, this.handleApiEndpointJob.bind(this));

  return this;

};
//Queue Handles Database Task Job

///////////////////////////////////////////////////////////////////////////


// Need to determine if job will initiate another job
// Handle Clock Task Job Queue Method
App.prototype.runClockTask = function(taskName, id) {
  // variable holding the task object
  // variable holding types of tasks
  // Function handling type of task
  // Function executing task
};
// Handle Task Job Queue Method

// Need to determine if job will initiate another job
// Handle API Task Job Queue Method
App.prototype.runApiTask = function(taskName, id) {
  // variable holding the task object
  // variable holding types of tasks
  // Function handling type of task
  // Function executing task
};
// Handle Task Job Queue Method



///////////////////////////////////////////////////////////////////////////

//Queue Job Handler
App.prototype.handleClockDatabaseQueryJob = function(job, ack) {
  logger.log({ type: 'info', msg: 'handling database task scrape job', queue: CLOCK_TASK_DATABASE_QUEUE, url: job.url });
  //new method needed to "handle" tasks
  this
    .runClockTask(job.taskName, job.id, job.conditions)
    .then(onSuccess, onError);

  function onSuccess() {
    logger.log({ type: 'info', msg: 'job complete', status: 'success', url: job.url });
    ack();
  }

  function onError() {
    logger.log({ type: 'info', msg: 'job complete', status: 'failure', url: job.url });
    ack();
  }
};
//Queue Job Handler

//Queue Job Handler
App.prototype.handleApiEndpointJob = function(job, ack) {
  logger.log({ type: 'info', msg: 'handling database task scrape job', queue: API_TASK_DATABASE_QUEUE, url: job.url });
  //new method needed to "handle" tasks
  this
    .runApiTask(job.taskName, job.id, job.conditions)
    .then(onSuccess, onError);

  function onSuccess() {
    logger.log({ type: 'info', msg: 'job complete', status: 'success', url: job.url });
    ack();
  }

  function onError() {
    logger.log({ type: 'info', msg: 'job complete', status: 'failure', url: job.url });
    ack();
  }
};
//Queue Job Handler

///////////////////////////////////////////////////////////////////////////




//Job Handler
App.prototype.process_media_files = function(job, ack) {

  // this
  //   .image_processing_task_queue(job.userId, job.taskId)
  //   .then(onSuccess, onError);

  // function onSuccess() {
  //   ack();
  // }

  // function onError(err) {
  //   ack();
  // }
};
//Job Handler

//Job Handler
App.prototype.zip_media = function(job, ack) {

  // this
  //   .upvoteTask(job.userId, job.taskId)
  //   .then(onSuccess, onError);

  // function onSuccess() {
  //   ack();
  // }

  // function onError(err) {
  //   ack();
  // }
};
//Job Handler

//Job Handler
App.prototype.send_message = function(job, ack) {

  // this
  //   .upvoteTask(job.userId, job.taskId)
  //   .then(onSuccess, onError);

  // function onSuccess() {
  //   ack();
  // }

  // function onError(err) {
  //   ack();
  // }
};
//Job Handler

///////////////////////////////////////////////////////////////////////////

// // Empty Task Job Queue
// App.prototype.get_app_data = function() {

//   return new Promise(function(resolve, reject) {
//     this.connections.queue.purge(CLOCK_TASK_DATABASE_QUEUE, onPurge);

//     function onTaskRemoval(err, count) {
//       if (err) return reject(err);
//       resolve(count);
//     }
//   }.bind(this));
// };
// // Empty Task Job Queue

//Stop Job Handlers
App.prototype.stopScraping = function() {

  this.connections.queue.ignore(CLOCK_TASK_DATABASE_QUEUE);

  return this;

};
//Stop Job Handler


//Functions That Aid In Handling Jobs

App.prototype.deleteAllTasks = function() {
  return this.Task.deleteAll();
};

//Functions That Aid In Handling Jobs
