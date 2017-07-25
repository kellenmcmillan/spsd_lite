'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var seedAuthData = require('./seed_auth.json');
var logger = require('logfmt');

module.exports = function createPermissionsDataModel(connection) {
var Schema = mongoose.Schema({

  support: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  admin: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  system_manager: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  staff1: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  staff2: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  staff3: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  staff4: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  staff5: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  basic_user: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  primary_business_contact: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  client: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  potential_client: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  shareholder: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  vendor: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  government_agent1: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  government_agent2: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  regulatory_agent1: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  },
  regulatory_agent2: {
    role_id: [{ type: Number, default: null}],
    alias: [{ type: String, default: null}]
  }

});

Schema.statics = {

  // get: function(){
  //   return new Promise(function(resolve, reject) {
  //     this.find({}, function(err, auth_permissions) {
  //       if (err) { return reject(err); }
  //       if (!auth_permissions) {
  //         return reject(done(null, false, { message: 'no permissions' }));
  //       }
  //       resolve(done(null, auth_permissions));
  //     });
  //   }.bind(this));
  // }

  // Use function arguments to create queries and/or conditions to search database

    get: function() {

      // logger.log({ type: 'info', msg: 'Checking If There Are Auth Configs' });

      

      // var seed_Data = function(){

      //   logger.log({ type: 'informative', msg: 'Starting auth Seed Function', service: 'mongodb' });

      //   PermissionsSchema.find({}).exec(function (err, data) {
      //     if (data.length === 0){
            
      //       seedData(seedAuthData); 

      //       logger.log({ type: 'informative', msg: 'Seeded Auth Database', service: 'mongodb' });
      //      }
      //   });

      //   function seedData(data){
          
      //     var permissions_data = new PermissionsSchema(); 
          
      //     permissions_data.support.role_id = data.support.role_id;
      //     permissions_data.support.alias = data.support.alias;
      //     permissions_data.admin.role_id = data.admin.role_id;
      //     permissions_data.admin.alias = data.admin.alias;
      //     permissions_data.system_manager.role_id = data.system_manager.role_id;
      //     permissions_data.system_manager.alias = data.system_manager.alias;
      //     permissions_data.staff1.role_id = data.staff1.role_id;
      //     permissions_data.staff1.alias = data.staff1.alias;
      //     permissions_data.staff2.role_id = data.staff2.role_id;
      //     permissions_data.staff2.alias = data.staff2.alias;
      //     permissions_data.staff3.role_id = data.staff3.role_id;
      //     permissions_data.staff3.alias = data.staff3.alias;
      //     permissions_data.staff4.role_id = data.staff4.role_id;
      //     permissions_data.staff4.alias = data.staff4.alias;
      //     permissions_data.staff5.role_id = data.staff5.role_id;
      //     permissions_data.staff5.alias = data.staff5.alias;
      //     permissions_data.basic_user.role_id = data.basic_user.role_id;
      //     permissions_data.basic_user.alias = data.basic_user.alias;
      //     permissions_data.primary_business_contact.role_id = data.primary_business_contact.role_id;
      //     permissions_data.primary_business_contact.alias = data.primary_business_contact.alias;
      //     permissions_data.client.role_id = data.client.role_id;
      //     permissions_data.client.alias = data.system_manager.alias;
      //     permissions_data.potential_client.role_id = data.potential_client.role_id;
      //     permissions_data.potential_client.alias = data.potential_client.alias;
      //     permissions_data.vendor.role_id = data.vendor.role_id;
      //     permissions_data.vendor.alias = data.vendor.alias;
      //     permissions_data.government_agent1.role_id = data.government_agent1.role_id;
      //     permissions_data.government_agent1.alias = data.government_agent1.alias;
      //     permissions_data.government_agent2.role_id = data.government_agent1.role_id;
      //     permissions_data.government_agent2.alias = data.government_agent2.alias;
      //     permissions_data.regulatory_agent1.role_id = data.regulatory_agent1.role_id;
      //     permissions_data.regulatory_agent1.alias = data.regulatory_agent1.alias;
      //     permissions_data.regulatory_agent2.role_id = data.regulatory_agent2.role_id;
      //     permissions_data.regulatory_agent2.alias = data.regulatory_agent2.alias;



      //     permissions_data.save(function(err, data){
      //       if (!err){
      //         logger.log({ type: 'informative', msg: 'Auth Seed Function Sucessessfully Saved', service: 'mongodb' });
      //       }else{
      //         console.log(err);
      //       }
      //     });
            
      //   }
      // }

      // seed_Data();

      return new Promise(function(resolve, reject) {
        this.find({}).exec(function(err, data) {
          logger.log({ type: 'info', msg: 'Searching For Auth Configs' });
          if (err) return reject(err);
          if (!data){
            logger.log({ type: 'info', msg: 'No Data Found' });
            
            return;
          }
          logger.log({ type: 'info', msg: 'Auth Configs Retrieval Completed' }); 
          resolve(data);
        });
        
      }.bind(this));
    }

  }

  Schema.methods = {
    seed_database: function(){
      //Initialize Seed
      beginSeed();
      //Initialize Seed
    }
  }

var PermissionsSchema = connection.model('Permissions', Schema);
return PermissionsSchema;
}