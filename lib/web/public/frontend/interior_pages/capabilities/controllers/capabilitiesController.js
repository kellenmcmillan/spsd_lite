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
            var paragraphs = views[i].text[0];
            var lists = views[i].lists[0];
            var anonymous_tab_variable = [];
            anonymous_tab_variable.push(paragraphs);
            anonymous_tab_variable.push(lists);
            // Sort by position high to low
            $scope.compiled_content.push(anonymous_tab_variable.sort(sort_by('position', true, parseInt)));
        }
        // Selects Current View From Parameter

        $scope.page = page;
        $scope.tab_data = page.data[0].content.tabs;
        $scope.page_banner = page.data[0].content.background_media.image.landscape;
        $scope.tab_visible = starting_tab;
;
        angular.element('#lists').addClass('lightweight-list-icon mdl-list');
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
          var ensureCompileRunsOnce = scope.$watch(
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
                
              // Use Angular's un-watch feature to ensure compilation only happens once.
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


