'use strict';

var mongoose = require('mongoose');
var cache = require('cachegoose');
var timestamps = require('mongoose-timestamp');
var crypto = require('crypto');
var logger = require('logfmt');
var superagent = require('superagent');
var Promise = require('bluebird');
var seedAppData = require('./seed_data.json');
module.exports = function createAppDataModel(connection) {

  // Monkey-patch Mongoose to support in-memory caching for 10s
  // cache.install(mongoose, {
  //   max: 50,
  //   maxAge: maxAge
  // });

  var Schema = mongoose.Schema({
    app_configs: {
      company_legal_name: { type: String, default: null },
      name: { type: String, default: null },
      site_name: { type: String, default: null },
      address: {
      info: {
        street: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        zipcode: { type: String, default: null },
        ste: { type: String, default: null } 
      },
      google_address_link: { type: String, default: null },
      google_map_widget: { type: String, default: null },
      },
      graphic_logo_src: { type: String, default: null },
      graphic_logo_src_white: { type: String, default: null },
      use_graphic_logo: { type: Boolean, default: false },
      template: {
        name: { type: String, default: null },
        version: { type: String, default: null },
      },
      primary_navigation: [
        {
          name: {type: String, default: null},
          icon: {type: String, default: null},
          class: {type: String, default: null},
          href: {type: String, default: null},
          target: {type: String, default: null}
        }
      ],
      backend_navigation: [
        {
          name: {type: String, default: null},
          icon: {type: String, default: null},
          class: {type: String, default: null},
          href: {type: String, default: null},
          target: {type: String, default: null},
          action: {type: String, default: null},
          clearance_check: {type: String, default: null}
        }
      ]
    },
    home_page_configs: [
      {
        name: {type: String, default: null},
        type: {type: String, default: null},
        enabled: {type: Boolean, default: null},
        primary_slideshow_hero: {
          component_data: {
            slideshow_controls: {type: String, default: true},
            slides: [
              {
                landscape: {type: String, default: null},
                type: {type: String, default: null},
                alt: {type: String, default: null},
                title: {type: String, default: null},
                tagline: {type: String, default: null},
                description: {type: String, default: null},
                background: {type: String, default: null},
                no_textual_content: {type: Boolean, default: null},
                no_description: {type: Boolean, default: null}
              }
            ]
          },
          component_transition_speed: {type: Number, default: 6000},
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        quaternary_standard_container: {
          url: {type: String, default: null},
          component_data: {
            title: [{type: String, default: null}],
            tagline: [{type: String, default: null}],
            text: [{type: String, default: null}],
            image: [
              {
                landscape: {type: String, default: null},
                portrait: {type: String, default: null},
                thumbnail: {type: String, default: null},
                alt: {type: String, default: null},
                type: {type: String, default: null}
              }
            ]
          },
          component_background_media: {
            media_type: {type: String, default: null},
            image: {
              landscape: {type: String, default: null},
              portrait: {type: String, default: null},
              thumbnail: {type: String, default: null}
            },
            video: {
              mp4: {type: String, default: null},
              ogg: {type: String, default: null}
            }
          },
          component_colors: {
            background_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            },
            text_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            },
            icon_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        primary_contact: {
          url: {type: String, default: null},
          component_data: {
            title: [{type: String, default: null}],
            tagline: [{type: String, default: null}],
            text: [{type: String, default: null}],
            image: [
              {
                landscape: {type: String, default: null},
                portrait: {type: String, default: null},
                thumbnail: {type: String, default: null},
                alt: {type: String, default: null},
                type: {type: String, default: null}
              }
            ]
          },
          component_background_media: {
            media_type: {type: String, default: null},
            image: {
              landscape: {type: String, default: null},
              portrait: {type: String, default: null},
              thumbnail: {type: String, default: null}
            },
            video: {
              mp4: {type: String, default: null},
              ogg: {type: String, default: null}
            }
          },
          component_colors: {
            background_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            },
            text_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            },
            icon_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        primary_standard_container: {
          component_data: {
            title: [{type: String, default: null}],
            text: [{type: String, default: null}],
            url: {type: String, default: null}
          },
          component_background_media: {
            media_type: {type: String, default: null},
            image: {
              landscape: {type: String, default: null},
              portrait: {type: String, default: null},
              thumbnail: {type: String, default: null}
            },
            video: {
              mp4: {type: String, default: null},
              ogg: {type: String, default: null}
            }
          },
          component_colors: {
            background_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            border_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            text_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        primary_gallery: {
          component_data: {
            galleries: [
              {
                title: {type: String, default: null},
                description: {type: String, default: null},
                is_featured: {type: Boolean, default: false},
                images: [
                  {
                    landscape: {type: String, default: null},
                    thumbnail: {type: String, default: null},
                    is_cover_image: {type: Boolean, default: false},
                    type: {type: String, default: null},
                    alt: {type: String, default: null}
                  }
                ]
              }
            ]
          },
          component_colors: {
            border_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            text_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            background_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        secondary_standard_container: {
          url: {type: String, default: null},
          component_data: {
            title: [{type: String, default: null}],
            tagline: [{type: String, default: null}],
            text: [{type: String, default: null}]
          },
          component_background_media: {
            media_type: {type: String, default: null},
            image: {
              landscape: {type: String, default: null},
              portrait: {type: String, default: null},
              thumbnail: {type: String, default: null}
            },
            video: {
              mp4: {type: String, default: null},
              ogg: {type: String, default: null}
            }
          },
          component_colors: {
            background_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            },
            text_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            },
            icon_color: {
                color: {type: String, default: null},
                hue: {type: String, default: null},
                property: {type: String, default: null},
                opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        primary_blog_feed: {
          component_data: [{
            title: [{type: String, default: null}],
            tagline: {type: String, default: null},
            date: {type: String, default: null},
            text: [{type: String, default: null}]
          }],
          component_background_media: [{
            media_type: {type: String, default: null},
            image: {
              landscape: {type: String, default: null},
              portrait: {type: String, default: null},
              thumbnail: {type: String, default: null}
            },
            video: {
              mp4: {type: String, default: null},
              ogg: {type: String, default: null}
            }
          }],
          component_colors: {
            background_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            border_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            text_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        },
        tertiary_standard_container: {
          component_data: {
            title: [{type: String, default: null}],
            tagline: [{type: String, default: null}],
            text: [{type: String, default: null}]
          },
          component_background_media: {
            media_type: {type: String, default: null},
            image: {
              landscape: {type: String, default: null},
              portrait: {type: String, default: null},
              thumbnail: {type: String, default: null}
            },
            video: {
              mp4: {type: String, default: null},
              ogg: {type: String, default: null}
            }
          },
          component_colors: {
            background_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              Property: {type: String, default: null},
              Opaqueness: {type: String, default: null}
            },
            icon_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            },
            text_color: {
              color: {type: String, default: null},
              hue: {type: String, default: null},
              property: {type: String, default: null},
              opaqueness: {type: String, default: null}
            }
          },
          component_editable_feature_buttons: [ 
            {
              icon: String,
              view: {
                Screen: String
              }
            }
          ]
        }
      }
    ],
    interior_page_configs: [
      {
        name: {type: String, default: null},
        type: {type: String, default: null},
        url: {type: String, default: null},
        component_page_data: {
          page_title: [{type: String, default: null}]
        },
        component_colors: {
          background_color: {
            color: {type: String, default: null},
            hue: {type: String, default: null},
            property: {type: String, default: null},
            opaqueness: {type: String, default: null}
          },
          icon_color: {
            color: {type: String, default: null},
            hue: {type: String, default: null},
            property: {type: String, default: null},
            opaqueness: {type: String, default: null}
          },
          text_color: {
            color: {type: String, default: null},
            hue: {type: String, default: null},
            property: {type: String, default: null},
            opaqueness: {type: String, default: null}
          },
          overlay_color: {
            color: {type: String, default: null},
            hue: {type: String, default: null},
            property: {type: String, default: null},
            opaqueness: {type: String, default: null}     
          }
        }
      }
    ]
  });

  Schema.statics = {

  // Use function arguments to create queries and/or conditions to search database

    get: function() {

      // logger.log({ type: 'info', msg: 'Checking If There Is Data' });

      

      // var seed_Data = function(){

      //   logger.log({ type: 'informative', msg: 'Starting Seed Function', service: 'mongodb' });

      //   app_data.find({}).exec(function (err, data) {
      //     if (data.length === 0){
            
      //       seedData(seedAppData); 

      //       console.log('Successfully Seeded Database');
      //      }
      //   });

      //   function seedData(data){
          
      //     var appData = new app_data(); 
          
      //     appData.app_configs = data.app_configs;
      //     appData.home_page_configs = data.home_page_configs;
      //     appData.interior_page_configs = data.interior_page_configs;

      //     appData.save(function(err, data){
      //       if (!err){
      //         console.log('data saved');
      //       }else{
      //         console.log(err);
      //       }
      //     });
            
      //   }
      // }

      // seed_Data();

      return new Promise(function(resolve, reject) {
        logger.log({ type: 'info', msg: 'Data Resource Request Received' });
        this.find({}).exec(function(err, data) {
          logger.log({ type: 'info', msg: 'Searching For Data' });
          if (err) return reject(err);
          if (!data){
            logger.log({ type: 'info', msg: 'No Data Found' });
            return reject("no data");
          }
          logger.log({ type: 'info', msg: 'Data Retrieval Completed And Sent' }); 
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

  Schema.virtual

  Schema.plugin(timestamps);

  // Schema.virtual('voteCount').get(function getVoteCount() {
  //   return this.votes.length;
  // });

  // Schema.set('toJSON', {
  //   getters: true,
  //   transform: function safeTransform(doc, ret, options) {
  //     delete ret.votes;
  //   }
  // });

  // Schema.statics = {

  //   scrape: function(userId, id, url) {
  //     return new Promise(function(resolve, reject) {
  //       var Article = this;

  //       superagent
  //         .get(url)
  //         .on('error', reject)
  //         .end(onResponse);

  //       function onResponse(res) {
  //         var summary = summarize(res.text, 10);
  //         if (!summary.ok) return reject(new errors.ScrapeFailed());
  //         new Article({ _id: id, url: url, votes: [userId] })
  //           .set(summary)
  //           .save(onSave);
  //       }

  //       function onSave(err, article) {
  //         if (err) {
  //           logger.log({ type: 'error', msg: 'could not save', url: url, error: err });
  //           return reject(err);
  //         }
  //         logger.log({ type: 'info', msg: 'saved article', id: article.id, url: article.url, votes: article.votes });
  //         return resolve(article);
  //       }

  //     }.bind(this));
  //   },

  //   get: function(id) {
  //     return new Promise(function(resolve, reject) {
  //       this.findById(id).exec(function(err, article) {
  //         if (err) return reject(err);
  //         if (!article) return reject(new errors.ArticleNotFound());
  //         resolve(article);
  //       });
  //     }.bind(this));
  //   },
    
  //   deleteAll: function() {
  //     return new Promise(function(resolve, reject) {
  //       this.remove().exec(function(err) {
  //         if (err) return reject(err);
  //         resolve();
  //       });
  //     }.bind(this));
  //   },

  //   voteFor: function(userId, articleId) {
  //     return this.get(articleId).then(vote, notFound);

  //     function vote(article) {
  //       return article.addVote(userId).then(success, failure);
  //     }

  //     function notFound(err) {
  //       return Promise.reject(new errors.ArticleNotFound());
  //     }

  //     function success(article) {
  //       return Promise.resolve(article.forUser(userId));
  //     }

  //     function failure(err) {
  //       return Promise.reject(err);
  //     }
  //   }
  // };



  // Schema.methods = {

  //   addVote: function(userId) {
  //     return new Promise(function(resolve, reject) {
  //       if (this.votes.indexOf(userId) !== -1) {
  //         return reject(new errors.VoteNotAllowed());
  //       }

  //       this.votes.push(userId);
  //       this.save(onSave);

  //       function onSave(err, article) {
  //         if (err) return reject(err);
  //         resolve(article);
  //       }
  //     }.bind(this));
  //   },

  //   // Use function arguments to create queries and/or conditions to search database
  //   query_tasks: function(userId, n, fresh) {
  //     return new Promise(function(resolve, reject) {
  //       this.find()
  //         .sort('-createdAt')
  //         .limit(n || 50)
  //         .cache(!fresh)
  //         .exec(onArticles);

  //       function onArticles(err, articles) {
  //         if (err) return reject(err);
  //         resolve(articles.sort(byScore).map(toUser));
  //       }
  //     }.bind(this));

  //     function toUser(article) {
  //       return article.forUser(userId);
  //     }

  //     function byScore(a, b) {
  //       return b.getScore() - a.getScore();
  //     }
  //   },

  //   forUser: function(userId) {
  //     var obj = this.toJSON();
  //     obj.canVote = (this.votes.indexOf(userId) === -1);
  //     return obj;
  //   }

  // };

  var app_data = connection.model('app_data', Schema);
  return app_data;
}