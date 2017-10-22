'use strict';

var capabilities = angular.module('capabilities', ['ngResource', 'ngAnimate', 'ngSanitize', 'directions', 'servicePageDataService'])

.controller('capabilitiesController', ['$rootScope', '$scope', '$compile', '$window', '$routeParams', 'service_page_data', function ($rootScope, $scope, $compile, $window, $routeParams, service_page_data){
    var page = {};
    service_page_data.get()
    .success(function(data) { 
        page = data;
        $rootScope.pageTitle = page.data[0].name;
        var starting_tab;
        var url_param = $routeParams.url_param;
        function sort_by(field, reverse, primer){
            var key = function (x) {return primer ? primer(x[field]) : x[field]};
            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
            }
        }
        $scope.compiled_content = []
        for(let i = 0, l = page.data[0].content.tabs.length; i < l; i++) {
            var views = page.data[0].content.tabs;
            var url_param = $routeParams.url_param;
            if(views[i].param == url_param){
                starting_tab = views[i].name;
                $scope.current_tab = i;
            }
            // Sort by position high to low
            var paragraphs = views[i].text[0];
            var lists = views[i].lists[0];
            var anonymous_tab_variable = [];
            anonymous_tab_variable.push(paragraphs);
            anonymous_tab_variable.push(lists);
            $scope.compiled_content.push(anonymous_tab_variable.sort(sort_by('position', true, parseInt)));
            // Sort by position high to low
        }
        // Selects Current View From Parameter

        $scope.page = page;
        $scope.tab_data = page.data[0].content.tabs;
        $scope.page_banner = page.data[0].content.background_media.image.landscape;
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
      return function(scope, element, attrs) {
          var ensureCompileRunsOnce = scope.$watch(
            function(scope) {
              return scope.$eval(attrs.compile);
            },
            function(value) {
              element.html(value);
              $compile(element.contents())(scope);
              ensureCompileRunsOnce();
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


