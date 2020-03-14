'use strict';

angular.module('projects', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])
.controller('projectsController', [
'$rootScope', 
'$scope', 
'$compile', 
'$location', 
'$timeout', 
'$window', 
'$routeParams', 
function (
$rootScope, 
$scope, 
$compile, 
$location, 
$timeout, 
$window,
$routeParams)
{
    
    $rootScope.pageTitle = "Projects";
    $scope.isOpen = false;
    
    var isTablet = function isTablet (){
        if($rootScope.window_width > 600){
            if($rootScope.window_width < 900){
                return true;
            }
        } else {
            return false;
        }
    }

    $rootScope.tablet = isTablet();

    

    $(window).resize(function() {
        $timeout(function(){
            // create Specific Project Objects
            init();
            $rootScope.tablet = isTablet();
            // create Specific Project Objects
        }, 1000);
    }); 
     

}]);


