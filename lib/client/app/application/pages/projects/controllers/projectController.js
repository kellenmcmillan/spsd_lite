'use strict';

var project = angular.module('project', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])

.controller('projectController', [
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
    var continue_looping = true;
    var parameter = JSON.stringify($rootScope.params);
    var contentSort = [];

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
            var checkURL = raw_url.split("/projects/").pop();
            var url = JSON.stringify(checkURL);
            if(url == pageId){
                $('#default-page-loading').fadeOut('slow');
                continue_looping = false;
                // $rootScope.pages[i].pageNumber = i;
                $rootScope.projectPage = $rootScope.pages[i];
                $rootScope.pageTitle = $rootScope.projectPage.data.title;
                $rootScope.projectPageSortObj = [];
                var projectPageSortableContents = angular.forEach($rootScope.projectPage.data.page.contents, function(value, key){
                    $rootScope.projectPageSortObj.push(value);
                });
                $rootScope.projectPageSortableContents = projectPageSortableContents;
            }
        }
    }
    init();
    $rootScope.$on('data_loaded', function(event, args) {
        load_page();
    });

}])
.directive('compile', ['$compile', function ($compile) {
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


