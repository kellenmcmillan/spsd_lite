'use strict';

var firstParallaxDataService = angular.module('missionDataService', []);

firstParallaxDataService.factory('mission_data', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/getMissionData');
        }
    }
}]);