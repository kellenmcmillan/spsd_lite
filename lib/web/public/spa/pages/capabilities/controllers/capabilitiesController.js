'use strict';

var capabilities = angular.module('capabilities', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'directions', 
'servicePageDataService'
])

.controller('capabilitiesController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
'service_page_data', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$routeParams, 
service_page_data)
{
        

    
    
    $scope.tab_data;
    $scope.page_banner;
    var parameter = JSON.stringify($rootScope.params);
    // $scope.tab_visible = if(location.indexOf("/gallery/") > 0);
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
}]).directive('compile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.compile);
            }, function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            });
        }
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
}]);


