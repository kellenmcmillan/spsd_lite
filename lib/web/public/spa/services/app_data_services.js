'use strict';

var appDataService = angular.module('appDataService', ['ngResource', 'ngRoute']);

appDataService.factory('frontend', ['$resource',
function($resource){

    var query = function(){
    	var data = [
    		{
			    "interior_page_configs": [
			        {
			            "component_colors": {
			                "overlay_color": {
			                    "opaqueness": "dst",
			                    "property": "bg",
			                    "hue": "hn",
			                    "color": "p"
			                },
			                "text_color": {
			                    "opaqueness": "",
			                    "property": "text",
			                    "hue": "hdst",
			                    "color": "b"
			                },
			                "icon_color": {
			                    "opaqueness": "",
			                    "property": "text",
			                    "hue": "hn",
			                    "color": "p"
			                },
			                "background_color": {
			                    "opaqueness": "",
			                    "property": "bg",
			                    "hue": "hlst",
			                    "color": "b"
			                }
			            },
			            "component_page_data": {
			                "page_title": [
			                    "Unauthorized"
			                ]
			            },
			            "url": "/#/unauthorized",
			            "type": "error_page",
			            "name": "Unauthorized"
			        },
			        {
			            "component_colors": {
			                "overlay_color": {
			                    "opaqueness": "dst",
			                    "property": "bg",
			                    "hue": "hn",
			                    "color": "p"
			                },
			                "text_color": {
			                    "opaqueness": "",
			                    "property": "text",
			                    "hue": "hdst",
			                    "color": "b"
			                },
			                "icon_color": {
			                    "opaqueness": "",
			                    "property": "text",
			                    "hue": "hn",
			                    "color": "p"
			                },
			                "background_color": {
			                    "opaqueness": "",
			                    "property": "bg",
			                    "hue": "hlst",
			                    "color": "b"
			                }
			            },
			            "component_page_data": {
			                "page_title": [
			                    "Not Found"
			                ]
			            },
			            "url": "/#/not-found",
			            "type": "error_page",
			            "name": "404 Not Found"
			        }
			    ],
			    "home_page_configs": [
			        {
			            "enabled": true,
			            "type": "landing_page",
			            "name": "SPSD Home"
			        }
			    ],
			    "app_configs": {
			        "company_legal_name": "SPSD Inc.",
			        "name": "SPSD",
			        "site_name": "SPSD.com",
			        "address": {
			            "info": {
			                "street": "1108 107th Street",
			                "city": "Arlington",
			                "state": "TX",
			                "zipcode": "76011",
			                "ste": ""
			            },
			            "google_address_link": "https://www.google.com/maps/place/Site+Planning+Site+Development/@32.7624209,-97.0596739,17z/data=!4m13!1m7!3m6!1s0x864e87197b873ea1:0xd006f012897c78b5!2s1108+107th+St,+Arlington,+TX+76011!3b1!8m2!3d32.7624209!4d-97.0574852!3m4!1s0x864e87197bd9f1f3:0x3eeddf2c92d450d2!8m2!3d32.7625289!4d-97.0576733",
			            "google_map_widget": "https://snazzymaps.com/embed/6375"
			        },
			        "company_phone": "(817) 640-7962",
			        "graphic_logo_src": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/uploads/thumbs/spsd-logo.png",
			        "graphic_logo_src_white": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/uploads/thumbs/spsd-logo-white.png",
			        "use_graphic_logo": true,
			        "template": {
			            "name": "template_zero",
			            "version": "transparent header"
			        },
			        "roles": {
			            "support": {
			                "role_name": "Support",
			                "role_id": 1
			            },
			            "admin": {
			                "role_name": "Administrator",
			                "role_id": 2
			            },
			            "system_Manager": {
			                "role_name": "System Manager",
			                "role_id": 3
			            },
			            "staff_1": {
			                "role_name": "Staff 1",
			                "role_id": 4
			            },
			            "staff_2": {
			                "role_name": "Staff 2",
			                "role_id": 5
			            },
			            "staff_3": {
			                "role_name": "Staff 3",
			                "role_id": 6
			            },
			            "staff_4": {
			                "role_name": "Staff 4",
			                "role_id": 7
			            },
			            "staff_5": {
			                "role_name": "Staff 5",
			                "role_id": 8
			            },
			            "basic_user": {
			                "role_name": "Basic User",
			                "role_id": 9
			            },
			            "business_contact": {
			                "role_name": "Business Contact",
			                "role_id": 16
			            },
			            "client": {
			                "role_name": "Customer",
			                "role_id": 10
			            },
			            "prospect": {
			                "role_name": "Potential Customer",
			                "role_id": 11
			            },
			            "shareholder": {
			                "role_name": "Shareholder",
			                "role_id": 12
			            },
			            "vendor": {
			                "role_name": "Vendor",
			                "role_id": 13
			            },
			            "government_agent": {
			                "role_name": "Government Agent",
			                "role_id": 14
			            },
			            "regulatory_agent": {
			                "role_name": "Regulatory Agent",
			                "role_id": 15
			            }
			        },
			        "primary_navigation": [
			            {

			                "target": "_self",
			                "href": "/#/#mission",
			                "hash": "#/#mission",
			                "class": "material-icons",
			                "icon": "explore",
			                "name": "MISSION"
			            },
			            {

			                "target": "_self",
			                "href": "/#/#capabilities",
			                "class": "material-icons",
			                "hash": "#/#capabilities",
			                "icon": "build",
			                "name": "CAPABILITIES"
			            },
			            {

			                "target": "_self",
			                "href": "/#/#galleries",
			                "class": "material-icons",
			                "hash": "#/#galleries",
			                "icon": "photo_library",
			                "name": "GALLERIES"
			            },
			            {

			                "target": "_self",
			                "href": "/#/#locate-us",
			                "class": "material-icons",
			                "hash": "#/#locate-us",
			                "icon": "room",
			                "name": "LOCATE US"
			            },			            
			            {

			                "target": "_self",
			                "href": "/#/#contact",
			                "class": "material-icons",
			                "hash": "#/#contact",
			                "icon": "question_answer",
			                "name": "CONTACT US"
			            },
			            {

			                "target": "_self",
			                "href": "/meet-our-team",
			                "class": "material-icons",
			                "hash": null,
			                "icon": "work",
			                "name": "MEET OUR TEAM"
			            }
			        ],
			        "secondary_navigation": [
			            {

			                "target": "_self",
			                "href": "/",
			                "class": "material-icons",
			                "icon": "home",
			                "name": "HOME"
			            },
			            {

			                "target": "_self",
			                "href": "/capabilities/landscape-management",
			                "class": "material-icons",
			                "hash": null,
			                "icon": "build",
			                "name": "OUR CAPABILITIES"
			            },
			            {

			                "target": "_self",
			                "href": "/gallery",
			                "class": "material-icons",
			                "hash": null,
			                "icon": "photo_library",
			                "name": "ALL GALLERIES"
			            },
			            {

			                "target": "_self",
			                "href": "/meet-our-team",
			                "class": "material-icons",
			                "hash": null,
			                "icon": "work",
			                "name": "MEET OUR TEAM"
			            }
			        ],
			        "backend_navigation": [
			            {

			                "clearance_check": null,
			                "action": "",
			                "target": "_self",
			                "href": "/#/backend-suite/TaskRunner",
			                "class": "material-icons",
			                "icon": "assignment",
			                "name": "TASK RUNNER"
			            },
			            {

			                "clearance_check": null,
			                "action": "",
			                "target": "_self",
			                "href": "/#/backend/user_vault/user-list",
			                "class": "material-icons",
			                "icon": "face",
			                "name": "USER VAULT"
			            },
			            {

			                "clearance_check": null,
			                "action": "",
			                "target": "_self",
			                "href": "/#/backend/app_lab/editor",
			                "class": "material-icons",
			                "icon": "web",
			                "name": "APP LAB"
			            },
			            {
			                "clearance_check": null,
			                "action": "",
			                "target": "_self",
			                "href": "/#/backend/MediaVault",
			                "class": "material-icons",
			                "icon": "library_add",
			                "name": "MEDIA VAULT"
			            },
			            {
			                "clearance_check": null,
			                "action": "",
			                "target": "_self",
			                "href": "/#/backend/Support",
			                "class": "material-icons",
			                "icon": "help_outline",
			                "name": "CHAT SUPPORT"
			            }
			        ]
			    }
			}
    	];

    	return data;
    }
    
    return {query: query};
}]);

