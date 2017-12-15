'use strict';

var myvault = angular.module('myvault', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'ngMessages',
'auth'
])

.controller('myvaultController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
'$mdDialog', 
'$mdMenu', 
'$timeout', 
'$http', 
'authService', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$routeParams, 
$mdDialog, 
$mdMenu, 
$timeout, 
$http,
authService)
{

    console.log('got to the get profile controller');
    if (authService.getCachedProfile()) {
        $scope.profile = authService.getCachedProfile();
    } else {
        console.log('trying to get profile');
        authService.getProfile(function(err, profile) {
            console.log('got to the get profile function ' + profile);
            $scope.profile = profile;
        });
        
    }

}])
.directive('contentAvailable', ['$location', '$timeout', function($location, $timeout){

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
