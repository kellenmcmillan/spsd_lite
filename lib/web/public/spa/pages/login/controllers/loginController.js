'use strict';

var login = angular.module('login', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('loginController', ['$rootScope', '$scope', '$compile', '$window', function ($rootScope, $scope, $compile, $window){

    function login(){
        
    }

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

}]).directive('contentAvailable', ['$location', function($location){
    return {
        link: link,
        restrict: 'A'
    };
    function link(scope, element, attrs){
        element.on("load", function(){
            $('#default-page-loading').fadeOut('slow');
        });
    }
}]);


