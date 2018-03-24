'use strict';

var info = angular.module('info', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'directions', 
'servicePageDataService'
])

.controller('infoController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$routeParams)
{
    var param = $routeParams.pageId;
    var pageId = JSON.stringify(param);
    console.log("page id " + pageId);
    var continue_looping = true;
    var parameter = JSON.stringify($rootScope.params);
    $scope.tab_visible = parameter.split("/capabilities/").pop();

    var init = function(){
        if ($rootScope.pages){
            if ($rootScope.pages.length > 0){
                load_page();
            }
        }
    }

    var load_page = function(){
        for(let i = 0, l = $rootScope.pages.length; i < l && continue_looping == true; i++) {
            var raw_url = $rootScope.pages[i].settings.url;
            var url = JSON.stringify(raw_url);
            var checkURL = url.split("/info/").pop();
            console.log(checkURL);
            if(checkURL.indexOf(pageId) > 0){
                $('#default-page-loading').fadeOut('slow');
                continue_looping = false;
                $scope.page = $rootScope.pages[i];
                $rootScope.pageTitle = $scope.page.data.title;
            }
        }
    }
    init();
    $rootScope.$on('data_loaded', function(event, args) {
        load_page();
    });

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


