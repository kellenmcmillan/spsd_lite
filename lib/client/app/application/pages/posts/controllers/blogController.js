'use strict';

var blog = angular.module('blog', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])

.controller('blogController', [
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
            var checkURL = raw_url.split("/blog/").pop();
            var url = JSON.stringify(checkURL);
            if(url == pageId){
                $('#default-page-loading').fadeOut('slow');
                continue_looping = false;
                // $rootScope.pages[i].pageNumber = i;
                $rootScope.blogPage = $rootScope.pages[i];
                $rootScope.pageTitle = $rootScope.blogPage.data.title;
                $rootScope.blogPageSortObj = [];
                var blogPageSortableContents = angular.forEach($rootScope.blogPage.data.page.contents, function(value, key){
                    $rootScope.blogPageSortObj.push(value);
                });
                $rootScope.blogPageSortableContents = blogPageSortableContents;
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


