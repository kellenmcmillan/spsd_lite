'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var timestamps = require('mongoose-timestamp');
var Promise = require('bluebird');
var SALT_WORK_FACTOR = 10;
var errors = require('./errors');
var logger = require('logfmt');

module.exports = function createUserDataModel(connection) {
var Schema = mongoose.Schema({

  local: {
	password: String
  },
  google: {
	id: String,
	acessToken: String
  },
  personal_info: { 
	firstname: String,
	lastname: { type: String, default: null },
	email: {type: String, default: null}, 
	avatar: { type: String, default: null },
	birthday: { type: String, default: null }, 
	phone: { type: String, default: null },  
	address: {
	  street: { type: String, default: null },
	  city: { type: String, default: null },
	  state: { type: String, default: null },
	  zip: { type: String, default: null }
	}
  },
  role: {
	alias: { type: String, default: 'Basic User' },
	role_id: { type: Number, default: 9 }
  },
  security_clearance: {
	permissions: {
		backend: { type: Boolean, default: false },
	  	app_lab: { type: Boolean, default: false },
	  	user_vault: { type: Boolean, default: false },
	  	task_runner: { type: Boolean, default: false },
	  	front_desk: { type: Boolean, default: false },
	  	media_vault: { type: Boolean, default: false }
	}
  },
  file_vault: [
	{
	  file_name: { type: String, default: null},
	  file_properties: {
		file_size: { type: String, default: null},
		file_dimensions: { type: String, default: null},
		file_type: { type: String, default: null},
		file_location: { type: String, default: null},
		file_created: { type: Date, default: null },
		file_created_by: {type: String, default: null},
		file_modified: { type: Date, default: null}
	  }
	}
  ],
  notifications: [
	{ 
	  notification_message: { type: String, default: null},
	  notification_properties: {
		from: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
		subject: { type: String, default: null },
		notification_link: [{ type: String, default: null }],
		notification_receipt_confirmation: { type: Boolean, default: null },
		notification_received: { type: Date, default: null }
	  }
	}
  ],
  current_services: [
	{
	  service_name: {type: String, default: null},
	  service_type: {type: String, default: null},
	  billing_amount: {type: String, default: null},
	  billing_date: {type: Date, default: null}
	}
  ],
  billing_history: [
	{
	  service_name: { type: String, default: null },
	  service_type: { type: String, default: null },
	  billing_amount: { type: String, default: null },
	  bill_paid_on: { type: Date, default: null}
	}
  ],
  purchase_history: [
	{
	  product_name: { type: String, default: null },
	  product_type: { type: String, default: null },
	  product_amount: { type: String, default: null },
	  product_purchased_on: { type: Date, default: null}
	}
  ],
  _tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'task'},
  _secondaryUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  _primaryUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] 

}); 

Schema.plugin(timestamps);

/**
 * Add toJSON option to transform document before returnig the result
 */
Schema.options.toJSON = {};
Schema.options.toJSON.transform = function (doc, ret, options) {
  // remove sensitive data
	if (ret.local) {
	  delete ret.local.password;
	}
	if (ret.google) {
	  delete ret.google.accessToken;
	}
  return ret;
}

/**
 * Pre-save hook for password validation and hashing
 */
Schema.pre('save', function(next){ 
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('local.password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	if (err) return next(err);

	// hash the password along with our new salt
	bcrypt.hash(user.local.password, salt, function(err, hash) {
	  if (err) return next(err);
 
	  // override the cleartext password with the hashed one
	  user.local.password = hash;
	  next();
	});
  });
});

Schema.statics = {

  signup: function(request) {

	return new Promise(function(resolve, reject) {
	var email = request.body.email;
	var password = request.body.password;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;
	var phone = request.body.phone;
	if(!email || !email.length) {
		logger.log({ info:'Signup Info', message: 'Error Email Invalid' });
		return reject();
	}
	if(!password || !password.length) {
		logger.log({ info:'Signup Info', message: 'Error Password Invalid' });
		return reject();
	}

	this.findOne({ 'personal_info.email': email }, function (err, user) {
		if (err) { 
			logger.log({ info:'Signup Info', message: 'Error Checking If Email Exists: ' +  err });
			return reject(err); 
		}
		if (user) {
			logger.log({ info:'Signup Info', message: 'Error Email Already Used' });
			return reject();
		}
		user = new UserSchema();
		user.personal_info.email = email;
		user.personal_info.firstname = firstname;
		user.personal_info.lastname = lastname;
		user.personal_info.phone = phone;
		user.local.password = password;
		user.save(onSave);

		function onSave(err, user) {
		  if (err) {
		  	logger.log({ info:'Signup Info', message: 'Error Saving: ' + err });
		  	return reject();
		  } 
		  resolve(user);
		}

	  });
	}.bind(this));
  },

  signin: function(email, password, done){
	return new Promise(function(resolve, reject) {
	  this.findOne({ 'personal_info.email': email }, function(err, user) {
		if (err) { return reject(err); }
		if (!user) {
		  return reject(done(null, false, { message: 'Unknown email' }));
		}
		user.comparePassword(password, function (err, isMatch) {
		  if (err) { return reject(done(err)); }
		  if(!isMatch) {
			reject(done(null, false, { message: 'Invalid password.' }));
		  }
		  resolve(done(null, user));
		});
	  });
	}.bind(this));
  }
};

Schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt
  .compare(candidatePassword, this.local.password, function(err, isMatch) {
	  if (err) return cb(err);
	  cb(null, isMatch);
  });
}

var UserSchema = connection.model('User', Schema);
return UserSchema;
}