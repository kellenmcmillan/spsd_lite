'use strict';

var appDataService = angular.module('appDataService', ['ngResource', 'ngRoute']);

appDataService.factory('frontend', ['$resource',
function($resource){
    // return $resource('/api/router/appData', {}, {
    //     query: {method:'GET', isArray: true}
    // });
    var query = function(){
    	var data = [
    		{
			    "interior_page_configs": [
			    	{
			            "name": "Capabilities",
			            "type": "service_page",
			            "url": "/#/capabilities",
			            "enabled": true,
			            "component_page_data": {
			                "page_title": ["CAPABILITIES"],
			                // "starting_panel": "Landscape Management",
			                "page_navigation_icon": "view_list",
			                "page_navigation_title": "SECTION",
			                "shrinking_title_image": "/assets/portfolios/carpenter-renovation/landscape/carpenterRenovation5-landscape.jpg",
			                "content": [
			                    {
			                        "name": "Landscape Management",
			                        "param": "landscape-management",
			                        "images": [
				                        {
				                            "src": "/assets/portfolios/maintenance-jobs/landscape/maintenanceJobs2-landscape.jpg",
				                            "name": "Landscape Management",
				                            "alt": ""
				                        },
				                        {
				                            "src": "/assets/portfolios/monaco-pool/landscape/monacoPool1-landscape.jpg",
				                            "name": "Monaco Pool",
				                            "alt": ""
				                        },
				                        {
				                            "src": "/assets/portfolios/maintenance-jobs/landscape/maintenanceJobs2-landscape.jpg",
				                            "name": "Landscape Management",
				                            "alt": ""
				                        }
			                        ],
			                        "text": ["SPSD manages every component of landscape care for a variety of customers. Our staff has over 30 years of experience in every aspect of landscape – Horticulture, Irrigation and Water Management, Fertilization and Chemical Applications and Landscape Architecture. Through an extensive analysis of your landscape, you can expect a high quality service from our landscape management professionals to uphold your property to attract people and increase your overall value!<br><br>SPSD understands once you place your trust in us, you want your landscape investment to be maintained well and hassle-free. Our staff will work to exceed your expectations and look for cost-saving ways to enhance the appearance and value of your asset.  Additionally, our quality landscape construction capabilities can accommodate all expansion and future renovation needs you might have."],
			                        "lists": ["<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Landscape Installation</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i> Site Drainage and Retainage</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i> Landscape Enhancements Through Renovations and Plantings</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i> Seasonal Color</span></li>"],
			                        "className": "landscape-management"
			                    },
			                    {
			                        "name": "Landscape Construction",
			                        "param": "landscape-construction",
			                        "images": [
				                        {
				                            "src": "/assets/portfolios/monaco-pool/landscape/monacoPool1-landscape.jpg",
				                            "name": "Monaco Pool",
				                            "alt": ""
				                        },
				                        {
				                            "src": "/assets/portfolios/maintenance-jobs/landscape/maintenanceJobs2-landscape.jpg",
				                            "name": "Landscape Management",
				                            "alt": ""
				                        },
				                        {
				                            "src": "/assets/portfolios/monaco-pool/landscape/monacoPool1-landscape.jpg",
				                            "name": "Monaco Pool",
				                            "alt": ""
				                        }
			                        ],
			                        "text": ["With over 30 years of operations, SPSD has built a team of quality construction managers, field superintendents and subcontractors who are skilled to take on various types of projects.<br><br>Our Weekly Services Include:"],
			                        "lists": ["<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Pools, Fountains, Bath Houses, &amp; Spas</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Outdoor Living Spaces</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Amenity Centers, &amp; Clubhouses</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Sport Courts &amp; Recreational Facilities</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Overhead Structures, Trellis &amp; Arbors</span></li>"],
			                        "className": "specialty-construction"
			                    },
			                    {
			                        "name": "Natural Stone Work",
			                        "param": "natural-stone-work",
			                        "images": [
				                        {
				                            "src": "/assets/portfolios/old-town/landscape/oldTown3-landscape.jpg",
				                            "name": "Center Street Entryway",
				                            "alt": ""
				                        },
				                        {
				                            "src": "/assets/portfolios/monaco-pool/landscape/monacoPool1-landscape.jpg",
				                            "name": "Monaco Pool",
				                            "alt": ""
				                        }
			                        ],
			                        "text": ["With over 30 years of operations, SPSD has built a team of quality construction managers, field superintendents and subcontractors who are skilled to take on various types of projects.<br><br>Our Weekly Services Include:"],
			                        "lists": ["<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i>Landscape Installation</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i> Site Drainage and Retainage</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i> Landscape Enhancements Through Renovations and Plantings</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">navigate_next</i> Seasonal Color</span></li>"],
			                        "className": "construction-enhancements"
			                    }
			                ]
			            },
			            "component_colors": {
			                "background_color": {
			                    "color": "b",
			                    "hue": "hlst",
			                    "property": "bg",
			                    "opaqueness": ""
			                },
			                "icon_color": {
			                    "color": "p",
			                    "hue": "hn",
			                    "property": "text",
			                    "opaqueness": ""
			                },
			                "text_color": {
			                    "color": "b",
			                    "hue": "hdst",
			                    "property": "text",
			                    "opaqueness": ""
			                },
			                "overlay_color": {
			                    "color": "p",
			                    "hue": "hn",
			                    "property": "bg",
			                    "opaqueness": "dst"         
			                }
			            },
			            "component_editable_feature_buttons": [
			                {
			                    "icon": "dashboard",
			                    "view": {
			                        "Screen": "Internal_Page_Editor"
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
			            ]
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
			            "tertiary_standard_container": {
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
			                    "text_color": {
			                        "opaqueness": "",
			                        "property": "txt",
			                        "hue": "hlst",
			                        "color": "b"
			                    },
			                    "icon_color": {
			                        "opaqueness": null,
			                        "property": null,
			                        "hue": null,
			                        "color": null
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
			                        "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/brand/truck.jpg"
			                    },
			                    "media_type": "image"
			                },
			                "component_data": {
			                    "text": null,
			                    "tagline": null,
			                    "title": [
			                        "Locate Us"
			                    ]
			                }
			            },
			            "our_team": {
			                "component_data": {     
			                    "title": "Our Team",
			                    "staff_members": [
			                        {
			                            "avatar_image": "local_florist",
			                            "background_icon_type": "mdl",
			                            "background_icon_class": "material-icons",
			                            "name": "Stewart",
			                            "position": "Owner",
			                            "text": "SPSD manages every component of landscape care for a variety of customers.  Our staff has over 30 years of experience in every aspect of landscape – Horticulture, Irrigation and Water Management, Fertilization and Chemical Applications and Landscape Architecture."
			                        },
			                        {
			                            "avatar_image": "opacity",
			                            "background_icon_type": "mdl",
			                            "background_icon_class": "material-icons",
			                            "name": "Lisa",
			                            "position": "Managing Director",
			                            "text": "Water is a precious resource and yet reliable and efficient irrigation is critical to a well manicured landscape. Therefore, SPSD installs the most advanced irrigation systems on the market today."
			                        },
			                        {
			                            "avatar_image": "landscape",
			                            "background_icon_type": "mdl",
			                            "background_icon_class": "material-icons",
			                            "name": "Larson",
			                            "position": "Director of Business Development",
			                            "text": "Site Surveyor, Cost Analyst, Bid Strategist, Project Coordinator, Manages Raw Material Procurement."
			                        },
			                        {
			                            "avatar_image": "hot_tub",
			                            "background_icon_type": "mdl",
			                            "background_icon_class": "material-icons",
			                            "name": "Jimmy",
			                            "position": "Project Supervisor",
			                            "text": "Our services include: Pools, Fountains, Spas and Outdoor Living Spaces Amenity Centers, Clubhouses, Bath Houses Sport Courts, Recreational Facilities Overhead Structures, Trellis..."
			                        },
			                        {
			                            "avatar_image":"update",
			                            "background_icon_type": "mdl",
			                            "background_icon_class": "material-icons",
			                            "name": "Chris",
			                            "position": "Cartographer",
			                            "text": "Receive daily updates on your project's progress. Stay up-to-date and informed from ground breaking up until the last stone is laid."
			                        },
			                        {
			                            "avatar_image":"forum",
			                            "background_icon_type": "mdl",
			                            "background_icon_class": "material-icons",
			                            "name": "Tracy",
			                            "position": "Marketing Director",
			                            "text": "Instantly reach out to any member of our staff with questions, comments, concerns, or praise anytime. We welcome your feedback, and would not be the organization we are today without it."
			                        }
			                    ]
			                },
			                "component_colors": {
			                    "background_color": {
			                        "color": "b",
			                        "hue": "hlst",
			                        "property": "bg",
			                        "opaqueness": ""
			                    },
			                    "text_color": {
			                        "color": "b",
			                        "hue": "hdr",
			                        "property": "txt",
			                        "opaqueness": ""
			                    },
			                    "icon_color": {
			                        "color": "b",
			                        "hue": "hlst",
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
			            "featured_products": {
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
			                        "opaqueness": "lst",
			                        "property": "bg",
			                        "hue": "hlr",
			                        "color": "b"
			                    }
			                },
			                "component_background_media": [
			                    {
			                        "video": {
			                            "ogg": null,
			                            "mp4": null
			                        },
			                        "image": {
			                            "thumbnail": null,
			                            "portrait": null,
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/maintenance-jobs/landscape/maintenanceJobs1-landscape.jpg"
			                        },
			                        "media_type": "image"
			                    },
			                    {
			                        "video": {
			                            "ogg": null,
			                            "mp4": null
			                        },
			                        "image": {
			                            "thumbnail": null,
			                            "portrait": null,
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/landscape/monacoPool3-landscape.jpg"
			                        },
			                        "media_type": "image"
			                    },
			                    {
			                        "video": {
			                            "ogg": null,
			                            "mp4": null
			                        },
			                        "image": {
			                            "thumbnail": null,
			                            "portrait": null,
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown1-landscape.jpg"
			                        },
			                        "media_type": "image"
			                    }
			                ],
			                "component_data": [
			                    {
			                        "text": [
			                            "<b>Some Of Our Services:<\/b><br>&bull;&nbsp;&nbsp;Water Management / Irrigation<br>&bull;&nbsp;&nbsp;Seasonal Landscaping"
			                        ],
			                        "tagline": null,
			                        "param": "landscape-management",
			                        "title": [
			                            "Landscape Management"
			                        ],
			                        "date": "7/20/2017",
			                        "icon": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/icons/mower.png"
			                    },
			                    {
			                        "text": [
			                            "<b>Some Of Our Services:<\/b><br>&bull;&nbsp;&nbsp;Infinity Pools / Zero Edge Pools<br>&bull;&nbsp;&nbsp;Pond, Waterfall &amp; Stream Construction"
			                        ],
			                        "tagline": null,
			                        "param": "landscape-construction",
			                        "title": [
			                            "Landscape Construction"
			                        ],
			                        "date": "8/16/17",
			                        "icon": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/icons/excavator.png"
			                    },
			                    {
			                        "text": [
			                            "<b>Some Of Our Services:<\/b><br>&bull;&nbsp;&nbsp;Natural Stone Retaining Walls<br>&bull;&nbsp;&nbsp;Natural Hardscapes"
			                        ],
			                        "tagline": null,
			                        "param": "natural-stone-work",
			                        "title": [
			                            "Natural Stone"
			                        ],
			                        "date": "8/16/17",
			                        "icon": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/icons/crane.png"
			                    }
			                ],
			                "url": "/#/#capabilities",
			                "title": "CAPABILITIES",
			            },
			            "secondary_standard_container": {
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
			                    "icon_color": {
			                        "opaqueness": null,
			                        "property": null,
			                        "hue": null,
			                        "color": null
			                    },
			                    "text_color": {
			                        "opaqueness": "",
			                        "property": "txt",
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
			                        "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown10-landscape.jpg"
			                    },
			                    "media_type": "image"
			                },
			                "component_data": {
			                    "text": null,
			                    "tagline": null,
			                    "title": [
			                        "Serving DFW for 35 Years"
			                    ]
			                },
			                "url": "/#/#capabilities"
			            },
			            "primary_gallery": {
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
			                        "icon": "color_lens",
			                        "view": {
			                            "Screen": "Color_Editor"
			                        }
			                    }
			                ],
			                "component_colors": {
			                    "background_color": {
			                        "opaqueness": "",
			                        "property": "bg",
			                        "hue": "hlr",
			                        "color": "b"
			                    },
			                    "text_color": {
			                        "opaqueness": "",
			                        "property": "text",
			                        "hue": "hdst",
			                        "color": "b"
			                    },
			                    "border_color": {
			                        "opaqueness": null,
			                        "property": null,
			                        "hue": null,
			                        "color": null
			                    }
			                },
			                "component_data": {
			                    "galleries": [
			                        {
			                            "images": [
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands1-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands2-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands3-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands4-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands5-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands6-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands7-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands8-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Arlington Highlands Artisan Creek",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/thumbs/arlingtonHighlands9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/arlington-highlands/landscape/arlingtonHighlands9-landscape.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Arlington, TX",
			                            "title": "Arlington Highlands",
			                            "url_param": "arlington-highlands"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Bob Jones Nature Center",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/thumbs/bob-jones1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/landscape/bob-jones1-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of Bob Jones Nature Center",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/thumbs/bob-jones2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/landscape/bob-jones2-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of Bob Jones Nature Center",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/thumbs/bob-jones3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/landscape/bob-jones3-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of Bob Jones Nature Center",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/thumbs/bob-jones4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/landscape/bob-jones4-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of Bob Jones Nature Center",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/thumbs/bob-jones5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/landscape/bob-jones5-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of Bob Jones Nature Center",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/thumbs/bob-jones6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/bob-jones/landscape/bob-jones6-landscape.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Arlington, TX",
			                            "title": "Bob Jones Nature Center",
			                            "url_param": "bob-jones-nature-center"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "Capital One Bank",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/thumbs/capitalOne1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/landscape/capitalOne1-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Capital One Bank",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/thumbs/capitalOne2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/landscape/capitalOne2-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Capital One Bank",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/thumbs/capitalOne3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/landscape/capitalOne3-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Capital One Bank",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/thumbs/capitalOne4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capital-one/landscape/capitalOne4-landscape.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Dallas, TX",
			                            "title": "Capital One",
			                            "url_param": "capital-one"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown1-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown2-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown3-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown4-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown5-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown6-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown7-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown8-landscape.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/thumbs/oldTown9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown9-landscape.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Arlington, TX",
			                            "title": "Wayne Ferguson Plaza",
			                            "url_param": "center-street-entryway"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of The Monoco Pool",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/thumbs/monacoPool1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/landscape/monacoPool1-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Monoco Pool",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/thumbs/monacoPool2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/landscape/monacoPool2-landscape.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Monoco Pool",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/thumbs/monacoPool3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/monaco-pool/landscape/monacoPool3-landscape.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Uptown Dallas, TX",
			                            "title": "Monaco Pool",
			                            "url_param": "monaco-pool"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen1-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen2-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen3-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen4-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen5-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen6-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen7-landscape.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen8-landscape.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Dallas, TX",
			                            "title": "R + D Kitchen",
			                            "url_param": "rd-kitchen"
			                        }
			                    ]
			                }
			            },
			            "primary_standard_container": {
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
			                        "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen3-landscape.jpg"
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
			            "quaternary_standard_container": {
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
			                            "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/campus-edge/thumbs/campusEdge1-thumb.jpg",
			                            "portrait": null,
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/campus-edge/landscape/campusEdge1-landscape.jpg"
			                        }
			                    ],
			                    "text": [
			                        "SPSD manages and enhances landscapes uniquely fitting our clients\u2019 personalities. Step by step, we strive to maintain the client\u2019s vision \u2013 from the building stage through to complete landscape management. We realize it is not only crucial for us to complete each project in a professional and timely manner, but also to trouble shoot potential ideas related to the hardscape and softscape demands. SPSD thrives on complex projects presenting challenges, including drainage issues, water works and masonry."
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
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/old-town/landscape/oldTown8-landscape.jpg"
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
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/maintenance-jobs/landscape/maintenanceJobs3-landscape.jpg"
			                        },
			                        {
			                            "no_description": true,
			                            "no_textual_content": false,
			                            "background": "light",
			                            "description": null,
			                            "tagline": "Dallas, TX",
			                            "title": "R + D Kitchen",
			                            "alt": "RD Kitchen",
			                            "type": "image",
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen5-landscape.jpg"
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
			                "icon": "photo_library",
			                "name": "MISSION"
			            },
			            {

			                "target": "_self",
			                "href": "/#/#capabilities",
			                "class": "material-icons",
			                "hash": "#/#capabilities",
			                "icon": "photo_library",
			                "name": "CAPABILITIES"
			            },
			            {

			                "target": "_self",
			                "href": "/#/#galleries",
			                "class": "material-icons",
			                "hash": "#/#galleries",
			                "icon": "receipt",
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
			                "href": "/#/#meet-our-team",
			                "class": "material-icons",
			                "hash": "#/#meet-our-team",
			                "icon": "work",
			                "name": "MEET OUR TEAM"
			            },
			            {

			                "target": "_self",
			                "href": "/#/#contact",
			                "class": "material-icons",
			                "hash": "#/#contact",
			                "icon": "free_breakfast",
			                "name": "CONTACT US"
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

// function getData() {  
//     var deferred = $q.defer();
//     async(deferred.resolve, deferred.reject);
//     return deferred.promise;
// }

