'use strict';

var capabilities = angular.module('capabilities', ['ngResource', 'ngAnimate', 'ngSanitize', 'directions', 'servicePageDataService'])

.controller('capabilitiesController', ['$rootScope', '$scope', '$compile', '$window', '$routeParams', 'service_page_data', function ($rootScope, $scope, $compile, $window, $routeParams, service_page_data){
    var page="";
    service_page_data.get()
    .success(function(data) { 
        page = data;
        $rootScope.pageTitle = page.data[0].name;
        console.log(data);
    }) 
   .error(function(err) { 
        console.log(err);
        return err; 
    });

    // pulls relevant page data from appData Stream
    // for(let i = 0, l = $rootScope.app_data.interior_page_configs.length; i < l; i++) {
    //     var pages = $rootScope.app_data.interior_page_configs;
    //     if(pages[i].name == "Capabilities"){
    //         var page = pages[i];
    //     }
    // }
    // pulls relevant page data from appData Stream

    // Selects Current View From Parameter
    var starting_tab;
    var url_param = $routeParams.url_param;

    for(let i = 0, l = page.data[0].content.tabs.length; i < l; i++) {
        var views = page.data[0].content.tabs;
        var url_param = $routeParams.url_param;
        if(views[i].param == url_param){
            starting_tab = views[i].name;
            $scope.current_tab = i;
        }
        var paragraphs = views[i].text;
        var lists = views[i].lists;
        var anonymous_tab_variable = paragraphs.concat(lists);
        // Sort by position high to low
        views[i].compiled_content = anonymous_tab_variable.sort(sort_by('position', true, parseInt));
    }
    // Selects Current View From Parameter

    $rootScope.pageTitle = page.data[0].name;
    $scope.page = page;
    $scope.tab_data = page.data[0].content.tabs;
    $scope.shrinking_title_image = page.component_page_data.shrinking_title_image;
    $scope.tab_visible = starting_tab;
    $scope.page_navigation_icon = page.component_page_data.page_navigation_icon;
    $scope.page_navigation_title = page.component_page_data.page_navigation_title;

    var sort_by = function(field, reverse, primer){
        var key = function (x) {return primer ? primer(x[field]) : x[field]};

        return function (a,b) {
            var A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
        }
    }
    
    // $scope.test_data = "<p ng-bind-html=\"test_data_value\"></p>";

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
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
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


