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
			            "quaternary_standard_container": {
			                "component_editable_feature_buttons": [
			                    {
			                        "icon": "add",
			                        "view": {
			                            "Screen": "Add_Assets"
			                        }
			                    },
			                    {
			                        "icon": "edit",
			                        "view": {
			                            "Screen": "Plain_Text_Editor"
			                        }
			                    },
			                    {
			                        "icon": "color_lens",
			                        "view": {
			                            "Screen": "Color_Editor"
			                        }
			                    }
			                ],
			                "component_colors": {
			                    "text_color": {
			                        "opaqueness": "",
			                        "property": "txt",
			                        "hue": "hlst",
			                        "color": "b"
			                    },
			                    "border_color": {
			                        "opaqueness": "",
			                        "property": "bdr",
			                        "hue": "hlst",
			                        "color": "b"
			                    },
			                    "background_color": {
			                        "opaqueness": "dst",
			                        "property": "bg",
			                        "hue": "hdst",
			                        "color": "b"
			                    }
			                },
			                "component_background_media": {
			                    "video": {
			                        "ogg": null,
			                        "mp4": null
			                    },
			                    "image": {
			                        "thumbnail": null,
			                        "portrait": null,
			                        "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan7-hi-res.jpg"
			                    },
			                    "media_type": "image"
			                },
			                "component_data": {
			                    "url": "/#/#featured-galleries",
			                    "text": null,
			                    "title": [
			                        "Featured Galleries"
			                    ]
			                }
			            },
			            "primary_standard_container": {
			                "component_editable_feature_buttons": [
			                    {
			                        "icon": "edit",
			                        "view": {
			                            "Screen": "Plain_Text_Editor"
			                        }
			                    },
			                    {
			                        "icon": "color_lens",
			                        "view": {
			                            "Screen": "Color_Editor"
			                        }
			                    }
			                ],
			                "component_colors": {
			                    "icon_color": {
			                        "opaqueness": null,
			                        "property": null,
			                        "hue": null,
			                        "color": null
			                    },
			                    "text_color": {
			                        "opaqueness": "",
			                        "property": "txt",
			                        "hue": "hdst",
			                        "color": "b"
			                    },
			                    "background_color": {
			                        "opaqueness": null,
			                        "property": "bg",
			                        "hue": "hlst",
			                        "color": "b"
			                    }
			                },
			                "component_background_media": {
			                    "video": {
			                        "ogg": null,
			                        "mp4": null
			                    },
			                    "image": {
			                        "thumbnail": null,
			                        "portrait": null,
			                        "landscape": null
			                    },
			                    "media_type": null
			                },
			                "component_data": {
			                    "image": [
			                        {
			                            "type": "image",
			                            "alt": "An image showing one of our maintenance jobs",
			                            "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capabilities/landscapeConstruction4-landscape.jpg",
			                            "portrait": null,
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capabilities/landscapeConstruction4-landscape.jpg"
			                        }
			                    ],
			                    "text": [
			                        "​Our Mission is to partner with Fair, Equitable and Enjoyable clients and team members while fostering a culture of extreme ownership of individual and team duties at all levels of the company. Step by Step, we strive to maintain the clients vision, from the building stage to complete landscape management.",
			                    ],
			                    "tagline": [],
			                    "title": [
			                        "Our Mission"
			                    ]
			                },
			                "url": null
			            },
			            "primary_contact": {
			                "component_data": {
			                    "title": [
			                        "Contact Us"
			                    ],
			                    "text": [
			                        "Come On. Don't be shy. We're Texans, and we're in the area. We're not gonna bite. Promise."
			                    ],
			                    "url": null
			                },
			                "component_colors": {
			                    "background_color": {
			                        "color": "b",
			                        "hue": "hlst",
			                        "property": "bg",
			                        "opaqueness": null
			                    },
			                    "border_color": {
			                        "color": "b",
			                        "hue": "hlst",
			                        "property": "bdr",
			                        "opaqueness": ""
			                    },
			                    "text_color": {
			                        "color": "b",
			                        "hue": "hdst",
			                        "property": "txt",
			                        "opaqueness": ""
			                    }
			                },
			                "component_editable_feature_buttons": [
			                    {
			                        "icon": "edit",
			                        "view": {
			                            "Screen": "Plain_Text_Editor"
			                        }
			                    },
			                    {
			                        "icon": "color_lens",
			                        "view": {
			                            "Screen": "Color_Editor"
			                        }
			                    }
			                ]
			            },
			            "primary_slideshow_hero": {
			                "component_editable_feature_buttons": [
			                    {
			                        "icon": "add",

			                        "view": {
			                            "Screen": "Add_Assets"
			                        }
			                    },
			                    {
			                        "icon": "photo_library",

			                        "view": {
			                            "Screen": "Asset_List"
			                        }
			                    },
			                    {
			                        "icon": "schedule",

			                        "view": {
			                            "Screen": "Timer"
			                        }
			                    }
			                ],
			                "component_transition_speed": 6000,
			                "component_data": {
			                    "slides": [
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Lewisville, TX",
			                            "title": "Wayne Ferguson Plaza",
			                            "alt": "Wayne Ferguson Plaza",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson6-hi-res.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Dallas, TX",
			                            "title": "Hilton Hotel",
			                            "alt": "Maintenance work at the Hilton",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown1-hi-res.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Dallas, TX",
			                            "title": "R + D Kitchen",
			                            "alt": "An image of R + D Kitchen",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/hi-res/rdKitchen1-hi-res.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Farmers Branch, TX",
			                            "title": "Brickyard",
			                            "alt": "An image of landscaping at Brickyard Apartments in Farmers Branch",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard1-hi-res.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Dallas, TX",
			                            "title": "Routh Street Flats",
			                            "alt": "An image of landscaping at Routh Street Flats in Dallas",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/hi-res/routhStreetFlats1-hi-res.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Lewisville, TX",
			                            "title": "Discovery At The Realm",
			                            "alt": "An image of landscaping at Discovery At The Realm in Lewisville",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm5-hi-res.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Fort Worth, TX",
			                            "title": "Sundance Square",
			                            "alt": "An image of landscaping at Sundance Square in Fort Worth",
			                            "type": "image",
			                            "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare1-hi-res.jpg"
			                        }
			                    ],
			                    "slideshow_controls": "false"
			                }
			            },
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
			        "graphic_logo_src": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/brand/spsd-logo.png",
			        "graphic_logo_src_white": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/brand/spsd-logo-white.png",
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
			            // {
			            //     "target": "_self",
			            //     "href": "/#/#welcome",
			            //     "class": "material-icons",
			            //     "icon": "home",
			            //     "name": "WELCOME"
			            // },
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
			                "icon": "work",
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
			                "hash": "#/#capabilities",
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
			                "href": "/#/backend-suite/MediaVault",
			                "class": "material-icons",
			                "icon": "library_add",
			                "name": "MEDIA VAULT"
			            },
			            {
			                "clearance_check": null,
			                "action": "",
			                "target": "_self",
			                "href": "/#/backend-suite/Support",
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

