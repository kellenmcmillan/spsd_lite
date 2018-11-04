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
    $scope.randomizer = function(index){
        var check = Math.round(Math.random() * index);
        return check%2 ? 1 : 2;
    };


}]);

