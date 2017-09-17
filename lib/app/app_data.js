'use strict';

var mongoose = require('mongoose');
var cache = require('cachegoose');
var timestamps = require('mongoose-timestamp');
var crypto = require('crypto');
var logger = require('logfmt');
var superagent = require('superagent');
var Promise = require('bluebird');
var component_data_seeds = require('./app_data/index--hero-slideshow.json');
module.exports = function componentModel(connection) {

var Schema = mongoose.Schema({
	configs: {
		name: { type: String, default: null },
		type: { type: String, default: null },
		layout: { type: String, default: null },
		columns: {
			has: { type: Boolean, default: false },
			number: { type: Number, default: null }
		},
		rows: {
			has: { type: Boolean, default: false },
			number: { type: Number, default: null }
		},
		tabs: {
			has: { type: Boolean, default: false },
			number: { type: Number, default: null }
		},
		panels: {
			has: { type: Boolean, default: false },
			number: { type: Number, default: null }
		},
		lists: {
			has: { type: Boolean, default: false },
			number: { type: Number, default: null }
		},
		editable_features: [{ type: String, default: null }]
	},
	data: {
		title: { type: String, default: null },
		banner: { type: String, default: null },
		content: {
			columns: [
				{
					title: { type: String, default: null },
					images: [
						{
							src: { type: String, default: null },
							name: { type: String, default: null },
							alt: { type: String, default: null }
						}
					],
					content_order: [{ type: String, default: null }],
					text: [{ type: String, default: null }],
					lists: [{ type: String, default: null }],
					date: { type: String, default: null },
					icon: { type: String, default: null },
					class: { type: String, default: null }
				}
			],
			rows: [
				{
					title: { type: String, default: null },
					images: [
						{
							src: { type: String, default: null },
							name: { type: String, default: null },
							alt: { type: String, default: null }
						}
					],
					content_order: [{ type: String, default: null }],
					text: [{ type: String, default: null }],
					lists: [{ type: String, default: null }],
					date: { type: String, default: null },
					icon: { type: String, default: null },
					class: { type: String, default: null }
				}
			],
			tabs: [
				{
					title: { type: String, default: null },
					param: { type: String, default: null },
					images: [
						{
							src: { type: String, default: null },
							name: { type: String, default: null },
							alt: { type: String, default: null }
						}
					],
					content_order: [{ type: String, default: null }],
					text: [{ type: String, default: null }],
					lists: [{ type: String, default: null }],
					date: { type: String, default: null },
					icon: { type: String, default: null },
					class: { type: String, default: null }
				}
			],
			panels: [
				{
					title: { type: String, default: null },
					param: { type: String, default: null },
					images: [
						{
							src: { type: String, default: null },
							name: { type: String, default: null },
							alt: { type: String, default: null }
						}
					],
					content_order: [{ type: String, default: null }],
					text: [{ type: String, default: null }],
					lists: [{ type: String, default: null }],
					date: { type: String, default: null },
					icon: { type: String, default: null },
					class: { type: String, default: null }
				}
			],
			default: [
				{
					title: { type: String, default: null },
					param: { type: String, default: null },
					images: [
						{
							src: { type: String, default: null },
							name: { type: String, default: null },
							alt: { type: String, default: null }
						}
					],
					content_order: [{ type: String, default: null }],
					text: [{ type: String, default: null }],
					lists: [{ type: String, default: null }],
					date: { type: String, default: null },
					icon: { type: String, default: null },
					class: { type: String, default: null }
				}
			],
			lists: [
				{
					settings: {
						name: { type: String, default: null },
						param: { type: String, default: null },
						transition_speed: 6000,
						controls: { type: String, default: null },
						is_featured: { type: String, default: null },
						description: { type: String, default: null }
					},
					content: [
						{
							avatar: { type: String, default: null },
							icon: { type: String, default: null },
							name: { type: String, default: null },
							work_title: { type: String, default: null },
							alt: { type: String, default: null },
							type: { type: String, default: null },
							is_cover: { type: String, default: null },
							has_description: { type: String, default: null },
							description: { type: String, default: null },
							location: { type: String, default: null },
							tabline: { type: String, default: null },
							thumbnail: { type: String, default: null },
							landscape: { type: String, default: null },
							hi_res: { type: String, default: null },
							call_to_action: { type: String, default: null }
						}
					]
				}
			],
			background_media: {
				video: {
					ogg: { type: String, default: null },
					mp4: { type: String, default: null }
				},
				image: {
					thumbnail: { type: String, default: null },
					portrait: { type: String, default: null },
					landscape: { type: String, default: null }
				},
				media_type: { type: String, default: null }
			}
		},
		paint: {
			background: {
				color: { type: String, default: null },
				hue: { type: String, default: null },
				property: { type: String, default: null },
				opaqueness: { type: String, default: null }
			},
			icon: {
				color: { type: String, default: null },
				hue: { type: String, default: null },
				property: { type: String, default: null },
				opaqueness: { type: String, default: null }
			},
			text: {
				color: { type: String, default: null },
				hue: { type: String, default: null },
				property: { type: String, default: null },
				opaqueness: { type: String, default: null }
			},
			overlay: {
				color: { type: String, default: null },
				hue: { type: String, default: null },
				property: { type: String, default: null },
				opaqueness: { type: String, default: null }
			},
			border: {
				color: { type: String, default: null },
				hue: { type: String, default: null },
				property: { type: String, default: null },
				opaqueness: { type: String, default: null }
			}
		}
	}
});

Schema.statics = {
	get: function() {
		logger.log({ type: 'info', msg: 'Checking If There Is Data' });
		var seed_Data = function(){
			logger.log({ type: 'informative', msg: 'Starting Seed Function', service: 'mongodb' });
			component.find({}).exec(function (err, data) {
				if (data.length === 0){
				seedData(component_data_seeds);
				logger.log({ type: 'informative', msg: 'Successfully Seeded Database', service: 'mongodb' }); 
				}
			});
			function seedData(data){
				var component = new component(); 
				component.app_configs = data.app_configs;
				component.home_page_configs = data.home_page_configs;
				component.interior_page_configs = data.interior_page_configs;
				component.save(function(err, data){
					if (!err){
						logger.log({ type: 'informative', msg: 'seed data saved', service: 'mongodb' });
					}else{
						logger.log({ type: 'informative', msg: 'error seeding data', service: 'mongodb' });
					}
				});
			}
		}
		seed_Data();
		return new Promise(function(resolve, reject) {
			logger.log({ type: 'info', msg: 'Data Resource Request Received' });
			this.find({}).exec(function(err, data) {
				logger.log({ type: 'info', msg: 'Searching For Data' });
				if (err) return reject(err);
				if (!data){
					logger.log({ type: 'info', msg: 'No Data Found' });
					return null;
				}
				logger.log({ type: 'info', msg: 'Data Retrieval Completed And Sent' }); 
				resolve(data);
			});
		}.bind(this));
	}
}

Schema.methods = {
	seed_database: function(){
		beginSeed();
	}
}

Schema.plugin(timestamps);

var component = connection.model('component', Schema);

return component;

}