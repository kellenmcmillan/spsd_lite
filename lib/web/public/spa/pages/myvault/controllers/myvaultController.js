'use strict';

var myvault = angular.module('myvault', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'ngMessages'
])

.controller('uxController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
'$mdDialog', 
'$mdMenu', 
'$timeout', 
'$http',
'auth', 
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
auth)
{
    
    $scope.auth = auth;
    $scope.profile;

    if (auth.getCachedProfile()) {
        $scope.profile = auth.getCachedProfile();
    } else {
        auth.getProfile(function(err, profile) {
            $scope.profile = profile;
        });
    }

}])
.directive('contentAvailable', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){

            $('#default-page-loading').fadeOut('slow');

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
