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
'$firebaseAuth', 
function (
$rootScope, 
$scope, 
$window, 
$routeParams, 
$mdDialog, 
$mdMenu, 
$timeout, 
$http,
$firebaseAuth){
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
}]);



/////////////////////////////////
