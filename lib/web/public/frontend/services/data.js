'use strict';

var heroSlideshowData = angular.module('heroSlideshowData', ['ngResource', 'ngRoute']);

heroSlideshowData.factory('hero-slideshow', ['$http',
	
	function(){

	var state = {

			app_data: null,

			hero_slideshow: function() {
				return this.app_data;
			}

	    }
	}

    $http.get(

    	'index-slideshow-hero.json'

    ).success(function(data) {

        state.app_data = data;

    }); 

    return state;
]);


