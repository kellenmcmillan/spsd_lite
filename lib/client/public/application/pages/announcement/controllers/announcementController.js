'use strict';

var announcement = angular.module('announcement', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])

.controller('announcementController', [
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
            var checkURL = raw_url.split("/announcement/").pop();
            var url = JSON.stringify(checkURL);
            if(url == pageId){
                $('#default-page-loading').fadeOut('slow');
                continue_looping = false;
                // $rootScope.pages[i].pageNumber = i;
                $rootScope.announcementPage = $rootScope.pages[i];
                $rootScope.pageTitle = $rootScope.announcementPage.data.title;
                $rootScope.announcementPageSortObj = [];
                var announcementPageSortableContents = angular.forEach($rootScope.announcementPage.data.page.contents, function(value, key){
                    $rootScope.announcementPageSortObj.push(value);
                });
                $rootScope.announcementPageSortableContents = announcementPageSortableContents;
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


