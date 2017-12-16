'use strict';

angular.module('myvault', ['ngResource', 'ngAnimate', 'ngSanitize', 'ngMessages'])

.controller('myvaultController', [
'$rootScope', 
'$scope',  
'$window', 
'$routeParams', 
'$mdDialog', 
'$mdMenu', 
'$timeout', 
'$http', 
function (
$rootScope, 
$scope, 
$window, 
$routeParams, 
$mdDialog, 
$mdMenu, 
$timeout, 
$http){
    console.log('trying to get profile');
}])
.directive('contentAvailable', ['$timeout', function($timeout){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){
            $timeout(function(){
                $('#default-page-loading').fadeOut('slow');
            }, 4000);
        });
    }
}])
.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground green

    $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('green')
    .dark();

});



/////////////////////////////////
