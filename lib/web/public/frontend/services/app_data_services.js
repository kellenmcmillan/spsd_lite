'use strict';

var appDataService = angular.module('appDataService', ['ngResource', 'ngRoute']);

appDataService.factory('frontend', ['$resource',
function($resource){

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
			                "page_navigation_icon": "view_list",
			                "page_navigation_title": "SECTION",
			                "shrinking_title_image": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm3-landscape.jpg",
			                "tabs": [
			                    {
			                        "name": "Landscape Management",
			                        "param": "landscape-management",
			                        "images": [
				                        {
				                            "src": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard4-landscape.jpg",
				                            "name": "Landscape Management",
				                            "alt": ""
				                        }
			                        ],
			                        "text": ["SPSD provides a total solution for your Landscape management needs.  Our staff has over 35 years of experience in every aspect of landscape – Horticulture, Irrigation and Water Management, Fertilization and Chemical Applications and Landscape Architecture. Through an extensive analysis of your landscape, you can expect a high-quality service from our landscape management professionals to increase your property’s curb appeal while attracting people and increasing your overall value."],
			                        "lists": ["<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Customized Landscape Management Programs</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Irrigation management and solutions</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Fertilizing programs</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Arbor Care</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Portering Services</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Landscape Enhancements/span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Monthly Property Reports</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Seasonal Color Programs</span></li>"],
			                        "className": "landscape-management"
			                    },
			                    {
			                        "name": "Landscape Construction",
			                        "title": "Landscape Construction and Enhancements",
			                        "param": "landscape-construction",
			                        "images": [
				                        {
				                            "src": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan4-landscape.jpg",
				                            "name": "Landscape Construction",
				                            "alt": ""
				                        }
			                        ],
			                        "text": ["Since 1982, SPSD’s commitment to high quality specialty landscape construction has proven invaluable to landscape architects, general contractors, land developers, public agencies and high-end residential clients. SPSD provides a turnkey option to our clients to be the total outdoor solution. Others may claim to do the same, but few can deliver like SPSD. To uphold the integrity of a well-designed landscape, a contractor must install projects according to plans and specifications.  SPSD has consistently honored the intent of landscape architects and our clients for over 35 years. We have a proven track record of following architect’s drawings, delivering excellent workmanship, and offering an excellent value to our clients while enhancing the overall value of the property for years to come."],
			                        "lists": ["<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Landscape Installation</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Landscape Drainage</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Irrigation Systems &#47; Water Management</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Natural Stone Hardscaping</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Custom Pools and Spas</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Water Features</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Landscape Enhancements</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Landscape and Site Lighting</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Amenity Centers, Clubhouses, Recreational Facilities</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Overhead Structures, Trellis and Arbors</span></li>"],
			                        "className": "specialty-construction"
			                    },
			                    {
			                        "name": "Natural Stone Work",
			                        "param": "natural-stone-work",
			                        "images": [
				                        {
				                            "src": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/landscape/austinRanch1-landscape.jpg",
				                            "name": "Natural Stone Work",
				                            "alt": ""
				                        }
			                        ],
			                        "text": ["Hardscape construction serves as the framework to a beautiful landscape and SPSD believes in using the beauty and durability of natural stone in its projects.  Our masonry group has been building in North Texas since 1964 and our dedication to a “Quality, not Quantity” attitude has earned the respect of many Landscape Architects and General Contractors alike."],
			                        "lists": ["<li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Masonry Structures</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Natural Stone Paving</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Wall Veneer</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Monument Signs</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Flagstone Flatwork</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Stone Water Features</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Boulder Waterfalls</span></li><li class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-icon mdl-color-text--green-800\">lens</i>Pool Decking and Coping</span></li>"],
			                        "className": "natural-stone-work"
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
			                        "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/brand/truck-hi-res.jpg"
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
			                        "hue": "hdst",
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
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capabilities/landscapeConstruction2-landscape.jpg"
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
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capabilities/landscapeConstruction1-landscape.jpg"
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
			                            "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/capabilities/landscapeConstruction3-landscape.jpg"
			                        },
			                        "media_type": "image"
			                    }
			                ],
			                "component_data": [
			                    {
			                        "text": [
			                            "<b>Some Of Our Services:<\/b><br>&bull;&nbsp;&nbsp;Irrigation Management<br>&bull;&nbsp;&nbsp;Fertilizing Programs"
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
			                            "<b>Some Of Our Services:<\/b><br>&bull;&nbsp;&nbsp;Water Features<br>&bull;&nbsp;&nbsp;Landscape &amp; Site Lighting"
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
			                            "<b>Some Of Our Services:<\/b><br>&bull;&nbsp;&nbsp;Stone Paving<br>&bull;&nbsp;&nbsp;Boulder Water Falls"
			                        ],
			                        "tagline": null,
			                        "param": "natural-stone-work",
			                        "title": [
			                            "Natural Stone Work"
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
			                        "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson4-hi-res.jpg"
			                    },
			                    "media_type": "image"
			                },
			                "component_data": {
			                    "text": null,
			                    "tagline": null,
			                    "title": [
			                        "Serving North Texas for Over 35 Years"
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
			                            "is_featured": false,
			                            "description": "Arlington, TX",
			                            "title": "Arlington Highlands",
			                            "url_param": "arlington-highlands"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard11-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard12-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard12-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard12-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of the Brickyard",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/thumbs/brickyard13-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/landscape/brickyard13-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/brickyard/hi-res/brickyard13-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Farmers Branch, TX",
			                            "title": "Brickyard",
			                            "url_param": "brickyard"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An Image of Routh Street Flats",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/thumbs/routhStreetFlats1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/landscape/routhStreetFlats1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/hi-res/routhStreetFlats1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An Image of Routh Street Flats",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/thumbs/routhStreetFlats2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/landscape/routhStreetFlats2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/routh-street-flats/hi-res/routhStreetFlats2-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Dallas, TX",
			                            "title": "Routh Street Flats",
			                            "url_param": "routh-street-flats"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "Wayne Ferguson Plaza",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/thumbs/wayneFerguson9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/landscape/wayneFerguson9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/wayne-ferguson-plaza/hi-res/wayneFerguson9-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Lewisville, TX",
			                            "title": "Wayne Ferguson Plaza",
			                            "url_param": "center-street-entryway"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Baylor University's Fountain",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/thumbs/baylorFountain11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/landscape/baylorFountain11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/baylor-fountain/hi-res/baylorFountain11-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Waco, TX",
			                            "title": "Baylor Fountain",
			                            "url_param": "baylor-fountain"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/hi-res/rdKitchen1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/hi-res/rdKitchen2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/hi-res/rdKitchen3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "R + D Kitchen",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/thumbs/rdKitchen4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/landscape/rdKitchen4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/rd-kitchen/hi-res/rdKitchen4-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Dallas, TX",
			                            "title": "R + D Kitchen",
			                            "url_param": "rd-kitchen"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Stella Luxury Apartments in Uptown Dallas",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/thumbs/stella1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/landscape/stella1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/hi-res/stella1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Stella Luxury Apartments in Uptown Dallas",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/thumbs/stella2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/landscape/stella2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/hi-res/stella2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Stella Luxury Apartments in Uptown Dallas",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/thumbs/stella3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/landscape/stella3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/stella/hi-res/stella3-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Uptown Dallas",
			                            "title": "Stella",
			                            "url_param": "stella"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Discovery at the Realm Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/thumbs/discovery-realm10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/landscape/discovery-realm10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/discovery-at-the-realm/hi-res/discovery-realm10-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Lewisville, TX",
			                            "title": "Discovery At The Realm",
			                            "url_param": "discover-at-the-realm"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare11-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare12-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare12-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare12-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare13-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare13-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare13-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare14-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare14-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare14-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare15-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare15-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare15-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare16-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare16-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare16-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare17-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare17-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare17-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare1m8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare18-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare18-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare19-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare19-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare19-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Sundance Square",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/thumbs/sundanceSquare20-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/landscape/sundanceSquare20-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/sundance-square/hi-res/sundanceSquare20-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Fort Worth, TX",
			                            "title": "Sundance Square",
			                            "url_param": "sundance-square"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown11-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown12-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown12-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown12-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown13-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown13-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown13-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown14-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown14-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown14-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Midtown Hilton",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/thumbs/hiltonMidtown15-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/landscape/hiltonMidtown15-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/midtown-hilton/hi-res/hiltonMidtown15-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": true,
			                            "description": "Dallas/Arlington, TX",
			                            "title": "Hilton Garden Inn",
			                            "url_param": "hilton-garden-inn"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of The Alexan Luxury Apartments",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/thumbs/the-alexan7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/landscape/the-alexan7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/the-alexan/hi-res/the-alexan7-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Dallas, TX",
			                            "title": "The Alexan",
			                            "url_param": "the-alexan"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Dove Casey",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/thumbs/doveCasey7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/landscape/doveCasey7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/dove-casey/hi-res/doveCasey7-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Grapevine, TX",
			                            "title": "Casey's Clubhouse",
			                            "url_param": "caseys-clubhouse"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove11-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove12-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove12-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove12-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove13-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove13-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove13-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Oak Grove Park",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/oakGrove14-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/landscape/oakGrove14-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/hi-res/oakGrove14-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Grapevine, TX",
			                            "title": "Oak Grove Park",
			                            "url_param": "oak-grove-park"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/oak-grove-park/thumbs/friscoBridges4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges11-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges12-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges12-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges12-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges13-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges13-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges13-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges14-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges14-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges14-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Frisco Bridges",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/thumbs/friscoBridges15-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/landscape/friscoBridges15-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/frisco-bridges/hi-res/friscoBridges15-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "Frisco, TX",
			                            "title": "Frisco Bridges",
			                            "url_param": "frisco-bridges"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence5-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence6-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence6-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence6-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence7-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence7-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence7-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence8-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence8-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence8-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence9-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence9-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence9-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence10-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence10-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence10-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of a Private Residence",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/thumbs/privateResidence11-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/landscape/privateResidence11-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/private-residences/hi-res/privateResidence11-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "North Texas",
			                            "title": "Private Residences",
			                            "url_param": "private-residences"
			                        },
			                        {
			                            "images": [
			                                {
			                                    "alt": "An image of Austin Ranch",
			                                    "type": "image",
			                                    "is_cover_image": true,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/thumbs/austinRanch1-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/landscape/austinRanch1-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/hi-res/austinRanch1-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Austin Ranch",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/thumbs/austinRanch2-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/landscape/austinRanch2-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/hi-res/austinRanch2-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Austin Ranch",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/thumbs/austinRanch3-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/landscape/austinRanch3-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/hi-res/austinRanch3-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Austin Ranch",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/thumbs/austinRanch4-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/landscape/austinRanch4-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/hi-res/austinRanch4-hi-res.jpg"
			                                },
			                                {
			                                    "alt": "An image of Austin Ranch",
			                                    "type": "image",
			                                    "is_cover_image": false,
			                                    "thumbnail": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/thumbs/austinRanch5-thumb.jpg",
			                                    "landscape": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/landscape/austinRanch5-landscape.jpg",
			                                    "hi_res": "https://spsd-jc7noh2ropyhzv28kaix.stackpathdns.com/assets/portfolios/austin-ranch/hi-res/austinRanch5-hi-res.jpg"
			                                }
			                            ],
			                            "is_featured": false,
			                            "description": "The Colony, TX",
			                            "title": "Austin Ranch",
			                            "url_param": "austin-ranch"
			                        }
			                    ]
			                }
			            },
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
			                "href": "/meet-our-team",
			                "class": "material-icons",
			                "hash": null,
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

