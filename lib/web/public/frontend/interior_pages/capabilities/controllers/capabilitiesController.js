'use strict';

var capabilities = angular.module('capabilities', ['ngResource', 'ngAnimate', 'ngSanitize', 'directions', 'servicePageDataService'])

.controller('capabilitiesController', ['$rootScope', '$scope', '$compile', '$window', '$routeParams', 'service_page_data', function ($rootScope, $scope, $compile, $window, $routeParams, service_page_data){
    var page = {};
    var compiled_content;
    service_page_data.get()
    .success(function(data) { 
        page = data.data[0];
        $rootScope.pageTitle = page.name;
        var starting_tab;
        var url_param = $routeParams.url_param;
        for(let i = 0, l = page.content.tabs.length; i < l; i++) {
            var views = page.content.tabs;
            var url_param = $routeParams.url_param;
            if(views[i].param == url_param){
                starting_tab = views[i].name;
                $scope.current_tab = i;
            }
            // Sort by position high to low
            var text = views[i].text;
            var lists = views[i].lists;
            
            compiled_content = function mergeJSON(text, lists) {
                function isObject(obj) {
                    if (typeof obj == "object") {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                return true; // search for first object prop
                            }
                        }
                    }
                    return false;
                }
                for (var key in lists) {
                    if (lists.hasOwnProperty(key)) {
                        if (text[key] && isObject(text[key]) && isObject(lists[key])) {
                            mergeJSON(text[key], lists[key]);
                        } else {
                            text[key] = lists[key];
                        }
                    }
                }
                return text;
            };
            // Sort by position high to low
        }
        // Selects Current View From Parameter

        $scope.page = page;
        $scope.compiled_content = compiled_content;
        $scope.tab_data = page.content.tabs;
        $scope.page_banner = page.content.background_media.image.landscape;
        $scope.tab_visible = starting_tab;
    }) 
   .error(function(err) { 
        console.log(err);
        return err; 
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
}])
.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});


