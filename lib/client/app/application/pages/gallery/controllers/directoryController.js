'use strict';

angular.module('folders', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])
.controller('directoryController', [
'$rootScope', 
'$scope', 
'$compile', 
'$location', 
'$timeout', 
'$window', 
'$anchorScroll', 
'$routeParams', 
function (
$rootScope, 
$scope, 
$compile, 
$location, 
$timeout, 
$window, 
$anchorScroll, 
$routeParams)
{
    
    $rootScope.pageTitle = "Galleries";
    $scope.isOpen = false;
    

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

}]);

