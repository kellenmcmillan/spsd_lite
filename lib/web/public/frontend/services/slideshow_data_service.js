'use strict';

var slideshowDataService = angular.module('slideshowDataService', ['ngResource', 'ngRoute']);

slideshowDataService.factory('slideshow', ['$resource',
function($resource){
    return $resource('/api/router/appData', {}, {
        query: {method:'GET', isArray: false}
    });
}]);

